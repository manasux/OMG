import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Select, Divider } from 'antd';
import { debounce } from 'lodash-es';

const Reference = ({
  totalBranches,
  lookingFor,
  source,
  form,
  optionRefChange,
  setOptionRefChange,
  dispatch,
  staffList,
}) => {
  const { Option } = Select;

  const referenceList = [
    {
      label: 'Web Site Enquiry',
      value: 'WEB_SITE',
    },
    {
      label: 'Office Walk In',
      value: 'OFFICE_WALK_IN',
    },
    {
      label: 'Staff Reference',
      value: 'EMPLOYEE',
    },
  ];

  const onRefChange = (changes) => {
    if (changes === 'Staff Reference') {
      setOptionRefChange(true);
    } else {
      setOptionRefChange(false);
      form?.setFieldsValue({
        leadReferencedBy: undefined,
      });
    }
  };
  const getStaffList = (key) =>
    dispatch({
      type: 'staff/getStaffList',
      payload: {
        query: {
          statusId: 'PARTYINV_ACCEPTED',
          viewSize: 1000,
          keyword: key,
          showAdmin: true,
        },
      },
    });
  const debounceSearch = debounce(getStaffList, 400);
  useEffect(() => {
    getStaffList('');
  }, []);

  return (
    <div className="mb-5 bg-white rounded-lg shadow">
      <p className="px-5 pt-5 text-base font-semibold text-gray-800">Reference</p>
      <Divider />
      <div className="px-5 pb-5">
        <Row gutter={[12, 0]}>
          <Col lg={12} xl={12} md={12} sm={24} xs={24}>
            <span className="block mb-2 font-medium text-gray-800 "> Number of branches</span>
            <Form.Item
              name={totalBranches}
              rules={[
                {
                  required: true,
                  message: 'Please enter branch number',
                },
              ]}
            >
              <Input type="number" style={{ width: '100%' }} min={0} size="large" />
            </Form.Item>
          </Col>

          <Col lg={12} xl={12} md={12} sm={24} xs={24}>
            <span className="block mb-2 font-medium text-gray-800">Looking for</span>
            <Form.Item
              name={lookingFor}
              rules={[
                {
                  required: true,
                  message: 'Please select your choice',
                },
              ]}
            >
              <Select
                style={{ width: '100%' }}
                size="large"
                mode="tags"
                getPopupContainer={(node) => node.parentNode}
              >
                <Option value="Software">Software</Option>
                <Option value="Service And Software">Services &amp; Software</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <span className="block mb-2 font-medium text-gray-800">Reference (Optional)</span>
            <Form.Item style={{ marginBottom: 0 }} name={source}>
              <Select
                size="large"
                placeholder="Enter reference"
                getPopupContainer={(node) => node.parentNode}
                onChange={onRefChange}
              >
                {referenceList.map((item) => (
                  <Option key={item.label}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {optionRefChange && (
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <span className="block mb-2 font-medium text-gray-800">Reference by (Optional)</span>
              <Form.Item name={['leadReferencedBy', 'id']}>
                <Select
                  size="large"
                  placeholder="Reference by"
                  getPopupContainer={(node) => node.parentNode}
                  showSearch
                  filterOption={false}
                  onSearch={debounceSearch}
                >
                  {staffList?.records?.map((item) => (
                    <Option key={item?.partyId}>{item?.displayName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Reference;
