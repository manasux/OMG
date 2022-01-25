import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { Tooltip, Button, Skeleton, Avatar, message } from 'antd';
import CheckValidation from '@/components/CheckValidation';
import { connect } from 'umi';
import { getInitials } from '@/utils/common';
import AddTaskModal from '@/components/AddTaskModal';
import TasksList from './components/TasksList';
import moment from 'moment';
import TaskHeader from './components/TaskHeader';

const Tasks = ({
  currentUser,
  dispatch,
  tasksDueTodayLoading,
  tasksDueLatterLoading,
  overdueTasksLoading,
  backlogTasksLoading,
  tasks,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [tasksPlannedForTodayCount, setTasksPlannedForTodayCount] = useState(0);
  const [taskStatus, setTaskStatus] = useState('');
  const [todayTaskStartIndex, setTodayTaskStartIndex] = useState(0);
  const [latterTaskStartIndex, setLatterTaskStartIndex] = useState(0);
  const [overdueTaskStartIndex, setOverdueTaskStartIndex] = useState(0);
  const [backlogTaskStartIndex, setBacklogStartIndex] = useState(0);

  const markTaskCompleted = ({ taskId, partyIds, noteInfo, jsonText }) => {
    dispatch({
      type: 'tasks/completeTask',
      payload: {
        pathParams: { id: taskId },
        body: {
          notifyAssigness: partyIds,
          noteInfo,
          jsonText,
        },
      },
    }).then(() => {
      // setTimeout(() => {
      //   dispatch({
      //     type: 'calendar/getPartyCalendarEvents',
      //     payload: {
      //       // calendarId: currentUser?.email,
      //     },
      //   });
      // }, 1000);
      message.success('Task Completed Succesfully!');
    });
  };

  // *** Tasks Api Calls ***
  const getMyBacklogTasks = (query) =>
    dispatch({
      type: 'tasks/getBacklogTasks',
      payload: {
        query,
        isFilterChangedOrStartIndexZero: query.isFilterChangedOrStartIndexZero && true,
      },
    }).then((res) => {
      if (res) {
        setTasksPlannedForTodayCount(0);
      }
    });
  const getMyTasksDueToday = (query) =>
    dispatch({
      type: 'tasks/getTasksDueToday',
      payload: {
        query: {
          ...query,
          dateRangeFrom: moment().startOf('day').toISOString(),
          dateRangeTo: moment().endOf('day').toISOString(),
        },
        isFilterChangedOrStartIndexZero: query.isFilterChangedOrStartIndexZero && true,
        tasksType: 'personal',
      },
    }).then((res) => {
      if (res) {
        setTasksPlannedForTodayCount(0);
      }
    });

  const getMyTasksDueLatter = (query) =>
    dispatch({
      type: 'tasks/getTasksDueLatter',
      payload: {
        query: { ...query, dateRangeFrom: moment().endOf('day').toISOString() },
        isFilterChangedOrStartIndexZero: query.isFilterChangedOrStartIndexZero && true,
        tasksType: 'personal',
      },
    }).then((res) => {
      if (res) {
        setTasksPlannedForTodayCount(0);
      }
    });
  const getMyOverdueTasks = (query) =>
    dispatch({
      type: 'tasks/getOverdueTasks',
      payload: {
        query: { ...query, dateRangeTo: moment().startOf('day').toISOString() },
        isFilterChangedOrStartIndexZero: query.isFilterChangedOrStartIndexZero && true,
        tasksType: 'personal',
      },
    }).then((res) => {
      if (res) {
        setTasksPlannedForTodayCount(0);
      }
    });

  useEffect(() => {
    getMyTasksDueLatter({
      startIndex: latterTaskStartIndex,
      fetchSize: 5,
      isFilterChangedOrStartIndexZero: latterTaskStartIndex === 0,
      showCompleted: taskStatus === 'Completed' || taskStatus === 'All',
      showNotCompleted: taskStatus === 'InCompleted' || taskStatus === 'All' || taskStatus === '',

      dateRangeFrom: moment().endOf('day').toISOString(),
    });
  }, [latterTaskStartIndex]);
  useEffect(() => {
    getMyBacklogTasks({
      startIndex: backlogTaskStartIndex,
      fetchSize: 5,
      isFilterChangedOrStartIndexZero: backlogTaskStartIndex === 0,
      showCompleted: taskStatus === 'Completed' || taskStatus === 'All',
      showNotCompleted: taskStatus === 'InCompleted' || taskStatus === 'All' || taskStatus === '',
    });
  }, [backlogTaskStartIndex]);
  useEffect(() => {
    getMyTasksDueToday({
      startIndex: todayTaskStartIndex,
      fetchSize: 5,
      isFilterChangedOrStartIndexZero: todayTaskStartIndex === 0,
      showCompleted: taskStatus === 'Completed' || taskStatus === 'All',
      showNotCompleted: taskStatus === 'InCompleted' || taskStatus === 'All' || taskStatus === '',

      dateRangeFrom: moment().startOf('day').toISOString(),
      dateRangeTo: moment().endOf('day').toISOString(),
    });
  }, [todayTaskStartIndex]);
  useEffect(() => {
    setTaskStatus('InCompleted');
    getMyOverdueTasks({
      startIndex: overdueTaskStartIndex,
      fetchSize: 5,
      isFilterChangedOrStartIndexZero: overdueTaskStartIndex === 0,
      showCompleted: taskStatus === 'Completed' || taskStatus === 'All',
      showNotCompleted: taskStatus === 'InCompleted' || taskStatus === 'All' || taskStatus === '',

      dateRangeTo: moment().startOf('day').toISOString(),
    });
  }, [overdueTaskStartIndex]);
  return (
    <Page
      title={
        <div>
          <div className="flex items-center">
            <Avatar
              style={{
                backgroundColor: '#0060a5',
              }}
              size={64}
              // src={currentUser?.personalDetails?.avatarUrl}
            >
              {getInitials(currentUser?.personalDetails?.displayName)}
            </Avatar>
            <div className="ml-2">
              <div className="text-3xl font-semibold text-gray-800">My Tasks</div>
              <div className="text-base text-gray-600">You have {0 || 'no'} tasks planned.</div>
            </div>
          </div>
        </div>
      }
      primaryAction={
        <Tooltip title="Create Task">
          <Button
            key="3"
            type="primary"
            size="large"
            onClick={() => {
              dispatch({
                type: 'global/setTaskModalVisible',
                payload: {
                  value: true,
                },
              });
            }}
          >
            Add new
          </Button>
        </Tooltip>
      }
    >
      <div>
        {/* Empty state, when no tasks exist */}
        <CheckValidation show={false}>
          <div>
            <p className="text-center text-4xl font-semibold text-black">All caught up!</p>
            <p className="text-center font-semibold">Any new tasks you create will show up here!</p>
          </div>
        </CheckValidation>
        <div className="flex space-x-4">
          {/* My Tasks */}
          <div className="mt-4 pt-4 flex-auto w-1/2">
            <TaskHeader
              dispatch={dispatch}
              // location={location}
              getMyBacklogTasks={getMyBacklogTasks}
              getMyTasksDueToday={getMyTasksDueToday}
              getMyTasksDueLatter={getMyTasksDueLatter}
            />

            <Skeleton
              active
              loading={
                tasksDueTodayLoading &&
                tasksDueLatterLoading &&
                overdueTasksLoading &&
                backlogTasksLoading
              }
            >
              <TasksList
                overdueTasksLoading={overdueTasksLoading}
                tasksDueTodayLoading={tasksDueTodayLoading}
                tasksDueLatterLoading={tasksDueLatterLoading}
                backlogTasksLoading={backlogTasksLoading}
                backlogTaskStartIndex={backlogTaskStartIndex}
                setBacklogStartIndex={setBacklogStartIndex}
                overdueTaskStartIndex={overdueTaskStartIndex}
                setOverdueTaskStartIndex={setOverdueTaskStartIndex}
                latterTaskStartIndex={latterTaskStartIndex}
                setLatterTaskStartIndex={setLatterTaskStartIndex}
                todayTaskStartIndex={todayTaskStartIndex}
                setTodayTaskStartIndex={setTodayTaskStartIndex}
                taskList={tasks}
                // taskCreatedCallBack={onRefresh}
                // totalCount={totalMyTasks}
                markTaskCompleted={markTaskCompleted}
                reopenTask={(id) =>
                  dispatch({ type: 'tasks/reopenTask', payload: { pathParams: { id } } })
                }
              />
            </Skeleton>
          </div>
        </div>
      </div>
      <AddTaskModal />
    </Page>
  );
};

export default connect(({ user, loading, tasks }) => ({
  currentUser: user.currentUser,
  tasks: tasks?.tasks,
  overdueTasksLoading: loading.effects['tasks/getOverdueTasks'],
  tasksDueTodayLoading: loading.effects['tasks/getTasksDueToday'],
  tasksDueLatterLoading: loading.effects['tasks/getTasksDueLatter'],
  backlogTasksLoading: loading.effects['tasks/getBacklogTasks'],
}))(Tasks);
