import {
  getCountryStates,
  addClientLeads,
  inviteClients,
  getStudentLeadData,
  getClientList,
  getParticularStudentLeadData,
  updateParticularStudentLeadData,
  getClientLeadData,
  addFollowUp,
  getParticularClientLeadData,
  updateClientLead,
  getStaffMembers,
  getAssignList,
  getAddFollowUp,
  addAssignAssessmentTest,
  getAssessmentTest,
  addLeadPriority,
  addLeadNotes,
  getActivity,
  getLeadNotes,
  setLeadOwner,
  addDemoClass,
  getDemoClass,
  assignAccount,
  getLastStatusList,
  assignIndividualLead,
  removeLead,
  flagWhatsApp,
  flagTextMessage,
  getLeadFollowUp,
  getOldStaffMembers,
  getQualificationsList,
  updateFollowUp,
  studentLeadStats,
  getParticularAssessmentTest,
  updateAssignAssessmentTest,
} from '@/services/leads';

const Model = {
  namespace: 'leads',
  state: {
    getAddFollowUp: null,
    selectedLead: null,
    leadData: null,
    staffMembersData: null,
    getOldStaffMembers: null,
    studentLeadRecord: null,
    clientLeadRecord: null,
    updateStudentLeadRecord: null,
    flagWhatsApp: null,
    flagTextMessage: null,
    getLeadFollowUp: null,
    getQualificationsList: null,
    updateFollowUp: null,
    studentLeadStats: null,
    getParticularAssessmentTest: null,
    updateAssignAssessmentTest: null,
    editLead: {
      visible: false,
      type: null,
      title: null,
      subTitle: null,
      leadId: null,
      noteId: null,
      followUpId: null,
      rec: null,
      purposeFor: null,
      keyword: null,
    },
    assessmentTest: null,
    activityRecord: null,
  },
  effects: {
    *getStateCodes({ payload }, { call, put }) {
      const res = yield call(getCountryStates, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'stateCodes',
      });
    },

    *addClientLead({ payload }, { call }) {
      const res = yield call(addClientLeads, payload);
      return res;
    },

    *updateClientLead({ payload }, { call }) {
      const res = yield call(updateClientLead, payload);
      return res;
    },

    *inviteClient({ payload }, { call }) {
      const res = yield call(inviteClients, payload);
      return res;
    },

    *getStudentLeadData({ payload }, { call, put }) {
      const res = yield call(getStudentLeadData, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'leadData',
      });
      return res;
    },
    *getStaffMembers({ payload }, { call, put }) {
      const res = yield call(getStaffMembers, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'staffMembersData',
      });
      return res;
    },
    *getOldStaffMembers({ payload }, { call, put }) {
      const res = yield call(getOldStaffMembers, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getOldStaffMembers',
      });
      return res;
    },
    *removeLead({ payload }, { call, select, put }) {
      const res = yield call(removeLead, payload);
      const copyLeadData = yield select(({ leads }) => leads.leadData);
      const records = copyLeadData?.records?.filter(
        (lead) => lead?.id !== payload?.pathParams?.leadId,
      );
      yield put({
        type: 'setStates',
        key: 'leadData',
        payload: { ...copyLeadData, records },
      });
      return res;
    },
    *getParticularStudentLeadData({ payload }, { call, put }) {
      const res = yield call(getParticularStudentLeadData, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'studentLeadRecord',
      });
      return res;
    },
    *updateParticularStudentLeadData({ payload }, { call, put }) {
      const res = yield call(updateParticularStudentLeadData, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'updateStudentLeadRecord',
      });
      return res;
    },

    *getClientList({ payload }, { call, put }) {
      try {
        const res = yield call(getClientList, payload);
        yield put({
          type: 'setStates',
          key: 'clientList',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *flagWhatsApp({ payload }, { call, put }) {
      const res = yield call(flagWhatsApp, payload);
      yield put({
        type: 'setStates',
        key: 'flagWhatsApp',
        payload: res,
      });
      return res;
    },
    *flagTextMessage({ payload }, { call, put }) {
      const res = yield call(flagTextMessage, payload);
      yield put({
        type: 'setStates',
        key: 'flagTextMessage',
        payload: res,
      });
      return res;
    },
    *addDemoClass({ payload }, { call, select, put }) {
      try {
        const res = yield call(addDemoClass, payload);

        if (res?.status === 'ok') {
          // in order to reflect the change in the last activity and status in the table on assigning demo class
          // copy the lead data and add/update the demo class

          const copyLeadData = yield select(({ leads }) => leads.leadData);
          const mutatedRecordsOfDemoClass = copyLeadData.records?.map((lead) => {
            return lead.id === payload?.pathParams?.leadId
              ? {
                  ...lead,
                  lastActivity: { ...res, verb: res?.lastActivity?.verb },
                  leadStatusType: res?.lastStatusType || '--',
                  demoClass: {
                    course: { id: res?.demoClass?.course?.id },
                    batch: { id: res?.demoClass?.batch?.id },
                    fromDate: res?.demoClass?.fromDate,
                    thruDate: res?.demoClass?.thruDate,
                    mode: res?.demoClass?.mode,
                    partyGroupId: res?.demoClass?.partyGroupId,
                  },
                  lastModifiedDate: res?.leadLastModifiedDate,
                  lastModifiedBy: { ...res?.leadLastModifiedBy },
                }
              : lead;
          });

          yield put({
            type: 'setStates',
            key: 'leadData',
            payload: { ...copyLeadData, records: mutatedRecordsOfDemoClass },
          });
        }

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getLastStatusList({ payload }, { call, put }) {
      const res = yield call(getLastStatusList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'lastStatusList',
      });
      return res;
    },
    *getDemoClass({ payload }, { call }) {
      const res = yield call(getDemoClass, payload);
      return res;
    },
    *updateAssignAssessmentTest({ payload }, { call, select, put }) {
      try {
        const res = yield call(updateAssignAssessmentTest, payload);

        // in order to reflect the change in the last activity in the table on assigning assessment test
        // copy the lead data and add/update the assessment test
        if (res?.status === 'ok') {
          const copyLeadData = yield select(({ leads }) => leads.leadData);
          const mutatedRecordsOfAssessmentTest = copyLeadData.records?.map((lead) => {
            return lead?.id === payload?.pathParams?.leadId
              ? {
                  ...lead,
                  lastActivity: { ...res, verb: res?.lastActivity?.verb },
                  leadStatusType: res?.lastStatusType || '--',
                  testDetail: [...res?.leadData?.testDetail],
                  lastModifiedDate: res?.leadLastModifiedDate,
                  lastModifiedBy: { ...res?.leadLastModifiedBy },
                }
              : lead;
          });

          yield put({
            type: 'setStates',
            key: 'leadData',
            payload: { ...copyLeadData, records: mutatedRecordsOfAssessmentTest },
          });
        }

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addAssignAssessmentTest({ payload }, { call, select, put }) {
      try {
        const res = yield call(addAssignAssessmentTest, payload);
        // in order to reflect the change in the last activity in the table on assigning assessment test
        // copy the lead data and add/update the assessment test
        if (res?.status === 'ok') {
          const copyLeadData = yield select(({ leads }) => leads?.leadData);
          const mutatedRecordsOfAssessmentTest = copyLeadData?.records?.map((lead) => {
            return lead?.id === payload?.pathParams?.leadId
              ? {
                  ...lead,
                  lastActivity: { ...res, verb: res?.lastActivity?.verb },
                  leadStatusType: res?.lastStatusType || '--',
                  testDetail: [...res?.testDetail],
                  lastModifiedDate: res?.leadLastModifiedDate,
                  lastModifiedBy: { ...res?.leadLastModifiedBy },
                }
              : lead;
          });

          yield put({
            type: 'setStates',
            key: 'leadData',
            payload: { ...copyLeadData, records: mutatedRecordsOfAssessmentTest },
          });
        }

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAssessmentTest({ payload }, { call, put }) {
      try {
        const res = yield call(getAssessmentTest, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'assessmentTest',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getParticularAssessmentTest({ payload }, { call, put }) {
      try {
        const res = yield call(getParticularAssessmentTest, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'getParticularAssessmentTest',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getAssignList({ payload }, { call, put }) {
      try {
        const res = yield call(getAssignList, payload);
        yield put({
          type: 'setStates',
          key: 'assignList',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getClientLeadData({ payload }, { call, put }) {
      try {
        const res = yield call(getClientLeadData, payload);
        yield put({
          type: 'setStates',
          key: 'leadData',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getLeadFollowUp({ payload }, { call, put }) {
      const res = yield call(getLeadFollowUp, payload);
      yield put({
        type: 'setStates',
        key: 'getLeadFollowUp',
        payload: res,
      });
      return res;
    },
    *updateFollowUp({ payload }, { call, put }) {
      try {
        const res = yield call(updateFollowUp, payload);
        yield put({
          type: 'setStates',
          key: 'updateFollowUp',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addFollowUp({ payload }, { call, select, put }) {
      try {
        const res = yield call(addFollowUp, payload);
        // in order to reflect the change in the last lead priority in the table on updating priority
        // copy the lead data and add/update the lead priority
        if (res?.status === 'ok') {
          const copyLeadData = yield select(({ leads }) => leads.leadData);

          const mutatedRecordsOfLeadFollowUp = copyLeadData?.records?.map((lead) => {
            return lead.id === payload?.pathParams?.leadId
              ? {
                  ...lead,
                  lastActivity: { ...res, verb: res?.lastActivity?.verb },
                  nextActionBy: res?.nextActionBy,
                  lastFollowUpStatus: res?.lastFollowUpStatus,
                  nextFollowUpStatus: res?.nextFollowUpStatus,
                  leadStatusType: res?.leadStatusType,
                  nextActionMode: res?.nextActionMode,
                  lastFollowUpBy: {
                    ...res,
                    roleTypeId: res?.lastFollowUpBy?.roleTypeId,
                    followUpOn: res?.lastFollowUpBy?.followUpOn,
                    notes: res?.lastFollowUpBy?.notes,
                    branch: { id: res?.lastFollowUpBy?.branch?.id },
                    department: { id: res?.lastFollowUpBy?.department?.id },
                    lastAssignee: res?.lastFollowUpBy?.lastAssignee,
                    isInterested: res?.lastFollowUpBy?.isInterested,
                    comments: res?.lastFollowUpBy?.comments,
                    feedBackType: res?.lastFollowUpBy?.feedBackType,
                  },
                  currentActionId: res?.currentActionModeId,
                  lastModifiedDate: res?.leadLastModifiedDate,
                  lastModifiedBy: { ...res?.leadLastModifiedBy },
                }
              : lead;
          });

          yield put({
            type: 'setStates',
            key: 'leadData',
            payload: { ...copyLeadData, records: mutatedRecordsOfLeadFollowUp },
          });
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *studentLeadStats({ payload }, { call, put }) {
      try {
        const res = yield call(studentLeadStats, payload);

        yield put({
          type: 'setStates',
          key: 'studentLeadStats',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getAddFollowUp({ payload }, { call, put }) {
      try {
        const res = yield call(getAddFollowUp, payload);

        yield put({
          type: 'setStates',
          key: 'getAddFollowUp',
          payload: res,
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *getParticularClientLeadData({ payload }, { call, put }) {
      try {
        const res = yield call(getParticularClientLeadData, payload);
        yield put({
          type: 'setStates',
          payload: res,
          key: 'clientLeadRecord',
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *addLeadPriority({ payload }, { call, put, select }) {
      try {
        const res = yield call(addLeadPriority, payload);

        // in order to reflect the change in the last lead priority in the table on updating priority
        // copy the lead data and add/update the lead priority

        const copyLeadData = yield select(({ leads }) => leads.leadData);
        const mutatedRecordsOfLeadPriority = copyLeadData.records?.map((lead) => {
          return lead.id === payload?.pathParams?.leadId
            ? {
                ...lead,
                lastActivity: { ...res, verb: res?.lastActivity?.verb },
                priority: res?.priority,
                priorityType: res?.priorityType,
                priorityRemark: res?.priorityRemark ? res?.priorityRemark : undefined,
                lastModifiedDate: res?.leadLastModifiedDate,
                lastModifiedBy: { ...res?.leadLastModifiedBy },
              }
            : lead;
        });

        yield put({
          type: 'setStates',
          key: 'leadData',
          payload: { ...copyLeadData, records: mutatedRecordsOfLeadPriority },
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *assignIndividualLead({ payload }, { call, select, put }) {
      try {
        const res = yield call(assignIndividualLead, payload);

        // in order to reflect the change in the last activity in the table on assigning individual lead
        // copy the lead data and assign the lead
        const copyLeadData = yield select(({ leads }) => leads.leadData);
        const mutatedRecordsOfAssignedIndividualLead = copyLeadData.records?.map((lead) => {
          return lead.id
            ? {
                ...lead,
                lastActivity: {
                  ...res.lastActivity,
                  verb: res?.lastActivity?.verb,
                },
                referBy: {
                  ...res?.assignee,
                  department: { id: res?.assignee?.department?.departmentId },
                },
                lastAssignee: {
                  ...res?.lastAssignee,
                },
                assignee: {
                  ...res?.assignee,
                },
                lastModifiedDate: res?.leadLastModifiedDate,
                lastModifiedBy: { ...res?.leadLastModifiedBy },
              }
            : lead;
        });

        yield put({
          type: 'setStates',
          key: 'leadData',
          payload: { ...copyLeadData, records: mutatedRecordsOfAssignedIndividualLead },
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getActivity({ payload }, { call, put }) {
      const res = yield call(getActivity, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'activityRecord',
      });
      return res;
    },
    *getQualificationsList({ payload }, { call, put }) {
      const res = yield call(getQualificationsList, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'getQualificationsList',
      });
      return res;
    },

    *addLeadNotes({ payload }, { call, put, select }) {
      try {
        const res = yield call(addLeadNotes, payload);

        // in order to reflect the change in the last note in the table on adding new note
        // copy the lead data and add the new note

        const copyLeadData = yield select(({ leads }) => leads.leadData);
        const mutatedRecordsOfLeadDate = copyLeadData.records?.map((lead) => {
          return lead.id === payload?.pathParams?.leadId
            ? {
                ...lead,
                lastNote: { ...res, name: res?.lastActivity?.newValue },
                lastActivity: { ...res, verb: res?.lastActivity?.verb },
                lastModifiedDate: res?.leadLastModifiedDate,
                lastModifiedBy: { ...res?.leadLastModifiedBy },
              }
            : lead;
        });

        yield put({
          type: 'setStates',
          key: 'leadData',
          payload: { ...copyLeadData, records: mutatedRecordsOfLeadDate },
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    *getLeadNotes({ payload }, { call, put }) {
      const res = yield call(getLeadNotes, payload);
      yield put({
        type: 'setStates',
        payload: res,
        key: 'activityRecord',
      });
      return res;
    },

    *setLeadOwner({ payload }, { call, put, select }) {
      try {
        const res = yield call(setLeadOwner, payload);

        // in order to reflect the change in the last lead owner in the table on adding new note
        // copy the lead data and add the new owner

        const copyLeadData = yield select(({ leads }) => leads.leadData);
        const mutatedRecordsOfLeadOwner = copyLeadData.records?.map((lead) => {
          return lead.id === payload?.pathParams?.leadId
            ? {
                ...lead,
                owner: {
                  ...res,
                  displayName: res?.owner?.displayName || '--',
                  id: res?.owner?.partyId,
                },
                lastActivity: { ...(lead?.lastActivity || {}), verb: res?.lastActivity?.verb },
                lastModifiedDate: res?.leadLastModifiedDate,
                lastModifiedBy: { ...res?.leadLastModifiedBy },
              }
            : lead;
        });

        yield put({
          type: 'setStates',
          key: 'leadData',
          payload: { ...copyLeadData, records: mutatedRecordsOfLeadOwner },
        });
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    *assignAccount({ payload }, { call, put, select }) {
      try {
        const res = yield call(assignAccount, payload);
        if (res?.status === 'ok') {
          // in order to reflect the change in the last activity in the table on assigning demo account
          // copy the lead data and assign the demo account

          const copyLeadData = yield select(({ leads }) => leads.leadData);
          const mutatedRecordsOfAssignedDemoAccount = copyLeadData.records?.map((lead) => {
            return lead.id === payload?.pathParams?.studentId
              ? {
                  ...lead,
                  lastActivity: { ...res, verb: res?.lastActivity?.verb },
                  leadStatusType: res?.lastStatusType || '--',
                  demoAccount: {
                    endDate: res?.demoAccount?.endDate,
                    startDate: res?.demoAccount?.startDate,
                  },
                  lastModifiedDate: res?.leadLastModifiedDate,
                  lastModifiedBy: { ...res?.leadLastModifiedBy },
                }
              : lead;
          });
          yield put({
            type: 'setStates',
            key: 'leadData',
            payload: { ...copyLeadData, records: mutatedRecordsOfAssignedDemoAccount },
          });
        }

        return res;
      } catch (error) {
        return Promise.reject(error);
      }
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
