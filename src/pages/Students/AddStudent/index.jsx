import React, { useEffect } from 'react';
import Page from '@/components/Page';
import FixedFooter from '@/components/FixedFooter';
import { Form, Button, Row, Col, message } from 'antd';
import { useState } from 'react';
import { connect, history, useParams } from 'umi';
import { decodeDollarsToDigits } from '@/utils/utils';
import moment from 'moment';
import style from './index.less';
import StepsWrapper from './Steps/StepsWrapper';
import Breadcrumbs from '@/components/BreadCrumbs';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const AddStudent = ({ dispatch, studentLeadData, loadData }) => {
  const [firstForm] = Form.useForm();
  const [courseDetailsForm] = Form.useForm();
  const [feesDetailsForm] = Form.useForm();
  const [studentReferencesForm] = Form.useForm();
  const [parentDetailsForm] = Form.useForm();
  const [uploadDocumentForm] = Form.useForm();
  const [onCountryChange, setOnCountryChange] = useState('IN');
  const [addStudentOption, setAddStudentOption] = useState(false);
  const [checkUnmarried, setCheckUnmarried] = useState();
  const [gender, setGender] = useState();
  const [purposeChange, setPurposeChange] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [visaCategory, setVisaCategory] = useState([]);
  const [visaOption, setVisaOption] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [displayServicesDropBox, setDisplayServicesDropBox] = useState(false);
  const [displayOtherVisaDropBox, setDisplayOtherVisaDropBox] = useState(false);
  const [otherServicesChange, setOtherServicesChange] = useState();
  const [referenceBy, setReferenceBy] = useState([]);
  const [contents, setContents] = useState([]);
  const [leadId, setLeadId] = useState('');
  const [feePaymentLangSet, setFeePaymentLangSet] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [installmentsLevel, setInstallmentsLevel] = useState([0]);
  const [paymentMode, setPaymentMode] = useState();
  // eslint-disable-next-line no-unused-vars
  const [allValues, setAllValues] = useState(null);
  const [currentStepForStudent, setCurrentStepForStudent] = useState(0);
  const [contactMacId, setContactMacId] = useState({ partyAddressId: '', partyTelecomId: '' });
  const { partyId } = useParams();
  const [leadPartyId, setLeadPartyId] = useState(partyId);

  const [resizePurposeDetails, setResizePurposeDetails] = useState([
    { lg: 24 },
    { xl: 24 },
    { md: 24 },
    { sm: 24 },
    { xs: 24 },
  ]);
  const addStudentSteps = [
    {
      stepNo: 1,
      name: 'Basic details',
      value: 'basicDetails',
      color: currentStepForStudent === 0 ? 'bg-blue-300 shadow-md text-white' : '',
    },
    {
      stepNo: 2,
      name: 'Course details',
      value: 'purposeDetails',
      color: currentStepForStudent === 1 ? 'bg-blue-300 shadow-md text-white' : '',
    },
    {
      stepNo: 3,
      name: 'Fees details',
      value: 'feesDetails',
      color: currentStepForStudent === 2 ? 'bg-blue-300 shadow-md text-white' : '',
    },
    {
      stepNo: 4,
      name: 'Student references',
      value: 'studentReferences',
      color: currentStepForStudent === 3 ? 'bg-blue-300 shadow-md text-white' : '',
    },
    {
      stepNo: 5,
      name: 'Parent details',
      value: 'parentDetails',
      color: currentStepForStudent === 4 ? 'bg-blue-300 shadow-md text-white' : '',
    },
    {
      stepNo: 6,
      name: 'Upload documents',
      value: 'uploadDocuments',
      color: currentStepForStudent === 5 ? 'bg-blue-300 shadow-md text-white' : '',
    },
  ];

  const onNextClick = () => {
    if (currentStepForStudent !== 5) {
      setCurrentStepForStudent((prev) => prev + 1);
    }
  };

  const onBackClick = () => {
    setCurrentStepForStudent((prev) => prev - 1);
  };

  const onOptionChange = (e) => {
    setAddStudentOption(e.target.checked);
    if (!e.target.checked) {
      setFormDisabled(true);
      setLeadId('');
      firstForm.resetFields();
      courseDetailsForm.resetFields();
      studentReferencesForm.resetFields();
      parentDetailsForm.resetFields();
      uploadDocumentForm.resetFields();
      courseDetailsForm.setFieldsValue({
        courses: [],
        language_course_category: [],
        lookingFor: [],
      });
      setCourseList([]);
      setPurposeChange([]);
      setResizePurposeDetails([{ lg: 24 }, { xl: 24 }, { md: 24 }, { sm: 24 }, { xs: 24 }]);
    }
  };

  const getValues = () => courseDetailsForm.getFieldValue('visa');

  const payloadFunction = (value) => {
    const newValues = value;
    const references = newValues?.References?.map((val) => ({
      ...val,
      primaryPhone: {
        phone: val?.phone?.phone.slice(3, 10),
        areaCode: val?.phone?.phone.slice(0, 3),
        countryCode: val?.phone?.countryCode,
      },
    }));

    const emergencyContact = {
      ...newValues.emergencyContact,
      primaryPhone: {
        phone: newValues?.emergencyContact?.primaryPhone?.phone.slice(3, 10),
        areaCode: newValues?.emergencyContact?.primaryPhone?.phone.slice(0, 3),
        countryCode: newValues?.emergencyContact?.primaryPhone?.countryCode,
      },
    };

    const parents = newValues?.ParentDetails?.map((val) => ({
      ...val,
      income: Number(decodeDollarsToDigits(val?.income)),
      primaryPhone: {
        phone: val?.phone?.phone.slice(3, 10),
        areaCode: val?.phone?.phone.slice(0, 3),
        countryCode: val?.phone?.countryCode,
      },
    }));

    const qualifications = newValues?.qualifications?.map((val) => ({
      ...val,
      typeId: 'DEGREE',
      fromDate: val?.fromDate?.toISOString(),
      thruDate: val?.thruDate?.toISOString(),
    }));
    const items = newValues?.items?.map((val, index) => ({
      product: {
        courseTypeId: val?.courseType,
        id: val?.productId,
        amount: Number(decodeDollarsToDigits(newValues?.feeDetailsFormItems[index]?.basicAmount)),
        durationUnitId: newValues?.feeDetailsFormItems[index]?.durationUnitId,
        numOfDays: val?.noOfDays,
        startDate: val?.startDate?.toISOString(),
        endDate: val?.endDate?.toISOString(),
        courseModules: val?.addModulesCheckbox
          ? newValues?.feeDetailsFormItems[index]?.modulesItems?.map((item, idx) => ({
              id: val?.modulesList[idx],
              startDate: item?.moduleStartDate?.toISOString(),
              endDate: item?.moduleEndDate?.toISOString(),
              numOfDays: item?.moduleNoOfDays,
              amount: Number(decodeDollarsToDigits(item?.moduleBasicAmount)),
              durationUnitId: item?.moduleDurationUnitId,
            }))
          : null,
        partyFees: [
          {
            amount: newValues?.feeDetailsFormItems[index]?.feeTypeIdAdjustment
              ? Number(
                  decodeDollarsToDigits(newValues?.feeDetailsFormItems[index]?.adjustmentAmount),
                )
              : 0,
            feeTypeId: newValues?.feeDetailsFormItems[index]?.feeTypeIdAdjustment
              ? 'ADJUSTMENTS'
              : null,
            purpose: newValues?.feeDetailsFormItems[index]?.feeTypeIdAdjustment
              ? newValues?.feeDetailsFormItems[index]?.adjustmentPurpose
              : null,
            remarks: newValues?.feeDetailsFormItems[index]?.feeTypeIdAdjustment
              ? newValues?.feeDetailsFormItems[index]?.adjustmentRemarks
              : null,
          },
          {
            amount: newValues?.feeDetailsFormItems[index]?.feeTypeIdOtherCharges
              ? Number(decodeDollarsToDigits(newValues?.feeDetailsFormItems[index]?.otherAmount))
              : 0,
            feeTypeId: newValues?.feeDetailsFormItems[index]?.feeTypeIdOtherCharges
              ? 'OTHER_CHARGES'
              : null,
            purpose: newValues?.feeDetailsFormItems[index]?.feeTypeIdOtherCharges
              ? newValues?.feeDetailsFormItems[index]?.otherPurpose
              : null,
            remarks: newValues?.feeDetailsFormItems[index]?.feeTypeIdOtherCharges
              ? newValues?.feeDetailsFormItems[index]?.otherRemarks
              : null,
          },
        ],
      },
    }));
    const feePayments = newValues?.feePayments?.map((val) => ({
      totalFees: Number(decodeDollarsToDigits(newValues?.feePayment?.totalFees)),
      numOfInstallments: newValues?.feePayment?.numOfInstallments,
      dueDate: val?.dueDate?.toISOString(),
      amount: Number(decodeDollarsToDigits(val?.amount)),
    }));
    delete newValues?.feePayment;
    const body = {
      ...newValues,

      primaryPhone: {
        id: contactMacId?.partyTelecomId,
        phone: newValues?.primaryPhone?.phone.slice(3, 10),
        areaCode: newValues?.primaryPhone?.phone.slice(0, 3),
        countryCode: newValues?.primaryPhone?.countryCode,
      },
      address: { ...newValues?.address, id: contactMacId?.partyAddressId },
      dob: newValues?.dob?.toISOString(),
      references,
      feePayments,
      emergencyContact,
      parents,
      qualifications,
      lookingFor: newValues?.lookingFor,

      contents,
      items,
      issueDate: newValues?.issueDate?.toISOString(),
      expDate: newValues?.expDate?.toISOString(),
    };

    dispatch({
      type: 'student/addStudent',
      payload: {
        body,
        pathParams: {
          leadId,
        },
      },
    }).then((res) => {
      if (res?.status === 'ok') {
        history.push('/students/all');
        message.success('You have submitted your details successfully');
      }
      if (res?.data?.message?.includes('exists')) {
        message.error('Student with same email is already exists please enter different email');
      }
      if (res?.status === 'notok') {
        message.error(res?.data?.message);
      }
    });
  };
  const addStudentSubmitHandler = (values) => {
    const copyValue = values;

    if (currentStepForStudent === 2) {
      copyValue.feeDetailsFormItems = copyValue.items;
      delete copyValue.items;
    }
    setAllValues((prev) => {
      return { ...prev, ...copyValue };
    });
    if (currentStepForStudent === 5) {
      payloadFunction({ ...allValues, ...copyValue });
    }
  };

  useEffect(() => {
    firstForm.setFieldsValue({
      qualifications: [undefined],
    });
    studentReferencesForm.setFieldsValue({
      References: [undefined],
    });
    parentDetailsForm.setFieldsValue({
      ParentDetails: [undefined],
    });
    if (addStudentOption) {
      dispatch({
        type: 'leads/getStudentLeadData',
        payload: {
          query: {
            leadTypeId: 'LEAD_STUDENT',
            viewSize: 10000,
            isLead: true,
          },
        },
      });
    }
    dispatch({
      type: 'leads/getStaffMembers',
      payload: {
        query: {
          statusId: 'PARTYINV_SENT',
        },
      },
    }).then((res) => {
      setReferenceBy(res?.invitationList?.filter((items) => items?.id || items?.name));
    });
  }, [dispatch, addStudentOption, firstForm, parentDetailsForm, studentReferencesForm]);

  useEffect(() => {
    dispatch({
      type: 'courses/getCourses',
      payload: {
        query: { viewSize: 1000 },
      },
    });
    dispatch({
      type: 'student/getParentOccupations',
      payload: {},
    });
    if (leadId)
      dispatch({
        type: 'leads/getParticularStudentLeadData',
        payload: {
          query: {
            leadTypeId: 'LEAD_STUDENT',
          },
          pathParams: {
            leadId,
          },
        },
      }).then((leadInfo) => {
        setContactMacId({
          partyAddressId: leadInfo?.personContactDetails?.partyAddress?.contactMechId,
          partyTelecomId: leadInfo?.personContactDetails?.partyTelecom?.contactMechId,
        });
        if (leadInfo?.id) {
          setFormDisabled(false);
          const items = courseDetailsForm.getFieldValue('items') || [];
          setPurposeChange(leadInfo?.lookingFor?.map((info) => info?.description));
          setFeePaymentLangSet(true);
          const courses = leadInfo?.courses?.map((need, index) => {
            items[index] = {
              ...items[index],
              displayName: need?.name,
              productId: need?.id,
              courseCategory: need?.categoryName,
              categoryId: need?.categoryId,
              subCourseCategory: need?.subCategoryName,
              subCategoryId: need?.subCategoryId,
              addModulesCheckbox: need?.modules?.length > 0 ? true : undefined,
              modulesList: need?.modules?.map((val) => val?.id),
              modulesItems: need?.modules?.map((item) => {
                return {
                  ...item,
                  moduleId: item?.id,
                  displayName: item?.name,
                };
              }),
              courseModulesArray: need?.allModules?.map((val) => {
                return { ...val, moduleId: val?.id, displayName: val?.name };
              }),
              fees: need?.fees,
            };
            return {
              ...need,
              productId: need?.id,
              courseCategory: need?.categoryName,
              categoryId: need?.categoryId,
              subCategoryId: need?.subCategoryId,
              subCourseCategory: need?.subCategoryName,
              displayName: need?.name,
              modulesList: need?.modules?.map((val) => val?.id),
              modulesItems: need?.modules?.map((item) => {
                return {
                  ...item,
                  moduleId: item?.id,
                  displayName: item?.name,
                };
              }),
              courseModulesArray: need?.allModules?.map((val) => {
                return { ...val, displayName: val?.name, moduleId: val?.id };
              }),
            };
          });
          setCourseList(courses);
          setOnCountryChange(leadInfo?.personContactDetails?.partyAddress?.countryGeoId);

          courseDetailsForm.setFieldsValue({
            items,
            lookingFor: leadInfo?.lookingFor?.map((info) => info?.description),
            language_course_category: leadInfo?.courses?.map((need) => need?.id),
          });
          feesDetailsForm.setFieldsValue({
            items,
          });
          const qualificationDetails = leadInfo?.qualifications?.map((item) => {
            return {
              qualificationTypeId: item?.description?.toUpperCase(),
              fromDate: moment(item?.fromDate),
              thruDate: moment(item?.thruDate),
            };
          });
          firstForm.setFieldsValue({
            prefix: leadInfo?.personalTitle,
            firstName: leadInfo?.firstName,
            middleName: leadInfo?.middleName,
            lastName: leadInfo?.lastName,
            primaryEmail: leadInfo?.email,
            dob: moment(leadInfo?.dob),
            gender: leadInfo?.gender?.toUpperCase(),
            maritalStatus: leadInfo?.maritalStatus === 'Married' ? 'MARRIED' : 'UNMARRIED',
            guardianName: leadInfo?.guardianName,
            primaryPhone: {
              countryCode: leadInfo?.personContactDetails?.partyTelecom?.countryCode,
              phone: leadInfo?.personContactDetails?.partyTelecom?.areaCode?.concat(
                leadInfo?.personContactDetails?.partyTelecom?.contactNumber,
              ),
            },

            qualifications: qualificationDetails,
            address: {
              addressLine1: leadInfo?.personContactDetails?.partyAddress?.address1,
              city: leadInfo?.personContactDetails?.partyAddress?.city,
              postalCode: leadInfo?.personContactDetails?.partyAddress?.postalCode,
              countryCode: leadInfo?.personContactDetails?.partyAddress?.countryGeoId,
              stateCode: leadInfo?.personContactDetails?.partyAddress?.stateProvinceGeoId,
            },
          });

          if (leadInfo?.maritalStatus === 'Unmarried') {
            setCheckUnmarried('UNMARRIED');
          }
          if (leadInfo?.maritalStatus === 'Married') {
            setCheckUnmarried('MARRIED');
          }
          if (leadInfo?.gender === 'Female') {
            setGender('FEMALE');
          }
          if (leadInfo?.gender === 'Male') {
            setGender('MALE');
          }
        }
      });
  }, [dispatch, leadId, courseDetailsForm, firstForm, feesDetailsForm]);

  const studentLeadList = studentLeadData?.records?.filter((item) => item?.displayName);
  useEffect(() => {
    if (leadPartyId) {
      setLeadId(leadPartyId);
      firstForm.setFieldsValue({
        selectStudentLead: partyId,
      });
      setAddStudentOption(true);
    }
  }, [partyId, firstForm, studentLeadList]);

  return (
    <Form.Provider
      onFormFinish={(_, { values, forms }) => {
        addStudentSubmitHandler(values, forms);
      }}
    >
      <Page
        title={<h1 className="text-xl font-semibold text-blue-900 capitalize">Add student</h1>}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'students',
                path: '/students',
              },
              {
                name: 'new',
                path: '/students/new',
              },
            ]}
          />
        }
      >
        <div className="flex flex-nowrap justify-center w-full space-x-0.5">
          {addStudentSteps?.map((item) => (
            <div
              key={item?.value}
              className={`text-base md:text-sm sm:text-xs ${item?.color} ${
                item?.stepNo < currentStepForStudent + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-black'
              } font-semibold p-2 ${item?.stepNo === 6 && 'rounded-r-full'} ${
                item?.stepNo === 1 && 'rounded-l-full'
              } shadow-lg w-1/5 text-center h-max py-1`}
            >
              {item?.stepNo}. {item?.name}
            </div>
          ))}
        </div>

        {/* Student step label */}

        <div className={`${style.stepsMarginWrapperClass} mt-12`}>
          <div className={`${style.uploadStyleOverrideWrapper}  mt-5 `}>
            <StepsWrapper
              purpose="Add student"
              formDisabled={formDisabled}
              onNextClick={onNextClick}
              onBackClick={onBackClick}
              onOptionChange={onOptionChange}
              setLeadId={setLeadId}
              leadId={leadId}
              setLeadPartyId={setLeadPartyId}
              setFormDisabled={setFormDisabled}
              studentLeadList={studentLeadList}
              addStudentOption={addStudentOption}
              currentStepForStudent={currentStepForStudent}
              setCurrentStepForStudent={setCurrentStepForStudent}
              firstForm={firstForm}
              courseDetailsForm={courseDetailsForm}
              feesDetailsForm={feesDetailsForm}
              studentReferencesForm={studentReferencesForm}
              parentDetailsForm={parentDetailsForm}
              uploadDocumentForm={uploadDocumentForm}
              phoneType="primaryPhone"
              checkUnmarried={checkUnmarried}
              setCheckUnmarried={setCheckUnmarried}
              gender={gender}
              setGender={setGender}
              addStudentStepsArray={addStudentSteps}
              // Address details states
              onCountryChange={onCountryChange}
              setOnCountryChange={setOnCountryChange}
              // course visa details states
              setPurposeChange={setPurposeChange}
              setCourseList={setCourseList}
              setVisaCategory={setVisaCategory}
              setVisaOption={setVisaOption}
              setSelectedService={setSelectedService}
              setDisplayServicesDropBox={setDisplayServicesDropBox}
              purposeChange={purposeChange}
              // Student course details states
              courseList={courseList}
              feePaymentLangSet={feePaymentLangSet}
              setFeePaymentLangSet={setFeePaymentLangSet}
              resizePurposeDetails={resizePurposeDetails}
              setResizePurposeDetails={setResizePurposeDetails}
              installmentsLevel={installmentsLevel}
              setInstallmentsLevel={setInstallmentsLevel}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              //  Student visa details
              getValues={getValues}
              visaCategory={visaCategory}
              displayOtherVisaDropBox={displayOtherVisaDropBox}
              setDisplayOtherVisaDropBox={setDisplayOtherVisaDropBox}
              visaOption={visaOption}
              // student other services
              displayServicesDropBox={displayServicesDropBox}
              otherServicesChange={otherServicesChange}
              setOtherServicesChange={setOtherServicesChange}
              selectedService={selectedService}
              referenceBy={referenceBy}
              // Upload document details
              contents={contents}
              setContents={setContents}
            />
          </div>
        </div>
      </Page>

      <FixedFooter classes="text-right">
        <div
          className="flex m-auto"
          style={{
            maxWidth: '87.5rem',
          }}
        >
          <div className="w-full ml-5">
            <Row gutter={10}>
              <div
                className={`flex ${
                  currentStepForStudent > 0 && onBackClick ? 'justify-between ' : 'justify-end '
                } w-full`}
              >
                {currentStepForStudent > 0 && onBackClick && (
                  <Col className="">
                    <Button
                      onClick={() => onBackClick('Course details')}
                      type="default"
                      block
                      size="large"
                    >
                      <ArrowLeftOutlined />
                      Previous step
                    </Button>
                  </Col>
                )}
                <Col style={{ marginRight: '20px' }}>
                  <Button
                    onClick={() => {
                      switch (currentStepForStudent) {
                        case 0:
                          firstForm.submit();
                          break;
                        case 1:
                          courseDetailsForm.submit();
                          break;
                        case 2:
                          feesDetailsForm.submit();
                          break;
                        case 3:
                          studentReferencesForm.submit();
                          break;
                        case 4:
                          parentDetailsForm.submit();
                          break;
                        case 5:
                          uploadDocumentForm
                            .validateFields()
                            .then(() => uploadDocumentForm.submit());
                          break;

                        default:
                          break;
                      }
                    }}
                    type="primary"
                    block
                    size="large"
                    loading={loadData}
                  >
                    {currentStepForStudent === 5 ? (
                      'Add student'
                    ) : (
                      <span>
                        Save & proceed <ArrowRightOutlined />
                      </span>
                    )}
                  </Button>
                </Col>
              </div>
            </Row>
          </div>
        </div>
      </FixedFooter>
    </Form.Provider>
  );
};

export default connect(({ leads, courses, loading }) => ({
  studentLeadData: leads?.leadData,
  allCourses: courses?.allCourses,
  loadData: loading.effects['student/addStudent'],
}))(AddStudent);
