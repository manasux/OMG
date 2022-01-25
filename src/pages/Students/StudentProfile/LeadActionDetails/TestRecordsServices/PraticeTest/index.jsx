import React from 'react';
import { Table, Tooltip } from 'antd';
import Level1 from '@/assets/img/lvl1.png';
import Level2 from '@/assets/img/lvl2.png';
import Level3 from '@/assets/img/lvl3.png';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

const PraticeTest = () => {
  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },
    {
      title: 'D-Level',
      dataIndex: 'dLevel',
      width: 90,
    },
    {
      title: 'Test Name',
      dataIndex: 'testName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Assigned By',
      dataIndex: 'assignedBy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateAndTime',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
  const data = [
    {
      key: '1',
      module: (
        <div className="flex w-max">
          <p className="font-medium ">Reading</p>
          <svg
            height="15"
            width="15"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            className="svg-inline--fa fa-check fa-w-16 text-green-700 mt-1 ml-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
        </div>
      ),
      course: (
        <div className="flex w-max">
          <p className="pr-2 font-medium ">ELC-1 </p>
          <svg
            height="15"
            width="15"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="grip-lines-vertical"
            className="svg-inline--fa fa-grip-lines-vertical fa-w-8 text-yellow-700 mt-1 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="250 0 256 512"
          >
            <path
              fill="currentColor"
              d="M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z"
            ></path>
          </svg>
          <p className=" font-medium ">ILETS-AC</p>

          <svg
            height="10"
            width="10"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="circle"
            className="svg-inline--fa fa-circle fa-w-16 text-green-500 ml-2 mt-1.5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
            ></path>
          </svg>
        </div>
      ),
      test: (
        <div>
          <p className="font-medium w-max">AC/CB-1/RT-1</p>
        </div>
      ),
      dLevel: (
        <div className="pl-2 w-max">
          <img src={Level1} height="40" width="40" alt="" />
        </div>
      ),
      testName: (
        <div className="font-medium w-max">
          <p>Prestent Tense Exc</p>
        </div>
      ),
      type: (
        <div className="font-medium w-max">
          <p className="text-gray-700">Daily Test</p>
        </div>
      ),
      assignedBy: (
        <div className="flex w-max items-center -mt-1">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771" />
          </svg>
          <h3 className="ml-2">System</h3>
        </div>
      ),
      status: (
        <div className="font-medium w-max">
          <p>Completed</p>
        </div>
      ),
      dateAndTime: (
        <div className="flex border">
          <div className=" border-r">
            <p className="border-b m-0  h-6 w-36 px-2">
              <span className="text-green-700 font-medium">AO </span>: 21-10-21
            </p>
            <p className="border-b m-0  h-6 w-36 px-2 ">
              <span className="text-yellow-700 font-medium">SO </span>: 21-10-21
            </p>
            <p className="px-2 m-0  h-6 w-36">
              <span className="text-red-800 font-medium">CO </span>: 21-10-21
            </p>
          </div>
          <div className="border-r">
            <p className="border-b m-0 px-2  h-6 w-36">
              <span className="text-green-700 font-medium">Start</span> - 09:30AM
            </p>
            <p className="border-b m-0 px-2  h-6 w-36">
              <span className="text-yellow-700 font-medium">End</span> - 09:30AM
            </p>
            <p className="px-2 m-0  h-6 w-36">
              <span className="text-red-800 font-medium">Time</span> - 9h & 30min
            </p>
          </div>
          <div className=" ">
            <p className="border-b m-0 text-xl pl-1 mt-1 h-8 w-10 text-yellow-700 ">26</p>
            <p className="text-xl m-0 text-blue-700 w-10">100</p>
          </div>
        </div>
      ),
      action: (
        <div className="flex w-max">
          <div className="mr-2">
            <p>Start</p>
            <p>View</p>
          </div>
        </div>
      ),
    },
    {
      module: (
        <div className="flex w-max">
          <p className="font-medium ">Listening</p>
          <svg
            height="15"
            width="15"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            className="svg-inline--fa fa-check fa-w-16 text-green-700 mt-1 ml-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
        </div>
      ),
      course: (
        <div className="flex w-max">
          <p className="pr-2 font-medium ">ELC-1 </p>
          <svg
            height="15"
            width="15"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="grip-lines-vertical"
            className="svg-inline--fa fa-grip-lines-vertical fa-w-8 text-yellow-700 mt-1 "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="250 0 256 512"
          >
            <path
              fill="currentColor"
              d="M96 496V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16zm128 0V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16z"
            ></path>
          </svg>
          <p className=" font-medium ">ILETS-AC</p>

          <svg
            height="10"
            width="10"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="circle"
            className="svg-inline--fa fa-circle fa-w-16 text-green-500 ml-2 mt-1.5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
            ></path>
          </svg>
        </div>
      ),
      test: (
        <div className="w-max">
          <p className="font-medium ">LT-1 (Mkar1)</p>
        </div>
      ),
      dLevel: (
        <div className="pl-2 w-max">
          <img src={Level2} height="40" width="40" alt="" />
        </div>
      ),
      testName: (
        <div className="font-medium w-max">
          <p>LT-1 (Mkar1)</p>
        </div>
      ),
      type: (
        <div className="font-medium w-max">
          <p className="text-gray-700">Daily Test</p>
        </div>
      ),

      assignedBy: (
        <Tooltip
          placement="bottom"
          title={
            <p style={{ fontSize: '9px' }}>Language Teacher | Reading | Teaching |BO-Kapurthala</p>
          }
        >
          <div className="flex w-max items-center -mt-1">
            <Avatar
              size="small"
              style={{ backgroundColor: '#3162A5' }}
              icon={
                <div className="-mt-1">
                  <UserOutlined />
                </div>
              }
            />
            <h3 className="mt-2 ml-2">Priya Multani</h3>
          </div>
        </Tooltip>
      ),
      status: (
        <div className="font-medium w-max">
          <p className="text-gray-600">Assigned</p>
        </div>
      ),
      dateAndTime: (
        <div className="flex border ">
          <div className=" border-r w-full h-full">
            <p className="border-b m-0 px-2 h-6 w-36">
              <span className="text-green-700  font-medium">AO</span> : 25-10-21
            </p>
            <p className="border-b m-0 px-2 h-6 w-36 ">
              <span className="text-yellow-700 font-medium"> </span>
            </p>
            <p className="px-2  m-0 h-6 w-36 ">
              <span className="text-red-800  font-medium"></span>
            </p>
          </div>
          <div className="border-r">
            <p className="border-b m-0 h-6 w-36 ">
              <span className="text-green-700 font-medium"></span>
            </p>
            <p className="border-b m-0 h-6 w-36">
              <span className="text-yellow-700  font-medium"></span>
            </p>
            <p className=" m-0 h-6 w-36">
              <span className="text-red-800  font-medium"></span>
            </p>
          </div>
          <div className=" ">
            <p className="border-b m-0  text-xl pl-1 mt-1 h-8 w-10 text-yellow-700 "></p>
            <p className="text-xl m-0 w-10 text-blue-700"></p>
          </div>
        </div>
      ),
      action: (
        <div className="w-max">
          <p></p>
          <p></p>
        </div>
      ),
    },
    {
      dLevel: (
        <div className="pl-2">
          <img src={Level3} height="40" width="40" alt="" />
        </div>
      ),
    },
  ];
  return (
    <div className="mt-5">
      <Table
        columns={columns}
        style={{ width: '100%', overflowX: 'auto' }}
        bordered={true}
        pagination={false}
        dataSource={data}
      />
    </div>
  );
};

export default PraticeTest;
