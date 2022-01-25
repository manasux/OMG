import React from 'react';
import { Form, Row, Col, Input, Radio, Select, DatePicker } from 'antd';
import PhoneNumber from '@/components/PhoneNumber';
import UploadAvatar from '@/components/UploadAvatar';
import { callApi } from '@/utils/apiUtils';

const { Option } = Select;

const BasicDetails = ({
  form,
  checkUnmarried,
  setCheckUnmarried,
  gender,
  setGender,
  setCode,
  purpose,
  leadId,
}) => {
  const onChange = (e) => {
    setCheckUnmarried(e.target.value);
    if (gender === 'FEMALE') {
      form.setFieldsValue({
        guardianName: '',
      });
    }
  };
  const onGenderChange = (e) => {
    setGender(e.target.value);
    form.setFieldsValue({
      guardianName: '',
    });
  };

  return (
    <div className="">
      {purpose === 'Add student' && <UploadAvatar />}
      <div className="mt-5">
        <Row gutter={12}>
          <Col xl={3} lg={3} md={3} sm={24} xs={24}>
            <p className="font-medium text-gray-800">Title</p>
            <Form.Item
              name="prefix"
              rules={[
                {
                  required: true,
                  message: 'Please select title',
                },
              ]}
            >
              <Select
                getPopupContainer={(node) => node.parentNode}
                size="large"
                placeholder="Select title"
              >
                <Option value="Mr">Mr</Option>
                <Option value="Miss">Miss</Option>
                <Option value="Mrs">Mrs</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={7} lg={7} md={7} sm={24} xs={24}>
            <p className="font-medium text-gray-800 ">First name</p>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your first name',
                },
              ]}
            >
              <Input autocomplete="off" size="large" placeholder="First name of student" />
            </Form.Item>
          </Col>
          <Col xl={7} lg={7} md={7} sm={24} xs={24}>
            <p className="font-medium text-gray-800">Middle name &#x00028;optional&#x00029;</p>
            <Form.Item name="middleName">
              <Input autocomplete="off" size="large" placeholder="Middle name of student" />
            </Form.Item>
          </Col>
          <Col xl={7} lg={7} md={7} sm={24} xs={24}>
            <p className="font-medium text-gray-800">Last name</p>
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please enter your Last name',
                },
              ]}
            >
              <Input autocomplete="off" size="large" placeholder="Last name of student" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <p className="font-medium text-gray-800 ">Phone</p>
            <PhoneNumber
              setCode={setCode}
              countryCode={['phone', 'countryCode']}
              rules={[
                {
                  required: true,
                  message: "Phone number can't be blank",
                  min: 10,
                  len: 10,
                },
              ]}
              form={form}
              name={['phone', 'phone']}
              placeholder="#####-#####"
            />
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <p className="font-medium text-gray-800 ">Alternate phone (Optional)</p>
            <PhoneNumber
              setCode={setCode}
              countryCode={['alternatePhone', 'countryCode']}
              form={form}
              name={['alternatePhone', 'phone']}
              placeholder="#####-#####"
              rules={[
                {
                  required: false,
                  message: "Phone number can't be blank",
                  min: 10,
                  len: 10,
                },
              ]}
            />
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <p className="font-medium text-gray-800">Email</p>
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
                    if (a.includes("'email' is not a valid email") || !value || value.length < 2) {
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
              {leadId ? (
                <Input autocomplete="off" size="large" placeholder="john.doe@domain.com" disabled />
              ) : (
                <Input autocomplete="off" size="large" placeholder="john.doe@domain.com" />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col lg={8} xl={8} md={12} sm={24} xs={24}>
            <p className="font-medium text-gray-800">D.O.B</p>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: 'Please enter D.O.B',
                },
              ]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Enter D.O.B"
                getPopupContainer={(node) => node.parentNode}
              />
            </Form.Item>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24} className="flex justify-center">
            <div className="flex justify-center">
              <div className="inline-flex">
                <div className="md:w-40 sm:w-28">
                  <p className="font-medium text-gray-800">Gender</p>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select gender',
                      },
                    ]}
                  >
                    <Radio.Group onChange={onGenderChange} value={gender}>
                      <Radio value="MALE">Male</Radio>
                      <Radio value="FEMALE">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="md:w-52 sm:w-48">
                  <p className="font-medium text-gray-800">Marital status</p>
                  <Form.Item
                    shouldUpdate
                    name="maritalStatus"
                    rules={[
                      {
                        required: true,
                        message: 'Please select marital status',
                      },
                    ]}
                  >
                    <Radio.Group onChange={onChange} value={checkUnmarried}>
                      <Radio value="MARRIED">Married</Radio>
                      <Radio value="UNMARRIED">Unmarried</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Col>
          {gender && checkUnmarried === 'UNMARRIED' && (
            <Col lg={8} xl={8} md={12} sm={24} xs={24}>
              <p className="font-medium text-gray-800">Father name</p>
              <Form.Item
                name="guardianName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter father name',
                  },
                ]}
              >
                <Input autocomplete="off" size="large" placeholder="Please enter father name" />
              </Form.Item>
            </Col>
          )}
          {gender && checkUnmarried === 'MARRIED' && (
            <Col lg={8} xl={8} md={12} sm={24} xs={24}>
              <p className="font-medium text-gray-800">
                {gender === 'MALE' ? 'Father name' : 'Husband name'}
              </p>
              <Form.Item
                name="guardianName"
                rules={[
                  {
                    required: true,
                    message: `Please enter guardian name`,
                  },
                ]}
              >
                <Input
                  size="large"
                  autocomplete="off"
                  placeholder={`Please enter ${gender === 'MALE' ? 'father' : 'husband'} name`}
                />
              </Form.Item>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default BasicDetails;
