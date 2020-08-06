// eslint-disable-next-line node/no-unpublished-require
const mockingoose = require('mockingoose').default;
const Task = require('../../models/task');
const task = require('./task');

const mockedTasks = [
  {
    _id: '5f2beb0aad0261093101ccc9',
    summary: 'Test1 more characasdsadasdasd aasdasdasd asd',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5f2bead943c1e70919517cad',
    summary: 'ready to bee updated!!!',
    isCompleted: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '5f2bea6c3b0cf7001ca6b979',
    summary: 'Test1 more characasdsadasdasd aasdasdasd asd',
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

describe('tasks', () => {
  beforeEach(() => {
    mockingoose(Task).reset();
  });

  it('I should get all tasks', async () => {
    mockingoose(Task).toReturn(mockedTasks, 'find');
    const tasks = await task.tasks({ excludeCompleted: false });
    expect(tasks.length).toBe(3);
    expect(tasks[0]._id).toBe('5f2beb0aad0261093101ccc9');
    expect(tasks[0].summary).toBe('Test1 more characasdsadasdasd aasdasdasd asd');
    expect(tasks[0].isCompleted).toBe(false);
    expect(typeof tasks[0].createdAt).toBe('string');
    expect(typeof tasks[0].updatedAt).toBe('string');
  });

  it('I should get one task', async () => {
    mockingoose(Task).toReturn(mockedTasks[1], 'findOne');
    const atask = await task.task({ id: '5f2bead943c1e70919517cad' });
    expect(atask._id).toBe('5f2bead943c1e70919517cad');
    expect(atask.summary).toBe('ready to bee updated!!!');
    expect(atask.isCompleted).toBe(true);
    expect(typeof atask.createdAt).toBe('string');
    expect(typeof atask.updatedAt).toBe('string');
  });

  it('I should get error if task do not exist', async () => {
    mockingoose(Task).toReturn(mockedTasks[1], 'findX');
    let errorMessage = '';
    try {
      await task.task({ id: '5f2bead943c1e70919517ca8' });
    } catch (error) {
      errorMessage = error.message;
    }

    expect(errorMessage).toBe('Task not found!');
  });
});
