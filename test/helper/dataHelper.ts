export const dataTest = {
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

export const ArrayTodosTest = [
  {
    createdBy: '65b5bfc5615b185c0bc05648',
    isCompleted: false,
    description: 'Complete unit tests for new feature',
    priority: 1,
    title: 'Unit Tests',
    dueDate: "2024-02-20T00:00:00.000Z",
  },
  {
    createdBy: '65b5bfc5615b185c0bc05648',
    isCompleted: true,
    description: 'Review code for latest commit',
    priority: 2,
    title: 'Code Review',
    dueDate: "2024-02-18T00:00:00.000Z",
  },
  {
    createdBy: '65b5bfc5615b185c0bc05648',
    isCompleted: false,
    title: 'Write documentation',
    priority: 3,
    dueDate:  "2024-02-15T00:00:00.000Z",
  },
];

export const cretedByWithIdWithExistingData = {
  createdBy: '65b5bfc5615b185c0bc05648',
};

export const cretedByWithIdWithNotExistingData = {
  createdBy: '65a56547b8772ebf5f3c48d8',
};


