import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import {
  cleanData,
  connectMemoryDB,
  closeMemoryDBConection,
} from './helper/mongoDbMemoryTestHelper';
//los test que validan el id son ahora invalidos?
import {
  arrayTodosTest,
  arrayErrors,
  testData,
  testToken,
  testTokenUserWithNotData,
  testTokenWithWrongID,
  wrongKeysDataTest,
  wrongValuesDataTest,
} from './helper/testData';
import { ToDoDBModel } from '../server/todo-api/schemas/to-do-schema';

const server = new Server().router(routes);
const app = server.getApp();
describe('todo API works correctly', () => {
  beforeAll(async () => {
    await connectMemoryDB();
  });

  afterAll(async () => {
    await server.close();
    await cleanData();
    await closeMemoryDBConection();
  });

  beforeEach(async () => {
    await cleanData();
  });
  describe('server run and listen correctly', () => {
    it('server run and listen correctly', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST method works correctly', () => {
    it('POST method works correctly', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send(testData)
        .set('Authorization', testToken);
      expect(response.statusCode).toBe(201);
    });

    it('POST method only accepts correct values', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send(wrongValuesDataTest)
        .set('Authorization', testToken);
      expect(response.statusCode).toBe(400);
      const { errors } = JSON.parse(response.text);
      expect(errors).toHaveLength(4);
      expect(errors).toEqual(arrayErrors);
    });
    it('POST method only accepts the minimum required values', async () => {
      const response = await request(app)
        .post('/api/v1/todos')
        .send(wrongKeysDataTest)
        .set('Authorization', testToken);
      expect(response.statusCode).toBe(400);
      const { errors } = JSON.parse(response.text);
      expect(errors[0].message).toBe(
        'None of the properties provided in the body of the application are valid'
      );
    });
  });

  describe('GET method works correctly', () => {
    it('GET method works correctly', async () => {
      await ToDoDBModel.insertMany(arrayTodosTest);
      const response = await request(app)
        .get('/api/v1/todos')
        .set('Authorization', testToken);

      const { listTodos } = response.body;
      expect(response.statusCode).toBe(200);
      expect(listTodos).toHaveLength(arrayTodosTest.length);
      expect(listTodos[1].title).toEqual(arrayTodosTest[1].title);
    });

    it('GET method answer correctly if there is no student to dos', async () => {
      const response = await request(app)
        .get('/api/v1/todos')
        .set('Authorization', testTokenUserWithNotData);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(
        `There is no student task with ID '65bac142b8ef4d3dea108634'`
      );
    });
    it('GET method not receive a wrong id and response with a descriptive error', async () => {
      const response = await request(app)
        .get('/api/v1/todos')
        .set('Authorization', testTokenWithWrongID);  

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toBe(
        'createdBy must by a ObjectId value'
      );
    });
  });
});
