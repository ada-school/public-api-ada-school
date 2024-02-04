export const testData = {
  createdBy: '65a5d5d212a10d2a9879bc73',
  isCompleted: true,
  description: 'test description',
  priority: 1,
  title: 'tests',
  dueDate: '2024-01-18T16:17:19.037Z',
};
export const wrongValuesDataTest = {
  createdBy: '65a5d5d212a10d2a9879bc7',
  description: '--',
  priority: 12,
  title: '--',
  isCompleted: {},
};

export const wrongKeysDataTest = {
  test: 'test',
  age: 21,
  isFinished: true,
};

export const arrayErrors = [
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

export const arrayTodosTest = [
  {
    createdBy: '5fcd3ac12b22eab4d301d819',
    isCompleted: false,
    description: 'Complete unit tests for new feature',
    priority: 1,
    title: 'Unit Tests',
    dueDate: '2024-02-20T00:00:00.000Z',
  },
  {
    createdBy: '5fcd3ac12b22eab4d301d819',
    isCompleted: true,
    description: 'Review code for latest commit',
    priority: 2,
    title: 'Code Review',
    dueDate: '2024-02-18T00:00:00.000Z',
  },
  {
    createdBy: '5fcd3ac12b22eab4d301d819',
    isCompleted: false,
    title: 'Write documentation',
    priority: 3,
    dueDate: '2024-02-15T00:00:00.000Z',
  },
];

export const cretedByWithIdWithExistingData = {
  createdBy: '',
};

export const testTokenUserWithNotData =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWJhZDM2MGQxZTEyZjRmZDMyYWNmODYiLCJuYW1lIjoiRXJpayBIZXJuYW5kZXoiLCJtZXRhIjp7InIiOlsiU1RVREVOVCIsIk1FTlRPUiIsIk1BTkFHRVIiXSwic2NpZCI6IjY1YmFjMTQyYjhlZjRkM2RlYTEwODYzNCJ9LCJpYXQiOjE3MDY3MDQxNDR9.njV_OqqALAa99GrR2CZxA6ZVLA_p5tGcgKYpTH4Mjkk';

export const testTokenWithWrongID =
  'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWJhZDM2MGQxZTEyZjRmZDMyYWNmODYiLCJuYW1lIjoiRXJpayBIZXJuYW5kZXoiLCJtZXRhIjp7InIiOlsiU1RVREVOVCIsIk1FTlRPUiIsIk1BTkFHRVIiXSwic2NpZCI6IjY1YmFjMTQyYjhlZjRkM2RlYTEwODYzIn0sImlhdCI6MTcwNjcwNDE0NH0.IdbTj2NyHDWPzl3UdY5QabS8C1N0hfibhsfLKzsu03s';

export const testToken =
  'baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM0MWI2ODMzOWU2YTc1YzczOGVmMDEiLCJuYW1lIjoiRXJpayBIZXJuYW5kZXoiLCJtZXRhIjp7InIiOlsiU1RVREVOVCIsIk1FTlRPUiIsIk1BTkFHRVIiXSwic2NpZCI6IjVmY2QzYWMxMmIyMmVhYjRkMzAxZDgxOSJ9LCJpYXQiOjE3MDY3MDQxNDR9.mVyJgyFJQbR9DYmPe-Tzy4kvlV36JkTwrtaI5n6MNc8';
