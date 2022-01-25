// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },

        {
          name: 'signup',
          path: '/user/signup',
          component: './user/signup',
        },
        {
          name: 'ScuccessfullyDone',
          path: '/user/successfullyDone',
          component: '../components/SuccessfullyDone',
        },
        {
          name: 'inviteUser',
          path: '/user/forgotpassword',
          component: './user/ForgotPassword',
        },
        {
          name: 'resetPassword',
          path: '/user/resetpassword',
          component: './user/ResetPassword',
        },
        {
          name: 'inviteUser',
          path: '/user/invitedUserLogin',
          component: './user/acceptInvitation',
        },
        {
          name: 'accountSetup',
          path: '/user/accountsetup',
          component: './user/AccountSetup',
        },
      ],
    },
    {
      path: '/privacy-policy',
      name: 'privacyPolicy',
      component: './Policy',
    },
    {
      path: '/server-unreachable',
      name: 'serverUnderMaintenance',
      hideInMenu: true,
      component: './ServerDown',
    },
    {
      path: '/',
      component: '../layouts/UserLayout',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/CustomLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },

            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              headerName: 'DashBoarsd',
              component: './Dashboard',
            },
            {
              path: '/leads',
              name: 'leads',
              icon: 'dashboard',
              hideInMenu: true,
              routes: [
                {
                  path: '/leads',
                  name: 'leads',
                  routes: [
                    {
                      path: '/leads/students/new',
                      name: 'addStudentLeads',
                      hideInMenu: true,
                      component: './Students/AddLead',
                    },
                    {
                      path: '/leads/students/:leadId/edit',
                      name: 'add Student Leads',
                      hideInMenu: true,
                      component: './Students/AddLead',
                    },

                    {
                      path: '/leads/students',
                      component: './Leads',
                      name: 'leadsStudent',
                      hideInMenu: true,
                      routes: [
                        {
                          path: '/leads/students/leads',
                          redirect: '/leads/students/leads/all',
                        },
                        {
                          path: '/leads/students/leads/:tabname',
                          leadType: 'student',
                          name: 'student-leads',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/Leads',
                          routes: [
                            {
                              path: '/leads/students/leads/all',
                              name: 'all',
                              key: 'all',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/online',
                              key: 'online',
                              name: 'Online',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/office-visits',
                              key: 'office-visits',
                              name: 'office-visits',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/main-branch',
                              key: 'main-branch',
                              name: 'main-branch',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/social-media',
                              key: 'social-media',
                              leadType: 'student',
                              purpose: 'lead',
                              name: 'social-media',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/referred',
                              key: 'refereed',
                              leadType: 'student',
                              purpose: 'lead',
                              name: 'referred',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/printed-media',
                              name: 'printed-media',
                              key: 'printed-media',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/re-inquired',
                              key: 're-inquired',
                              name: 're-inquired',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/closed',
                              key: 'closed',
                              name: 'closed',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/registered',
                              key: 'registered',
                              name: 'registered',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/assessment-test',
                              key: 'assessment-test',
                              name: 'assessment-test',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/leads/demo',
                              key: 'demo',
                              name: 'demo',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/follow-ups',
                              key: 'follow-ups',
                              name: 'follow-ups',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/courses',
                              key: 'courses',
                              name: 'courses',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/visas',
                              key: 'visas',
                              name: 'visas',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/leads/others',
                              key: 'others',
                              name: 'others',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        {
                          path: '/leads/students/follow-ups',
                          redirect: '/leads/students/follow-ups/all',
                        },

                        {
                          path: '/leads/students/follow-ups/:tabname',
                          leadType: 'student',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/FollowUps',
                          routes: [
                            {
                              path: '/leads/students/follow-ups/all',
                              name: 'all',
                              key: 'all',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/follow-ups/today-done-follow-ups',
                              key: 'today-done-follow-ups',
                              name: 'today-done-follow-ups',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/follow-ups/today-follow-ups',
                              key: 'today-follow-ups',
                              name: 'today-follow-ups',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/follow-ups/missed-follow-ups',
                              key: 'missed-follow-ups',
                              name: 'missed-follow-ups',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/follow-ups/planned-follops',
                              key: 'planned-follops',
                              leadType: 'student',
                              purpose: 'lead',
                              name: 'planned-follops',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        {
                          path: '/leads/students/assessment-tests',
                          redirect: '/leads/students/assessment-tests/all',
                        },

                        {
                          path: '/leads/students/assessment-tests/:tabname',
                          leadType: 'student',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/AssessmentTests',
                          routes: [
                            {
                              path: '/leads/students/assessment-tests/all',
                              name: 'all',
                              key: 'all',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/assessment-tests/assigned',
                              key: 'assigned',
                              name: 'assigned',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/assessment-tests/running',
                              key: 'running',
                              name: 'running',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/assessment-tests/done',
                              key: 'done',
                              name: 'done',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/assessment-tests/not-attended',
                              key: 'not-attended',
                              name: 'not-attended',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/assessment-tests/not-completed',
                              key: 'not-completed',
                              name: 'not-completed',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        {
                          path: '/leads/students/demo',
                          redirect: '/leads/students/demo/all',
                        },

                        {
                          path: '/leads/students/demo/:tabname',
                          leadType: 'student',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/Demo',
                          routes: [
                            {
                              path: '/leads/students/demo/all',
                              name: 'all',
                              key: 'all',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/demo/scheduled',
                              key: 'scheduled',
                              name: 'scheduled',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/demo/running',
                              key: 'running',
                              name: 'running',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/demo/completed',
                              key: 'completed',
                              name: 'completed',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/demo/not-attended',
                              key: 'not-attended',
                              name: 'not-attended',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/demo/not-completed',
                              key: 'not-completed',
                              name: 'not-completed',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        {
                          path: '/leads/students/schedule-tasks',
                          redirect: '/leads/students/schedule-tasks/call-back',
                        },

                        {
                          path: '/leads/students/schedule-tasks/:tabname',
                          leadType: 'student',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/ScheduleTasks',
                          routes: [
                            {
                              path: '/leads/students/schedule-tasks/call-back',
                              name: 'call-back',
                              key: 'call-back',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/schedule-tasks/walking',
                              key: 'walking',
                              name: 'walking',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/schedule-tasks/appointment',
                              key: 'appointment',
                              name: 'appointment',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/schedule-tasks/mail',
                              key: 'mail',
                              name: 'mail',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/schedule-tasks/whatsapp',
                              key: 'whatsapp',
                              name: 'whatsapp',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/schedule-tasks/text-msg',
                              key: 'text-msg',
                              name: 'text-msg',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        {
                          path: '/leads/students/closed',
                          redirect: '/leads/students/closed/all',
                        },

                        {
                          path: '/leads/students/closed/:tabname',
                          leadType: 'student',
                          purpose: 'lead',
                          hideInMenu: true,
                          component: '../pages/Leads/Students/Closed',
                          routes: [
                            {
                              path: '/leads/students/closed/all',
                              name: 'all',
                              key: 'all',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },

                            {
                              path: '/leads/students/closed/feedback-not-given',
                              key: 'feedback-not-given',
                              name: 'feedback-not-given',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/closed/positive-feedback',
                              key: 'positive-feedback',
                              name: 'positive-feedback',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                            {
                              path: '/leads/students/closed/negative-feedback',
                              key: 'negative-feedback',
                              name: 'negative-feedback',
                              leadType: 'student',
                              purpose: 'lead',
                              hideInMenu: true,
                              component: '../components/LeadsTable',
                            },
                          ],
                        },

                        // {
                        //   path: '/leads/students/leads',
                        //   component: '../components/LeadsData',
                        //   routes: [

                        //   ],
                        // },
                      ],
                    },

                    // {
                    //   path: '/leads/clients-list',
                    //   name: 'clientLeads',
                    //   component: './Leads/ClientLeads',
                    //   hideInMenu: true,
                    //   routes: [
                    //     {
                    //       path: '/leads/clients-list',
                    //       redirect: '/leads/clients-list/newleads',
                    //     },
                    //     {
                    //       path: '/leads/clients-list/:tabname',
                    //       component: '../components/LeadsData',
                    //       routes: [
                    //         {
                    //           path: '/leads/clients-list/newleads',
                    //           name: 'New leads',
                    //           key: 'newleads',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/callback',
                    //           name: 'Call back leads',
                    //           key: 'callback',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/walkin',
                    //           name: 'Walk in',
                    //           key: 'walkin',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/appointments',
                    //           name: 'Appointments',
                    //           key: 'appointments',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/closed',
                    //           name: 'Closed',
                    //           key: 'closed',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/assesment',
                    //           key: 'assesment',
                    //           leadType: 'client',
                    //           purpose: 'lead',

                    //           name: 'Assesment test',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/registered',
                    //           name: 'Registered',
                    //           key: 'registered',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/account',
                    //           name: 'Accounts',
                    //           key: 'account',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //         {
                    //           path: '/leads/clients-list/accountexpired',
                    //           name: 'Expired demo accounts',
                    //           key: 'accountexpired',
                    //           leadType: 'client',
                    //           purpose: 'lead',
                    //           hideInMenu: true,
                    //           component: '../components/LeadsData/ListTable',
                    //         },
                    //       ],
                    //     },
                    //   ],
                    // },

                    {
                      path: '/leads/clients/addlead',
                      name: 'Add client lead',
                      component: './Leads/ClientLeads/AddClientLead',
                      hideInMenu: true,
                    },
                    {
                      path: '/leads/clients/:clientId/:type',
                      name: 'Add client lead',
                      component: './Leads/ClientLeads/AddClientLead',
                      hideInMenu: true,
                    },

                    {
                      path: '/leads/clients/new',
                      name: 'invite Client',
                      component: './Leads/InviteClientForm',
                      hideInMenu: true,
                    },
                  ],
                },

                // {
                //   path: '/leads/clients/new',
                //   name: 'newClientLeads',
                //   hideInMenu: true,
                //   component: './Clients/AddLead',
                // },
              ],
            },

            // {
            //   path: '/courses',
            //   name: 'course',
            //   icon: 'user-add',
            //   routes: [
            //     {
            //       path: '/courses/new',
            //       name: 'new-course',
            //       component: './Courses/CourseDetails',
            //       hideInMenu: true,
            //     },
            //   ],
            // },

            {
              path: '/staff',
              name: 'staff',
              icon: 'user',

              routes: [
                {
                  path: '/staff',
                  redirect: '/staff/list/all',
                },
                {
                  path: '/staff/list',
                  redirect: '/staff/list/all',
                },
                {
                  name: 'staff-list',
                  path: '/staff/list/:tab',
                  component: './Staff/StaffList',
                },
                {
                  name: 'staff-invite',
                  path: '/staff/invite',
                  component: './Staff/InviteStaff',
                  authority: ['admin', 'manager'],
                },
                {
                  name: 'staffDetails',
                  path: '/staff/:staffId/profile',
                  component: './Staff/StaffDetails',
                  hideInMenu: true,
                },
                {
                  name: 'staffUpdate',
                  path: '/teachers/:staffId',
                  component: './Staff/component/UpdateStaffDetails',
                  hideInMenu: true,
                },
              ],
            },

            {
              path: '/students',
              name: 'students',
              icon: 'user',
              routes: [
                {
                  path: '/students',
                  redirect: '/students/active',
                },

                {
                  name: 'all',
                  path: '/students/all',
                  component: './Students/StudentsList',
                },
                {
                  name: 'active',
                  path: '/students/active',
                  component: './Students/StudentsList',
                },

                {
                  path: '/students/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Students/StudentsList',
                },
                {
                  path: '/students/enrolled',
                  name: 'enrolled',
                  hideInMenu: true,
                  component: './Students/StudentsList',
                },
                {
                  path: '/students/course-completed',
                  name: 'course-completed',
                  hideInMenu: true,
                  component: './Students/StudentsList',
                },
                {
                  path: '/students/course-completing-in-week',
                  name: 'course-completing-in-week',
                  hideInMenu: true,
                  component: './Students/StudentsList',
                },
                {
                  name: 'add-student',
                  path: '/students/new',
                  routes: [
                    {
                      name: 'add-student',
                      path: '/students/new',
                      component: './Students/AddStudent',
                    },
                    {
                      name: 'add-student',
                      path: '/students/new/:partyId',
                      component: './Students/AddStudent',
                    },
                  ],
                },

                {
                  path: '/students/:studentId',
                  name: 'studentDetails',
                  routes: [
                    {
                      path: '/students/:studentId',
                      redirect: '/students/:studentId/courses',
                    },
                    {
                      path: '/students/:studentId',
                      type: 'students',
                      name: 'details',
                      hideInMenu: true,
                      component: './Students/StudentProfile',
                      routes: [
                        {
                          name: 'studentProfile',
                          path: '/students/:studentId/:tab',
                          type: 'students',
                          hideInMenu: true,
                          component: './Students/StudentProfile/LeadActionDetails',
                        },
                      ],
                    },
                  ],
                },

                // {
                //   path: '/students/:studentId',
                //   name: 'studentDetails',
                //   routes: [
                //     {
                //       path: '/students/:studentId',
                //       type: 'students',
                //       redirect: '/students/:studentId/details',
                //       hideInMenu: true,
                //     },
                //     {
                //       name: 'studentWrapper',
                //       type: 'students',
                //       path: '/students/:studentId/:tab',
                //       hideInMenu: true,
                //       component: './Students/StudentDetails',
                //       routes: [
                //         {
                //           path: '/students/:studentId/documents',
                //           type: 'students',
                //           name: 'documents',
                //           hideInMenu: true,
                //           component: './Students/StudentDetails/StudentActivity/Documents',
                //         },
                //         {
                //           path: '/students/:studentId/details',
                //           type: 'students',
                //           name: 'course-details',
                //           hideInMenu: true,
                //           component: './Students/StudentDetails/StudentActivity/CourseDetails',
                //         },
                //         {
                //           path: '/students/:studentId/payments',
                //           type: 'students',
                //           name: 'payments',
                //           hideInMenu: true,
                //           component: './Students/StudentDetails/StudentActivity/Payments',
                //         },
                //       ],
                //     },
                //   ],
                // },
              ],
            },
            // {
            //   path: '/client',
            //   name: 'client',
            //   icon: 'user',
            //   routes: [
            //     {
            //       path: '/client',
            //       redirect: '/client/active',
            //     },
            //     {
            //       name: 'active',
            //       path: '/client/active',
            //       hideInMenu: true,
            //       component: './Clients/ClientsList',
            //     },
            //     {
            //       name: 'all',
            //       path: '/client/all',
            //       hideInMenu: true,
            //       component: './Clients/ClientsList',
            //     },
            //     {
            //       path: '/client/inactive',
            //       name: 'inactive',
            //       hideInMenu: true,
            //       component: './Clients/ClientsList',
            //     },
            //     {
            //       path: '/client/awaiting',
            //       name: 'awaiting',
            //       hideInMenu: true,
            //       component: './Clients/ClientsList',
            //     },
            //   ],
            // },
            {
              path: '/profile',
              name: 'profile',
              component: './UserProfile',
              hideInMenu: true,
            },
            {
              path: '/upload/UploadPublicHolidays',
              name: 'UploadPublicHolidays',
              hideInMenu: true,
              component: './Upload/UploadPublicHolidays',
            },
            // {
            //   path: '/branch-profile',
            //   name: 'profile',
            //   component: './BranchProfile',
            //   hideInMenu: true,
            // },
            {
              path: '/vendors',
              name: 'vendors',
              hideInMenu: true,
              routes: [
                {
                  path: '/vendors',
                  redirect: '/vendors/active',
                },
                {
                  path: '/vendors/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Vendors',
                },
                {
                  path: '/vendors/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Vendors',
                },
                {
                  path: '/vendors/awaiting',
                  name: 'awaiting',
                  hideInMenu: true,
                  component: './Vendors',
                },
                {
                  path: '/vendors/invite',
                  name: 'invite',
                  hideInMenu: true,
                  component: './Vendors/InviteVendor',
                },
              ],
            },
            {
              path: '/products',
              name: 'products',
              hideInMenu: true,
              routes: [
                {
                  path: '/products',
                  redirect: '/products/all',
                },
                {
                  path: '/products/all',
                  name: 'all',
                  hideInMenu: true,
                  component: './Products',
                },
                {
                  path: '/products/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Products',
                },
                {
                  path: '/products/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Products',
                },
                {
                  path: '/products/draft',
                  name: 'draft',
                  hideInMenu: true,
                  component: './Products',
                },
                {
                  path: '/products/new',
                  name: 'new',
                  hideInMenu: true,
                  component: './Products/NewProduct',
                },
                {
                  path: '/products/:id',
                  name: 'view',
                  hideInMenu: true,
                  component: './Products/ViewProduct',
                },
              ],
            },

            {
              path: '/clients',
              name: 'clients',
              hideInMenu: true,
              routes: [
                {
                  path: '/clients',
                  redirect: '/clients/active',
                },
                {
                  path: '/clients/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Clients/ClientsList',
                },
                {
                  path: '/clients/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Clients/ClientsList',
                },
                {
                  path: '/clients/awaiting',
                  name: 'awaiting',
                  hideInMenu: true,
                  component: './Clients/ClientsList',
                },
                {
                  path: '/clients/all',
                  name: 'all',
                  hideInMenu: true,
                  component: './Clients/ClientsList',
                },
                {
                  path: '/clients/invite',
                  name: 'invite',
                  hideInMenu: true,
                  component: './Leads/InviteClientForm',
                },
                // {
                //   path: '/clients/leads',
                //   name: 'clientLeads',
                //   hideInMenu: true,
                //   component: './Clients/ClientLead',
                // },
                // {
                //   path: '/clients/leads/new',
                //   name: 'newClientLeads',
                //   hideInMenu: true,
                //   component: './Clients/AddLead',
                // },
              ],
            },

            {
              path: '/courses',
              name: 'courses',
              hideInMenu: true,
              routes: [
                {
                  path: '/courses',
                  redirect: '/courses/all',
                },
                {
                  path: '/courses/all',
                  name: 'allCourses',
                  hideInMenu: true,
                  component: './Courses',
                },

                {
                  path: '/courses/new',
                  name: 'addCourse',
                  hideInMenu: true,
                  component: './Courses/AddCourse',
                },
                {
                  path: '/courses/view/:particularViewCourseId',
                  name: 'viewCourse',
                  hideInMenu: true,
                  component: './Courses/AddCourse',
                },
                {
                  path: '/courses/:courseId',
                  name: 'SingleCourseView',
                  hideInMenu: true,
                  component: './Courses/AddCourse',
                },
              ],
            },
            {
              path: '/tests',
              name: 'tests',
              hideInMenu: true,
              routes: [
                {
                  path: '/tests',
                  name: 'tests',
                  hideInMenu: true,
                  component: './Test',
                },
                {
                  path: '/tests/new',
                  name: 'Add test',
                  hideInMenu: true,
                  component: './Test/AddTest',
                },
                {
                  path: '/tests/:testId/details',
                  name: 'Add test',
                  hideInMenu: true,
                  component: './Test/ViewTest',
                },
                {
                  path: '/tests/:testId/edit',
                  name: 'Add test',
                  hideInMenu: true,
                  component: './Test/AddTest',
                },
                {
                  path: '/tests/edit',
                  name: 'Add test',
                  hideInMenu: true,
                  component: './Test/AddTest',
                },
                {
                  path: '/tests/:testId/perform',
                  name: 'Perform test',
                  hideInMenu: true,
                  component: './Test/PerformTest',
                },
              ],
            },
            {
              path: '/batches',
              name: 'batches',
              hideInMenu: true,
              routes: [
                {
                  path: '/batches',
                  redirect: '/batches/all',
                },
                {
                  path: '/batches/all',
                  name: 'all',
                  hideInMenu: true,
                  component: './Batch/BatchList',
                },
                {
                  path: '/batches/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Batch/BatchList',
                },
                {
                  path: '/batches/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Batch/BatchList',
                },
                {
                  path: '/batches/online',
                  name: 'online',
                  hideInMenu: true,
                  component: './Batch/BatchList',
                },
                {
                  path: '/batches/offline',
                  name: 'offline',
                  hideInMenu: true,
                  component: './Batch/BatchList',
                },
                {
                  path: '/batches/new',
                  name: 'new',
                  hideInMenu: true,
                  component: './Batch/AddBatch',
                },
                {
                  path: '/batches/:batchId',
                  name: 'view-batch',
                  hideInMenu: true,
                  component: './Batch/ViewBatch',
                },
                {
                  path: '/batches/update/:updateBatchId',
                  name: 'new',
                  hideInMenu: true,
                  component: './Batch/AddBatch',
                },
              ],
            },

            {
              path: '/classes',
              name: 'classes',
              hideInMenu: true,
              routes: [
                {
                  path: '/classes',
                  redirect: '/classes/all',
                },
                {
                  path: '/classes/all',
                  name: 'classes',
                  hideInMenu: true,
                  component: './ClassPage',
                },
                {
                  path: '/classes/new',
                  name: 'new',
                  hideInMenu: true,
                  component: './ClassPage/AddClass',
                },
                {
                  path: '/classes/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './ClassPage',
                },
                {
                  path: '/classes/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './ClassPage',
                },
                {
                  path: '/classes/:classId',
                  name: 'new',
                  hideInMenu: true,
                  component: './ClassPage/AddClass',
                },
                {
                  path: '/classes/view/:classViewId',
                  name: 'new',
                  hideInMenu: true,
                  component: './ClassPage/AddClass',
                },
              ],
            },
            {
              name: 'analytics',
              path: '/analytics',
              hideInMenu: true,
              component: './Analytics',
            },
            {
              path: '/services',
              name: 'services',
              hideInMenu: true,
              routes: [
                {
                  path: '/services',
                  redirect: '/services/all',
                },
                {
                  path: '/services/all',
                  name: 'all',
                  hideInMenu: true,
                  component: './Services',
                },
                {
                  path: '/services/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Services',
                },
                {
                  path: '/services/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Services',
                },
                {
                  path: '/services/draft',
                  name: 'draft',
                  hideInMenu: true,
                  component: './Services',
                },
                {
                  path: '/services/new',
                  name: 'new',
                  hideInMenu: true,
                  component: './Services/NewService',
                },
                {
                  path: '/services/:id',
                  name: 'view',
                  hideInMenu: true,
                  component: './Services/ViewService',
                },
              ],
            },
            {
              path: '/collections',
              name: 'collections',
              routes: [
                {
                  name: 'collections',
                  path: '/collections',
                  component: './Collections/AllCollections',
                },
                {
                  name: 'create',
                  path: '/collections/new',
                  component: './Collections/CreateCollection',
                },
                {
                  name: 'view',
                  path: '/collections/:id',
                  component: './Collections/ViewCollection',
                },
              ],
            },
            {
              path: '/discounts',
              name: 'discounts',
              routes: [
                {
                  name: 'discounts',
                  path: '/discounts',
                  component: './Discounts/AllDiscounts',
                },
                {
                  name: 'create-discounts',
                  path: '/discounts/new',
                  component: './Discounts/CreateDiscount',
                },
                {
                  name: 'automatic-discounts',
                  path: '/discounts/automatic/new',
                  component: './Discounts/CreateAutomaticDiscount',
                },
              ],
            },
            {
              path: '/loans',
              name: 'loans',
              hideInMenu: true,
              routes: [
                {
                  path: '/loans',
                  redirect: '/loans/active',
                },
                {
                  path: '/loans/active',
                  name: 'active',
                  hideInMenu: true,
                  component: './Loans',
                },
                {
                  path: '/loans/inactive',
                  name: 'inactive',
                  hideInMenu: true,
                  component: './Loans',
                },
              ],
            },

            // {
            //   name: 'UploadPublicHolidays',
            //   path: '/Upload/UploadPublicHolidays',
            //   // type: 'UploadPublicHolidays',
            //   hideInMenu: true,
            //   component: './Upload/UploadPublicHolidays',
            //   routes: [
            //     {
            //       path: '/Upload/UploadPublicHolidays',
            //       name: 'UploadPublicHolidays',
            //       hideInMenu: true,
            //       component: './Upload/UploadPublicHolidays',
            //     },
            //   // ],
            // },
            {
              name: 'tasks',
              path: '/tasks',
              type: 'Tasks',
              routes: [
                {
                  name: 'tasks',
                  path: '/tasks',
                  type: 'Tasks',
                  component: './Tasks',
                },
              ],
            },
            {
              name: 'upload',
              icon: 'car',
              hideInMenu: true,
              routes: [
                {
                  path: '/upload/course-content',
                  name: 'Course Content',
                  hideInMenu: true,
                  component: './Upload',
                },
                {
                  path: '/upload/create-capsule',
                  name: 'Create Capsule',
                  hideInMenu: true,
                  component: './Upload/CreateCapsule',
                },
                {
                  path: '/upload/create-capsule/new',
                  name: 'uploadcourse',
                  hideInMenu: true,
                  component: './Upload/CreateCapsule/CreateNewCapsule',
                },
                {
                  path: '/upload/create-capsule/edit/:IdCourse/capsule/:IdCapsule',
                  name: 'uploadcourse',
                  hideInMenu: true,
                  component: './Upload/CreateCapsule/CreateNewCapsule',
                },
                {
                  path: '/upload/course-content/new',
                  name: 'uploadcourse',
                  hideInMenu: true,
                  component: './Upload/UploadCourse',
                },
                {
                  path: '/upload/course-content/edit/:courseId/module/:moduleId',
                  name: 'edituploadcourse',
                  hideInMenu: true,
                  component: './Upload/UploadCourse',
                },
                {
                  path: '/upload/teaching-schedule',
                  name: 'Teaching Schedule',
                  hideInMenu: true,
                  component: './Upload/TeachingSchedule',
                },
                {
                  path: '/upload/teaching-schedule/new',
                  name: 'Teaching Schedule',
                  hideInMenu: true,
                  component: './Upload/TeachingSchedule/UploadTeachingSchedule',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
