import { message, Popconfirm } from 'antd';
import React from 'react';
import { connect, history } from 'umi';

const LeadActions = ({ partyId, setHideDropDown, dispatch, editLead, type, record, keyword }) => {
  const list = [
    {
      name: 'Edit',
      value: 'EDIT',
    },
    {
      name: 'Register as student',
      value: 'REGISTER_AS_STUDENT',
    },
    {
      name: 'Lead priority',
      value: 'LEAD_PRIORITY',
      subTitle: 'Set Lead priority',
    },
    {
      name: 'Add note',
      value: 'ADD_NOTE',
      subTitle: 'Add note',
    },
    {
      name: 'Lead owner',
      value: 'LEAD_OWNER',
      subTitle: 'Set owner',
    },
    {
      name: 'Add follow up',
      value: 'ADD_FOLLOW_UP',
      subTitle: 'Add follow up',
    },
    {
      name: 'Assign demo class',
      value: 'ADD_DEMO_CLASS',
      subTitle: 'Assign demo class',
    },
    {
      name: 'Assign assessment test',
      value: 'ASSIGN_ASSESSMENT_TEST',
      subTitle: 'Assign assessment test',
    },
    {
      name: 'Activity timeline',
      value: 'ACTIVITY_TIMELINE',
    },
    {
      name: 'Assign demo account',
      value: 'ASSIGN_DEMO_ACCOUNT',
    },
    {
      name: 'Assign Individual Lead',
      value: 'ASSIGN_INDIVIDUAL_LEAD',
    },
  ];

  return (
    <div className="bg-white rounded-sm shadow z-50" style={{ zIndex: 1000 }}>
      {record?.leadStatusId &&
        record?.leadStatusId !== 'LEAD_CLOSED' &&
        list
          ?.filter((item) =>
            record?.assignAssessTest === false ? item?.value !== 'ASSIGN_ASSESSMENT_TEST' : item,
          )
          ?.filter((item) =>
            record?.lookingFor?.includes('COURSES')
              ? item
              : item?.value !== 'ASSIGN_ASSESSMENT_TEST',
          )
          .filter((item) =>
            record?.lookingFor?.includes('COURSES') ? item : item?.value !== 'ASSIGN_DEMO_ACCOUNT',
          )
          .filter((item) =>
            record?.lookingFor?.includes('COURSES') ? item : item?.value !== 'ADD_DEMO_CLASS',
          )
          ?.filter((val) =>
            record?.status !== 'Active' ? val?.value !== 'REGISTER_AS_STUDENT' : val,
          )
          .map((item) => (
            <div
              key={item?.value}
              onClick={() => {
                if (item?.value === 'EDIT' && type === 'client') {
                  history.push(`/leads/clients/${partyId}/edit`);
                } else if (item?.value === 'EDIT' && type === 'student') {
                  history.push(`/leads/students/${partyId}/edit`);
                } else if (item?.value === 'REGISTER_AS_STUDENT' && type === 'student') {
                  history.push(`/students/new/${partyId}`);
                } else {
                  dispatch({
                    type: 'leads/setStates',
                    payload: {
                      visible: true,
                      type: item?.value,
                      title: item?.name,
                      subTitle: item?.subTitle,
                      leadId: partyId,
                      rec: null,
                      purposeFor: type === 'student' ? 'students' : 'clients',
                      record,
                      keyword,
                    },
                    key: 'editLead',
                  });
                  setHideDropDown({
                    [partyId]: false,
                  });
                }
              }}
              className={`border-b p-3 border-gray-300 cursor-pointer hover:bg-yellow-50 ${
                editLead?.type === item?.value ? ' bg-gray-100' : ''
              }`}
              disable={record?.status === 'Closed' ? true : null}
            >
              {item?.name}
            </div>
          ))}
      <Popconfirm
        title="Are you sure that you want to delete this lead?"
        onConfirm={() => {
          dispatch({
            type: 'leads/removeLead',
            payload: {
              pathParams: {
                leadId: partyId,
              },
              body: {
                isEnabled: true,
              },
            },
          }).then((res) => {
            if (res) message.success('Your lead is deleted successfully');
          });
        }}
        okText="Yes"
        cancelText="No"
      >
        <div
          key={'DELETE'}
          className={`border-b p-3 border-gray-300 cursor-pointer hover:bg-yellow-50 ${
            editLead?.type === 'DELETE' ? ' bg-gray-100' : ''
          }`}
        >
          Delete
        </div>
      </Popconfirm>
    </div>
  );
};

export default connect(({ leads }) => ({
  selectedLead: leads?.selectedLead,
  editLead: leads?.editLead,
}))(LeadActions);
