const { defaults } = require('./defaults');

export const courses = {
  getCourses: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses',
    },
  },
  getCourseContent: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/contents',
    },
  },

  getCoursesCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/categories',
    },
  },
  getCoursesSubCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/categories',
    },
  },

  getCoursesFromSubCategory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses',
    },
  },

  addCourse: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/courses/',
    },
  },
  editCourse: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/courses/:courseId',
    },
  },
  getSingleCourseDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/:courseId',
    },
  },
  addTest: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/tests',
    },
  },
  updateTest: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/tests/:courseId',
    },
  },
  getTests: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tests',
    },
  },
  getTestById: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/tests/:testId',
    },
  },
  getCourseDetailSingle: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/contents',
    },
  },
  getCoursesDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/contents',
    },
  },
  getCoursesDetailForModule: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/contents',
    },
  },
  uploadCourseContent: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/module/:moduleId/topics',
    },
  },
  uploadCoursedetails: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/module/:moduleId/assoc',
    },
  },
  deleteuploadCoursedetail: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/module/:moduleId',
    },
  },
  deleteUploadFile: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/content/:contentId',
    },
  },
  updateCourseContentFile: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/modules/:moduleId/topics/:topicId',
    },
  },
  updateCourseDLevelDetails: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/modules/:moduleId/assoc',
    },
  },
  deleteUploadCourseContents: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/module/:moduleId/topic/:topicId',
    },
  },
  getCoursesForTeachingSchedule: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses',
    },
  },
  getTeachingCapsuleForClassTest: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/capsule',
    },
  },
  getTeachingCapsuleForMockTest: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/capsule',
    },
  },
  uploadTeachingSchedule: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/teaching/schedules',
    },
  },
  getTeachingSchedules: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/teaching/schedules',
    },
  },
  getUpdateCourseContents: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/modules/:moduleId/topics',
    },
  },
  postCapsule: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule',
    },
  },
  updateCapsule: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId',
    },
  },
  getCapsule: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/capsule',
    },
  },
  deleteCapsule: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId',
    },
  },
  createCapsuleTableRow: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId',
    },
  },
  capsuleTableRowUpdate: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId',
    },
  },
  deleteCapsuleFormTableRow: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId/group/:groupId',
    },
  },
  getTopicCount: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/topics/count',
    },
  },
  getCapsuleDetail: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/courses/:courseId/capsule/:capsuleId',
    },
  },
};
