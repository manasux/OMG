// import moment from 'moment';
// import { Select, DatePicker, Divider, Tooltip, Avatar } from 'antd';
import React from // useState,
//  useEffect
'react';
import {
  connect,
  // useParams
} from 'umi';
// import { MoreOutlined, UserOutlined } from '@ant-design/icons';

const TeachingSchedule = () =>
  //   {
  //   dispatch
  // }
  {
    // const { RangePicker } = DatePicker;
    // const { studentId } = useParams();
    // const { Option } = Select;
    // const [activityType, setActivityType] = useState('');
    // const [selctedDate, setSelectedDate] = useState('');
    // const [range, setRange] = useState([moment().subtract(7, 'day'), moment()]);

    // const activityList = [
    //   {
    //     id: '0',
    //     label: 'All Activities',
    //     value: '',
    //   },
    //   {
    //     id: '1',
    //     label: 'Lead priority',
    //     value: 'lead_priority',
    //   },

    //   {
    //     id: '2',
    //     label: 'Lead owner',
    //     value: 'lead_owner',
    //   },
    //   {
    //     id: '2',
    //     label: 'Follow up',
    //     value: 'lead_followUpBy',
    //   },
    // ];
    // const activityTimeList = [
    //   {
    //     label: 'Today',
    //     id: 'TODAY',
    //     value: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     startDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     label: 'Yesterday',
    //     id: 'YESTERDAY',
    //     startDate: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     value: moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     label: 'Last 7 days',
    //     id: 'LAST_7_DAYS',
    //     value: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     startDate: moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     label: 'Last 15 days',
    //     id: 'LAST_15_DAYS',
    //     value: moment().subtract(15, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     startDate: moment().subtract(15, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     label: 'Last 30 days',
    //     id: 'LAST_30_DAYS',
    //     value: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     startDate: moment().subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },

    //   {
    //     label: 'Last month',
    //     id: 'LAST_MONTH',
    //     value: moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
    //     startDate: moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss'),
    //     endDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     label: 'Custom',
    //     id: 'CUSTOM',
    //     value: 'custom',
    //   },
    // ];

    // const getActivityRecord = () => {
    //   const payload = {
    //     pathParams: { leadId: studentId },
    //     query: {
    //       activityType,
    //       isStudent: true,
    //       isCounselor: true,
    //       startDate:
    //         selctedDate === 'Custom'
    //           ? range[0].format('YYYY-MM-DD HH:mm:ss')
    //           : activityTimeList?.filter((p) => p?.label === selctedDate)[0]?.startDate,
    //       endDate:
    //         selctedDate === 'Custom'
    //           ? range[1].format('YYYY-MM-DD HH:mm:ss')
    //           : activityTimeList?.filter((p) => p?.label === selctedDate)[0]?.endDate,
    //       viewSize: 1000,
    //     },
    //   };
    //   dispatch({
    //     type: 'leads/getActivity',
    //     payload,
    //   });
    // };

    // useEffect(() => {
    //   getActivityRecord();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [activityType, selctedDate, range]);
    return (
      <></>
      // <div>
      //   <div className="flex justify-between">
      //     <div className="text-blue-600 font-semibold text-lg">Teacher Schedule</div>
      //     <div className="flex justify-between">
      //       <div className="mr-4">
      //         <Select
      //           style={{ width: '12rem' }}
      //           value={activityType}
      //           placeholder="Activity type"
      //           onChange={(value) => setActivityType(value)}
      //         >
      //           {activityList?.map((item) => (
      //             <Option key={item?.id} value={item?.value}>
      //               {item?.label}
      //             </Option>
      //           ))}
      //         </Select>
      //       </div>
      //       <div className="flex justify-between">
      //         <div className="mr-2">
      //           <Select
      //             style={{ width: '12rem', color: '#3B82F6' }}
      //             onChange={(value) => {
      //               setSelectedDate(value);
      //             }}
      //             placeholder="select..."
      //           >
      //             {activityTimeList?.map((item) => (
      //               <Option
      //                 key={item?.id}
      //                 value={item?.label}
      //                 className="bg-gray-100 rounded-lg mx-2 mt-2"
      //                 style={{ color: '#3B82F6' }}
      //               >
      //                 {item?.label}
      //               </Option>
      //             ))}
      //           </Select>
      //         </div>
      //         <div>
      //           {selctedDate === 'Custom' && (
      //             <RangePicker
      //               value={range}
      //               format="DD MMM, YYYY"
      //               onChange={(val) => {
      //                 setRange(val);
      //                 getActivityRecord(val);
      //               }}
      //               placeholder={['Search by', 'date']}
      //               style={{ width: '12rem' }}
      //               disabledDate={(date) => date > moment().add(1, 'day')}
      //             />
      //           )}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <Divider />
      //   <div className="flex  h-full  my-4 mr-2">
      //     <div className="bg-green-500 w-2 rounded-l-lg" />
      //     <div className="border rounded-r-lg w-full">
      //       <div className="flex items-center mx-2 my-2 justify-between">
      //         <div className=" flex">
      //           <div className="rounded-full bg-gray-300 h-6 w-6 mt-2"></div>
      //           <div className="flex text-lg  font-semibold text-gray-500 px-4 items-center border-r ">
      //             Regarding Vocabulary improvement
      //             <div className="text-green-500 text-base ml-8 border-l pl-2">
      //               Files :<span className="text-blue-500 text-base">test file</span>
      //             </div>
      //           </div>
      //         </div>

      //         <div className="flex justify-end">
      //           <MoreOutlined />
      //         </div>
      //       </div>
      //       <div className="flex">
      //         <div className="border-r test-xs text-green-500 font-semibold ml-12 pr-4">
      //           14-10-2021<span className="border-l pl-2 ml-2">04:22 PM</span>
      //         </div>
      //         <div className="text-gray-500 font-semibold pl-2">Modules : Reading</div>
      //       </div>
      //       <div className="flex justify-between mx-2 mt-8 mb-2">
      //         <div className="text-yellow-500 text-lg ">
      //           Remarks :{' '}
      //           <span className="text-gray-500">
      //             I called to student, he was bust. He said call me on 22/08/2021 at 10:00 AM in
      //             Morning
      //           </span>
      //         </div>
      //         <div>
      //           <Tooltip title="">
      //             <span>
      //               <Avatar
      //                 style={{ backgroundColor: '#3162A5' }}
      //                 icon={
      //                   <div className="-mt-1">
      //                     <UserOutlined />
      //                   </div>
      //                 }
      //               />
      //             </span>
      //             <span className="text-yellow-500 font-semibold ml-2 text-base">Created by :</span>
      //             <span className="text-gray-500 text-base">Baljit kaur</span>
      //           </Tooltip>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="flex  h-full  my-4 mr-2">
      //     <div className="bg-red-500 w-2 rounded-l-lg" />
      //     <div className="border rounded-r-lg w-full">
      //       <div className="flex items-center mx-2 my-2 justify-between">
      //         <div className=" flex">
      //           <div className="rounded-full bg-gray-300 h-6 w-6 mt-2"></div>
      //           <div className="flex text-lg  font-semibold text-gray-500 px-4 items-center border-r ">
      //             Regarding Vocabulary improvement
      //             <div className="text-green-500 text-base ml-8 border-l pl-2">
      //               Files :<span className="text-blue-500 text-base">test file</span>
      //             </div>
      //           </div>
      //         </div>

      //         <div className="flex justify-end">
      //           <MoreOutlined />
      //         </div>
      //       </div>
      //       <div className="flex">
      //         <div className="border-r test-xs text-green-500 font-semibold ml-12 pr-4">
      //           14-10-2021<span className="border-l pl-2 ml-2">04:22 PM</span>
      //         </div>
      //         <div className="text-gray-500 font-semibold pl-2">Modules : Reading</div>
      //       </div>
      //       <div className="flex justify-between mx-2 mt-8 mb-2">
      //         <div className="text-yellow-500 text-lg ">
      //           Remarks :{' '}
      //           <span className="text-gray-500">
      //             I called to student, he was bust. He said call me on 22/08/2021 at 10:00 AM in
      //             Morning
      //           </span>
      //         </div>
      //         <div>
      //           <Tooltip title="prompt text">
      //             <span>
      //               <Avatar
      //                 style={{ backgroundColor: '#3162A5' }}
      //                 icon={
      //                   <div className="-mt-1">
      //                     <UserOutlined />
      //                   </div>
      //                 }
      //               />
      //             </span>
      //             <span className="text-yellow-500 font-semibold ml-2 text-base">Created by :</span>
      //             <span className="text-gray-500 text-base">Baljit kaur</span>
      //           </Tooltip>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="flex  h-full  my-4 mr-2">
      //     <div className="bg-yellow-500 w-2 rounded-l-lg" />
      //     <div className="border rounded-r-lg w-full">
      //       <div className="flex items-center mx-2 my-2 justify-between">
      //         <div className=" flex">
      //           <div className="rounded-full bg-gray-300 h-6 w-6 mt-2"></div>
      //           <div className="flex text-lg  font-semibold text-gray-500 px-4 items-center border-r ">
      //             Regarding Vocabulary improvement
      //             <div className="text-green-500 text-base ml-8 border-l pl-2">
      //               Files :<span className="text-blue-500 text-base">test file</span>
      //             </div>
      //           </div>
      //         </div>

      //         <div className="flex justify-end">
      //           <MoreOutlined />
      //         </div>
      //       </div>
      //       <div className="flex">
      //         <div className="border-r test-xs text-green-500 font-semibold ml-12 pr-4">
      //           14-10-2021<span className="border-l pl-2 ml-2">04:22 PM</span>
      //         </div>
      //         <div className="text-gray-500 font-semibold pl-2">Modules : Reading</div>
      //       </div>
      //       <div className="flex justify-between mx-2 mt-8 mb-2">
      //         <div className="text-yellow-500 text-lg ">
      //           Remarks :{' '}
      //           <span className="text-gray-500">
      //             I called to student, he was bust. He said call me on 22/08/2021 at 10:00 AM in
      //             Morning
      //           </span>
      //         </div>
      //         <div>
      //           <Tooltip title="prompt text">
      //             <span>
      //               <Avatar
      //                 style={{ backgroundColor: '#3162A5' }}
      //                 icon={
      //                   <div className="-mt-1">
      //                     <UserOutlined />
      //                   </div>
      //                 }
      //               />
      //             </span>
      //             <span className="text-yellow-500 font-semibold ml-2 text-base">Created by :</span>
      //             <span className="text-gray-500 text-base">Baljit kaur</span>
      //           </Tooltip>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  };

export default connect(() => ({}))(TeachingSchedule);
