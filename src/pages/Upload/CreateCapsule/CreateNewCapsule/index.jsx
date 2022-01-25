import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Select,
  message,
  Spin,
} from 'antd';
import { connect, history, useParams } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';
import CheckValidation from '@/components/CheckValidation';
import emptyStateSvg from '@/assets/icons/space-empty.svg';
import EmptyState from '@/components/EmptyState';
import Page from '@/components/Page';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import FixedFooter from '@/components/FixedFooter';

const { Option } = Select;
const CreateNewCapsule = ({
  dispatch,
  getCourseContent,
  getTopicCount,
  loading,
  loadingTableRowSave,
  loadingUpdateTableRow,
  loadingUpdateCapsule,
  loadingCount,
}) => {
  const [capsuleForm] = Form.useForm();
  const [capsuleTableForm] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [singleCourseDetails, setSingleCourseDetails] = useState({});
  const [capsuleCreated, setCapsuleCreated] = useState(false);
  const [keyNumber, setKeyNumber] = useState();
  const [startIndex, setStartIndex] = useState(0);
  const [getModules, setGetModules] = useState([]);
  const [topicListRemove, setTopicListRemove] = useState([]);
  const [topicListRes, setTopicListRes] = useState([]);
  const [postCourseId, setPostCourseId] = useState();
  const [postCapsuleId, setPostCapsuleId] = useState();
  const [createCapsuleResponse, setCreateCapsuleResponse] = useState();
  const [capsuleCreatedTableRow, setCapsuleCreatedTableRow] = useState(false);
  const [topicCount, setTopicCount] = useState();
  const { IdCourse, IdCapsule } = useParams();
  const PopulateDataInCapsule = () => {
    if (IdCourse && IdCapsule) {
      dispatch({
        type: 'courses/getCapsuleDetail',
        payload: {
          pathParams: {
            courseId: IdCourse,
            capsuleId: IdCapsule,
          },
        },
      }).then((res) => {
        if (res?.responseMessage === 'success') {
          setCreateCapsuleResponse(res?.capsuleDetails);
          capsuleForm?.setFieldsValue({
            capsuleName: res?.capsuleDetails?.capsuleName,
            course: { id: res?.capsuleDetails?.courseId },
            numOfDays: res?.capsuleDetails?.numOfDays,
            difficultyLevel: res?.capsuleDetails?.difficultyLevel,
            isMockTest: res?.capsuleDetails?.isMockTest,
          });
          setSingleCourseDetails(res?.capsuleDetails?.courseDetails);
          const topicList = res?.capsuleDetails?.courseDetails?.modules?.map(
            (item) => item?.topics || item?.tests,
          );

          const moduleId = res?.capsuleDetails?.courseDetails?.modules?.map((show) => show?.id);
          setGetModules([
            ...res?.capsuleDetails?.courseDetails?.modules?.map((item) => {
              return {
                title: item?.name,
                key: item?.name,
              };
            }),
          ]);
          setCapsuleCreated(true);
          const populateData = [];
          dispatch({
            type: 'courses/getTopicCount',
            payload: {
              pathParams: {
                courseId: res?.capsuleDetails?.courseId,
              },
            },
          }).then((response) => {
            if (response?.responseMessage === 'success') {
              if (res?.capsuleDetails?.isMockTest === false) {
                setTopicCount(response?.topicsCount);
              } else {
                setTopicCount(response?.testCount);
              }
            }
          });
          if (res?.capsuleDetails?.groupTopics !== undefined) {
            setTopicListRes([...res?.capsuleDetails?.groupTopics]);
            for (let i = 1; i <= res?.capsuleDetails?.groupTopics?.length; i++) {
              populateData?.push({
                key: res?.capsuleDetails?.groupTopics[i - 1]?.day,
                day: res?.capsuleDetails?.groupTopics[i - 1]?.day,
                topics: topicList,
                moduleId,
                status: 'ok',
              });
            }
            setDataSource([...populateData]);

            let filterGroupTopics = [];
            filterGroupTopics = res?.capsuleDetails?.groupTopics?.filter((item) => item?.day);

            const Rows = [];
            let RemoveTopic = [];
            // eslint-disable-next-line array-callback-return
            // eslint-disable-next-line no-return-assign
            filterGroupTopics?.forEach(
              // eslint-disable-next-line no-return-assign
              (item) =>
                (Rows[item?.day] = moduleId?.map((mid) => {
                  if (
                    mid ===
                    item?.moduleTopics?.find((findeO) => findeO?.module?.id === mid)?.module?.id
                  ) {
                    return {
                      topicId: item?.moduleTopics?.find((findeO) => findeO?.module?.id === mid)
                        ?.topic?.id,
                      moduleId: item?.moduleTopics?.find((findeO) => findeO?.module?.id === mid)
                        ?.module?.id,
                    };
                    // eslint-disable-next-line no-else-return
                  } else {
                    return {};
                  }
                })),
            );
            RemoveTopic = Object.assign(
              {},
              ...moduleId?.map((mid) => {
                return {
                  [mid]: Object.assign(
                    {},
                    ...filterGroupTopics?.map((list) => {
                      if (
                        mid ===
                        list?.moduleTopics?.find((findeO) => findeO?.module?.id === mid)?.module?.id
                      ) {
                        return {
                          [list?.day]: list?.moduleTopics
                            ?.filter((findeO) => findeO?.module?.id === mid)
                            ?.map((item) => item?.topic?.id)
                            ?.toString(),
                        };
                      }
                      // eslint-disable-next-line no-else-return
                      else {
                        return undefined;
                      }
                    }),
                  ),
                };
              }),
            );
            setTopicListRemove(RemoveTopic);
            capsuleTableForm?.setFieldsValue({
              Row: Rows,
            });
          } else {
            for (let i = 1; i <= res?.capsuleDetails?.numOfDays; i++) {
              populateData?.push({
                key: i,
                day: i,
                topics: topicList,
                moduleId,
              });
            }
            setDataSource([...populateData]);
          }
        }
      });
    }
  };
  const GetRows = (numOfDays, topicsList, id) => {
    if (capsuleCreated === false) {
      const state = [];
      for (let i = 1; i <= numOfDays; i++) {
        state?.push({
          key: i,
          day: i,
          topics: topicsList,
          moduleId: id,
        });
      }
      setDataSource(state);
    } else if (capsuleCreated === true) {
      if (dataSource?.length < numOfDays) {
        const add = Number(numOfDays - dataSource?.length);
        let keyNumberStart = (dataSource[dataSource?.length - 1]?.key || 0) + 1;
        const addNew = [];
        for (let i = 1; i <= add; i++) {
          addNew?.push({
            key: keyNumberStart,
            day: keyNumberStart,
            topics: topicsList,
            moduleId: id,
          });
          keyNumberStart++;
        }
        setDataSource([...dataSource, ...addNew]);
      }
    }
  };
  const PostCapsule = (values) => {
    dispatch({
      type: 'courses/postCapsule',
      payload: {
        body: values,
        pathParams: { courseId: values?.course?.id },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        setCapsuleCreated(true);
        setPostCourseId(res?.courseId);
        setPostCapsuleId(res?.capsuleId);
        setCreateCapsuleResponse(res);
        setGetModules([
          ...res?.courseDetails?.modules?.map((item) => {
            return {
              title: item?.name,
              key: item?.name,
            };
          }),
        ]);

        GetRows(
          res?.numOfDays,
          res?.courseDetails?.modules?.map((item) => item?.topics || item?.tests),
          res?.courseDetails?.modules?.map((show) => show?.id),
        );
      }
    });
  };
  const UpdateCapsuleValues = (values) => {
    dispatch({
      type: 'courses/updateCapsule',
      payload: {
        body: values,
        pathParams: {
          courseId: postCourseId || IdCourse,
          capsuleId: postCapsuleId || IdCapsule,
        },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        setGetModules([
          ...res?.courseDetails?.modules?.map((item) => {
            return {
              title: item?.name,
              key: item?.name,
            };
          }),
        ]);
        GetRows(
          res?.numOfDays,
          res?.courseDetails?.modules?.map((item) => item?.topics || item?.tests),
          res?.courseDetails?.modules?.map((show) => show?.id),
        );
      }
    });
  };
  const CapsuleTableRowPost = (values, day) => {
    const modules = createCapsuleResponse?.courseDetails?.modules;
    let moduleTopics = [];
    let filteredTopic = [];
    filteredTopic = values.Row[day]?.map((val) => {
      return {
        topic: { topicId: val?.topicId },
        module: {
          id: modules?.find(
            (item) =>
              item?.tests?.find((topicId) => topicId?.id === val?.topicId) ||
              item?.topics?.find((topicId) => topicId?.id === val?.topicId),
          )?.id,
        },
      };
    });

    moduleTopics = filteredTopic?.filter(
      (fill) => fill?.module?.id !== undefined || fill?.topic?.topicId !== undefined,
    );
    let MockTest = true;
    if (createCapsuleResponse?.isMockTest === false) {
      MockTest = false;
    } else {
      MockTest = true;
    }
    dispatch({
      type: 'courses/createCapsuleTableRow',
      payload: {
        body: [{ day, moduleTopics }],
        pathParams: {
          courseId: postCourseId || IdCourse,
          capsuleId: postCapsuleId || IdCapsule,
        },
        query: {
          mockTest: MockTest,
        },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        setDataSource(
          dataSource?.map((item) => {
            if (res?.res?.find((val) => val?.day)?.day === item?.day) {
              return {
                ...item,
                status: 'ok',
              };
              // eslint-disable-next-line no-else-return
            } else {
              return { ...item };
            }
          }),
        );
        setTopicListRes([...topicListRes, ...res?.res]);
      }
    });
  };
  const UpdateCapsuleTableRow = (values, day) => {
    const modules = createCapsuleResponse?.courseDetails?.modules;
    let moduleTopics = [];
    let filteredTopic = [];
    const groupId = topicListRes?.find((group) => group?.day === day)?.groupId;
    filteredTopic = values.Row[day]?.map((val) => {
      return {
        topic: { topicId: val?.topicId },
        module: {
          id: modules?.find(
            (item) =>
              item?.tests?.find((topicId) => topicId?.id === val?.topicId) ||
              item?.topics?.find((topicId) => topicId?.id === val?.topicId),
          )?.id,
        },
      };
    });

    moduleTopics = filteredTopic?.filter(
      (fill) => fill?.module?.id !== undefined || fill?.topic?.topicId !== undefined,
    );
    let isMockTest = true;
    if (createCapsuleResponse?.isMockTest === false) {
      isMockTest = false;
    } else {
      isMockTest = true;
    }
    const capsuleGroups = [{ groupId, day, moduleTopics }];
    dispatch({
      type: 'courses/capsuleTableRowUpdate',
      payload: {
        body: {
          isMockTest,
          capsuleGroups,
        },
        pathParams: {
          courseId: postCourseId || IdCourse,
          capsuleId: postCapsuleId || IdCapsule,
        },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        setCapsuleCreatedTableRow(false);
        setDataSource(
          dataSource?.map((item) => {
            if (res?.res?.capsuleGroups?.find((val) => val?.day)?.day === item?.day) {
              return {
                ...item,
                status: 'ok',
              };
              // eslint-disable-next-line no-else-return
            } else {
              return { ...item };
            }
          }),
        );
      }
    });
  };
  const deletFormTableRow = (key) => {
    const rowGroupId = topicListRes?.find((group) => group?.day === key)?.groupId;
    dispatch({
      type: 'courses/deleteCapsuleFormTableRow',
      payload: {
        pathParams: {
          courseId: postCourseId || IdCourse,
          capsuleId: postCapsuleId || IdCapsule,
          groupId: rowGroupId,
        },
      },
    }).then((response) => {
      if (response?.status === 'ok') {
        message.success('Capsule row deleted successfully');
        setDataSource(dataSource?.filter((res) => res?.key !== key));
        const newObject = { ...topicListRemove };
        dataSource[0]?.moduleId?.forEach((item) => {
          if (newObject[item] !== undefined) {
            delete newObject[item][keyNumber];
          }
        });
        setTopicListRemove({ ...newObject });
        setTopicListRes(topicListRes?.filter((group) => group?.day !== key));
        const Rows = capsuleTableForm?.getFieldsValue('Row');
        if (!Object.keys(Rows).length === 0) {
          Rows.Row[key] = [undefined];
          capsuleTableForm?.setFieldsValue({
            Row: Rows?.Row,
          });
        }
        capsuleForm?.submit();
      } else {
        message.error('Something went wrong');
      }
    });
  };
  function confirm() {
    deletFormTableRow(keyNumber);
  }
  useEffect(() => {
    if (IdCourse && IdCapsule) {
      dispatch({
        type: 'courses/getCourseContent',
        payload: { query: { type: 'COURSE', viewSize: 1000 } },
      });
    } else {
      dispatch({
        type: 'courses/getCourseContent',
        payload: {
          query: { type: 'COURSE', hasCapsule: 'true', hasTopic: 'true', viewSize: 1000 },
        },
      });
    }
    PopulateDataInCapsule();
  }, [dispatch]);
  useEffect(() => {
    capsuleForm.setFieldsValue({
      courseCategory: singleCourseDetails?.categoryName,
      courseSubCategory: singleCourseDetails?.subCategoryName,
      moduleName: singleCourseDetails?.modules?.map((item) => item?.name),
    });
  }, [singleCourseDetails, capsuleForm]);
  function handleChangePagination(current, size) {
    setStartIndex(current * size - 10);
  }
  useEffect(() => {
    if (dataSource?.length > 0) {
      capsuleForm.setFieldsValue({
        numOfDays: Number(dataSource?.length),
      });
    } else if (dataSource?.length === 0) {
      capsuleTableForm.resetFields();
      setTopicListRes([]);
    }
  }, [dataSource, capsuleForm, capsuleTableForm]);
  return (
    <>
      <Page
        title={IdCourse && IdCapsule ? 'Update Capsule' : 'Create capsule'}
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Capsules',
                path: '/upload/create-capsule',
              },
              {
                name: IdCourse && IdCapsule ? 'Update Capsule' : 'Create capsule',
                path: '#',
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded-md shadow-md mt-10">
          <div className="text-base text-gray-800 font-semibold px-5 pt-5 border-b">
            <p>Create Capsule</p>
          </div>
          <div className="px-5 pt-5">
            <Spin spinning={Boolean(loading)}>
              <Spin spinning={Boolean(loadingUpdateCapsule)}>
                <Spin spinning={Boolean(loadingCount)}>
                  <Form
                    name="capsuleForm"
                    form={capsuleForm}
                    onFinish={(values) =>
                      capsuleCreated === true || (IdCourse && IdCapsule)
                        ? UpdateCapsuleValues(values)
                        : PostCapsule(values)
                    }
                  >
                    <Row gutter={24} className="pb-5">
                      <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                        <p className="font-medium text-gray-800 mb-3">Name Of capsule</p>
                        <Form.Item
                          name="capsuleName"
                          rules={[{ required: true, message: 'Enter capsule name first' }]}
                        >
                          <Input size="large" placeholder="Enter capsule name" />
                        </Form.Item>
                      </Col>
                      <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                        <p className="font-medium text-gray-800 mb-3">Select course</p>
                        <Form.Item
                          rules={[{ required: true, message: 'Select course please' }]}
                          name={['course', 'id']}
                        >
                          <Select
                            size="large"
                            showSearch
                            placeholder="Select course"
                            disabled={capsuleCreated || (IdCourse && IdCapsule)}
                            onChange={(value) => {
                              setSingleCourseDetails(
                                getCourseContent?.records?.find((item) => item?.courseId === value),
                              );
                              dispatch({
                                type: 'courses/getTopicCount',
                                payload: {
                                  pathParams: {
                                    courseId: value,
                                  },
                                },
                              }).then((res) => {
                                if (res?.responseMessage === 'success') {
                                  setTopicCount(res?.topicsCount);
                                }
                              });
                              capsuleForm?.setFieldsValue({ numOfDays: undefined });
                            }}
                          >
                            {getCourseContent?.records?.map((content) => (
                              <Select.Option value={content?.courseId} key={content?.courseId}>
                                {content?.productName}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      {singleCourseDetails?.categoryName ? (
                        <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                          <p className="font-medium text-gray-800 mb-3">Category</p>
                          <Form.Item name="courseCategory">
                            <Input
                              size="large"
                              placeholder=""
                              style={{ background: 'white', color: 'black' }}
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                      ) : null}
                      {singleCourseDetails?.subCategoryName ? (
                        <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                          <p className="font-medium text-gray-800 mb-3">Subcategory</p>
                          <Form.Item name="courseSubCategory">
                            <Input
                              placeholder=""
                              size="large"
                              style={{ background: 'white', color: 'black' }}
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                      ) : null}
                      {singleCourseDetails?.moduleName || singleCourseDetails?.modules ? (
                        <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                          <p className="font-medium text-gray-800 mb-3">Modules</p>
                          <Form.Item name="moduleName">
                            <Select
                              mode="multiple"
                              size="large"
                              style={{ backgroundColor: 'white', color: 'black' }}
                              disabled={true}
                            ></Select>
                          </Form.Item>
                        </Col>
                      ) : null}
                      <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                        <p className="mb-1 font-medium text-gray-800 mb-3">Difficulty level</p>
                        <Form.Item
                          initialValue="EASY"
                          name="difficultyLevel"
                          rules={[{ required: true }]}
                        >
                          <Radio.Group
                            size="large"
                            disabled={capsuleCreated || (IdCourse && IdCapsule)}
                            buttonStyle="solid"
                            rules={[{ required: true, message: 'Please select difficulty level' }]}
                          >
                            <Radio.Button
                              style={{ textAlign: 'center', padding: '0px 28px 0px 28px' }}
                              value="EASY"
                            >
                              Easy
                            </Radio.Button>
                            <Radio.Button style={{ textAlign: 'center' }} value="INTERMEDIATE">
                              Intermediate
                            </Radio.Button>
                            <Radio.Button
                              style={{ textAlign: 'center', padding: '0px 28px 0px 28px' }}
                              value="HARD"
                            >
                              Hard
                            </Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                        <p className="font-medium text-gray-800 mb-3 ">No. of days</p>
                        <Form.Item
                          name="numOfDays"
                          rules={[
                            { required: true, message: 'Enter no. of days' },
                            () => ({
                              validator(_, value) {
                                if (value <= topicCount) {
                                  // eslint-disable-next-line prefer-promise-reject-errors
                                  return Promise.resolve();
                                  // eslint-disable-next-line no-else-return
                                } else {
                                  return Promise.reject(
                                    new Error(
                                      topicCount !== undefined
                                        ? `You have only ${topicCount} ${
                                            capsuleForm?.getFieldValue('isMockTest') === true
                                              ? 'test'
                                              : 'topic'
                                          } of this course`
                                        : `please select course first`,
                                    ),
                                  );
                                }
                              },
                            }),
                          ]}
                        >
                          <InputNumber
                            size="large"
                            placeholder="Enter no. of days"
                            min={dataSource?.length === 0 ? 1 : dataSource?.length}
                            style={{ width: '100%' }}
                            onBlur={(e) => {
                              if (e.target.value > topicCount) {
                                capsuleForm.setFieldsValue({
                                  numOfDays: topicCount,
                                });
                              }
                            }}
                          />
                        </Form.Item>
                      </Col>
                      {singleCourseDetails?.isMockTest === true ? (
                        <Col xl={6} lg={6} md={8} sm={24} xs={24}>
                          <p className="font-medium text-gray-800 mb-3 ">Mock test</p>
                          <Form.Item name="isMockTest" valuePropName="checked">
                            <Checkbox
                              disabled={capsuleCreated}
                              style={{ display: 'flex' }}
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  setTopicCount(getTopicCount?.testCount);
                                } else {
                                  setTopicCount(getTopicCount?.topicsCount);
                                }
                              }}
                            >
                              <p className="pl-2"> Do you want to create capsule for mock test?</p>
                            </Checkbox>
                          </Form.Item>
                        </Col>
                      ) : null}
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <Form.Item>
                        {capsuleCreated === true || (IdCourse && IdCapsule) ? (
                          <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            style={{ width: '150px' }}
                          >
                            Update Capsule
                          </Button>
                        ) : (
                          <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            style={{ width: '150px' }}
                          >
                            Save
                          </Button>
                        )}
                      </Form.Item>
                    </div>
                  </Form>
                </Spin>
              </Spin>
            </Spin>
          </div>
        </div>
        <div className="mt-10 bg-white rounded-md shadow-md">
          <CheckValidation
            show={dataSource?.length > 0}
            fallback={
              <EmptyState
                emptyState={emptyStateSvg}
                emptyHeaderText={<span>No Capsule have been Created yet!</span>}
              />
            }
          >
            <Spin spinning={Boolean(createCapsuleResponse) && Boolean(loadingTableRowSave)}>
              <Spin spinning={Boolean(createCapsuleResponse) && Boolean(loadingUpdateTableRow)}>
                <Spin spinning={Boolean(loadingUpdateCapsule)}>
                  <Form
                    form={capsuleTableForm}
                    onFinish={(values) =>
                      capsuleCreatedTableRow === true
                        ? UpdateCapsuleTableRow(values, keyNumber)
                        : CapsuleTableRowPost(values, keyNumber)
                    }
                    style={{ width: '100%', overflowX: 'scroll' }}
                  >
                    <table
                      className={`table-fixed ${
                        dataSource[0]?.moduleId?.length > 2
                          ? 'max-content'
                          : 'xl:w-full lg:w-full md:max-content'
                      }`}
                      cellPadding={10}
                    >
                      <tr className="bg-gray-50 text-gray-900 font-light border-b">
                        <th className="text-center w-40 py-3.5 truncate">No. of day</th>
                        {getModules?.map((show) => (
                          <th key={show?.key} className="text-left py-3.5  capitalize">
                            {show?.title}
                          </th>
                        ))}
                        <th className="text-center w-40  py-3.5">Action</th>
                      </tr>
                      {dataSource
                        ?.filter((_, index) => index >= startIndex && index < startIndex + 10)
                        ?.map((display, index) => (
                          <tr key={display?.key} className="hover:bg-gray-50">
                            <td className="text-center w-40 py-3.5">{index + startIndex + 1}</td>
                            {display?.topics?.map((dis, idx) => (
                              <td key={display?.moduleId[idx]} className="py-3.5 w-96">
                                {dis
                                  ?.filter(
                                    ({ id }) =>
                                      !Object.values(
                                        topicListRemove?.[display?.moduleId?.[idx]] || {},
                                      )?.includes(id) ||
                                      topicListRemove[display?.moduleId?.[idx]][display?.key] ===
                                        id,
                                  )
                                  ?.map((items) => items).length > 0 ? (
                                  <Form.Item
                                    name={['Row', display?.key, idx, 'topicId']}
                                    style={{ margin: '0%' }}
                                  >
                                    <Select
                                      allowClear
                                      style={{ overflow: 'visible' }}
                                      placeholder="Select topic.."
                                      getPopupContainer={(node) =>
                                        dataSource?.length > 2 ? node.parentNode : node
                                      }
                                      onChange={(val) => {
                                        setTopicListRemove((prev) => ({
                                          ...prev,
                                          [display?.moduleId[idx]]: {
                                            ...prev[display?.moduleId[idx]],
                                            [display?.key]: val,
                                          },
                                        }));
                                      }}
                                      disabled={display?.status === 'ok' ? true : null}
                                    >
                                      {dis
                                        ?.filter(
                                          ({ id }) =>
                                            !Object.values(
                                              topicListRemove?.[display?.moduleId?.[idx]] || {},
                                            )?.includes(id) ||
                                            topicListRemove[display?.moduleId?.[idx]][
                                              display?.key
                                            ] === id,
                                        )
                                        ?.map((items) => (
                                          <Option key={items?.id} value={items?.id}>
                                            {items?.name}
                                          </Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                ) : (
                                  <p className="text-gray-900 font-medium text-center border m-1 py-0.5">
                                    No more topics yet
                                  </p>
                                )}
                              </td>
                            ))}

                            <td className="py-3.5 w-40">
                              <div className="flex justify-center gap-8">
                                {display?.status === 'ok' ? (
                                  <div>
                                    <a
                                      onClick={() => {
                                        setDataSource(
                                          dataSource?.map((item) => {
                                            if ([item]?.find((val) => val?.day === display?.key)) {
                                              return {
                                                ...item,
                                                status: 'notOk',
                                              };
                                              // eslint-disable-next-line no-else-return
                                            } else {
                                              return { ...item };
                                            }
                                          }),
                                        );
                                      }}
                                    >
                                      Edit
                                    </a>
                                  </div>
                                ) : (
                                  <div>
                                    {display?.status === 'notOk' ? (
                                      <a
                                        onClick={() => {
                                          capsuleTableForm.submit();
                                          setKeyNumber(display?.key);
                                          setCapsuleCreatedTableRow(true);
                                        }}
                                      >
                                        Update
                                      </a>
                                    ) : (
                                      <a
                                        onClick={() => {
                                          capsuleTableForm.submit();
                                          setKeyNumber(display?.key);
                                          setCapsuleCreatedTableRow(false);
                                        }}
                                      >
                                        Save
                                      </a>
                                    )}
                                  </div>
                                )}
                                <div>
                                  {display?.status === 'ok' || display?.status === 'notOk' ? (
                                    <Popconfirm
                                      title="Are you sure to delete this row?"
                                      onConfirm={confirm}
                                      onCancel={null}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <a
                                        onClick={() => {
                                          setKeyNumber(display?.key);
                                        }}
                                      >
                                        Delete
                                      </a>
                                    </Popconfirm>
                                  ) : (
                                    <Popconfirm
                                      title="Are you sure to delete this row?"
                                      onConfirm={() => {
                                        setDataSource(
                                          dataSource?.filter(
                                            (items) => items?.key !== display?.key,
                                          ),
                                        );
                                        const Rows = capsuleTableForm?.getFieldsValue('Row');
                                        Rows.Row[display?.key] = [undefined];
                                        capsuleTableForm?.setFieldsValue({
                                          Row: Rows?.Row,
                                        });
                                        capsuleForm?.submit();
                                        if (topicListRemove?.length !== 0) {
                                          const newObject = { ...topicListRemove };
                                          dataSource[0]?.moduleId?.forEach((item) => {
                                            if (newObject[item] !== undefined) {
                                              delete newObject[item][display?.key];
                                            }
                                          });
                                          setTopicListRemove({ ...newObject });
                                        }
                                      }}
                                      onCancel={null}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <a onClick={() => setKeyNumber(display?.key)}>Delete</a>
                                    </Popconfirm>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </table>
                  </Form>
                  {dataSource?.length > 8 ? (
                    <div className="flex justify-end bg-gray-50 pr-6 py-5 border-t">
                      <Pagination
                        defaultCurrent={1}
                        total={dataSource?.length}
                        onChange={handleChangePagination}
                        showSizeChanger={false}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      />
                    </div>
                  ) : null}
                </Spin>
              </Spin>
            </Spin>
          </CheckValidation>
        </div>
        <FixedFooter classes="text-right">
          <div className="flex mr-36 py-2.5">
            <div className="w-full ">
              <Button
                type="primary"
                disabled={dataSource?.length < 1 ? true : null}
                onClick={() => {
                  if (
                    dataSource?.find((findSource) => findSource?.status === 'ok')?.status === 'ok'
                  ) {
                    setDataSource(dataSource?.filter((item) => item?.status !== undefined));
                    capsuleForm.submit();
                    history.push(`/upload/create-capsule`);
                  } else {
                    message.error('Please save atleast one row or update rows');
                  }
                }}
                style={{ height: '2.5rem', fontWeight: '500', fontSize: '15px' }}
              >
                {IdCourse && IdCapsule ? 'Update Capsule' : 'Create capsule'}
              </Button>
            </div>
          </div>
        </FixedFooter>
      </Page>
    </>
  );
};

export default connect(({ courses, loading }) => ({
  getCourseContent: courses?.getCourseContent,
  getTopicCount: courses?.getTopicCount,
  loading: loading?.effects['courses/postCapsule'],
  loadingCount: loading?.effects['courses/getTopicCount'],
  loadingUpdateCapsule: loading?.effects['courses/updateCapsule'],
  loadingTableRowSave: loading?.effects['courses/createCapsuleTableRow'],
  loadingUpdateTableRow: loading?.effects['courses/capsuleTableRowUpdate'],
}))(CreateNewCapsule);
