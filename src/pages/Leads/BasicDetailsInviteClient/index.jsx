import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'umi';
import PhoneNumber from '@/components/PhoneNumber';
import { Form, Input, Row, Col, Select, Divider, Checkbox } from 'antd';
import AlternateMobileNo from './AlternateMobileNo';
import { debounce } from 'lodash-es';
import { callApi } from '@/utils/apiUtils';

const BasicDetailsForm = ({ form, leadData }) => {
  const [optionChange, setOptionChange] = useState(false);
  const [chooseFromLead, setChooseFromLead] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const { Option } = Select;

  const dispatch = useDispatch();

  const referenceList = [
    {
      id: 'WEB_SITE',
      label: 'Web Site Enquiry',
    },
    {
      id: 'OFFICE_WALK_IN',
      label: 'Office Walk In',
    },
    {
      id: 'EMPLOYEE',
      label: 'Staff Reference',
    },
  ];

  const purposeList = [
    {
      id: 'SOFTWARE',
      value: 'Software',
    },
    {
      id: 'SERVICE_SOFTWARE',
      value: 'Service And Software',
    },
    {
      id: 'Courses',
      value: 'Courses',
    },
    {
      id: 'VISA',
      value: 'Visa',
    },
    {
      id: 'OTHERS',
      value: 'Others',
    },
  ];

  const getStaffList = (keyword) =>
    dispatch({
      type: 'staff/getStaffList',
      payload: {
        query: {
          statusId: 'PARTYINV_ACCEPTED',
          viewSize: 10000,
          keyword,
        },
      },
    }).then((res) => {
      setStaffList(res);
    }).catch;

  const debounceSearchStaff = debounce(getStaffList, 400);

  const onOptionChange = (changes) => {
    if (changes === 'Staff Reference') {
      setOptionChange(true);
    } else {
      setOptionChange(false);
      form?.setFieldsValue({
        referredBy: '',
      });
    }
  };

  const getClientData = (key) =>
    dispatch({
      type: 'leads/getClientLeadData',
      payload: {
        query: {
          leadTypeId: 'LEAD_CUSTOMER',
          isLeadExpired: false,
          isAppointment: false,
          isCallBack: false,
          contactDataSourceId: '',
          keyword: key,
          viewSize: 1000,
        },
      },
    });

  const debounceSearch = debounce(getClientData, 400);

  const getParticularLeadData = (leadId) => {
    return dispatch({
      type: 'leads/getParticularStudentLeadData',
      payload: {
        pathParams: {
          leadId,
        },
      },
    }).then((res) => {
      onOptionChange(res?.leadDataSource?.description);
      form.setFieldsValue({
        clientName: res?.companyName,
        address: {
          addressLine1: res?.primaryAddress?.address1,
          city: res?.primaryAddress?.city,
          stateCode: res?.primaryAddress?.stateProvinceGeoId,
          postalCode: res?.primaryAddress?.postalCode,
          countryCode: res?.primaryAddress?.countryGeoId,
        },
        salutation: res?.personalTitle,
        firstName: res?.firstName,
        lastName: res?.lastName,
        middleName: res?.middleName,
        clientPoc: {
          primaryPhone: {
            phone:
              res?.personContactDetails?.partyTelecom?.areaCode +
              res?.personContactDetails?.partyTelecom?.contactNumber,
          },
          primaryEmail: res?.personContactDetails?.partyEmails[0]?.emailAddress,
        },
        lookingFor: res?.lookingFor?.map((data) => data?.description),
        reference: res?.leadDataSource?.description,
        referredBy:
          res?.leadDataSource?.description === 'Staff Reference'
            ? { id: res?.leadReference?.partyId }
            : undefined,
      });
    });
  };
  useEffect(() => {
    getStaffList('');
    getClientData('');
  }, []);

  return (
    <div className="">
      <div className="mb-5 bg-white rounded-lg shadow">
        <div className="flex justify-between">
          <p className="px-5 pt-5 text-base font-semibold text-gray-800">Company details</p>
          <div className="px-5 pt-5">
            <Checkbox
              onChange={(ev) => {
                setChooseFromLead(ev.target.checked);
              }}
            >
              <span className="font-semibold">Choose from lead</span>
            </Checkbox>
            {chooseFromLead && (
              <Select
                style={{ width: '250px' }}
                showSearch
                filterOption={false}
                onSearch={debounceSearch}
                notFoundContent={null}
                getPopupContainer={(node) => node.parentNode}
                onSelect={(id) => {
                  getParticularLeadData(id);
                }}
              >
                {leadData?.records?.map((data) => (
                  <Option key={data?.id}>{data?.company?.name}</Option>
                ))}
              </Select>
            )}
          </div>
        </div>
        <Divider />
        <div className="px-5 pb-3">
          <Row gutter={16}>
            <Col lg={6} xl={6} md={12} sm={18} xs={24}>
              <div className="block mb-2 font-medium text-gray-800">Company name</div>
              <Form.Item
                name="clientName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter company name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter company name here" maxLength={100} />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Email </span>
              <Form.Item
                name="primaryEmail"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Email can't be blank!",
                  },
                  ({ getFieldError }) => ({
                    validator(rule, value) {
                      const a = getFieldError('email');
                      if (
                        a.includes("'email' is not a valid email") ||
                        !value ||
                        value.length < 2
                      ) {
                        return Promise.resolve();
                      }
                      return callApi(
                        {
                          uriEndPoint: {
                            uri: '/user/isExistingLoginId',
                            method: 'GET',
                            version: '/xapi/v1',
                          },
                          query: {
                            user_id: value,
                          },
                        },
                        {
                          disableNotifications: true,
                        },
                      )
                        .then(() => Promise.resolve())

                        .catch(() =>
                          Promise.reject(
                            new Error('Email already exists. Try again with another email!'),
                          ),
                        );
                    },
                  }),
                  {
                    message: 'Please enter a valid email address!',
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  },
                ]}
              >
                <Input size="large" type="email" placeholder="john.doe@domain.com" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Phone</span>
              <PhoneNumber
                countryCode={['primaryPhone', 'countryCode']}
                rules={[
                  {
                    required: true,
                    message: "Phone number can't be blank!",
                    min: 10,
                    len: 10,
                  },
                ]}
                form={form}
                name={['primaryPhone', 'phone']}
                placeholder="#####-#####"
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="mb-5 bg-white rounded-lg shadow">
        <p className="px-5 pt-5 text-base font-semibold text-gray-800">Person of contact details</p>
        <Divider />
        <div className="px-5 pb-3">
          <Row gutter={16}>
            <Col lg={3} xl={3} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Title</span>
              <Form.Item
                name="salutation"
                rules={[
                  {
                    required: true,
                    message: 'Please select Title!',
                  },
                ]}
                initialValue="Mr"
              >
                <Select
                  size="large"
                  placeholder="Title"
                  getPopupContainer={(node) => node.parentNode}
                >
                  <Option value="Mr">Mr</Option>
                  <Option value="Miss">Miss</Option>
                  <Option value="Mrs">Mrs</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={7} xl={7} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">First name</span>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter first name! ',
                  },
                ]}
              >
                <Input size="large" placeholder="First name of contact person" />
              </Form.Item>
            </Col>
            <Col lg={7} xl={7} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Middle name (Optional)</span>
              <Form.Item name="middleName">
                <Input size="large" placeholder="Middle name of contact person" />
              </Form.Item>
            </Col>
            <Col lg={7} xl={7} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Last name </span>
              <Form.Item name="lastName">
                <Input size="large" placeholder="Last name of contact person" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={8} sm={24} xs={24} style={{ marginBottom: 0, paddingBottom: 0 }}>
              <span className="block mb-2 font-medium text-gray-800">Email </span>
              <Form.Item
                name={['clientPoc', 'primaryEmail']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Email can't be blank!",
                  },
                  ({ getFieldError }) => ({
                    validator(rule, value) {
                      const a = getFieldError('email');
                      if (
                        a.includes("'email' is not a valid email") ||
                        !value ||
                        value.length < 2
                      ) {
                        return Promise.resolve();
                      }
                      return callApi(
                        {
                          uriEndPoint: {
                            uri: '/user/isExistingLoginId',
                            method: 'GET',
                            version: '/xapi/v1',
                          },
                          query: {
                            user_id: value,
                          },
                        },
                        {
                          disableNotifications: true,
                        },
                      )
                        .then(() => Promise.resolve())

                        .catch(() =>
                          Promise.reject(
                            new Error('Email already exists. Try again with another email!'),
                          ),
                        );
                    },
                  }),
                  {
                    message: 'Please enter a valid email address!',
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  },
                ]}
              >
                <Input size="large" type="email" placeholder="john.doe@domain.com" />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Phone</span>
              <PhoneNumber
                countryCode={['clientPoc', 'primaryPhone', 'countryCode']}
                rules={[
                  {
                    required: true,
                    message: "Phone number can't be blank!",
                    min: 10,
                    len: 10,
                  },
                ]}
                form={form}
                name={['clientPoc', 'primaryPhone', 'phone']}
                placeholder="#####-#####"
              />
            </Col>
            <Col xl={6} lg={6} md={8} sm={24} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Alternate (Optional)</span>
              <AlternateMobileNo
                countryCode={['alternatePhone', 'countryCode']}
                form={form}
                name={['alternatePhone', 'phone']}
                placeholder="#####-#####"
              />
            </Col>
            <Col xl={6} lg={6} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Purpose</span>
              <Form.Item
                name="lookingFor"
                rules={[{ required: true, message: 'Please select purpose here!' }]}
              >
                <Select
                  style={{ width: '100%' }}
                  size="large"
                  mode="tags"
                  tokenSeparators={[',']}
                  placeholder="Select your purpose"
                  getPopupContainer={(node) => node.parentNode}
                >
                  {purposeList?.map((item) => (
                    <Option value={item?.value} key={item?.id}>
                      {item?.value}{' '}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={18} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Reference (Optional)</span>
              <Form.Item name="reference">
                <Select
                  size="large"
                  placeholder="Enter reference"
                  getPopupContainer={(node) => node.parentNode}
                  onChange={onOptionChange}
                >
                  {referenceList.map((item) => (
                    <Option value={item.label} key={item?.id}>
                      {' '}
                      {item.label}{' '}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {optionChange && (
              <Col xl={6} lg={6} md={12} sm={18} xs={24}>
                <span className="block mb-2 font-medium text-gray-800">
                  Reference by (Optional)
                </span>
                <Form.Item name={['referredBy', 'id']}>
                  <Select
                    size="large"
                    placeholder="Reference by"
                    filterOption={false}
                    onSearch={debounceSearchStaff}
                    getPopupContainer={(node) => node.parentNode}
                  >
                    {staffList?.records?.map((item) => (
                      <Option value={item.partyId} key={item?.partyId}>
                        {item.displayName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default connect(({ leads }) => ({
  leadData: leads?.leadData,
}))(BasicDetailsForm);
