import React from 'react';
import { Form, Row, Col, Select, Divider } from 'antd';
import { connect } from 'umi';
import CourseModulesCard from '@/pages/Students/AddLead/CourseModulesCard';
import { currencyFormatter, decodeDollarsToDigits } from '@/utils/utils';
// import StudentVisaDetails from '../../../StudentVisaDetails';
// import StudentOtherServices from '../../../StudentOtherServices';
import Card from '@/components/Structure/Card';

const Step2CourseDetails = ({
  dispatch,
  onNextClick,
  courseDetailsForm,
  feesDetailsForm,
  currentStepForStudent,
  className,
  setPurposeChange,
  purposeChange,
  setCourseList,
  // setVisaCategory,
  // setVisaOption,
  // setSelectedService,
  // setDisplayServicesDropBox,
  purpose,
  courseList,
  setInstallmentsLevel,
  setPaymentMode,
  feePaymentLangSet,
  setFeePaymentLangSet,
  allCourses,
  resizePurposeDetails,
  setResizePurposeDetails,
  // Student visa details
  // getValues,
  // visaCategory,
  // displayOtherVisaDropBox,
  // setDisplayOtherVisaDropBox,
  // visaOption,
  // Student other services
  // displayServicesDropBox,

  // otherServicesChange,
  // setOtherServicesChange,
  // selectedService,
  // referenceBy,
}) => {
  const purposeChangeHandler = (e) => {
    if (e === 'Courses') {
      courseDetailsForm.setFieldsValue({
        courses: [],
        language_course_category: [],
      });
      courseDetailsForm.resetFields();
      feesDetailsForm.resetFields();
      setCourseList([]);
      setResizePurposeDetails([{ lg: 24 }, { xl: 24 }, { md: 24 }, { sm: 24 }, { xs: 24 }]);
    }
  };

  /* Needs confirmation from the client for the visa and other services */
  // if (e === 'Visa') {
  //   courseDetailsForm.setFieldsValue({
  //     visa: [],
  //     visa_category: [],
  //     category_other: [],
  //     country: [],
  //     other_country: [],
  //     otherCountryForAppliedVisa: [],
  //     otherVisaCategory: [],
  //   });
  //   setVisaCategory([]);
  //   setVisaOption([]);
  // }

  //   if (e === 'Others') {
  //     setSelectedService([]);
  //     setDisplayServicesDropBox(false);
  //     courseDetailsForm.setFieldsValue({
  //       service_category: [],
  //       service_Other: [],
  //       emp_name: [],
  //       otherServices: [],
  //     });
  //   }
  // };

  const onPurposeChange = (purposes) => {
    if (purposes.includes('Courses')) {
      setResizePurposeDetails([{ lg: 12 }, { xl: 12 }, { md: 12 }, { sm: 24 }, { xs: 24 }]);
    }
    setPurposeChange(purposes);
  };

  return (
    <div className={className} key={currentStepForStudent}>
      <Form
        hideRequiredMark
        size="large"
        form={courseDetailsForm}
        onFinish={() => {
          onNextClick();
        }}
        name="coursesForm"
      >
        <div className="mt-5">
          <Card>
            <h2 className="p-5 text-base font-semibold text-gray-800">Purpose details</h2>
            <Divider style={{ margin: '0' }} />
            <div className="px-4 mt-4">
              <Row gutter={12}>
                <Col
                  lg={resizePurposeDetails[0]?.lg}
                  xl={resizePurposeDetails[1]?.xl}
                  md={resizePurposeDetails[2]?.md}
                  sm={resizePurposeDetails[3].sm}
                  xs={resizePurposeDetails[4]?.xs}
                >
                  <p className="font-medium text-gray-800">Purposes</p>
                  <Form.Item
                    name="lookingFor"
                    rules={[{ required: true, message: 'Please enter purpose' }]}
                  >
                    <Select
                      size="large"
                      mode="tags"
                      placeholder="Please list down the purpose"
                      getPopupContainer={(node) => node.parentNode}
                      onDeselect={purposeChangeHandler}
                      style={{ width: '100%' }}
                      onChange={onPurposeChange}
                    >
                      <Select.Option value="Courses" key="Courses">
                        Courses
                      </Select.Option>
                      <Select.Option value="Visa" key="Visa" disabled>
                        Visa
                      </Select.Option>
                      <Select.Option value="Others" key="Others" disabled>
                        Other Services
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {purposeChange?.includes('Courses') && (
                  <Col
                    lg={resizePurposeDetails[0]?.lg}
                    xl={resizePurposeDetails[1]?.xl}
                    md={resizePurposeDetails[2]?.md}
                    sm={resizePurposeDetails[3].sm}
                    xs={resizePurposeDetails[4]?.xs}
                  >
                    <p className="font-medium text-gray-800">Courses</p>
                    <Form.Item
                      name="language_course_category"
                      rules={[
                        {
                          required: true,
                          message: 'Please select any course',
                        },
                      ]}
                    >
                      <Select
                        size="large"
                        mode="tags"
                        placeholder="Please select the category"
                        style={{ width: '100%' }}
                        getPopupContainer={(node) => node.parentNode}
                        onChange={(value) => {
                          if (purpose === 'Add student') {
                            setFeePaymentLangSet(true);
                          }

                          let initialCourses = courseDetailsForm?.getFieldValue('items') || [];
                          let initialItems = feesDetailsForm.getFieldValue('items') || [];

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

                                if (feesDetailsForm?.getFieldValue(['feePayment', 'totalFees'])) {
                                  totalFees = Number(
                                    decodeDollarsToDigits(
                                      feesDetailsForm?.getFieldValue(['feePayment', 'totalFees']),
                                    ),
                                  );
                                  totalFees += Number(
                                    decodeDollarsToDigits(newCourse?.basicAmount),
                                  );
                                } else {
                                  totalFees = Number(decodeDollarsToDigits(newCourse?.basicAmount));
                                }

                                initialCourses = [...initialCourses, newCourse];
                                initialItems = [...initialItems, newCourse];
                                courseDetailsForm.setFieldsValue({
                                  items: initialCourses,
                                });

                                feesDetailsForm.setFieldsValue({
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

                            courseDetailsForm?.setFieldsValue({
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
                                  setTotal += Number(
                                    decodeDollarsToDigits(selectedAmt?.moduleBasicAmount),
                                  );
                                });
                              } else {
                                setTotal += Number(decodeDollarsToDigits(val?.basicAmount || 0));
                              }

                              setTotal += Number(decodeDollarsToDigits(val?.otherAmount || 0));
                              setTotal -= Number(decodeDollarsToDigits(val?.adjustmentAmount || 0));
                            });

                            feesDetailsForm?.setFieldsValue({
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
                )}
              </Row>
            </div>
          </Card>
          {purpose === 'Add student' && feePaymentLangSet && (
            <div>
              {courseList?.map((item, index) => (
                <div className="mt-5" key={item?.id}>
                  <CourseModulesCard
                    feeArray={item?.fees?.filter((fee) => fee?.feeAmount)}
                    courseList={courseList}
                    key={item?.productId}
                    id={item?.productId}
                    index={index}
                    courseDisplayName={item?.displayName}
                    courseCategoryName={item?.courseCategory}
                    categoryId={item?.categoryId}
                    courseSubCategoryName={item?.subCourseCategory}
                    subCategoryId={item?.subCategoryId}
                    courseDetailsForm={courseDetailsForm}
                    feesDetailsForm={feesDetailsForm}
                    courseModulesArray={item?.courseModulesArray}
                    setInstallmentsLevel={setInstallmentsLevel}
                    setPaymentMode={setPaymentMode}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Needs confirmation from the client for the visa and other services */}

          {/* {purposeChange?.includes('Visa') && (
            <div className="mt-5">
              <Card>
                <h2 className="p-5 text-base font-semibold text-gray-800">Visa details</h2>
                <Divider style={{ margin: '0' }} />
                <Card.Section>
                  <StudentVisaDetails
                    courseDetailsForm={courseDetailsForm}
                    purpose={purpose}
                    getValues={getValues}
                    visaCategory={visaCategory}
                    setVisaCategory={setVisaCategory}
                    displayOtherVisaDropBox={displayOtherVisaDropBox}
                    setDisplayOtherVisaDropBox={setDisplayOtherVisaDropBox}
                    visaOption={visaOption}
                    setVisaOption={setVisaOption}
                  />
                </Card.Section>
              </Card>
            </div>
          )} */}
          {/* {purposeChange?.includes('Others') && (
            <div className="mt-5">
              <Card>
                <h2 className="p-5 text-base font-semibold text-gray-800">Other services</h2>
                <Divider style={{ margin: '0' }} />
                <Card.Section>
                  <StudentOtherServices
                    courseDetailsForm={courseDetailsForm}
                    purpose={purpose}
                    displayServicesDropBox={displayServicesDropBox}
                    setDisplayServicesDropBox={setDisplayServicesDropBox}
                    otherServicesChange={otherServicesChange}
                    setOtherServicesChange={setOtherServicesChange}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    referenceBy={referenceBy}
                  />
                </Card.Section>
              </Card>
            </div>
          )} */}
        </div>
      </Form>
    </div>
  );
};

export default connect(({ courses }) => ({
  allCourses: courses?.allCourses,
}))(Step2CourseDetails);
