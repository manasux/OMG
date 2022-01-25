/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import React from 'react';
import { Link, connect } from 'umi';
import './index.less';
import { Checkbox, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditLead from '../EditLead';

const Leads = ({ editLead, children }) => {
  // const onChecked = (e) => {
  //   console.log(`checked`, e.target.checked);
  // };

  return (
    <>
      <div
        className="flex h-full"
        style={{
          paddingLeft: 20,
        }}
      >
        <div
          style={{
            marginTop: '1rem',
            width: editLead?.visible && editLead?.purposeFor === 'clients' ? '70%' : '100%',
          }}
          className="w-full"
        >
          <div className="pr-4 mb-5 link-wrap">
            <Checkbox />
            <div className="px-5 rounded cursor-pointer ant-btn-primary">Visas</div>
            <div className="px-5 rounded cursor-pointer ant-btn-primary">Others</div>
            <div className="px-5 rounded cursor-pointer ant-btn-primary">Courses</div>
          </div>

          <div className="mt-8">{children}</div>
          <Link to="/leads/clients/addlead">
            <Button
              style={{
                backgroundColor: 'rgb(27, 86, 143)',
                position: 'absolute',
                bottom: '2rem',
                right: editLead?.visible && editLead?.purposeFor === 'clients' ? '38rem' : '2rem',
                border: 'none',
                height: '60px',
                width: '60px',
              }}
              shape="circle"
              icon={<PlusOutlined style={{ fontSize: '2rem', color: '#fff' }} />}
            />
          </Link>
        </div>
        {editLead?.visible && editLead?.purposeFor === 'clients' && <EditLead />}
      </div>
    </>
  );
};
export default connect(({ leads }) => ({
  editLead: leads?.editLead,
}))(Leads);
