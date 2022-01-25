import { addLead } from '@/services/addLead';
import {
  addStudent,
  getAllStudentList,
  enableDisableStudent,
  getStudent,
  uploadStudentAttachments,
  getStudentAttachments,
  deleteStudentAttachments,
  getParticularStudentProfilePic,
  getPaymentStats,
  receiveInstallmentPayment,
  getStudentInstallments,
  getStudentCourseEnrollments,
  getStudentDetails,
  getQualificationDetails,
  getEmergencyContact,
  getParentOccupations,
  getNotes,
  getFollowUps,
  getCourseDetails,
  updateCourseDetails,
  getStudentCurrentStatus,
  getWalletStatus,
  addStudentNotes,
  getStudentStages,
  getPrimaryTeacherName,
  getStudentOwnerName,
  deleteNotes,
  getParticularNote,
  updateStudentNotes,
  markNoteRead,
  markNoteUnread,
  getCommunicationalLogs,
  multipleActions,
  deleteMultipleNotes,
  getFollowUpsCounts,
  getTeacherRemarks,
  getTeacherRemarksCounts,
  getTestAssigned,
  assignOwner,
  getStudentOwnerActivity,
  assignTeacher,
  getStudentTeacherActivity,
  getStudentTestActivity,
  updateStudentDetails,
  addDemoClass,
  getAllEnabledStudentList,
  getAllDisabledStudentList,
  withdrawCourse,
  getStudentCourses,
  deleteFollowUps,
  getStudentWallet,
  addExtraDays,
  getStudentCoursePayment,
} from '@/services/student';

