import { useEffect } from 'react';
import Page from '@/components/Page';
import Card from '@/components/Structure/Card';
import {
  Divider,
  Form,
  Select,
  Row,
  Col,
  Input,
  DatePicker,
  Radio,
  Button,
  message,
  Checkbox,
} from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import FixedFooter from '@/components/FixedFooter';
import { connect, history, useParams } from 'umi';
import { CheckValidationWithoutDiv as CheckValidation } from '@/components/CheckValidation';

import Breadcrumbs from '@/components/BreadCrumbs';

const { Option } = Select;
const { TextArea } = Input;

const AddBatch = ({
  dispatch,
  allCourses,
  singleCourseDetail,
  classesRecord,
  classRecordById,
  getParticularBatch,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [allFormValues, setAllFormValues] = useState(null);
  const [form] = Form.useForm();
  const { updateBatchId } = useParams();

  useEffect(() => {
    dispatch({
      type: 'courses/getCourses',
      payload: { query: { viewSize: 1000 } },
    });
    dispatch({
      type: 'classDetails/getClass',
      payload: {},
    });
  }, [dispatch]);

  useEffect(() => {
    if (updateBatchId) {
      dispatch({
        type: 'batch/getParticularBatch',
        payload: { pathParams: { scheduleId: updateBatchId } },
      }).then((res) => {
        if (res?.id) {
          form.setFieldsValue({
            ...res,
            course: {
              ...res?.course,
            },
            courseModules: res?.course?.courseModules?.map((item) => item?.id),
            name: res?.name,
            batchPeriod: { 0: moment(res?.startDate), 1: moment(res?.endDate) },
            startsAt: moment(res?.startsAt),
            endsAt: moment(res?.endsAt),
            courseCategory: res?.course?.categoryName,
            courseSubcategory: res?.course?.subCategoryName,
            totalSeats: res?.classRoom?.sittingCapacity,
            occupiedCapacity: res?.classRoom?.occupiedCapacity,
            availableCapacity: res?.classRoom?.availableCapacity,
            showFacilities: res?.classRoom?.facilities?.map((item) => item?.facilityType),
          });
        }
      });
    }
  }, [updateBatchId, dispatch]);

  const onFinish = (values) => {
    const data = {
      ...values,
      endsAt: values?.endsAt?.toISOString(),
      startsAt: values?.startsAt?.toISOString(),
    };
    if (data.batchPeriod?.length === 2) {
      data.startDate = values.batchPeriod[0].toISOString();
      data.endDate = values.batchPeriod[1].toISOString();
    }
    if (values?.batchType === true) {
      data.batchType = 'EXTRA_CLASS';
    } else {
      delete data.batchType;
    }
    if (data.courseModules?.length > 0) {
      // if course modules are present then send modules ids in course array obj
      data.course = {
        ...data.course,
        courseModules: data.courseModules?.map((val) => ({ id: val })),
      };
      delete data.courseModules;
    }
    delete data.batchPeriod;
    delete data.courseCategory;
    delete data.courseSubcategory;
    delete data.selectModules;
    delete data.showFacilities;
    delete data.freeSeats;
    delete data.occupiedSeats;
    delete data.totalSeats;
    if (updateBatchId) {
      dispatch({
        type: 'batch/updateBatch',
        payload: { body: data, pathParams: { updateBatchId } },
      }).then((res) => {
        if (res.status === 400) {
          message.error('Something went wrong');
        } else {
          message.success('You have updated your batch successfully');
          history.push('/batches/all');
        }
      });
    } else {
      dispatch({
        type: 'batch/addBatch',
        payload: { body: data },
      }).then((res) => {
        if (res.status === 400) {
          message.error('Something went wrong');
        } else {
          message.success('You have added your batch successfully');
          history.push('/batches/all');
        }
      });
    }
  };

  const onCourseSelectHandler = (value) => {
    dispatch({
      type: 'courses/getCourseDetails',
      payload: {
        pathParams: {
          courseId: value,
        },
      },
    })
      .then((res) => {
        if (res?.categoryId) {
          form.setFieldsValue({
            courseCategory: res?.categoryName,
          });
        }
        if (res?.subCategoryId) {
          form.setFieldsValue({
            courseSubcategory: res?.subCategoryName,
          });
        }
      })
      .catch(() => {});
  };

  const onClassSelectHandler = (value) => {
    dispatch({
      type: 'classDetails/getClassById',
      payload: { pathParams: { classId: value } },
    }).then((res) => {
      form.setFieldsValue({
        totalSeats: res?.sittingCapacity,
        occupiedCapacity: res?.occupiedCapacity,
        availableCapacity: res?.availableCapacity,
        showFacilities: res?.facilities?.map((item) => item?.facilityType),
      });
    });
  };

  return (
    <div className="mt-8">
      <Page
        title={updateBatchId ? 'Update batch' : 'Add batch'}
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Batches',
                path: '/batches/all',
              },
              { name: updateBatchId ? 'Update' : 'New', path: '#' },
            ]}
          />
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={(changedValue, allValues) => {
            setAllFormValues(allValues);
          }}
        >
          <Card>
            <h2 className="p-2 text-lg font-semibold text-gray-800">Course details</h2>
            <Divider style={{ marginTop: '0' }} />
            <Card.Section>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                  <p className="font-medium text-gray-800">Course</p>
                  <Form.Item
                    name={['course', 'id']}
                    rules={[
                      {
                        required: true,
                        message: 'Please select a course',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select course"
                      onChange={onCourseSelectHandler}
                      showSearch
                      optionFilterProp="label"
                    >
                      {allCourses &&
                        allCourses?.records?.length > 0 &&
                        allCourses?.records?.map((item) => (
                          <Option key={item.id} value={item.id} label={item.displayName}>
                            {item.displayName}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>{' '}
                <CheckValidation show={singleCourseDetail?.categoryId}>
                  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <p className="font-medium text-gray-800">Category</p>
                    <Form.Item name="courseCategory">
                      <Input size="large" placeholder="Category" disabled />
                    </Form.Item>
                  </Col>{' '}
                </CheckValidation>
                <CheckValidation show={singleCourseDetail?.subCategoryId}>
                  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <p className="font-medium text-gray-800">Subcategory</p>
                    <Form.Item name="courseSubcategory">
                      <Input size="large" placeholder="Subcategory" disabled />
                    </Form.Item>
                  </Col>
                </CheckValidation>
                <CheckValidation show={singleCourseDetail?.courseModules?.length > 0}>
                  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <p className="font-medium text-gray-800">Modules</p>
                    <Form.Item
                      name={['courseModules']}
                      rules={[{ required: true, message: 'Please select at least one module ' }]}
                    >
                      <Select
                        getPopupContainer={(node) => node.parentNode}
                        size="large"
                        placeholder="Modules"
                        mode="multiple"
                      >
                        {singleCourseDetail?.courseModules?.map((item) => (
                          <Option key={item?.id} value={item?.id}>
                            {item?.displayName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </CheckValidation>
              </Row>
            </Card.Section>
          </Card>
          <Card>
            <h2 className="p-2 text-lg font-semibold text-gray-800">Batch details</h2>
            <Divider style={{ marginTop: '0' }} />
            <Card.Section>
              <div className="flex flex-wrap justify-between">
                <div>
                  <p className="font-medium text-gray-800">Name</p>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a name',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Name of batch" />
                  </Form.Item>
                </div>
                <div>
                  <p className="font-medium text-gray-800 mb-2">Extra class</p>
                  <Form.Item name="batchType" valuePropName="checked">
                    <Checkbox value="true">Assign extra class</Checkbox>
                  </Form.Item>
                </div>
                <div>
                  <p className="pb-2 font-medium text-gray-800">Type</p>
                  <Form.Item
                    name="modeId"
                    rules={[{ required: true, message: 'Please select a type' }]}
                  >
                    <Radio.Group
                      options={[
                        { label: 'Online', value: 'ONLINE' },
                        { label: 'Offline', value: 'OFFLINE' },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Batch period</p>
                  <Form.Item name="batchPeriod" label={null}>
                    <DatePicker.RangePicker />
                  </Form.Item>
                </div>
                <div>
                  <p className="font-medium text-gray-800 ">Time</p>
                  <div className="inline-flex gap-1">
                    <Form.Item
                      name="startsAt"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter start time',
                        },
                      ]}
                    >
                      <DatePicker
                        picker="time"
                        placeholder="Start time"
                        use12Hours={true}
                        format="HH:mm"
                      />
                    </Form.Item>
                    <Form.Item
                      name="endsAt"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter end time',
                        },
                      ]}
                    >
                      <DatePicker
                        picker="time"
                        placeholder="End time"
                        use12Hours={true}
                        format="HH:mm"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="font-medium text-gray-800">Brief description</p>
                  <Form.Item name="description">
                    <TextArea rows={5} placeholder="Batch description" />
                  </Form.Item>
                </Col>
              </Row>
            </Card.Section>
          </Card>
          <CheckValidation show={form.getFieldValue('modeId') === 'OFFLINE'}>
            <Card>
              <h2 className="p-2 text-lg font-semibold text-gray-800">Class details</h2>
              <Divider style={{ marginTop: '0' }} />
              <Card.Section>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                    <p className="font-medium text-gray-800">Select class</p>
                    <Form.Item
                      name={['classRoom', 'id']}
                      rules={[
                        {
                          required: true,
                          message: 'Please select a class',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="select class"
                        onChange={onClassSelectHandler}
                      >
                        {classesRecord?.records?.map((item) => (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>{' '}
                  <CheckValidation
                    show={
                      classRecordById?.sittingCapacity ||
                      getParticularBatch?.classRoom?.sittingCapacity
                    }
                  >
                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                      <p className="font-medium text-gray-800">Total seats</p>
                      <Form.Item name="totalSeats">
                        <Input disabled size="large" placeholder="Total seats" />
                      </Form.Item>
                    </Col>{' '}
                  </CheckValidation>
                  <CheckValidation
                    show={
                      classRecordById?.occupiedCapacity ||
                      getParticularBatch?.classRoom?.occupiedCapacity
                    }
                  >
                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                      <p className="font-medium text-gray-800">Occupied seats</p>
                      <Form.Item name="occupiedCapacity">
                        <Input disabled size="large" placeholder="Occupied seats" />
                      </Form.Item>
                    </Col>{' '}
                  </CheckValidation>
                  <CheckValidation
                    show={
                      classRecordById?.availableCapacity ||
                      getParticularBatch?.classRoom?.availableCapacity
                    }
                  >
                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                      <p className="font-medium text-gray-800">Available seats</p>
                      <Form.Item name="availableCapacity">
                        <Input disabled size="large" placeholder="Available seats" />
                      </Form.Item>
                    </Col>{' '}
                  </CheckValidation>
                  <CheckValidation
                    show={
                      classRecordById?.facilities ||
                      getParticularBatch?.classRoom?.facilities?.length > 0
                    }
                  >
                    <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                      <p className="font-medium text-gray-800">Show facilities</p>
                      <Form.Item name="showFacilities">
                        <Select
                          getPopupContainer={(node) => node.parentNode}
                          disabled
                          size="large"
                          placeholder="Facilities"
                          mode="multiple"
                        >
                          {classRecordById?.facilities?.map((item) => (
                            <Option key={item?.facilityType} value={item?.facilityType}>
                              {item?.facilityType}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>{' '}
                  </CheckValidation>
                </Row>
              </Card.Section>
            </Card>
          </CheckValidation>
          <FixedFooter classes="text-right">
            <div className="w-full ">
              <Button type="primary" htmlType="submit" size="large" loading={false}>
                {!updateBatchId ? 'Add batch' : 'Update batch'}
              </Button>
            </div>
          </FixedFooter>
        </Form>
      </Page>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allCourses: state?.courses?.allCourses,
  singleCourseDetail: state?.courses.singleCourseDetail,
  classesRecord: state?.classDetails?.allClasses,
  classRecordById: state?.classDetails?.classRecordById,
  getParticularBatch: state?.batch?.getParticularBatch,
});

export default connect(mapStateToProps)(AddBatch);
