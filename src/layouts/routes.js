/* eslint-disable no-unused-vars */

import { UploadOutlined } from '@ant-design/icons';

const {
  DashboardIcon,
  RoundUserIcon,
  PeopleFill,
  Kanban,
  Collection,
  LayoutSidebarInset,
  PersonPlusFill,
  PeopleIcon,
  PersonBoundingBox,
  CardChecklist,
  BuildingIcon,
  PersonCheck,
  Book,
  UserGraduate,
  ClientsIcon,
  LeadManager,
} = require('@/utils/AppIcons');

export const routes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    id: '/dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Lead manager',
    // path: '/leads',
    id: '/leads',
    icon: LeadManager,
    routes: [
      {
        name: 'Students',
        // path: '/leads/students-list',
        id: '/leads/students',
        icon: UserGraduate,
        routes: [
          {
            name: 'Leads',
            id: '/leads/students/leads',
            path: '/leads/students/leads',
          },
          {
            name: 'Follow ups',
            id: '/leads/students/follow-ups',
            path: '/leads/students/follow-ups',
          },
          {
            name: 'Assessment tests',
            id: '/leads/students/assessment-tests',
            path: '/leads/students/assessment-tests',
          },
          {
            name: 'Demo',
            id: '/leads/students/demo',
            path: '/leads/students/demo',
          },
          {
            name: 'Schedule tasks',
            id: '/leads/students/schedule-tasks',
            path: '/leads/students/schedule-tasks',
          },
          {
            name: 'Closed',
            id: '/leads/students/closed',
            path: '/leads/students/closed',
          },
        ],
      },
      // {
      //   name: 'Clients',
      //   path: '/leads/clients-list',
      //   id: '/leads/clients-list',
      //   icon: PeopleFill,
      // },
    ],
  },
  {
    name: 'Courses',
    path: '/courses',
    id: '/courses',
    icon: Kanban,
  },
  {
    name: 'Staff',
    path: '/staff',
    id: '/staff',
    icon: PeopleIcon,
  },
  {
    name: 'Students',
    path: '/students',
    id: '/students',
    icon: UserGraduate,
  },
  {
    name: 'Clients',
    path: '/clients',
    id: '/clients',
    icon: ClientsIcon,
  },
  {
    name: 'Tests',
    path: '/tests',
    id: '/tests',
    icon: Collection,
  },
  {
    name: 'Batches',
    path: '/batches',
    id: '/batches',
    icon: LayoutSidebarInset,
  },

  {
    name: 'Classes',
    path: '/classes',
    id: '/classes',
    // icon: PersonBoundingBox,
    icon: Book,
  },
  {
    name: 'Tasks',
    path: '/tasks',
    id: '/tasks',
    // icon: PersonBoundingBox,
    icon: CardChecklist,
  },
  {
    name: 'Course contents',
    id: '/upload',
    icon: UploadOutlined,
    routes: [
      {
        name: 'Upload Course',
        id: 'upload/course-content',
        path: '/upload/course-content',
      },
      {
        name: 'Create Capsule',
        id: '/upload/create-capsule',
        path: '/upload/create-capsule',
      },
      {
        name: 'Teaching Schedule',
        id: '/upload/teaching-schedule',
        path: '/upload/teaching-schedule',
      },
    ],
  },

  // {
  //   name: 'Bulk import',
  //   id: '/upload/UploadPublicHolidays',
  //   icon: UploadOutlined,
  //   routes: [
  //     {
  //       name: 'Upload excel',
  //       id: 'upload/course-content',
  //       path: '/upload/UploadPublicHolidays',
  //     },
  //   ],
  // },
  // {
  //   name: 'Branch Profile',
  //   path: '/branch-profile',
  //   id: '/branch-profile',
  //   icon: BuildingIcon,
  // },
  // {
  //   name: 'Products',
  //   path: '/products',
  //   id: 'products',
  //   icon: Kanban,
  // },
  // {
  //   name: 'Analytics',
  //   path: '/analytics',
  //   id: 'analytics',
  //   icon: Kanban,
  // },
  // {
  //   name: 'Client leads',
  //   path: '/clients/leads',
  //   id: '/clients/leads',
  //   icon: LayoutSidebarInset,
  // },
  // {
  //   name: 'Profile',
  //   path: '/profile',
  //   id: 'profile',
  //   icon: RoundUserIcon,
  // },
  // {
  //   name: 'Collections',
  //   path: '/collections',
  //   id: 'collections',
  //   icon: Collection,
  // },
  // {
  //   name: 'Discounts',
  //   path: '/discounts',
  //   id: 'discounts',
  //   icon: Kanban,
  // },
];
