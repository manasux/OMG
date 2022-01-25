const { defaults } = require('./defaults');

export const tasks = {
  getMyTasks: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/me/tasks/list',
    },
  },
  createTask: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/tasks',
    },
  },
  completeTask: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/tasks/:id/complete',
    },
  },
  reopenTask: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/tasks/:id/reopen',
    },
  },
  addTaskCategory: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/tasks/categories',
    },
  },
  getTaskCategoryList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tasks/categories',
    },
  },
};
