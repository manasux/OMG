import { tasks } from '@/utils/endpoints/tasks';
import { callApi } from '@/utils/apiUtils';

export function getMyTasks({ query }) {
  return callApi({
    uriEndPoint: tasks.getMyTasks.v1,
    query,
  });
}

export const createTask = ({ pathParams, body }) =>
  callApi({ uriEndPoint: tasks.createTask.v1, pathParams, body })
    .then((resp) => resp)
    .catch((err) => ({ ...err, status: 'notok' }));

export const completeTask = ({ pathParams, body }) =>
  callApi({
    uriEndPoint: tasks.completeTask.v1,
    pathParams,
    body,
  });
export const reopenTask = ({ pathParams }) =>
  callApi({
    uriEndPoint: tasks.reopenTask.v1,
    pathParams,
  })
    .then((res) => res)
    .catch(() => {});

export const addTaskCategory = ({ body }) =>
  callApi({ uriEndPoint: tasks.addTaskCategory.v1, body });
export const getTaskCategoryList = () => callApi({ uriEndPoint: tasks.getTaskCategoryList.v1 });
