import {
  createStaff,
  getStaffList,
  inviteUser,
  disableStaff,
  getStaffDetails,
  updateStaffDetails,
  staffClassAssociation,
  deleteStaffClassAssociation,
  addStaff,
  getDepartmentList,
  createDepartment,
  getOrgMemberList,
  enableStaff,
  getDepartmentStaffList,
} from '@/services/staff';

const Model = {
  namespace: 'staff',
  state: {
    0: null,
    classInfo: null,
    staffDetails: null,
    staffList: null,
    getDepartmentStaffList: null,
  },
  effects: {
    *createStaff({ payload, cb }, { call }) {
      const res = yield call(createStaff, payload);
      if (cb) cb(res);
      return res;
    },
    *inviteUser({ payload, cb }, { call }) {
      const res = yield call(inviteUser, payload);
      if (cb) cb(res);
      return res;
    },
    *getStaffList({ payload }, { call, put }) {
      const res = yield call(getStaffList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'staffList',
      });
      return res;
    },
    *getDepartmentStaffList({ payload }, { call, put }) {
      const res = yield call(getDepartmentStaffList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getDepartmentStaffList',
      });
      return res;
    },
    *addStaff({ payload }, { call, put }) {
      const res = yield call(addStaff, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'addStaff',
      });
      return res;
    },
    *getDepartmentList({ payload }, { call, put }) {
      try {
        const res = yield call(getDepartmentList, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'departmentList',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *createDepartment({ payload }, { call }) {
      try {
        const res = yield call(createDepartment, payload);

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getOrgMemberList({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getOrgMemberList, payload);
        yield put({
          type: 'setStates',
          payload: apiResponse,
          key: 'orgMemberList',
        });
      } catch (error) {
        // extract the error response from the server
        err = error;
      }
      if (err) {
        // some api level error occurred. This can be handled in dispatch
        return Promise.reject(err);
      }
      return apiResponse;
    },
    *disableStaff({ payload }, { call, select, put }) {
      try {
        const res = yield call(disableStaff, payload);

        const list = yield select((state) => state.staff.staffList);
        const prevRecord = list?.records;
        const newRecord = prevRecord?.filter(
          (record) => record?.partyId !== payload?.pathParams?.partyId,
        );
        yield put({
          type: 'setStates',
          payload: { ...list, records: newRecord },
          key: 'staffList',
        });

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *enableStaff({ payload }, { call, select, put }) {
      const res = yield call(enableStaff, payload);

      const list = yield select((state) => state.staff.staffList);

      const prevRecord = list?.records;
      const newRecord = prevRecord?.filter(
        (record) => record?.partyId !== payload?.pathParams?.partyId,
      );
      yield put({
        type: 'setStates',
        payload: { ...list, records: newRecord },
        key: 'staffList',
      });

      return res;
    },
    *getStaffDetails({ payload }, { call, put }) {
      const response = yield call(getStaffDetails, payload);
      yield put({
        type: 'setStates',
        payload: response,
        key: 'staffDetails',
      });
    },

    *updateStaffDetails({ payload }, { call, put }) {
      const response = yield call(updateStaffDetails, payload);
      yield put({
        type: 'setStates',
        payload: response,
        key: 'staffDetails',
      });
      return response;
    },
    *staffClassAssociation({ payload }, { call }) {
      const res = yield call(staffClassAssociation, payload);
      return res;
    },
    *deleteStaffClassAssociation({ payload }, { call }) {
      const res = yield call(deleteStaffClassAssociation, payload);
      return res;
    },
  },

  reducers: {
    setStates(state, { payload, key }) {
      return {
        ...state,
        [key]: payload,
      };
    },
  },
};
export default Model;
