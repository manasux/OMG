import { Button, Form, Select, Row, Col, message, Timeline } from 'antd';
import { connect, history } from 'umi';
import React, { useEffect, useState } from 'react';
import CheckValidation from '@/components/CheckValidation';
import dayjs from 'dayjs';
import AppIcons from '@/utils/AppIcons';
import classes from './index.less';
import CourseCard from './CourseCard';
import { currencyFormatter, decodeDollarsToDigits } from '@/utils/utils';
import PaymentMode from './PamentMode';
import moment from 'moment';
import EmptyState from '@/components/EmptyState';
import emptyStateSvg from '@/assets/icons/space-empty.svg';
import ReactHtmlParser from 'react-html-parser';

const UpgradeCourse = ({
  dispatch,
  setShowDrawer,
  showDrawer,
  editLead,
  id,
  allCourses,
  studentDetails,
  idx,
  type,
  getStudentCourses,
  studentActivity,
}) => {
  const [form] = Form.useForm();
  //   const { Option } = Select;
  const [
    courseSearch,
    // setCourseSearch
  ] = useState();

  const [courseList, setCourseList] = useState([]);
  const [installmentsLevel, setInstallmentsLevel] = useState([0]);
  const [paymentMode, setPaymentMode] = useState(false);
  const [types, setTypes] = useState('');
  const [addModule, setAddModule] = useState([]);
  const [checkIdx, setCheckIdx] = useState([]);

  const getStudentCourse = () => {
    dispatch({
      type: 'student/getStudentCourses',
      payload: {
        pathParams: {
          studentId: studentDetails?.id,
        },
      },
    });
  };

  const getCategory = () => {
    dispatch({
      type: 'courses/getCoursesCategory',
      payload: {},
    });
  };

  const getActivityRecord = () => {
    dispatch({
      type: 'student/getStudentOwnerActivity',
      payload: {
        pathParams: { studentId: id },
        query: {
          activityType: 'add_student_course',
          viewSize: 1000,
        },
      },
    });
  };
  useEffect(() => {
    getActivityRecord();
    getStudentCourse();
    if (!idx) {
      getCategory();
      dispatch({
        type: 'courses/getCourses',
        payload: {
          query: {},
        },
      });
    }
    // getActivity();
  }, [courseSearch, dispatch, editLead]);

  const getTimelineIcon = () => {
    return (
      <div
        className="flex items-center justify-center w-8 h-8 text-white rounded-full"
        style={{ backgroundColor: '#ffa500' }}
      >
        <AppIcons.PersonSquare />
      </div>
    );
  };

  const CourseID = [getStudentCourses?.studentCourses?.find((val) => val?.id === idx)];
  useEffect(() => {
    if (idx && getStudentCourses !== null) {
      const items = CourseID?.map((val) => ({
        basicAmount: val?.amount,
        addModulesCheckbox: val?.modules?.length > 0,
        subCourseCategory: val?.subCategoryName,
        courseCategory: val?.categoryName,
        productId: val?.id,
        courseType: val?.courseTypeId,
        startDate: moment(val?.startDate),
        endDate: moment(val?.endDate),
        noOfDays:
          moment(val?.endDate).endOf('day').diff(moment(val?.startDate).startOf('day'), 'days') + 1,
        // modulesItems:val?.modules?.map((itm)=>({...items,
        //   moduleBasicAmount:itm?.amount,
        //   moduleEndDate:moment(itm?.endDate),
        //   moduleStartDate:moment(itm?.startDate),
        //   moduleId:itm?.name,

        // })),
        modulesList: val?.modules?.map((itm) => itm?.id),
      }));

      form.setFieldsValue({
        language_course_category: CourseID?.map((val) => val?.name),
        items,
      });
    }
  }, [idx, getStudentCourses]);

  const mode = form.getFieldValue(['items', 0, 'courseType']);

  useEffect(() => {
    setTypes(mode);
  }, [mode]);

  const onCommentFinish = (value) => {
    const newValues = value;
    const items = newValues?.items?.map((val) => ({
      product: {
        courseTypeId: val?.courseType,
        id: val?.productId,
        amount: Number(decodeDollarsToDigits(val?.basicAmount)),
        durationUnitId: val?.durationUnitId,
        numOfDays: val?.noOfDays,
        startDate: val?.startDate?.toISOString(),
        endDate: val?.endDate?.toISOString(),
        courseModules: val?.addModulesCheckbox
          ? val?.modulesItems?.map((item) => ({
              id: item?.moduleId,
              startDate: item?.moduleStartDate?.toISOString(),
              endDate: item?.moduleEndDate?.toISOString(),
              numOfDays: item?.moduleNoOfDays,
              amount: Number(decodeDollarsToDigits(item?.moduleBasicAmount)),
              durationUnitId: item?.moduleDurationUnitId,
            }))
          : null,
        partyFees: [
          {
            amount: val?.feeTypeIdAdjustment
              ? Number(decodeDollarsToDigits(val?.adjustmentAmount))
              : 0,
            feeTypeId: val?.feeTypeIdAdjustment ? 'ADJUSTMENTS' : null,
            purpose: val?.feeTypeIdAdjustment ? val?.adjustmentPurpose : null,
            remarks: val?.feeTypeIdAdjustment ? val?.adjustmentRemarks : null,
          },
          {
            amount: val?.feeTypeIdOtherCharges
              ? Number(decodeDollarsToDigits(val?.otherAmount))
              : 0,
            feeTypeId: val?.feeTypeIdOtherCharges ? 'OTHER_CHARGES' : null,
            purpose: val?.feeTypeIdOtherCharges ? val?.otherPurpose : null,
            remarks: val?.feeTypeIdOtherCharges ? val?.otherRemarks : null,
          },
        ],
      },
    }));

    const feePayments = newValues?.feePayments?.map((val) => ({
      // totalFees: Number(decodeDollarsToDigits(newValues?.feePayment?.totalFees)),
      numOfInstallments: newValues?.feePayment?.numOfInstallments,
      dueDate: val?.dueDate?.toISOString(),
      amount: Number(decodeDollarsToDigits(val?.amount)),
    }));

    delete newValues?.language_course_category;
    delete newValues?.modulesList;

    const data = {
      items,
      addNewInstallments: paymentMode === 'New',
      feePayments: newValues?.feePayments ? feePayments : '',
    };

    if (paymentMode !== 'New') delete data.feePayments;

    dispatch({
      type: 'student/updateCourseDetails',
      payload: {
        body: data,
        pathParams: { studentId: id },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        message.success('Course  added successfully');
        history.push(`/students/${id}`);
      } else {
        message.error('Something went wrong!');
      }
    });
  };

  return (
    <div>
      <Form form={form} onFinish={onCommentFinish} hideRequiredMark autoComplete="off">
        <Row gutter={16}>
          <Col lg={24} xl={24} md={24} sm={24} xs={24}>
            <p className="font-medium text-gray-800">Courses</p>
            <Form.Item
              name="language_course_category"
              rules={[
                {
                  required: true,
                  message: 'Please select the course category',
                },
              ]}
            >
              <Select
                size="medium"
                mode="tags"
                placeholder={'Please list down the course category'}
                style={{ width: '100%' }}
                getPopupContainer={(node) => node.parentNode}
                onChange={(value) => {
                  let initialCourses = form?.getFieldValue('items') || [];
                  let initialItems = form.getFieldValue('items') || [];

                  if (initialCourses?.length < value?.length) {
                    const courseId = value[value?.length - 1];
                    dispatch({
                      type: 'courses/getCourseDetails',
                      payload: {
                        pathParams: {
                          courseId,
                        },
                      },
                    }).then((res) => {
                      if (res?.id) {
                        const newCourse = {
                          productId: value[value?.length - 1],
                          fees: res?.fees,
                          courseCategory: res?.categoryName,
                          categoryId: res?.categoryId,
                          subCategoryId: res?.subCategoryId,
                          subCourseCategory: res?.subCategoryName,
                          durationUnitId: res?.fees[0]?.feeDurationId,
                          displayName: res?.displayName,
                          courseModulesArray: res?.courseModules,
                          basicAmount: currencyFormatter.format(res?.fees[0]?.feeAmount),
                        };

                        let totalFees = 0;

                        if (form?.getFieldValue(['feePayment', 'totalFees'])) {
                          totalFees = Number(
                            decodeDollarsToDigits(form?.getFieldValue(['feePayment', 'totalFees'])),
                          );
                          totalFees += Number(decodeDollarsToDigits(newCourse?.basicAmount));
                        } else {
                          totalFees = Number(decodeDollarsToDigits(newCourse?.basicAmount));
                        }

                        initialCourses = [...initialCourses, newCourse];
                        initialItems = [...initialItems, newCourse];
                        form.setFieldsValue({
                          items: initialCourses,
                        });

                        form.setFieldsValue({
                          items: initialItems,
                          feePayment: { totalFees: currencyFormatter.format(totalFees) },
                        });
                        setCourseList(initialCourses);
                      }
                    });
                  } else {
                    const index = initialCourses?.findIndex(
                      (data) => !value?.includes(data?.productId),
                    );
                    initialCourses = initialCourses?.filter((data) =>
                      value?.includes(data?.productId),
                    );

                    let setTotal = 0;
                    const newItems = [];

                    form?.setFieldsValue({
                      items: initialCourses,
                    });

                    for (let i = 0; i < initialItems.length; i++) {
                      if (i !== index) {
                        newItems.push(initialItems[i] || undefined);
                      }

                      // [2m,1,2,3]
                      // [2m,2,3]
                    }

                    newItems?.forEach((val) => {
                      const checkModules = Object.keys(val);
                      if (
                        checkModules?.includes('modulesItems') ||
                        val?.modulesItems !== undefined
                      ) {
                        val?.modulesItems?.forEach((selectedAmt) => {
                          setTotal += Number(decodeDollarsToDigits(selectedAmt?.moduleBasicAmount));
                        });
                      } else {
                        setTotal += Number(decodeDollarsToDigits(val?.basicAmount || 0));
                      }

                      setTotal += Number(decodeDollarsToDigits(val?.otherAmount || 0));
                      setTotal -= Number(decodeDollarsToDigits(val?.adjustmentAmount || 0));
                    });

                    form?.setFieldsValue({
                      items: newItems,
                      feePayment: { totalFees: currencyFormatter.format(setTotal) },
                    });

                    setCourseList(initialCourses);
                  }
                }}
              >
                {allCourses?.records?.map((item) => (
                  <Select.Option value={item?.id} key={item?.id}>
                    {item?.displayName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {!idx && (
            <Col lg={24} xl={24} md={24} sm={24} xs={24}>
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                {courseList?.map((item, index) => (
                  <div className="mt-5" key={item?.id}>
                    <CourseCard
                      feeArray={item?.fees?.filter((fee) => fee?.feeAmount)}
                      courseList={courseList}
                      key={item?.productId}
                      id={item?.productId}
                      courseDisplayName={item?.displayName}
                      courseCategoryName={item?.courseCategory}
                      categoryId={item?.categoryId}
                      courseEdit={false}
                      courseSubCategoryName={item?.subCourseCategory}
                      subCategoryId={item?.subCategoryId}
                      courseModulesArray={item?.courseModulesArray}
                      index={index}
                      form={form}
                      setInstallmentsLevel={setInstallmentsLevel}
                      setPaymentMode={setPaymentMode}
                    />
                  </div>
                ))}
              </div>
              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                {courseList?.length > 0 && (
                  <div className="mt-5 bg-gray-100 border w-full">
                    <PaymentMode
                      form={form}
                      installmentsLevel={installmentsLevel}
                      setInstallmentsLevel={setInstallmentsLevel}
                      paymentMode={paymentMode}
                      setPaymentMode={setPaymentMode}
                    />
                  </div>
                )}
              </Col>
            </Col>
          )}

          {idx && (
            <Col lg={24} xl={24} md={24} sm={24} xs={24}>
              <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
                {CourseID?.map((item, index) => (
                  <div className="mt-5" key={item?.id}>
                    <CourseCard
                      feeArray={item?.fees?.filter((fee) => fee?.feeAmount)}
                      CourseID={[CourseID]}
                      key={item?.productId}
                      id={item?.productId}
                      type={idx}
                      types={types}
                      checkIdx={checkIdx}
                      setCheckIdx={setCheckIdx}
                      courseEdit
                      addModule={addModule}
                      setAddModule={setAddModule}
                      courseDisplayName={item?.name}
                      courseCategoryName={item?.categoryName}
                      categoryId={item?.categoryId}
                      courseSubCategoryName={item?.subCategoryName}
                      subCategoryId={item?.subCategoryId}
                      courseModulesArray={item?.modules}
                      index={index}
                      form={form}
                      paymentMode={paymentMode}
                      setInstallmentsLevel={setInstallmentsLevel}
                      setPaymentMode={setPaymentMode}
                    />
                  </div>
                ))}
              </div>

              <Col lg={24} xl={24} md={24} sm={24} xs={24}>
                {checkIdx?.length > 0 && (
                  <div className="mt-5 bg-gray-100 border w-full">
                    <PaymentMode
                      form={form}
                      installmentsLevel={installmentsLevel}
                      setInstallmentsLevel={setInstallmentsLevel}
                      paymentMode={paymentMode}
                      setPaymentMode={setPaymentMode}
                    />
                  </div>
                )}
              </Col>
            </Col>
          )}
        </Row>
        <div className="flex justify-end ">
          <div
            style={{
              bottom: 0,
              //   position: "absolute",
              marginTop: 25,
              marginRight: 20,
            }}
            className="flex justify-end "
          >
            <Button
              size="large"
              onClick={() => {
                setShowDrawer(!showDrawer);
                if (type !== 'edit') form.resetFields();
              }}
              className="mr-4"
            >
              Cancel
            </Button>

            <Button type="primary" size="large" onClick={() => form.submit()}>
              Update
            </Button>
          </div>
        </div>
        <div className="my-5 text-md font-semibold">Activity logs</div>
        <div className="flex justify-between ">
          <span>
            Showing{' '}
            <span className="text-blue-600 pr-1">{studentActivity?.records?.length || 0}</span>
            of <span className="text-green-600">{studentActivity?.totalCount || 0}</span>
          </span>
        </div>

        <CheckValidation
          show={studentActivity?.records?.length > 0}
          fallback={
            <EmptyState
              emptyState={emptyStateSvg}
              emptyHeaderText={<span>No course have been upgraded yet!</span>}
            />
          }
        />
        <div className={`px-5 ${classes.TimeLineIcon}`}>
          <Timeline className="w-full">
            {studentActivity?.records?.map((rec) => (
              <>
                <Timeline.Item dot={getTimelineIcon()} key={rec?.ownerId}>
                  <div className="flex justify-between pl-6">
                    <div className="flex-wrap w-full">
                      <div className="flex justify-between">
                        <div>
                          <span className="font-semibold text-blue-600">
                            {rec?.author?.displayName}
                          </span>{' '}
                          <span>{rec?.description}</span>
                        </div>
                        <div>
                          <div className="text-right text-gray-400">
                            <div className="text-xs italic text-gray-800">
                              {dayjs(rec?.startTime).fromNow()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        <p className="m-0">
                          {dayjs(rec?.startTime).format('MMM D, YYYY')} at{' '}
                          {dayjs(rec?.startTime).format('h:mm A')}
                        </p>
                      </div>
                      <div className="w-full rich text-container-div">
                        {ReactHtmlParser(rec?.dataDescription)}
                      </div>
                    </div>
                  </div>
                </Timeline.Item>
              </>
            ))}
          </Timeline>
        </div>
      </Form>
    </div>
  );
};

export default connect(({ leads, student, courses, user, batch }) => ({
  studentDetails: student?.studentDetails,
  getStudentCourses: student?.getStudentCourses,
  currentUser: user.currentUser,
  editLead: leads.editLead,
  allCourses: courses.allCourses,
  getCoursesCategory: courses?.getCoursesCategory,
  getCoursesSubCategory: courses?.getCoursesSubCategory,
  getCoursesFromSubCategory: courses?.getCoursesFromSubCategory,
  batchRecord: batch?.batchRecord,
  studentActivity: student?.getStudentOwnerActivity,
}))(UpgradeCourse);
