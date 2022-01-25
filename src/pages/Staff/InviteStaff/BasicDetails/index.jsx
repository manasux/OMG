import React from 'react';
import { Form, Row, Col, Input, Radio, Select, DatePicker } from 'antd';
import PhoneNumber from '@/components/PhoneNumber';
import { callApi } from '@/utils/apiUtils';

const { Option } = Select;
const BasicDetails = ({ form }) => {
  const checkWhoIsGuardian =
    form.getFieldValue('gender') === 'MALE' || form.getFieldValue('maritalStatus') === 'UNMARRIED'
      ? 'Father name'
      : 'Husband name';

  return (
    <>
      <Row gutter={16}>
        <Col lg={3} xl={3} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800">Title</p>
          <Form.Item name="prefix">
            <Select size="large" placeholder="Select title">
              <Option value="Mr">Mr</Option>
              <Option value="Miss">Miss</Option>
              <Option value="Mrs">Mrs</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={7} xl={7} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800 ">First name</p>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please enter first name to proceed further' }]}
          >
            <Input size="large" placeholder="First name of student" />
          </Form.Item>
        </Col>
        <Col lg={7} xl={7} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800">Middle name &#x00028;optional&#x00029;</p>
          <Form.Item name="middleName">
            <Input size="large" placeholder="Middle name of student" />
          </Form.Item>
        </Col>
        <Col lg={7} xl={7} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800">Last name</p>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please enter last name to proceed further' }]}
          >
            <Input size="large" placeholder="Last name of student" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col lg={6} xl={6} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800 ">Phone</p>
          <PhoneNumber
            countryCode={['phone', 'countryCode']}
            form={form}
            name={['phone', 'phone']}
            placeholder="#####-#####"
          />
        </Col>
        <Col lg={6} xl={6} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800 ">Alternate phone</p>
          <PhoneNumber
            countryCode={['alternatePhone', 'countryCode']}
            form={form}
            name={['alternatePhone', 'phone']}
            placeholder="#####-#####"
          />
        </Col>
        <Col lg={6} xl={6} md={12} sm={18} xs={24}>
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
            <Input size="large" placeholder="john.doe@domain.com" />
          </Form.Item>
        </Col>
        <Col lg={6} xl={6} md={12} sm={18} xs={24}>
          <p className="font-medium text-gray-800">DOB</p>
          <Form.Item name="dob">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="choose DOB"
              getPopupContainer={(node) => node.parentNode}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ marginTop: '1rem' }} gutter={[24, 12]}>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <p className="font-medium text-gray-800">Gender</p>
          <Form.Item name="gender">
            <Radio.Group>
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col lg={12} xl={12} md={24} sm={24} xs={24}>
          <p className="font-medium text-gray-800">Marital status</p>
          <Form.Item name="maritalStatus">
            <Radio.Group>
              <Radio value="MARRIED">Married</Radio>
              <Radio value="UNMARRIED">Unmarried</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col lg={6} xl={6} md={6} sm={12} xs={12}>
          <p className="font-medium text-gray-800">{checkWhoIsGuardian}</p>
          <Form.Item
            name={['guardian', 'firstName']}
            rules={[
              {
                required: true,
                message: ` Please enter ${checkWhoIsGuardian?.toLocaleLowerCase()} to proceed`,
              },
            ]}
          >
            <Input size="large" placeholder="Please enter name here..." />
          </Form.Item>
        </Col>
        <Col lg={6} xl={6} md={6} sm={12} xs={12}>
          <p className="font-medium text-gray-800 ">Phone</p>
          <PhoneNumber
            countryCode={['guardian', 'primaryPhone', 'countryCode']}
            form={form}
            name={['guardian', 'primaryPhone', 'phone']}
            placeholder="#####-#####"
          />
        </Col>
        <Col lg={6} xl={6} md={6} sm={12} xs={12}>
          <p className="font-medium text-gray-800">Email</p>
          <Form.Item name={['guardian', 'primaryEmail']}>
            <Input size="large" placeholder="john.doe@domain.com" />
          </Form.Item>
        </Col>
        <Col lg={6} xl={6} md={6} sm={12} xs={12}>
          <p className="font-medium text-gray-800">Occupation</p>
          <Form.Item name={['guardian', 'occupation']}>
            <Input size="large" placeholder="Please enter" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BasicDetails;
