import { DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Input, Form, Button, Popconfirm, Divider } from 'antd';
import PNG from '@/assets/file-types/png_doc.svg';
import PDF from '@/assets/file-types/pdf_doc.svg';
import dayjs from 'dayjs';
import React from 'react';
import UploadFile from '../UploadFile';

const BusinessDetails = ({ contents, setContents }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">Bank name</p>
          <Form.Item name="bankName">
            <Input size="large" placeholder="enter bank name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">Account number</p>
          <Form.Item name="accountNumber">
            <Input size="large" type="number" placeholder="enter account number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">IFSC code</p>
          <Form.Item name="ifscCode">
            <Input size="large" placeholder="enter IFSC code" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">GST number</p>
          <Form.Item name="gstNumber">
            <div className="flex">
              <Input size="large" placeholder="enter gst number" />
              <UploadFile contents={contents} setContents={setContents} />
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">PAN number</p>
          <Form.Item name="panNumber">
            <div className="flex">
              <Input size="large" placeholder="enter pan number" />
              <UploadFile contents={contents} setContents={setContents} />
            </div>
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={12} lg={6} xl={6}>
          <p className="font-medium text-gray-800">Legal documents</p>
          <Form.Item name="legalDocuments">
            <UploadFile contents={contents} setContents={setContents} />
          </Form.Item>
        </Col>
      </Row>

      <div>
        <div>
          {contents?.length > 0 && (
            <>
              <div className="my-4 font-bold text-sm text-blue-900">Uploaded Documents</div>
              <div className="mt-4" style={{ maxHeight: '20vh', overflow: 'auto' }}>
                {contents?.map((info, index) => (
                  <div key={info?.name}>
                    {index !== 0 && <Divider />}

                    <div className="w-full flex justify-between mt-4 ">
                      <div className="flex">
                        <div className="">
                          <img src={info?.name?.includes('pdf') ? PDF : PNG} alt="PNG" />
                        </div>
                        <div className=" mx-6 ">
                          <div className="text-blue-900 text-md font-semibold">{info?.name}</div>
                          <div className="text-gray-400 font-normal text-xs">
                            {dayjs(new Date().toISOString()).format('MMMM D, YYYY')} at{' '}
                            {dayjs(new Date().toISOString()).format('h:mm A')} -{' '}
                          </div>
                        </div>
                      </div>

                      <div className="flex mx-2 " style={{ float: 'right' }}>
                        <div className="mx-2">
                          {' '}
                          <Popconfirm
                            title="Are you sure you want to delete this attachment?"
                            onConfirm={() => {
                              setContents(() => contents?.filter((item, i) => i !== index));
                            }}
                            okText="Delete"
                            cancelText="Cancel"
                            okType="danger"
                          >
                            <Button
                              type="primary"
                              shape="circle"
                              size="small"
                              className="items-center"
                            >
                              <DeleteOutlined />
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
