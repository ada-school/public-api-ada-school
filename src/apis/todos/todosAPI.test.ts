/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import request from "supertest";
import { createApp } from "../../app";
import { memoryDatabase } from "../../testUtils/memoryDatabase";

import * as LXPClient from "../../LXPClient";
import { createToken } from "../../testUtils/createToken";
import { TodoDBModel } from "./TodoDBModel";
import { ToDoModel } from "./TodoModel";

const app = createApp();
const testUserId = "507f191e810c19729de860ea";
const otherUserId = "507f191e810c19729de860eb";

// Mock the LXPClient.checkStudentAPIToken function
Object.defineProperty(LXPClient, "checkStudentAPIToken", {
  value: jest.fn().mockImplementation(() => true),
});

describe("todosAPI", () => {
  let testToken: string;
  beforeAll(async () => {
    await memoryDatabase.connect();
    testToken = await createToken({ userId: testUserId });
  });

  afterAll(async () => {
    await memoryDatabase.close();
  });

  beforeEach(async () => {
    await memoryDatabase.clear();
  });

  it("should create a todo", async () => {
    return request(app)
      .post("/api/v1/todos")
      .send({ title: "Test Todo", description: "Test Description" })
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.data.title).toBe("Test Todo");
        expect(res.body.data.description).toBe("Test Description");
        expect(res.body.data.isComplete).toBe(false);
        expect(res.body.data.createdAt).not.toBe(null);
        expect(res.body.data.updatedAt).not.toBe(null);
      });
  });

  it("should update an existing todo", async () => {
    const todo = await TodoDBModel.create({
      title: "Test Todo 2",
      description: "Test Description 2",
      ownerId: testUserId,
    });

    return request(app)
      .get(`/api/v1/todos/${todo.id}`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.title).toBe("Test Todo 2");
        expect(res.body.data.description).toBe("Test Description 2");
        expect(res.body.data.isComplete).toBe(false);
        expect(res.body.data.createdAt).not.toBe(null);
        expect(res.body.data.updatedAt).not.toBe(null);
      });
  });

  it("should list todos", async () => {
    for (let i = 0; i < 3; i++) {
      await TodoDBModel.create({
        title: `Test Todo ${i + 1}`,
        description: `Test Description ${i + 1}`,
        ownerId: testUserId,
      });
    }

    return request(app)
      .get(`/api/v1/todos`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toEqual(3);
        expect(res.body.data[0].title).toEqual("Test Todo 1");
        expect(res.body.data[2].title).toEqual("Test Todo 3");
      });
  });

  it("should delete a todo", async () => {
    const todos: Array<ToDoModel> = [];
    for (let i = 0; i < 3; i++) {
      todos.push(
        await TodoDBModel.create({
          title: `Test Todo ${i + 1}`,
          description: `Test Description ${i + 1}`,
          ownerId: testUserId,
        })
      );
    }

    return request(app)
      .delete(`/api/v1/todos/${todos[2].id}`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data.id).toBe(todos[2].id);
        expect(res.body.data.title).toBe("Test Todo 3");
        expect(res.body.data.description).toBe("Test Description 3");
        expect(res.body.data.isComplete).toBe(false);
        expect(res.body.data.createdAt).not.toBe(null);
        expect(res.body.data.updatedAt).not.toBe(null);
      });
  });

  it("should validate input when creating", async () => {
    return request(app)
      .post("/api/v1/todos")
      .send({ title: "" })
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((res) => {
        expect(res.body.errors[0].msg).toEqual(
          "Title must be a string and is required"
        );
        expect(res.body.errors[1].msg).toEqual(
          "Title must be between 1 and 200 characters"
        );
      });
  });

  it("should not list todos from another user", async () => {
    for (let i = 0; i < 3; i++) {
      await TodoDBModel.create({
        title: `Test Todo ${i + 1}`,
        description: `Test Description ${i + 1}`,
        ownerId: otherUserId,
      });
    }

    await TodoDBModel.create({
      title: "My Todo",
      description: "My Description",
      ownerId: testUserId,
    });

    return request(app)
      .get(`/api/v1/todos`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toEqual(1);
        expect(res.body.data[0].title).toEqual("My Todo");
      });
  });

  it("should get todos for the current user", async () => {
    const notMyTodo = await TodoDBModel.create({
      title: "Not My Todo",
      description: "Not My Description",
      ownerId: otherUserId,
    });

    return request(app)
      .get(`/api/v1/todos/${notMyTodo.id}`)
      .set({ Authorization: `Bearer ${testToken}` })
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
