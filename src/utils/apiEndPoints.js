const defaults = {
  methods: {
    GET: {
      method: 'GET',
    },
    POST: {
      method: 'POST',
    },
    PUT: {
      method: 'PUT',
    },
    DELETE: {
      method: 'DELETE',
    },
  },
  versions: {
    v1: {
      version: '/xapi/v1',
    },
  },
};

const apiEndPoints = {
  vendor: {
    invite: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/suppliers/invite',
      },
    },
    acceptVendor: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/suppliers/invite/accept',
      },
    },

    awaiting: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/suppliers/invitations/pending',
      },
    },
    getVendors: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/suppliers/search',
      },
    },
  },
  user: {
    fetchCurrent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/me',
      },
    },
    updateCurrent: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/me',
      },
    },
    uploadAvatar: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/party/:partyId/profileImage',
        headerProps: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
    updateProfile: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId',
      },
    },
    forgotPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/reset/password',
      },
    },
    updatePassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/update/password',
      },
    },
    checkExistingUser: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/user/isExistingLoginId',
      },
    },
    resetPassword: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/user/reset/password',
      },
    },
  },
  request: {
    getRequestList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/requests',
      },
    },
  },
  common: {
    getStateCodes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/common/country/:countryId/provinces',
      },
    },
    addAttachment: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/:type/:id/content',
      },
    },
  },

  staff: {
    createStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/admin/clients/invite',
      },
    },
    inviteUser: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/clients/invite/accept',
      },
    },
    addClassToStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId/class/association',
      },
    },
    deleteClassOfStaff: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId/class/association',
      },
    },
    getStaffList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/admin/clients/invite',
      },
    },
    getDepartmentStaffList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/departments/:depId/members',
      },
    },
    addStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/admin/clients/invite',
      },
    },
    getStaffDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/staff/:staffId',
      },
    },
    updateStaffDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/teachers/:staffId',
      },
    },
    disableStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/party/:partyId/:type',
      },
    },
    enableStaff: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/party/:partyId/reactivate',
      },
    },
    getDepartmentList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/departments',
      },
    },
    createDepartment: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/departments',
      },
    },
    getOrgMemberList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/client/:clientId/members',
      },
    },
  },
  students: {
    addStudent: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/leads/:leadId/student/register',
      },
    },
    addStudentNotes: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes',
      },
    },
    markNoteRead: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/party/:studentId/notes/:notesId/read',
      },
    },
    markNoteUnread: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/party/:studentId/notes/:notesId/unread',
      },
    },
    updateStudentNotes: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes/:noteId',
      },
    },
    getNotes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes',
      },
    },

    getTeacherRemarks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/leads/:studentId/notes',
      },
    },
    getParticularNote: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes/:notesId',
      },
    },
    getFollowUpsCounts: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:leadId/task/stats',
      },
    },
    getTeacherRemarksCounts: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes/stats',
      },
    },
    deleteNotes: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes/:notesId',
      },
    },
    deleteFollowUps: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: '/leads/:studentId/settings/followUp/:followUpId',
      },
    },
    deleteMultipleNotes: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes',
      },
    },
    getFollowUps: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/leads/:leadId/settings/followUp',
      },
    },
    getCommunicationalLogs: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/communication/logs',
      },
    },
    multipleActions: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/notes',
      },
    },
    getStudentStages: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/stages',
      },
    },
    getStudentCurrentStatus: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/currentStatus',
      },
    },
    getWalletStatus: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/payments/stats',
      },
    },
    getCourseDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses',
      },
    },
    updateCourseDetails: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses',
      },
    },
    getQualificationDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/qualifications',
      },
    },
    getPrimaryTeacherName: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/teacher',
      },
    },
    getStudentOwnerName: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/owner',
      },
    },
    getEmergencyContact: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/emergencyContact',
      },
    },
    getStudentDetails: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    getAllStudentList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students',
      },
    },
    getAllEnabledStudentList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students',
      },
    },
    getAllDisabledStudentList: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students',
      },
    },
    addLead: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/leads',
      },
    },
    getStudents: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/:type',
      },
    },
    getParentOccupations: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/occupations',
      },
    },
    getParticularStudentProfilePic: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/:leadId/profileImage',
      },
    },

    assignOwner: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/assignee/owner',
      },
    },
    getStudentOwnerActivity: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/:studentId/activities',
      },
    },
    getStudentTestActivity: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/:studentId/activities',
      },
    },
    getStudentTeacherActivity: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/:studentId/activities',
      },
    },
    assignTeacher: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/assignee/teacher',
      },
    },
    withdrawCourse: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses/:courseId/status',
      },
    },

    setApproval: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId/request/approve',
      },
    },
    getStudent: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    getStudentCourseEnrollments: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/enrollments',
      },
    },
    receiveInstallmentPayment: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/orders/:orderId/payments',
      },
    },
    getPaymentStats: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:partyId/payments/stats',
      },
    },
    updateStudentDetails: {
      v1: {
        ...defaults.methods.PUT,
        ...defaults.versions.v1,
        uri: '/students/:studentId',
      },
    },
    getStudentTaskNotes: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/notes',
      },
    },
    getStudentTaskAssignment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks/:taskId/contents',
      },
    },
    getStudentTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tasks',
      },
    },
    getStudentStats: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/stats',
      },
    },
    uploadStudentAttachments: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/content',
      },
    },
    getStudentAttachments: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/content',
      },
    },
    deleteStudentAttachments: {
      v1: {
        ...defaults.methods.DELETE,
        ...defaults.versions.v1,
        uri: 'students/:studentId/content/:contentId',
      },
    },

    getTestAssigned: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/tests/assigned',
      },
    },
    addDemoClass: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/schedules/:batchId/students/:studentId',
      },
    },
    addExtraDays: {
      v1: {
        ...defaults.methods.POST,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses/:courseId/add/days',
      },
    },
    getDemoClass: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/leads/demo/classes',
      },
    },
    getActivity: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/party/:leadId/activities',
      },
    },
    getStudentCourses: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses/fee',
      },
    },
    getStudentWallet: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/wallet',
      },
    },
    getStudentCoursePayment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/students/:studentId/courses/payment',
      },
    },
  },

  teachers: {
    getTeachers: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers',
      },
    },
    searchTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/tasks/search',
      },
    },
    getTeacherTasks: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks',
      },
    },
    getTaskNote: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/notes',
      },
    },
    getTaskAttachment: {
      v1: {
        ...defaults.methods.GET,
        ...defaults.versions.v1,
        uri: '/teachers/:teacherId/tasks/:taskId/contents',
      },
    },
  },
};

export default apiEndPoints;
