import React, { useState } from 'react';
import {
  Select,
  DatePicker,
  Input,
  Divider,
  Tabs,
  //   Tooltip,
  Avatar,
  //   Button,
  Form,
  //   message,
  Table,
  Menu,
  Dropdown,
} from 'antd';
import { debounce } from 'lodash';
import AppIcons from '@/utils/AppIcons';
import SearchNotFound from '@/assets/icons/empty-search-contact.png';
import styles from './index.less';
import { MoreOutlined } from '@ant-design/icons';

const Wallet = () => {
  const [form] = Form.useForm();
  const { Search } = Input;
  const { TabPane } = Tabs;
  const [activityType, setActivityType] = useState();
  // eslint-disable-next-line no-unused-vars
  const [keyword, setKeyword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [tab, setTab] = useState('All');
  const { Option } = Select;
  const action = (value) => {
    setKeyword(value);
  };
  const debounceSearch = debounce(action, 400);
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p>Edit</p>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <p>Delete</p>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">

      <p>Print</p>
      </Menu.Item>
    </Menu>
  );

  const ActivityList = [
    {
      id: '0',
      label: 'Phone call',
      value: 'WEPT_TASK_PHONE_CALL',
    },
    {
      id: '1',
      label: 'Message',
      value: 'WEPT_TASK_TEXT_MSG',
    },

    {
      id: '2',
      label: 'Whatsapp',
      value: 'WEPT_TASK_WATSAP_MSG',
    },
    {
      id: '3',
      label: 'Visit',
      value: 'WEPT_TASK_VISIT',
    },
    {
      id: '4',
      label: 'Email',
      value: 'WEPT_TASK_EMAIL',
    },
    {
      id: '5',
      label: 'Others',
      value: 'WEPT_TASK_OTHERS',
    },
  ];

  const tabsPane = [
    {
      tab: `All transactions(5)`,
      key: 'All',
    },
    {
      tab: `Credit (2)`,
      key: 'Credit',
    },
    {
      tab: `Debit (3)`,
      key: 'Debit',
    },
  ];

  const dataSource = [
    {
      key: '1',
      date: '13/10/2021 14:00:00',
      description: 'IELTS/GT/Inter-1/Trans ID',
      transType: 'Course fees',
      mode: 'Cash',
      credit: '7500',
      debit: '800',
      balance: '-7000',
      remarks: 'Paid for offer letter for canada',
      by: (
        <div className="flex justify-center ">
          <Avatar
            src={
              'https://lh3.googleusercontent.com/proxy/fD6jW95ha0Sooa0wPbvESAl_sx5uH6tfo1v1xZVdz-8-qMdV_n9RCNWiuv8WadLEzCosI0YKObh5wTwZ9qh4E2z2vI9-8zDek_1tzpHvzE-pYP8QVgZFiD_6F7Mw2lg96ZPYjccQ0iODLzSioFfEYcoaRA'
            }
            className="shadow-md"
          />
          <p className=" py-2 pl-2">Priya Multani</p>
        </div>
      ),
      actions: <div>
        <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
             <MoreOutlined />
            </a>
          </Dropdown>
      </div>,
    },
    {
      key: '2',
      date: '22/10/2021 14:00:00',
      description: 'IELTS/GT/Inter-1',
      transType: 'Reg fees',
      mode: 'Google Pay',
      credit: '500',
      debit: '1200',
      balance: '-8000',
      remarks: 'Paid for offer letter for USA',
      by: (
        <div className="flex justify-center ">
          <Avatar
            src={
              'https://lh3.googleusercontent.com/proxy/fD6jW95ha0Sooa0wPbvESAl_sx5uH6tfo1v1xZVdz-8-qMdV_n9RCNWiuv8WadLEzCosI0YKObh5wTwZ9qh4E2z2vI9-8zDek_1tzpHvzE-pYP8QVgZFiD_6F7Mw2lg96ZPYjccQ0iODLzSioFfEYcoaRA'
            }
            className="shadow-md"
          />
          <p className=" py-2.5 pl-2">Priya Multani</p>
        </div>
      ),
      actions: (
        <div>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
             <MoreOutlined />
            </a>
          </Dropdown>
          {/* <p>Edit</p>
          <p>Delete</p>
          <p>Print icon</p> */}
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      // width: ,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      width: 200,
    },
    {
      title: 'Trans Type',
      dataIndex: 'transType',
      key: 'transType',
      align: 'center',
      width: 150,
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
      align: 'center',
      width: 150,
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      align: 'center',
      // width: 100,
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
      align: 'center',
      // width: 100,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
      // width: 100,
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'center',
      width: 250,
    },
    {
      title: 'By',
      dataIndex: 'by',
      key: 'by',
      align: 'center',
      width: 200,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      // width: 200,
    },
  ];
  return (
    <Form form={form} hideRequiredMark>
      <div className="flex justify-between">
        <div className="text-blue-600 font-semibold text-lg">Wallet</div>
        <div className="rounded-2xl mx-2 flex">
          <div className="mr-4">
            <Select
              style={{ width: '12rem' }}
              value={activityType}
              placeholder="Select transaction type"
              onChange={(value) => setActivityType(value)}
            >
              {ActivityList?.map((item) => (
                <Option key={item?.id} value={item?.value}>
                  {item?.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className>
            <Search
              style={{ width: '12rem' }}
              size="middle"
              placeholder="Enter keyword to search"
              onChange={(value) => debounceSearch(value?.target?.value)}
              enterButton
            />
          </div>
          <div className="flex justify-between">
            <div className="mx-4">
              <DatePicker placeholder="Select date" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Divider style={{ marginTop: '0.6rem' }} />
      <div className="mr-5 flex justify-end -mb-12">
        <div className="mt-1.5 mr-2 text-green-600">
          <AppIcons.SendFill />
        </div>
        <p className="text-yellow-500 font-extrabold text-md mt-1">Transfer Funds</p>
      </div>
      <div className="flex justify-between w-full">
        <Tabs
          defaultActiveKey={tabsPane?.[0]?.key}
          onChange={(val) => setTab(val)}
          className="font-semibold text-blue-500"
        >
          {tabsPane?.map((item) => (
            <TabPane
              tab={item?.tab}
              key={item?.key}
              style={{ height: '45rem', overflow: 'auto', padding: '11px' }}
            >
              {' '}
              <Table
                dataSource={dataSource}
                className={styles?.tableStyling}
                columns={columns}
                scroll={{ x: 500 }}
                bordered
                size="large"
                style={{ width: '100%' }}
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No records yet!</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No records found!"
                          style={{ height: '100px' }}
                        />
                      </div>
                    </div>
                  ),
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </Form>
  );
};

export default Wallet;
