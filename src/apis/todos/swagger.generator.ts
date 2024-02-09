import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v0.0.1",
    title: "Ada School Todos API",
    description:
      "A simple CRUD API application that allows you to manage todos.",
  },
  servers: [{ url: "https://public-api.learn.ada-school.org/api/v1/todos" }],
  components: {
    schemas: {
      Todo: {
        $title: "Learn how to consume this API",
        $description:
          "Check the documentation and use the API key to test the API",
        $isCompleted: false,
        completedAt: "2022-08-25T00:00:00.000Z",
        $createdAt: "2020-08-25T00:00:00.000Z",
        $updatedAt: "2021-08-25T00:00:00.000Z",
      },
      CreateTodo: {
        $title: "New Todo",
        description: "A new todo to be created",
      },
      UpdateTodo: {
        title: "UpdateTodo",
        description: "Update an existing todo by id",
        isComplete: false,
      },
      TodoResponse: {
        data: {
          $id: "123",
          $title: "Todo title",
          $description: "Todo description",
          $isComplete: false,
          $createdAt: "2020-08-25T00:00:00.000Z",
          $updatedAt: "2021-08-25T00:00:00.000Z",
          completedAt: "2023-08-25T00:00:00.000Z",
        },
      },
      ArrayOfTodos: {
        data: [
          {
            $id: "456",
            $title: "Another todo title",
            $description: "Another todo description",
            $isComplete: false,
            $createdAt: "2020-09-25T00:00:00.000Z",
            $updatedAt: "2021-09-25T00:00:00.000Z",
            completedAt: "2023-09-25T00:00:00.000Z",
          },
        ],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};

const outputFile = "./src/apis/todos/todos.swagger.json";
const endpointsFiles = ["./src/apis/todos/todosAPI.ts"];

function docGen() {
  swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).catch(
    // eslint-disable-next-line no-console
    (err) => console.error(err)
  );
}

export default docGen;
