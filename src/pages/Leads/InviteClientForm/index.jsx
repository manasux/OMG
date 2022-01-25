import React, { useState } from 'react';
import Page from '@/components/Page';
import { Form, Button, Divider, message } from 'antd';
import Address from '@/components/Address';
import { connect } from 'umi';
import BasicDetailsInviteClient from '../BasicDetailsInviteClient';
import BusinessDetails from './BusinessDetails';
import ServiceInformation from './ServiceInformation';
import FixedFooter from '@/components/FixedFooter';
import Breadcrumbs from '@/components/BreadCrumbs';

const InviteClientForm = ({ dispatch, loadData, history }) => {
  const [form] = Form.useForm();
  const [contents, setContents] = useState([]);
  const [onCountryChange, setOnCountryChange] = useState('IN');

  const onFinish = (values) => {
    const data = values;
    data.primaryPhone.areaCode = data?.primaryPhone?.phone?.slice(0, 3);
    data.primaryPhone.phone = data?.primaryPhone?.phone?.slice(
      3,
      data?.primaryPhone?.phone?.length,
    );

    if (data?.alternatePhone?.phone) {
      data.alternatePhone.areaCode = data?.alternatePhone?.phone?.slice(0, 3);
      data.alternatePhone.phone = data?.alternatePhone?.phone?.slice(
        3,
        data?.alternatePhone?.phone?.length,
      );
    } else {
      delete data?.alternatePhone;
    }
    data.clientPoc.primaryPhone.areaCode = data?.clientPoc?.primaryPhone?.phone?.slice(0, 3);
    data.clientPoc.primaryPhone.phone = data?.clientPoc?.primaryPhone?.phone?.slice(
      3,
      data?.clientPoc?.primaryPhone?.phone?.length,
    );

    if (data) {
      dispatch({
        type: 'leads/inviteClient',
        payload: {
          body: data,
        },
      }).then((res) => {
        if (res?.status === 'ok') {
          message.success('Client invited successfully');
          history.push('/client');
          form.resetFields();
        }
        if (res?.data?.message.includes('exists')) {
          message.error('client with same email is already exists please enter different email');
        }
      });
    }
  };

  return (
    <div className="mt-8 ">
      <Page
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'All clients',
                path: '/clients/all',
              },
              { path: '#', name: 'new' },
            ]}
          />
        }
        getPopupContainer={(node) => node.parentNode}
        title="Invite client"
        PrevNextNeeded="N"
      >
        <Form
          form={form}
          onFinish={onFinish}
          hideRequiredMark
          autoComplete="off"
          name="InviteClientForm"
        >
          <div className="">
            <BasicDetailsInviteClient form={form} />
            <div className="bg-white rounded-lg mb-5 shadow">
              <p className="text-base text-gray-800 font-semibold px-5 pt-5">Address details</p>
              <Divider />
              <div className="px-5 pb-3">
                <Address
                  form={form}
                  mainHeading="Street/Village (Optional)"
                  type={'address'}
                  pinCodeHeading="PIN code (Optional)"
                  onCountryChange={onCountryChange}
                  setOnCountryChange={setOnCountryChange}
                />
              </div>
            </div>
            <div className="bg-white rounded-lg mb-5 shadow">
              <p className="text-base text-gray-800 font-semibold px-5 pt-5">Business details</p>
              <Divider />
              <div className="px-5 pb-3">
                <BusinessDetails form={form} setContents={setContents} contents={contents} />
              </div>
            </div>
            <div className="bg-white rounded-lg mb-5 shadow">
              <p className="text-base text-gray-800 font-semibold px-5 pt-5">Service information</p>
              <Divider />
              <div className="px-5 pb-3">
                <ServiceInformation form={form} />
              </div>
            </div>
            <FixedFooter classes="text-right">
              <div
                className="flex m-auto"
                style={{
                  maxWidth: '80rem',
                }}
              >
                <div className="w-full ">
                  <Button
                    type="primary"
                    onClick={() => form?.submit()}
                    size="large"
                    loading={loadData}
                  >
                    Invite client
                  </Button>
                </div>
              </div>
            </FixedFooter>
          </div>
        </Form>
      </Page>
    </div>
  );
};

export default connect(({ loading }) => ({
  loadData: loading.effects['leads/inviteClient'],
}))(InviteClientForm);
