import React, { useState, useEffect } from 'react';
import {
  Select,
  DatePicker,
  Input,
  Divider,
  Tabs,
  Tooltip,
  Avatar,
  Button,
  Form,
  message,
  Dropdown,
  Menu,
  Spin,
} from 'antd';
import moment from 'moment';
import { debounce } from 'lodash';
import { connect, useParams, history } from 'umi';
import { FileTextOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import AppIcons from '@/utils/AppIcons';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import ModalToAddTeacherNotes from './ModalToAddTeacherNotes';
import EmptyState from '@/components/EmptyState';
import CheckValidation from '@/components/CheckValidation';
import emptyStateSvg from '@/assets/icons/space-empty.svg';

const TeacherRemarks = ({
  dispatch,
  editLead,
  getTeacherRemarks,
  loadingTeacherRemarks,
  getTeacherRemarksCounts,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [selectedDate, setSelectedDate] = useState('');
  const [range, setRange] = useState([moment().subtract(7, 'day'), moment()]);
  const [tab, setTab] = useState('All');
  const { Option } = Select;
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  const { TabPane } = Tabs;
  const { studentId } = useParams();
  const [form] = Form.useForm();

  const action = (value) => {
    setKeyword(value);
  };

  const debounceSearch = debounce(action, 400);
  const activityTimeList = [
    {
      label: 'Today',
      id: 'TODAY',
      value: moment().format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: 'Yesterday',
      id: 'YESTERDAY',
      startDate: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
      value: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: 'Last 7 days',
      id: 'LAST_7_DAYS',
      value: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: 'Last 15 days',
      id: 'LAST_15_DAYS',
      value: moment().subtract(15, 'days').format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment().subtract(15, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: 'Last 30 days',
      id: 'LAST_30_DAYS',
      value: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },

    {
      label: 'Last month',
      id: 'LAST_MONTH',
      value: moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
      startDate: moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: 'Custom',
      id: 'CUSTOM',
      value: 'custom',
    },
  ];

  const getRemarkRecords = () => {
    const data = {};
    if (tab === 'SEEN') {
      data.status = 'read';
      history.push('?status=read');
    } else if (tab === 'POSTED') {
      data.status = 'posted';
      history.push('?status=posted');
    } else {
      data.status = 'all';
      history.push('?status=all');
    }
    switch (selectedDate) {
      case 'TODAY':
        data.interval = 'TODAY';

        history.push('?interval=TODAY');
        break;
      case 'YESTERDAY':
        data.interval = 'YESTERDAY';
        history.push('?interval=YESTERDAY');
        break;
      case 'WEEK':
        data.interval = 'WEEK';
        history.push('?interval=Last-7-days');
        break;
      case 'FORTNIGHT':
        data.interval = 'FORTNIGHT';
        history.push('?interval=Last-15-days');
        break;
      case 'MONTH':
        data.interval = 'MONTH';
        history.push('?interval=Last-30-days');
        break;
      case 'LAST_MONTH':
        data.interval = 'LAST_MONTH';
        history.push('?interval=LAST-MONTH');
        break;
      case 'CUSTOM':
        history.push('?interval=CUSTOM');
        break;
      default:
        history.push('?interval=TODAY');
        break;
    }

    if (keyword) {
      data.keyword = keyword;
    } else {
      delete data.keyword;
    }

    dispatch({
      type: 'student/getTeacherRemarks',
      payload: {
        pathParams: { studentId },
        query: {
          ...data,
          startDay:
            selectedDate === 'Custom'
              ? range[0].format('YYYY-MM-DD HH:mm:ss')
              : activityTimeList?.filter((p) => p?.label === selectedDate)[0]?.startDate,
          endDay:
            selectedDate === 'Custom'
              ? range[1].format('YYYY-MM-DD HH:mm:ss')
              : activityTimeList?.filter((p) => p?.label === selectedDate)[0]?.endDate,
          noteType: 'TEACHER',
          viewSize: 1000,
        },
      },
    });
    dispatch({
      type: 'student/getTeacherRemarksCounts',
      payload: {
        pathParams: { studentId },
        query: {
          ...data,
          startDay:
            selectedDate === 'Custom'
              ? range[0].format('YYYY-MM-DD HH:mm:ss')
              : activityTimeList?.filter((p) => p?.label === selectedDate)[0]?.startDate,
          endDay:
            selectedDate === 'Custom'
              ? range[1].format('YYYY-MM-DD HH:mm:ss')
              : activityTimeList?.filter((p) => p?.label === selectedDate)[0]?.endDate,
          noteType: 'TEACHER_NOTE',
          viewSize: 1000,
        },
      },
    });
  };

  const getStudentStats = () => {
    dispatch({
      type: 'students/getStudentStats',
      payload: {
        pathParams: { studentId },
      },
    });
  };

  useEffect(() => {
    getRemarkRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, range, tab, keyword]);

  const tabsPane = [
    {
      tab: (
        <span className="font-semibold">{`All (${
          getTeacherRemarksCounts?.notesStats?.allNotes
            ? getTeacherRemarksCounts?.notesStats?.allNotes
            : '0'
        })`}</span>
      ),
      key: 'All',
    },
    {
      tab: (
        <span className="font-semibold">{`Posted (${
          getTeacherRemarksCounts?.notesStats?.allNotes
            ? getTeacherRemarksCounts?.notesStats?.allNotes
            : '0'
        })`}</span>
      ),
      key: 'POSTED',
    },
    {
      tab: (
        <span className="font-semibold">{`Seen (${
          getTeacherRemarksCounts?.notesStats?.seen
            ? getTeacherRemarksCounts?.notesStats?.seen
            : '0'
        })`}</span>
      ),
      key: 'SEEN',
    },
  ];

  const AddTeacherNote = (id) => {
    dispatch({
      type: 'leads/setStates',
      payload: {
        visible: true,
        type: 'ADD_NOTE',
        title: 'Add note',
        subTitle: 'Add note',
        leadId: studentId,
        noteId: id,
        rec: null,
        purposeFor: 'studentsProfile',
      },
      key: 'editLead',
    });
  };

  const onCommentFinish = (values) => {
    if (editLead?.noteId) {
      const body = {
        ...values,
        noteType: 'TEACHER_NOTE',
      };
      dispatch({
        type: 'student/updateStudentNotes',
        payload: { body, pathParams: { studentId, noteId: editLead?.noteId } },
      }).then((res) => {
        if (res?.status === 'ok') {
          message.success('You have updated the note successfully');
          getRemarkRecords();
          form.resetFields();
          dispatch({
            type: 'leads/setStates',
            payload: {
              visible: false,
              type: null,
              title: null,
              subTitle: null,
              leadId: null,
              noteId: null,
              rec: null,
              purposeFor: null,
            },
            key: 'editLead',
          });
        } else {
          message.error('Something went wrong !!');
        }
      });
    } else {
      const body = {
        ...values,
        module: { id: values?.module ? values?.module : values?.course },
        noteType: 'TEACHER_NOTE',
      };
      delete body?.tabs;
      delete body?.course;

      dispatch({
        type: 'student/addStudentNotes',
        payload: { body, pathParams: { studentId } },
      }).then((res) => {
        if (res?.status === 'ok') {
          message.success('You have added the note successfully');
          getRemarkRecords();
          getStudentStats();
          form.resetFields();
          dispatch({
            type: 'leads/setStates',
            payload: {
              visible: false,
              type: null,
              title: null,
              subTitle: null,
              leadId: null,
              noteId: null,
              rec: null,
              purposeFor: null,
            },
            key: 'editLead',
          });
        } else {
          message.error('Something went wrong !!');
        }
      });
    }
  };

  const getParticularRemark = (id) => {
    const payload = {
      pathParams: { studentId, notesId: id },
    };
    dispatch({
      type: 'student/getParticularNote',
      payload,
    }).then((res) => {
      if (res?.status === 'ok') {
        AddTeacherNote(id);
        form.setFieldsValue({ ...res });
      } else {
        message.error('Something went wrong');
      }
    });
  };

  const DeleteRemark = (id) => {
    const payload = {
      pathParams: { studentId, notesId: id },
    };
    dispatch({
      type: 'student/deleteNotes',
      payload,
    }).then((res) => {
      if (res?.status === 'ok') {
        message.success('Note deleted successfully');
        getRemarkRecords();
      } else {
        message.error('Something went wrong');
      }
    });
  };

  const markRemarksRead = (id) => {
    const payload = {
      pathParams: { studentId, notesId: id },
    };
    dispatch({
      type: 'student/markNoteRead',
      payload,
    }).then((res) => {
      if (res?.status === 'ok') {
        message.success('Note marked as read');
        getRemarkRecords();
      } else {
        message.error('Something went wrong');
      }
    });
  };

  const markRemarksUnread = (id) => {
    const payload = {
      pathParams: { studentId, notesId: id },
    };
    dispatch({
      type: 'student/markNoteUnread',
      payload,
    }).then((res) => {
      if (res?.status === 'ok') {
        message.success('Note marked as unread');
        getRemarkRecords();
      } else {
        message.error('Something went wrong');
      }
    });
  };
  return (
    <Form form={form} onFinish={onCommentFinish} hideRequiredMark>
      <div>
        <div className="flex justify-between">
          <div className="text-blue-600 font-semibold text-lg">Teacher remarks</div>
          <div className="flex justify-between">
            <Button
              shape="circle"
              style={{
                backgroundColor: 'rgb(27, 86, 143)',
              }}
              onClick={() => AddTeacherNote()}
            >
              <div className="text-center text-white line leading-3">
                <PlusOutlined />
              </div>
            </Button>

            <div className="rounded-2xl mx-2">
              <Search
                style={{ width: '12rem' }}
                size="middle"
                placeholder="Enter keyword to search"
                onChange={(value) => debounceSearch(value?.target?.value)}
                enterButton
              />
            </div>

            <div className="flex justify-between">
              <div className="mr-2">
                <Select
                  style={{ width: '12rem', color: '#3B82F6' }}
                  listHeight={400}
                  onChange={(value) => {
                    setSelectedDate(value);
                    setRange([moment().subtract(7, 'day'), moment()]);
                  }}
                  placeholder="select..."
                >
                  {activityTimeList?.map((item) => (
                    <Option
                      key={item?.id}
                      value={item?.id}
                      className="bg-gray-100 rounded-lg mx-2 mt-2"
                      style={{ color: '#3B82F6' }}
                    >
                      {item?.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                {selectedDate === 'Custom' && (
                  <RangePicker
                    value={range}
                    format="DD MMM, YYYY"
                    onChange={(val) => {
                      setRange(val);
                    }}
                    placeholder={['Search by', 'date']}
                    style={{ width: '12rem' }}
                    disabledDate={(date) => date > moment().add(1, 'day')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ marginTop: '0.6rem' }} />

        <Form.Item name="tabs">
          <Tabs
            defaultActiveKey={tabsPane?.[0]?.key}
            onChange={(val) => setTab(val)}
            className="font-semibold text-blue-500"
          >
            <Divider style={{ marginTop: '0.6rem' }} />
            {tabsPane?.map((item) => (
              <TabPane
                tab={item?.tab}
                key={item?.key}
                style={{ height: '45rem', overflow: 'auto', padding: '11px' }}
              >
                <Spin spinning={Boolean(studentId) && loadingTeacherRemarks}>
                  <CheckValidation
                    show={getTeacherRemarks?.records?.length > 0}
                    fallback={
                      <EmptyState
                        emptyState={emptyStateSvg}
                        emptyHeaderText={<span>No Teacher remarks found yet!</span>}
                      />
                    }
                  />
                  {getTeacherRemarks?.records?.map((val) => (
                    <div key={val?.id}>
                      <div
                        className={`${
                          val?.statusId === 'unread' && 'bg-blue-50'
                        } flex  h-full shadow-md  my-4 mr-2`}
                        key={val?.id}
                      >
                        <div className="bg-green-500 w-2 rounded-l-lg " />
                        <div className="border rounded-r-lg w-full">
                          <div className="flex items-center mx-2 my-2 justify-between ">
                            {tab === 'All' && (
                              <div className={`flex`}>
                                <div className="flex justify-center items-center leading-3 h-9 w-9 bg-gray-300 rounded-full">
                                  <FileTextOutlined style={{ color: '#3B82F6' }} />
                                </div>

                                <div className="flex text-lg  font-semibold text-gray-700 px-3 items-center ">
                                  {val?.title}
                                </div>

                                <div className="flex  text-lg border-l  font-semibold text-gray-700 px-4 items-center ">
                                  Files :{' '}
                                  <span className="text-gray-500 text-lg ml-1">test file</span>
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end">
                              <div className="mt-1.5 mr-2">
                                {val?.statusId === 'unread' ? (
                                  <AppIcons.EnvelopeAction />
                                ) : (
                                  <AppIcons.EnvelopeOpen />
                                )}
                              </div>
                              <span>
                                {' '}
                                <Dropdown
                                  getPopupContainer={(node) => node.parentNode}
                                  placement="bottomLeft"
                                  arrow
                                  overlay={
                                    <Menu className="not-italic">
                                      <Menu.Item onClick={() => getParticularRemark(val?.id)}>
                                        Edit
                                      </Menu.Item>
                                      <Menu.Item onClick={() => DeleteRemark(val?.id)}>
                                        Delete
                                      </Menu.Item>
                                      <Menu.Item onClick={() => markRemarksRead(val?.id)}>
                                        Mark as read
                                      </Menu.Item>
                                      <Menu.Item onClick={() => markRemarksUnread(val?.id)}>
                                        Mark as Unread
                                      </Menu.Item>
                                    </Menu>
                                  }
                                >
                                  <MoreOutlined
                                    onClick={() => setDropdownVisible(true)}
                                    className="text-lg cursor-pointer hover:text-yellow-600 "
                                  />
                                </Dropdown>
                              </span>
                            </div>
                          </div>
                          <div className="flex -mt-3 text-md">
                            <div className="border-r text-green-500 font-semibold ml-14 pr-4">
                              {dayjs(val?.createdAt).format('MM-DD-YYYY ')}{' '}
                              <span className="border-l pl-2 ml-2">
                                {' '}
                                {dayjs(val?.createdAt).format('h:mm A')}{' '}
                              </span>
                            </div>
                            <div className="text-gray-700 font-semibold pl-2">
                              Modules :
                              <span className="text-gray-500">
                                {val?.module ? ` ${val?.module?.name}` : 'Not assigned'}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between mx-2 mt-8 mb-2">
                            <div className="text-yellow-500 text-md text-bold">
                              Remarks :{' '}
                              <span className="text-gray-500 text-semibold">{val?.noteInfo}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="border-r pr-2">
                                <Tooltip title="Language teacher | Teaching | BO-Kapurthala">
                                  <span>
                                    <Avatar
                                      size="small"
                                      style={{ backgroundColor: '#3162A5' }}
                                      icon={
                                        <div className="-mt-1">
                                          <UserOutlined />
                                        </div>
                                      }
                                    />
                                  </span>
                                  <span className="text-yellow-500 font-bold ml-2 text-md">
                                    Created by :
                                  </span>
                                  <span className="text-gray-500 text-md ml-2 text-semibold">
                                    {val?.createdByInfo?.displayName}
                                  </span>
                                </Tooltip>
                              </div>
                              <Tooltip title={val?.createdByInfo?.email}>
                                <div className="text-lg  ml-2 text-green-600">
                                  <AppIcons.EnvelopeFillIcon />
                                </div>
                              </Tooltip>
                              <div className="text-lg  ml-2 text-yellow-500">
                                <AppIcons.TelephoneFillIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Spin>
              </TabPane>
            ))}
          </Tabs>
        </Form.Item>

        <ModalToAddTeacherNotes form={form} />
      </div>
    </Form>
  );
};

export default connect(({ student, loading, leads }) => ({
  getTeacherRemarks: student?.getTeacherRemarks,
  loadingTeacherRemarks: loading.effects['student/getTeacherRemarks'],
  followUpsCounts: student?.followUpsCounts,
  getTeacherRemarksCounts: student?.getTeacherRemarksCounts,
  editLead: leads?.editLead,
}))(TeacherRemarks);
