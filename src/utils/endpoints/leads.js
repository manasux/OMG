const { defaults } = require('./defaults');

export const leads = {
  addClientLead: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads',
    },
  },
  updateClientLead: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/leads/:clientID',
    },
  },
  inviteClient: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/client',
    },
  },
  getStudentLeadData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/search',
    },
  },

  getStaffMembers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/admin/clients/invite',
    },
  },
  getQualificationsList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/party/qualifications',
    },
  },
  getOldStaffMembers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/admin/clients/invite',
    },
  },

  getParticularLeadData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId',
    },
  },
  updateParticularLeadData: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/leads/:leadId',
    },
  },
  getClientLeadData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/search',
    },
  },
  getLeadFollowUp: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/settings/followUp',
    },
  },
  updateFollowUp: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/settings/followUp/:followUpId',
    },
  },
  getClientList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/client',
    },
  },
  studentLeadStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/students/stats',
    },
  },
  flagWhatsApp: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/message',
    },
  },
  flagTextMessage: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/message',
    },
  },
  getAssignList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/client/:orgId/members',
    },
  },
  addAssignAssessmentTest: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/assign/tests',
    },
  },
  updateAssignAssessmentTest: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/tests/:testId/party/:leadId',
    },
  },
  getAssessmentTest: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tests',
    },
  },
  getParticularAssessmentTest: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/tests',
    },
  },
  assignIndividualLead: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/mass/assignee',
    },
  },

  removeLead: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/deactivate',
    },
  },

  getLastStatusList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/followup/statuses',
    },
  },
  addDemoClass: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/assign/demo/class',
    },
  },
  getDemoClass: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/demo/classes',
    },
  },
  addFollowUp: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/followUp',
    },
  },

  getAddFollowUp: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/settings/followUp',
    },
  },

  addLeadPriority: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/leads/:leadId',
    },
  },
  getActivity: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/party/:leadId/activities',
    },
  },
  addLeadNotes: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/notes',
    },
  },
  getLeadNotes: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId/notes',
    },
  },
  setLeadOwner: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/leads/:leadId',
    },
  },
  getParticularClientLeadData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/leads/:leadId',
    },
  },
  assignAccount: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/students/:studentId/demo/register',
    },
  },
};
