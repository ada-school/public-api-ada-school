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
  dataTest,
  wrongKeysDataTest,
  wrongValuesDataTest,
} from './helper/dataHelper';
import { ToDoDBModel } from '../server/todo-api/schemas/to-do-schema';


const server = new Server().router(routes);
const app = server.getApp();


const dataTest = {
  createdBy: '65a5d5d212a10d2a9879bc73',
  isCompleted: true,
  description: 'test description',
  priority: 1,
  title: 'tests',
  dueDate: '2024-01-18T16:17:19.037Z',
};
const wrongValuesDataTest = {
  createdBy: '65a5d5d212a10d2a9879bc7',
  description: '--',
  priority: 12,
  title: '--',
  isCompleted: {},
};

const wrongKeysDataTest = {
  test: 'test',
  age: 21,
  isFinished: true,
};

const arrayErrors = [
  { message: 'created by must by a objectId value' },
  { message: 'isCompleted by must by a boolean value' },
  {
    message:
      'title by must by a string value and with a length greater than 3 or less than or equal to 15',
  },
  {
    message:
      'description by must by a string value and with a length greater than 3 or less than or equal to 250',
  },
  {
    message:
      'priority by must by a number value less than 0 or equal to 10 or greater than or equal to 0',
  },
];

describe('todo api server works', () => {
  beforeAll(async () => {
    await connectMemoryDB();
  });

  afterAll(async () => {
    await server.close();
    await cleanData();
    await closeMemoryDBConection();
  });
  it('server run and listen correctly', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('POST method works correctly', async () => {
    const response = await request(app).post('/api/v1/todos').send(dataTest);
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
