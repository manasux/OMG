import React, { useEffect, useState } from 'react';
import Page from '@/components/Page';
import { Form, Button, message } from 'antd';
import CompanyDetails from './CompanyDetails';
import PointOfContact from './PointOfContact';
import Reference from './Reference';
import FixedFooter from '@/components/FixedFooter';
import { connect, history, useParams } from 'umi';
import Breadcrumbs from '@/components/BreadCrumbs';

const AddClientLead = ({ dispatch, loadData, clientLeadRecord, staffList }) => {
  const [optionRefChange, setOptionRefChange] = useState(false);
  const [code, setCode] = useState('');
  const [form] = Form.useForm();

  const { clientId } = useParams();

  useEffect(() => {
    if (clientId) {
      dispatch({
        type: 'leads/getParticularClientLeadData',
        payload: {
          leadTypeId: 'LEAD_CUSTOMER',
          pathParams: { leadId: clientId },
        },
      })
        .then((res) => {
          let clientData = res;

          clientData = {
            ...clientData,
            company: {
              name: clientData?.companyName,
              totalBranches: clientData?.companyTotalBranches,
            },
            primaryAddress: {
              ...clientData?.primaryAddress,
              addressLine1: clientData?.primaryAddress?.address1,
              stateCode: clientData?.primaryAddress?.stateProvinceGeoId,
              countryCode: clientData?.primaryAddress?.countryGeoId,
            },
            prefix: clientData?.personalTitle,
            primaryEmail: clientData?.email,
            lookingFor: clientData?.lookingFor?.map((purpose) => purpose.description),

            source: clientData?.leadDataSource?.description,

            phone: {
              phone: clientData?.personContactDetails?.formattedPhoneNumber
                ?.slice(3)
                ?.split(' ')
                ?.join(''),
              countryCode: clientData?.personContactDetails?.formattedPhoneNumber?.slice(0, 3),
            },
          };

          form.setFieldsValue(clientData);

          if (res?.leadDataSource?.dataSourceId === 'EMPLOYEE') {
            form.setFieldsValue({
              leadReferencedBy: { id: res?.leadReference?.partyId },
            });
            setOptionRefChange(true);
          }
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, clientId]);

  const onFinish = (values) => {
    // console.log('values on finish', values);

    const data = {
      ...values,
      leadTypeId: 'LEAD_CUSTOMER',
      company: {
        ...values.company,
        id: clientLeadRecord?.leadCompanyPartyId,
        primaryAddress: {
          id: clientLeadRecord?.primaryAddress?.contactMechId,
          ...values?.primaryAddress,
        },
      },
      phone: {
        id: clientLeadRecord?.personContactDetails?.partyTeleCom?.contactMechId,
        phone: values?.phone?.phone?.split('').slice(3).join(''),
        areaCode: values?.phone?.phone?.split('').slice(0, 3).join(''),
        countryCode: `+${code}`,
      },
    };

    if (clientId) {
      dispatch({
        type: 'leads/updateClientLead',
        payload: {
          body: data,
          pathParams: { clientID: clientId },
        },
      }).then((res) => {
        if (res?.status === 'ok') {
          form.resetFields();
          history.push('/leads/clients-list/newleads');
          message.success('Client Lead updated successfully');
        }
      });
      return;
    }

    if (data) {
      dispatch({
        type: 'leads/addClientLead',
        payload: {
          body: data,
        },
      }).then((res) => {
        if (res?.status === 'ok') {
          form.resetFields();
          history.push('/leads/clients-list/newleads');
          message.success('Client Lead added successfully');
        }
        if (res?.data?.message.includes('exists')) {
          message.error('Lead with same email is already exists please enter different email');
        }
      });
    }
  };

  return (
    <div className="mt-8 ">
      <Page
        title={clientId ? 'Edit client lead' : 'Add client lead'}
        PrevNextNeeded="N"
        breadcrumbs={
          <Breadcrumbs
            path={[
              {
                name: 'Dashboard',
                path: '/dashboard',
              },
              {
                name: 'Leads',
                path: '/leads/clients-list/newleads',
              },
              {
                name: clientId ? clientLeadRecord?.companyName : 'new',
                path: '#',
              },
            ]}
          />
        }
      >
        <Form
          form={form}
          onFinish={onFinish}
          hideRequiredMark
          autoComplete="off"
          name="AddClientLead"
        >
          <div className="">
            <div className="pb-10">
              <CompanyDetails form={form} company={['company', 'name']} />

              <PointOfContact form={form} setCode={setCode} code={code} />

              <Reference
                dispatch={dispatch}
                totalBranches={['company', 'totalBranches']}
                lookingFor={'lookingFor'}
                source={'source'}
                form={form}
                optionRefChange={optionRefChange}
                setOptionRefChange={setOptionRefChange}
                staffList={staffList}
              />
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
                    onClick={() => {
                      form?.submit();
                    }}
                    size="large"
                    loading={loadData}
                  >
                    {clientId ? 'Update client lead' : 'Add client lead'}
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

export default connect(({ loading, leads, staff }) => ({
  loadData: loading.effects['leads/addClientLead'],
  clientLeadRecord: leads.clientLeadRecord,
  staffList: staff.staffList,
}))(AddClientLead);
