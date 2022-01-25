import React, { useState, useEffect } from 'react';
import Page from '@/components/Page';
import Breadcrumbs from '@/components/BreadCrumbs';
import { Link, connect } from 'umi';
import { Button, Table, Row, Col, Form, Input, Pagination, Select, Tooltip } from 'antd';
import { debounce } from 'lodash';
import CheckValidation from '@/components/CheckValidation';
import dayjs from 'dayjs';

const TeachingSchedule = ({
  getTeachingSchedules,
  dispatch,
  loading,
  getCoursesForTeachingSchedule,
}) => {
  const [courseNameSearch, setCourseNameSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);

  const getTeachingScheduleCourse = (start, size, keyword) =>
    dispatch({
      type: 'courses/getTeachingSchedules',
      payload: {
        query: { keyword, startIndex: start, viewSize: size },
      },
    }).catch(() => {});

  const action = (value) => {
    setCurrentPage(1);
    getTeachingScheduleCourse(0, viewSize, value);
    setCourseNameSearch(value);
  };
  const { Option } = Select;
  const { Search } = Input;

  useEffect(() => {
    getTeachingScheduleCourse(0, 10, '');
    dispatch({
      type: 'courses/getCoursesForTeachingSchedule',
      payload: {
        query: { viewSize: 1000 },
      },
    }).catch(() => {});
  }, []);
  const onSearchChange = debounce(action, 600);
  const columns = [
    {
      title: 'Sr.no. ',
      dataIndex: 'srno',
      align: 'center',
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: 'Schedule Name',
      dataIndex: 'name',
      align: 'left',
      key: 'name',
      render: (data) => <div className="">{data}</div>,
    },
    {
      title: 'Course',
      key: 'course',
      render: (record) => <div>{record?.course?.name}</div>,
    },
    {
      title: 'Start-End date ',
      dataIndex: 'startDate' && 'endDate',
      key: 'address',
      render: (text, record) => (
        <div className="flex ">
          <Tooltip title="Start date">
            <div className="">{dayjs(record?.startDate).format('MMMM D, YYYY')}</div>{' '}
          </Tooltip>
          <Tooltip title="End date">
            <div className="mx-2">{dayjs(record?.endDate).format('MMMM D, YYYY')}</div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Mock test',
      key: 'mockTest',
      align: 'center',
      render: (record) => (
        <div className="text-center">{record?.mockTestCapsule?.name || '--'}</div>
      ),
    },
    {
      title: 'Daily test',
      key: 'mockTest',
      render: (record) => <div>{record?.capsule?.name || '--'}</div>,
    },
  ];
  function handleChangePagination(current, size) {
    setCurrentPage(current);
    getTeachingScheduleCourse(size * (current - 1), size, courseNameSearch);
  }

  return (
    <>
      <Page
        title="Upload teaching schedule"
        primaryAction={
          <Link to="/upload/teaching-schedule/new">
            <Button type="primary">Upload teaching schedule</Button>
          </Link>
        }
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Teaching schedule',
                path: '#',
              },
            ]}
          />
        }
      >
        <div className="bg-white pt-3 rounded ">
          <Form style={{ borderRadius: '10px' }}>
            <div>
              <Row>
                <Col xl={18} lg={12} md={12} sm={24} xs={24}>
                  <div className="px-4 pt-3">
                    <Form.Item name="search">
                      <Search
                        size="large"
                        placeholder="Enter keyword to search"
                        onChange={(e) => onSearchChange(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} sm={24} xs={24}>
                  <div className="px-4 pt-3">
                    <Form.Item name="selectCourse">
                      <div className="">
                        <Select
                          style={{ borderRadius: '5px' }}
                          showSearch
                          placeholder="Select course"
                          size="large"
                          onSelect={(val) => {
                            dispatch({
                              type: 'courses/getTeachingSchedules',
                              payload: {
                                query: { courseId: val },
                              },
                            }).catch(() => {});
                          }}
                        >
                          {getCoursesForTeachingSchedule?.records?.map((item) => (
                            <Option key={item?.id} value={item?.id}>
                              {item?.displayName}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>

            <Table
              style={{ borderRadius: '8px' }}
              columns={columns}
              pagination={false}
              loading={loading}
              dataSource={getTeachingSchedules?.records}
              footer={() => (
                <CheckValidation show={getTeachingSchedules?.totalCount > 5}>
                  <Row className="mt-2" type="flex" justify="end">
                    <Pagination
                      key={`page-${currentPage}`}
                      showSizeChanger
                      pageSizeOptions={['10', '25', '50', '100']}
                      onShowSizeChange={(e, p) => {
                        setViewSize(p);
                        setCurrentPage(1);
                        getTeachingScheduleCourse(0, p, courseNameSearch);
                      }}
                      defaultCurrent={1}
                      current={currentPage}
                      pageSize={viewSize}
                      total={getTeachingSchedules?.totalCount}
                      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      onChange={handleChangePagination}
                    />
                  </Row>
                </CheckValidation>
              )}
            />
          </Form>
        </div>
      </Page>
    </>
  );
};

export default connect(({ courses, loading }) => ({
  getTeachingSchedules: courses?.getTeachingSchedules,
  getCoursesForTeachingSchedule: courses?.getCoursesForTeachingSchedule,
  loading: loading?.effects['courses/getTeachingSchedules'],
}))(TeachingSchedule);
