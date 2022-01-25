/* eslint-disable no-console */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { Form, Input, Row, Col, Divider } from 'antd';
import Address from '@/components/Address';

const CompanyDetails = ({ company, form }) => {
  const [onCountryChange, setOnCountryChange] = useState('IN');
  return (
    <div className="mb-5 bg-white rounded-lg shadow ">
      <p className="px-5 pt-5 text-base font-semibold text-gray-800 ">Company details</p>
      <Divider />
      <div className="px-5 pb-3">
        <Row gutter={[12, 0]}>
          <Col lg={24} xl={24} md={24} sm={24} xs={24}>
            <span className="block mb-2 font-medium text-gray-800">Company name dfd</span>
            <Form.Item
              name={company}
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
        </Row>
        <Address
          form={form}
          mainHeading="Street/Village (Optional)"
          secondaryHeadingVisibility={false}
          type={'primaryAddress'}
          pinCodeHeading="PIN code (Optional)"
          onCountryChange={onCountryChange}
          setOnCountryChange={setOnCountryChange}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
