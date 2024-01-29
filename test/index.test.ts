import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import {
  cleanData,
  connectMemoryDB,
  closeMemoryDBConection,
} from './helper/mongoDbMemoryTestHelper';

import {
  ArrayTodosTest,
  arrayErrors,
  cretedByWithIdWithExistingData,
  cretedByWithIdWithNotExistingData,
  testData,
  wrongKeysDataTest,
  wrongValuesDataTest,
} from './helper/testData';
import { ToDoDBModel } from '../server/todo-api/schemas/to-do-schema';

const server = new Server().router(routes);
const app = server.getApp();

beforeAll(async () => {
  await connectMemoryDB();
});

afterAll(async () => {
  await server.close();
  await cleanData();
  await closeMemoryDBConection();
});
describe('server run and listen correctly', () => {
  it('server run and listen correctly', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('POST method works correctly', () => {
  it('POST method works correctly', async () => {
    const response = await request(app).post('/api/v1/todos').send(testData);
    expect(response.statusCode).toBe(201);
  });

  it('POST method only accepts correct values', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send(wrongValuesDataTest);
    expect(response.statusCode).toBe(400);
    const { errors } = JSON.parse(response.text);
    expect(errors).toHaveLength(5);
    expect(errors).toEqual(arrayErrors);
  });
  it('POST method only accepts the minimum required values', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send(wrongKeysDataTest);
    expect(response.statusCode).toBe(400);
    const { errors } = JSON.parse(response.text);
    expect(errors[0].message).toBe(
      'None of the properties provided in the body of the application are valid'
    );
  });
});

describe('GET method works correctly', () => {
  it('GET method works correctly', async () => {
    await ToDoDBModel.insertMany(ArrayTodosTest);
    const response = await request(app)
      .get('/api/v1/todos')
      .send(cretedByWithIdWithExistingData);

    const { toDosToTheEstudent } = response.body;
    expect(response.statusCode).toBe(200);
    expect(toDosToTheEstudent).toHaveLength(ArrayTodosTest.length);
    expect(toDosToTheEstudent[1].title).toEqual(ArrayTodosTest[1].title);
  });

  it('GET method answer correctly if there is no student to dos', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .send(cretedByWithIdWithNotExistingData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      `There is no student task with ID '${cretedByWithIdWithNotExistingData.createdBy}'`
    );
  });
  it('GET method not receive a wrong id and response with a descriptive error', async () => {
    const response = await request(app).get('/api/v1/todos');

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].message).toBe(
      'createdBy must by a ObjectId value but recived a undefined'
    );
  });
});

