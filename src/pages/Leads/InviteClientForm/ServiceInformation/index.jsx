/* eslint-disable react/jsx-key */
import { Row, Col, Select, Form, Input } from 'antd';
import React from 'react';

const ServiceInformation = () => {
  const { Option } = Select;
  const assignAccessList = [
    {
      id: 'SERVICES',
      value: 'Services',
    },
    {
      id: 'SERVICES & SOFTWARE',
      value: 'Services And Software',
    },
    {
      id: 'SOFTWARE',
      value: 'Software',
    },
  ];
  const dataLimitList = [
    {
      id: 'GB',
      value: 'Gb',
    },
    {
      id: 'TB',
      value: 'Tb',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <span className="font-medium text-gray-800 block mb-2">Assign Access</span>
          <Form.Item
            name="assignAccess"
            rules={[{ required: true, message: 'Please select service here!' }]}
          >
            <Select
              size="large"
              placeholder="Select your service"
              getPopupContainer={(node) => node.parentNode}
            >
              {assignAccessList?.map((val) => (
                <Option value={val?.value}> {val?.value} </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <span className="font-medium text-gray-800 block mb-2">Set data limit</span>
          <Form.Item
            name="dataLimit"
            rules={[{ required: true, message: 'Please select data limit here!' }]}
          >
            <Select
              size="large"
              placeholder="Select your data limit"
              getPopupContainer={(node) => node.parentNode}
            >
              {dataLimitList?.map((val) => (
                <Option value={val?.value}> {val?.value} </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <span className="font-medium text-gray-800 block mb-2">Charges amt.</span>
          <Form.Item
            name="dataLimit"
            rules={[{ required: true, message: 'Please select charges amt. here!' }]}
          >
            <Input size="large" placeholder="" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default ServiceInformation;
