import { DribbbleOutlined } from '@ant-design/icons';
import Courses from './Courses';
import { Row, Col } from 'antd';
import React, { useState } from 'react';
import { useParams, Link, connect } from 'umi';
import ActivityLog from './ActivityLog';
import Notes from './Notes';
import TeachingSchedule from './TeachingSchedule';
import CommunicationalLogs from './CommunicationalLogs';
import TestRecordsServices from './TestRecordsServices';
import EmergencyContacts from './EmergencyContacts';
import StudentProfileFollowUps from './StudentProfileFollowUps';
import Wallet from './Wallet';
import TeacherRemarks from './TeacherRemarks';

const LeadActionDetails = ({ StudentStats }) => {
  const { studentId } = useParams();
  const [tab, setTab] = useState('courses');
  const [activeTab, setActiveTab] = useState('courses');
  const [spinIcon, setSpinIcon] = useState({
    courses: true,
    followUp: false,
    activityLog: false,
    communicationalLogs: false,
    notes: false,
    teachingSchedule: false,
    testRecords: false,
    attendance: false,
    teacherRemarks: false,
    wallet: false,
    emergencyContacts: false,
    downloads: false,
  });

  const leadActionList = [
    {
      name: 'courses',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.courses}
          style={spinIcon?.courses === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Courses ( ${
        StudentStats?.stats?.courseCount ? StudentStats?.stats?.courseCount : '0'
      } )`,
      path: `/students/${studentId}/courses`,
    },
    {
      name: 'follow-up',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.followUp}
          style={spinIcon?.followUp === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Follow ups ( ${
        StudentStats?.stats?.followUpCount ? StudentStats?.stats?.followUpCount : '0'
      } )`,
      path: `/students/${studentId}/follow-up`,
    },
    {
      name: 'activity-log',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.activityLog}
          style={spinIcon?.activityLog === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Activity log ( ${
        StudentStats?.stats?.activityCount ? StudentStats?.stats?.activityCount : '0'
      } )`,
      path: `/students/${studentId}/activity-log`,
    },
    {
      name: 'communicational-log',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.communicationalLogs}
          style={
            spinIcon?.communicationalLogs === true ? { color: '#1e3a8a' } : { color: '#6B7280' }
          }
        />
      ),
      title: `Communicational Logs (${
        StudentStats?.stats?.communicationCount ? StudentStats?.stats?.communicationCount : '0'
      })`,
      path: `/students/${studentId}/communicational-log`,
    },

    {
      name: 'notes',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.notes}
          style={spinIcon?.notes === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Notes (${StudentStats?.stats?.notesCount ? StudentStats?.stats?.notesCount : '0'})`,
      path: `/students/${studentId}/notes`,
    },
    {
      name: 'teaching-schedule',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.teachingSchedule}
          style={spinIcon?.teachingSchedule === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Teaching Schedule `,
      path: `/students/${studentId}/teaching-schedule`,
    },
    {
      name: 'test-records-progress',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.testRecords}
          style={spinIcon?.testRecords === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Test Records & Progress `,
      path: `/students/${studentId}/test-records-progress`,
    },
    {
      name: 'attendance-leave',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.attendance}
          style={spinIcon?.attendance === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Attendance & Leave `,
      path: `/students/${studentId}/attendance-leave`,
    },
    {
      name: 'teacher-remarks',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.teacherRemarks}
          style={spinIcon?.teacherRemarks === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Teacher Remarks (${
        StudentStats?.stats?.teacherRemarkCount ? StudentStats?.stats?.teacherRemarkCount : '0'
      })`,
      path: `/students/${studentId}/teacher-remarks`,
    },
    {
      name: 'wallet',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.wallet}
          style={spinIcon?.wallet === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: `Wallet (${
        StudentStats?.stats?.walletCount ? StudentStats?.stats?.walletCount : '0'
      })`,
      path: `/students/${studentId}/wallet`,
    },
    {
      name: 'emergency-contact',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.emergencyContacts}
          style={spinIcon?.emergencyContacts === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: 'Emergency Contacts',
      path: `/students/${studentId}/emergency-contact`,
    },
    {
      name: 'downloads',
      icon: (
        <DribbbleOutlined
          spin={spinIcon?.downloads}
          style={spinIcon?.downloads === true ? { color: '#1e3a8a' } : { color: '#6B7280' }}
        />
      ),
      title: 'Downloads',
      path: `/students/${studentId}/downloads`,
    },
  ];

  const getStep = () => {
    switch (tab) {
      case 'courses':
        return <Courses />;
      case 'follow-up':
        return <StudentProfileFollowUps />;
      case 'activity-log':
        return <ActivityLog />;
      case 'notes':
        return <Notes />;
      case 'teaching-schedule':
        return <TeachingSchedule />;
      case 'communicational-log':
        return <CommunicationalLogs />;
      case 'test-records-progress':
        return <TestRecordsServices />;
      case 'emergency-contact':
        return <EmergencyContacts />;
      case 'wallet':
        return <Wallet />;
      case 'teacher-remarks':
        return <TeacherRemarks />;
      default:
        return <Courses />;
    }
  };
  const iconSpin = (value) => {
    switch (value) {
      case 'courses':
        return setSpinIcon({
          courses: true,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'follow-up':
        return setSpinIcon({
          courses: false,
          followUp: true,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'activity-log':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: true,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'notes':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: true,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'teaching-schedule':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: true,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'communicational-log':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: true,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'test-records-progress':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: true,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'emergency-contact':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: true,
          downloads: false,
        });
      case 'wallet':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: true,
          emergencyContacts: false,
          downloads: false,
        });
      case 'teacher-remarks':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: true,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'attendance-leave':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: true,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
      case 'downloads':
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: true,
        });
      default:
        return setSpinIcon({
          courses: false,
          followUp: false,
          activityLog: false,
          communicationalLogs: false,
          notes: false,
          teachingSchedule: false,
          testRecords: false,
          attendance: false,
          teacherRemarks: false,
          wallet: false,
          emergencyContacts: false,
          downloads: false,
        });
    }
  };
  return (
    <div className="mx-2 mt-4">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={5} lg={5} xl={5}>
          <div className="shadow-lg rounded-lg border bg-gray-50">
            {leadActionList?.map((val) => (
              <>
                <Link to={val?.path}>
                  <div
                    className={`flex border-b items-center rounded-lg px-2 py-1 hover:bg-blue-100 hover:shadow-lg hover:text-gray-500 text-base font-semibold cursor-pointer
                      ${
                        activeTab === val.name
                          ? `bg-blue-200  hover:bg-blue-200 hover:text-gray-900 text-gray-900 shadow-md`
                          : 'text-gray-500'
                      }`}
                    onClick={() => {
                      // setTab(val.path.split('/')[val.path.split('/').length - 1]);
                      setTab(val?.name);
                      setActiveTab(val?.name);
                      iconSpin(val.name);
                    }}
                  >
                    <div className="mr-3 pb-2">{val?.icon}</div>
                    <div>{val?.title}</div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </Col>
        <Col xs={24} sm={24} md={19} lg={19} xl={19}>
          {getStep()}
        </Col>
      </Row>
    </div>
  );
};

export default connect(({ student, leads, students }) => ({
  activityRecord: leads?.activityRecord,
  communicationalLogs: student?.communicationalLogs,
  StudentStats: students?.StudentStats,
}))(LeadActionDetails);
