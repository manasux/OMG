import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import { Avatar, Button } from 'antd';
import { getInitials } from '@/utils/common';
import svgSupportIllustration from '@/assets/support.svg';
import { ArrowRightOutlined } from '@ant-design/icons';

const DashBoard = ({ currentUser }) => {
  const [userGreeting, setuserGreeting] = useState('Hello');

  useEffect(() => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 12) {
      setuserGreeting('Good morning');
    } else if (hrs >= 12 && hrs <= 17) {
      setuserGreeting('Good afternoon');
    } else if (hrs >= 17 && hrs <= 24) {
      setuserGreeting('Good evening');
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: '75rem',
        marginTop: '1rem',
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
      className="container mx-auto"
    >
      <div className="mt-8 text-center">
        <div>
          <Avatar
            size={84}
            src={currentUser?.personalDetails?.photoUrl || null}
            style={{ backgroundColor: '#2b6cb0' }}
            className="font-bold"
          >
            {getInitials(currentUser?.personalDetails?.displayName)}
          </Avatar>
        </div>
        <div>
          <div className="text-3xl font-semibold text-gray-800">
            {userGreeting}, {currentUser?.personalDetails?.displayName}
          </div>
        </div>
      </div>
      <div className="pt-4 mt-4 border-t">
        {/* Help us improve your experience */}
        {/* <div className="mt-4">
          <div className="px-4 py-2 bg-white border rounded shadow">
            <div className="flex flex-col lg:flex-row">
              <div className="flex flex-auto">
                <div className="text-4xl text-primary flex justify-center items-center text-center">
                  <span className="text-4xl text-gray-500">{AppIcons.QuestionCircleFill()}</span>
                </div>
                <div className="pl-3">
                  <div className="text-lg font-semibold">Invite Client</div>
                  <div>By inviting client get the additional help you need.</div>
                </div>
              </div>
              <div className="py-4 items-center">
                <Link to="/clients/new">
                  <div className="flex items-center">
                    <div> Invite Clients</div>
                    <div className="pl-2">
                      <span className=" line-normal">{AppIcons.ArrowRightCircleFill()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div> */}

        <div className="mt-8 bg-white shadow rounded pt-4 px-4">
          <div className="px-4 py-2 flex">
            <div className="flex-auto">
              <div className="title text-lg font-semibold">Invite client</div>
              <div className="text">
                <p>By inviting client get the additional help you need.</p>
              </div>
              <div className="py-8 ">
                <Button
                  type="primary"
                  className=""
                  onClick={() => {
                    history.push('/leads/clients/new');
                  }}
                >
                  <div className="flex items-center">
                    Invite client
                    <div className="pl-2 flex items-center pt-1">
                      <ArrowRightOutlined />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
            <div>
              <div className="w-40 h-40">
                <img alt="" src={svgSupportIllustration} />
              </div>
            </div>
          </div>
        </div>
        {/* activities ion dashboared */}
        {/* <div className="flex">
          <div className="w-full">
            <>
              <div className="pt-4 mt-4 border-t">
                <div className="bg-white border rounded shadow">
                  <div className="px-4 py-2">
                    <div className="flex flex-col justify-between lg:flex-row">
                      <div>
                        <div className="text-lg font-semibold">Almost there!</div>
                        <div>
                          Let&apos;s get these tasks out of the way so you can start adding your
                          products!
                        </div>
                      </div>
                      <div className="">
                        <div className="text-sm text-gray-500">0 of 2 tasks completed</div>
                        <div>
                          <Progress percent={0} strokeColor="#1a863a" showInfo={false} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t">
                    <div className="flex flex-col items-center justify-between px-4 py-2 border-b md:flex-row">
                      <div className="flex">
                        <div className="items-center text-center flex justify-center">
                          {currentUser?.personalDetails?.address?.addressLine1?.addressLine1 ? (
                            <span className="text-2xl text-green-800">
                              {AppIcons.CheckCircleFill()}
                            </span>
                          ) : (
                            <span className="text-2xl text-blue-700">{AppIcons.Circle()}</span>
                          )}
                        </div>
                        <div className="pl-4">
                          <div className="font-semibold">Complete profile</div>
                          <div>This helps you to to sell your products easily.</div>
                        </div>
                      </div>
                      <div className=" items-center">
                        <Link to="/">
                          <div className="flex items-center">
                            <div> View profile</div>
                            <div className="pl-2">
                              <span className=" line-normal">
                                {AppIcons.ArrowRightCircleFill()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-4 py-2 md:flex-row">
                      <div className="flex flex-auto">
                        <div className="items-center text-center flex justify-center">
                          {!currentUser ? (
                            <span className="text-2xl text-green-800">
                              {AppIcons.CheckCircleFill()}
                            </span>
                          ) : (
                            <span className="text-2xl text-blue-700">{AppIcons.Circle()}</span>
                          )}
                        </div>
                        <div className="flex-auto pl-4">
                          <div className="font-semibold">Invite your first client</div>
                          <div>
                            That&apos;s it! You are all set, let&apos;s start managing clients.
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <Link to="/">
                          <div className="flex items-center">
                            <div>Invite</div>
                            <div className="pl-2">
                              <span className=" line-normal">
                                {AppIcons.ArrowRightCircleFill()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="app-separator" style={{ marginTop: '32px' }}></div>
            </>
          </div>
        </div> */}

        {/* Recent loads */}
        {/* <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="my-4 text-lg font-semibold text-black">Recent clients</div>
            <div className="mb-4 text-lg font-semibold">
              <Link to="/" className="text-sm text-blue-600">
                <span className="flex">
                  <span>View all</span>
                  <span className="ml-2 text-center"> {AppIcons.ArrowRightCircleFill()}</span>
                </span>
              </Link>
            </div>
          </div>
          <RecentProducts />
        </div> */}
      </div>
    </div>
  );
};

export default connect(({ user, vendor }) => ({
  currentUser: user.currentUser,
  vendors: vendor.vendors,
}))(DashBoard);
