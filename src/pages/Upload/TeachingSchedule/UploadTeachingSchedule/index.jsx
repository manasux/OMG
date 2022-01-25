import React, { useState, useEffect } from 'react';
import Card from '@/components/Structure/Card';
import { Input, Select, Form, Row, Col, DatePicker, Checkbox, Button, Radio, Spin } from 'antd';
import { useDispatch, connect } from 'umi';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';

const { Option } = Select;
const UploadTeachingSchedule = ({
  getCoursesForTeachingSchedule,
  singleCourseDetail,
  getTeachingCapsuleForClassTest,
  getTeachingCapsuleForMockTest,
  submitLoading,
  getCoursesLoading,
}) => {
  const [checkMockTestDay, setCheckMockTestDay] = useState([]);
  const [mockTestDay, setMockTestDay] = useState([]);
  const [isFileSubmit, setIsFileSubmit] = useState(false);
  const [singleCourses, setSingleCourses] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const workingDays = [
    {
      id: 1,
      name: 'Sun',
      value: 'SUNDAY',
    },
    {
      id: 2,
      name: 'Mon',
      value: 'MONDAY',
    },
    {
      id: 3,
      name: 'Tue',
      value: 'TUSEDAY',
    },
    {
      id: 4,
      name: 'Wed',
      value: 'WEDNESDAY',
    },
    {
      id: 5,
      name: 'Thus',
      value: 'THURSDAY',
    },
    {
      id: 6,
      name: 'Fri',
      value: 'FRIDAY',
    },
    {
      id: 7,
      name: 'Sat',
      value: 'SATURDAY',
    },
  ];

  const onFinishValue = (values) => {
    const valuesFor = {
      ...values,
      startDate: values?.startDate.toISOString(),
      endDate: values?.endDate.toISOString(),
    };

    const teaching = {
      name: valuesFor?.scheduleName,
      startDate: valuesFor?.startDate,
      endDate: valuesFor?.endDate,
      mockTestOn: valuesFor?.mockTestOn,
      isMockAndClass: valuesFor?.mockTestOrClass,
      workingDays: values?.workingDays,
      isPublicHolidaysInculde: valuesFor?.publicHoliday,
    };
    teaching.course = {
      id: valuesFor?.course,
    };
    teaching.capsule = {
      id: valuesFor?.classTest,
    };
    teaching.mockTestCapsule = {
      id: valuesFor?.mockTest,
    };
    dispatch({
      type: 'courses/uploadTeachingSchedule',
      payload: {
        body: teaching,
      },
    }).then(() => {
      setIsFileSubmit(true);
    });
  };
  useEffect(() => {
    dispatch({
      type: 'courses/getCoursesForTeachingSchedule',
      payload: { query: { viewSize: 1000 } },
    });
    dispatch({
      type: 'courses/getTeachingCapsuleForClassTest',
      payload: { query: { isMockTest: false } },
    });
    dispatch({
      type: 'courses/getTeachingCapsuleForMockTest',
      payload: { query: { isMockTest: true } },
    });
    form.setFieldsValue({
      categoryName: undefined,
      subCategory: undefined,
      module: undefined,
    });
  }, [dispatch, form]);
  useEffect(() => {
    form.setFieldsValue({
      categoryName: singleCourseDetail?.categoryName,
      subCategory: singleCourseDetail?.subCategoryName,
      module: singleCourseDetail?.courseModules?.map((val) => val?.id),
    });
  }, [singleCourseDetail, form]);
  useEffect(() => {
    form.setFieldsValue({
      categoryName: undefined,
      subCategory: undefined,
      module: undefined,
    });
  }, [getCoursesForTeachingSchedule, form]);
  return (
    <>
      <Page
        title="teaching schedule"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'teaching-schedule',
                path: '/upload/teaching-schedule',
              },
              {
                name: 'Upload teaching-schedule',
                path: '#',
              },
            ]}
          />
        }
      >
        <div>
          <div className=" mt-20 ">
            <Card>
              <div className="border-b p-8">
                <h1 className=" font-medium text-lg">Teaching Schedule</h1>
              </div>
              <div className="px-10">
                <Form onFinish={onFinishValue} form={form}>
                  <Spin spinning={Boolean(submitLoading || getCoursesLoading)}>
                    <div>
                      <div className="mt-10">
                        <Row gutter={24}>
                          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
                            <div className="flex ">
                              <p className="pb-2 font-medium ">Schedule name</p>
                              <svg
                                width="5"
                                height="5"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="asterisk"
                                className="svg-inline--fa fa-asterisk fa-w-16 text-red-500 ml-2 mt-1.5"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                                ></path>
                              </svg>{' '}
                            </div>
                            <div className="">
                              <Form.Item
                                name="scheduleName"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Schedule Name is Require',
                                  },
                                ]}
                              >
                                <Input placeholder="Schedule Name" size="large" />
                              </Form.Item>
                            </div>
                          </Col>
                          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
                            <div className="flex">
                              <p className="mb-2 font-medium ">Course</p>
                              <svg
                                width="5"
                                height="5"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="asterisk"
                                className="svg-inline--fa fa-asterisk fa-w-16 text-red-500 ml-2 mt-1.5"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <Form.Item
                                name="course"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Course is Require',
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Course"
                                  size="large"
                                  onChange={(value) => {
                                    return dispatch({
                                      type: 'courses/getCourseDetails',
                                      payload: {
                                        pathParams: {
                                          courseId: value,
                                        },
                                      },
                                    }).then((res) => {
                                      setSingleCourses(res);
                                    });
                                  }}
                                >
                                  {getCoursesForTeachingSchedule?.records?.map((items) => (
                                    <Option key={items?.id} value={items?.id}>
                                      {items?.displayName}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                          </Col>

                          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
                            <p className="pb-2 font-medium ">Category</p>
                            <div>
                              <Form.Item name="categoryName">
                                <Input placeholder="Category " size="large" disabled={true} />
                              </Form.Item>
                            </div>
                          </Col>

                          <Col lg={6} xl={6} md={12} sm={24} xs={24}>
                            <p className="pb-2 font-medium ">Sub Category</p>
                            <div className="">
                              <Form.Item name="subCategory">
                                <Input placeholder="Sub Category" size="large" disabled={true} />
                              </Form.Item>
                            </div>
                          </Col>
                        </Row>
                        <Row gutter={24}>
                          <Col lg={10} xl={10} md={24} sm={24} xs={24}>
                            <p className="pb-2 font-medium ">Module</p>
                            <div>
                              <Form.Item name="module">
                                <Select placeholder="Module" size="large" mode="multiple">
                                  {singleCourses?.courseModules?.map((module) => (
                                    <Option key={module?.id} value={module?.id}>
                                      {module?.displayName}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Row gutter={24} style={{ marginTop: '20px' }}>
                        <Col lg={5} xl={5} md={8} sm={24} xs={24}>
                          <div className="flex">
                            <p className="font-medium mb-2">Start date </p>
                            <svg
                              width="5"
                              height="5"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="asterisk"
                              className="svg-inline--fa fa-asterisk fa-w-16 text-red-500 ml-2 mt-1 "
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                              ></path>
                            </svg>{' '}
                          </div>
                          <div>
                            <Form.Item
                              name="startDate"
                              rules={[
                                {
                                  required: true,
                                  message: 'Dates are Required',
                                },
                              ]}
                            >
                              <DatePicker size="large" style={{ width: '100%' }} />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col lg={5} xl={5} md={8} sm={24} xs={24}>
                          <div className="flex">
                            <p className="font-medium mb-2">End date</p>
                            <svg
                              width="5"
                              height="5"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="asterisk"
                              className="svg-inline--fa fa-asterisk fa-w-16 text-red-500 ml-2 mt-1 "
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                              ></path>
                            </svg>{' '}
                          </div>
                          <div>
                            <Form.Item
                              name="endDate"
                              rules={[
                                {
                                  required: true,
                                  message: 'Dates are Required',
                                },
                              ]}
                            >
                              <DatePicker size="large" style={{ width: '100%' }} />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col lg={4} xl={4} md={8} sm={24} xs={24}>
                          <div className="mt-8">
                            <div className="font-medium ">
                              <Form.Item
                                name="publicHoliday"
                                valuePropName="checked"
                                initialValue={false}
                              >
                                <Checkbox>Include Public holiday</Checkbox>
                              </Form.Item>
                            </div>
                          </div>
                        </Col>
                        <Col lg={10} xl={10} md={8} sm={24} xs={24}>
                          <div className="">
                            <div>
                              <p className="mb-2 font-medium">Working Days</p>
                              <Form.Item name="workingDays">
                                <Select
                                  mode="multiple"
                                  size="large"
                                  placeholder="Working Days"
                                  onChange={(values) => {
                                    setMockTestDay(
                                      workingDays?.filter((items) => values.includes(items?.value)),
                                    );
                                  }}
                                >
                                  {workingDays?.map((item) => (
                                    <Option key={item?.value} value={item?.value}>
                                      {item?.name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Row gutter={24}>
                        <Col lg={12} xl={10} md={12} sm={24} xs={24}>
                          <div className="my-2">
                            <p className="font-medium mb-2">Mock test(optional)</p>
                            <Form.Item name="mockTestOn">
                              <Select
                                mode="multiple"
                                size="large"
                                placeholder="Mock test"
                                onChange={(val) => setCheckMockTestDay(val)}
                              >
                                {mockTestDay?.map((item) => (
                                  <Option key={item?.value} value={item?.value}>
                                    {item?.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col style={{ marginTop: '35px' }} lg={8} xl={8} md={12} sm={24} xs={24}>
                          <div className="mr-2">
                            <Form.Item name="mockTestOrClass">
                              <div>
                                <Radio.Group
                                  disabled={checkMockTestDay?.length === 0}
                                  style={{ display: 'flex' }}
                                  size="large"
                                  buttonStyle="solid"
                                >
                                  <Radio.Button value="false">Mock test only</Radio.Button>
                                  <Radio.Button value="true">Mock test And Class</Radio.Button>
                                </Radio.Group>
                              </div>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={24}>
                        <Col lg={5} xl={5} md={12} sm={24} xs={24}>
                          <div className="flex">
                            <p className=" mb-2 font-medium">Select Capsule</p>
                            <svg
                              width="5"
                              height="5"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="asterisk"
                              className="svg-inline--fa fa-asterisk fa-w-16 text-red-500 ml-2 mt-1.5"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M478.21 334.093L336 256l142.21-78.093c11.795-6.477 15.961-21.384 9.232-33.037l-19.48-33.741c-6.728-11.653-21.72-15.499-33.227-8.523L296 186.718l3.475-162.204C299.763 11.061 288.937 0 275.48 0h-38.96c-13.456 0-24.283 11.061-23.994 24.514L216 186.718 77.265 102.607c-11.506-6.976-26.499-3.13-33.227 8.523l-19.48 33.741c-6.728 11.653-2.562 26.56 9.233 33.037L176 256 33.79 334.093c-11.795 6.477-15.961 21.384-9.232 33.037l19.48 33.741c6.728 11.653 21.721 15.499 33.227 8.523L216 325.282l-3.475 162.204C212.237 500.939 223.064 512 236.52 512h38.961c13.456 0 24.283-11.061 23.995-24.514L296 325.282l138.735 84.111c11.506 6.976 26.499 3.13 33.227-8.523l19.48-33.741c6.728-11.653 2.563-26.559-9.232-33.036z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <Form.Item
                              name="classTest"
                              rules={[
                                {
                                  required: true,
                                  message: 'Please select class test ',
                                },
                              ]}
                            >
                              <Select size="large" placeholder="Class test">
                                {getTeachingCapsuleForClassTest?.records.map((ite) => (
                                  <Option value={ite?.capsuleId} key={ite?.capsuleId}>
                                    {ite?.capsuleName}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                        </Col>
                        <Col style={{ marginTop: '30px' }} lg={5} xl={5} md={12} sm={24} xs={24}>
                          <div>
                            <Form.Item
                              name="mockTest"
                              rules={[
                                {
                                  required: checkMockTestDay?.length !== 0,
                                  message: 'Please select mock test',
                                },
                              ]}
                            >
                              <Select
                                size="large"
                                placeholder="Mock test"
                                disabled={checkMockTestDay?.length === 0}
                              >
                                {getTeachingCapsuleForMockTest?.records?.map((items) => (
                                  <Option key={items?.capsuleId} value={items?.capsuleId}>
                                    {items?.capsuleName}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                      <Row style={{ display: 'flex', justifyContent: 'end' }}>
                        <Col>
                          <div>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                disabled={isFileSubmit === true}
                                style={{ padding: '5px 25px 5px 25px', fontWeight: '600' }}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Spin>
                </Form>
              </div>
            </Card>
          </div>
        </div>
      </Page>
    </>
  );
};
export default connect(({ courses, loading }) => ({
  getCoursesForTeachingSchedule: courses?.getCoursesForTeachingSchedule,
  singleCourseDetail: courses?.singleCourseDetail,
  getTeachingCapsuleForMockTest: courses?.getTeachingCapsuleForMockTest,
  getTeachingCapsuleForClassTest: courses?.getTeachingCapsuleForClassTest,
  submitLoading: loading?.effects['courses/uploadTeachingSchedule'],
  getCoursesLoading: loading?.effects['courses/getCourseDetails'],
}))(UploadTeachingSchedule);