const Model = {
  namespace: 'student',
  state: {
    studentsList: null,
    studentRecord: null,
    studentAttachments: null,
    studentsParentOccupationList: null,
    studentDetails: null,
    emergencyContactDetails: null,
    qualificationDetails: null,
    studentStatus: null,
    walletStatus: null,
    courseDetails: null,
    followUpDetails: null,
    studentData: null,
    studentStages: null,
    primaryTeacherName: null,
    studentOwnerName: null,
    deleteNotes: null,
    withdrawCourse: null,
    particularNoteDetails: null,
    updateStudentNotes: null,
    updateCourseDetails: null,
    markNoteRead: null,
    markNoteUnread: null,
    communicationalLogs: null,
    multipleActions: null,
    deleteMultipleNotes: null,
    followUpsCounts: null,
    getTeacherRemarks: null,
    getTeacherRemarksCounts: null,
    getTestAssigned: null,
    getStudentOwnerActivity: null,
    getStudentTeacherActivity: null,
    getAllEnabledStudentList: null,
    getAllDisabledStudentList: null,
    getStudentCourses: null,
    deleteFollowUps: null,
    getStudentWallet: null,
    getStudentTestActivity: null,
    coursePaymentActivity: null,
    studentCourseActivity: null,
    getStudentCoursePayment: null,
    courseFee: {
      // visible: false,
      // type: null,
      // title: null,
      // subTitle: null,
      // leadId: null,
      // rec: null,
      // purposeFor: null,
      isModulesSelected: false,
    },
  },
  effects: {
    *addLead({ payload }, { call }) {
      const response = yield call(addLead, payload);
      return response;
    },
    *getStudentDetails({ payload }, { call, put }) {
      const res = yield call(getStudentDetails, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentDetails',
      });
      return res;
    },
    *updateStudentDetails({ payload }, { call, put }) {
      try {
        const res = yield call(updateStudentDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'studentDetails',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getCourseDetails({ payload }, { call, put }) {
      try {
        const res = yield call(getCourseDetails, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'courseDetails',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *updateCourseDetails({ payload }, { call, put }) {
      const res = yield call(updateCourseDetails, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: ' updateCourseDetails',
      });
      return res;
    },
    *getQualificationDetails({ payload }, { call, put }) {
      const res = yield call(getQualificationDetails, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'qualificationDetails',
      });
      return res;
    },
    *getStudentCurrentStatus({ payload }, { call, put }) {
      const res = yield call(getStudentCurrentStatus, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentStatus',
      });
      return res;
    },
    *getWalletStatus({ payload }, { call, put }) {
      const res = yield call(getWalletStatus, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'walletStatus',
      });
      return res;
    },
    *addStudentNotes({ payload }, { call, put }) {
      const res = yield call(addStudentNotes, payload);
      yield put({
        type: 'setStates',
        key: 'studentData',
        payload: res,
      });
      return res;
    },
    *markNoteRead({ payload }, { call, put }) {
      const res = yield call(markNoteRead, payload);
      yield put({
        type: 'setStates',
        key: 'markNoteRead',
        payload: res,
      });
      return res;
    },
    *markNoteUnread({ payload }, { call, put }) {
      const res = yield call(markNoteUnread, payload);
      yield put({
        type: 'setStates',
        key: 'markNoteUnread',
        payload: res,
      });
      return res;
    },
    *updateStudentNotes({ payload }, { call, put }) {
      const res = yield call(updateStudentNotes, payload);
      yield put({
        type: 'setStates',
        key: 'updateStudentNotes',
        payload: res,
      });
      return res;
    },
    *getNotes({ payload }, { call, put }) {
      const res = yield call(getNotes, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'noteDetails',
      });
      return res;
    },
    *getTeacherRemarks({ payload }, { call, put }) {
      const res = yield call(getTeacherRemarks, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getTeacherRemarks',
      });
      return res;
    },
    *getFollowUpsCounts({ payload }, { call, put }) {
      const res = yield call(getFollowUpsCounts, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'followUpsCounts',
      });
      return res;
    },
    *getTeacherRemarksCounts({ payload }, { call, put }) {
      const res = yield call(getTeacherRemarksCounts, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getTeacherRemarksCounts',
      });
      return res;
    },
    *getParticularNote({ payload }, { call, put }) {
      const res = yield call(getParticularNote, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'particularNoteDetails',
      });
      return res;
    },
    *deleteNotes({ payload }, { call, put }) {
      const res = yield call(deleteNotes, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'deleteNotes',
      });
      return res;
    },
    *deleteFollowUps({ payload }, { call, put }) {
      const res = yield call(deleteFollowUps, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'deleteFollowUps',
      });
      return res;
    },
    *deleteMultipleNotes({ payload }, { call, put }) {
      const res = yield call(deleteMultipleNotes, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'deleteMultipleNotes',
      });
      return res;
    },
    *getCommunicationalLogs({ payload }, { call, put }) {
      const res = yield call(getCommunicationalLogs, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'communicationalLogs',
      });
      return res;
    },
    *multipleActions({ payload }, { call, put }) {
      const res = yield call(multipleActions, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'multipleActions',
      });
      return res;
    },
    *getFollowUps({ payload }, { call, put }) {
      const res = yield call(getFollowUps, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'followUpDetails',
      });
      return res;
    },
    *getStudentStages({ payload }, { call, put }) {
      const res = yield call(getStudentStages, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentStages',
      });
      return res;
    },
    *getPrimaryTeacherName({ payload }, { call, put }) {
      const res = yield call(getPrimaryTeacherName, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'primaryTeacherName',
      });
      return res;
    },
    *getStudentOwnerName({ payload }, { call, put }) {
      const res = yield call(getStudentOwnerName, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentOwnerName',
      });
      return res;
    },
    *getEmergencyContact({ payload }, { call, put }) {
      const res = yield call(getEmergencyContact, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'emergencyContactDetails',
      });
      return res;
    },
    *addStudent({ payload }, { call, put }) {
      const response = yield call(addStudent, payload);
      yield put({
        type: 'setStates',
        key: 'addStudent',
        payload: response,
      });
      return response;
    },
    *getAllStudentList({ payload }, { call, put }) {
      const res = yield call(getAllStudentList, payload);
      yield put({
        type: 'setStates',
        key: 'studentsList',
        payload: res,
      });
      return res;
    },
    *getAllEnabledStudentList({ payload }, { call, put }) {
      const res = yield call(getAllEnabledStudentList, payload);
      yield put({
        type: 'setStates',
        key: 'getAllEnabledStudentList',
        payload: res,
      });
      return res;
    },
    *getAllDisabledStudentList({ payload }, { call, put }) {
      const res = yield call(getAllDisabledStudentList, payload);
      yield put({
        type: 'setStates',
        key: 'getAllDisabledStudentList',
        payload: res,
      });
      return res;
    },
    *getParentOccupations({ payload }, { call, put }) {
      const res = yield call(getParentOccupations, payload);
      yield put({
        type: 'setStates',
        key: 'studentsParentOccupationList',
        payload: res,
      });
      return res;
    },
    *getStudent({ payload }, { call, put }) {
      const res = yield call(getStudent, payload);
      yield put({
        type: 'setStates',
        key: 'studentRecord',
        payload: res,
      });
    },
    *getStudentCourseEnrollments({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getStudentCourseEnrollments, payload || {});
        yield put({
          type: 'setStates',
          key: 'studentCoursesEnrollments',
          payload: apiResponse,
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
    *getStudentInstallments({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getStudentInstallments, payload || {});
        yield put({
          type: 'setStates',
          key: 'studentInstallments',
          payload: apiResponse,
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
    *getPaymentStats({ payload }, { call, put }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(getPaymentStats, payload);
        yield put({
          type: 'setStates',
          key: 'paymentStats',
          payload: apiResponse,
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
    *receiveInstallmentPayment({ payload }, { call }) {
      let apiResponse;
      let err;
      try {
        apiResponse = yield call(receiveInstallmentPayment, payload);
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
    *getParticularStudentProfilePic({ payload }, { call, put }) {
      const res = yield call(getParticularStudentProfilePic, payload);
      yield put({
        type: 'setStates',
        key: 'studentProfilePic',
        payload: res,
      });
      return res;
    },

    *enableDisableStudent({ payload }, { call }) {
      const res = yield call(enableDisableStudent, payload);

      return res;
    },

    *uploadStudentAttachments({ payload }, { call }) {
      const response = yield call(uploadStudentAttachments, payload);
      return response;
    },

    *getStudentAttachments({ payload }, { call, put }) {
      const response = yield call(getStudentAttachments, payload);
      yield put({
        type: 'setStates',
        payload: response?.contents,
        key: 'studentAttachments',
      });
      return response;
    },

    *deleteStudentAttachments({ payload }, { call }) {
      const response = yield call(deleteStudentAttachments, payload);
      return response;
    },
    *getTestAssigned({ payload }, { call, put }) {
      const response = yield call(getTestAssigned, payload);
      yield put({
        type: 'setStates',
        payload: response,
        key: 'getTestAssigned',
      });
      return response;
    },
    *assignOwner({ payload }, { call }) {
      const res = yield call(assignOwner, payload);
      return res;
    },
    *assignTeacher({ payload }, { call }) {
      const res = yield call(assignTeacher, payload);
      return res;
    },

    *getStudentOwnerActivity({ payload }, { call, put }) {
      const res = yield call(getStudentOwnerActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getStudentOwnerActivity',
      });
      return res;
    },
    *getStudentTestActivity({ payload }, { call, put }) {
      const res = yield call(getStudentTestActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getStudentTestActivity',
      });
      return res;
    },
    *getStudentCourseActivity({ payload }, { call, put }) {
      const res = yield call(getStudentTeacherActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentCourseActivity',
      });
      return res;
    },
    *getCourseTeacherActivity({ payload }, { call, put }) {
      const res = yield call(getStudentTeacherActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getStudentTeacherActivity',
      });
      return res;
    },
    *getCoursePaymentActivity({ payload }, { call, put }) {
      const res = yield call(getStudentTeacherActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'coursePaymentActivity',
      });
      return res;
    },

    *addDemoClass({ payload }, { call, put }) {
      try {
        const res = yield call(addDemoClass, payload);
        yield put({
          type: 'setStates',
          key: 'studentData',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addExtraDays({ payload }, { call }) {
      try {
        const res = yield call(addExtraDays, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *withdrawCourse({ payload }, { call, put }) {
      try {
        const res = yield call(withdrawCourse, payload);
        yield put({
          type: 'setStates',
          key: 'withdrawCourse',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getStudentCourses({ payload }, { call, put }) {
      const res = yield call(getStudentCourses, payload);
      yield put({
        type: 'setStates',
        key: 'getStudentCourses',
        payload: res,
      });
    },
    *getStudentWallet({ payload }, { call, put }) {
      const res = yield call(getStudentWallet, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getStudentWallet',
      });
      return res;
    },
    *getStudentCoursePayment({ payload }, { call, put }) {
      const res = yield call(getStudentCoursePayment, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getStudentCoursePayment',
      });
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
