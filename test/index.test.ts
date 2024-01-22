import request from 'supertest';
import Server from '../server/common/server';
import routes from '../server/routes';
import {
  cleanData,
connectMemoryDB,
closeMemoryDBConection
} from './helper/mongoDbMemoryTestHelper';

const server = new Server().router(routes);
const app = server.getApp();

const dataTest = {
  createdBy: '65a5d5d212a10d2a9879bc73',
  isCompleted: true,
  description: 'test description',
  priority: 1,
  title: 'tests',
  dueDate: "2024-01-18T16:17:19.037Z",
};
const wrongDataTest = {
  createdBy: '65a56547b8772ebf5f3c48',
  description: '--',
  priority: 12,
  title: '--',
};

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

  it('POST method only accepts correct information', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send(wrongDataTest);
    expect(response.statusCode).toBe(400);
    const { errors } = JSON.parse(response.text);
    expect(errors).toHaveLength(4);
  });
});
