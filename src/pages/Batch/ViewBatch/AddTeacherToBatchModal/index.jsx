import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Select, Button, Spin } from 'antd';
import { connect, useParams } from 'umi';
import { getInitials } from '@/utils/common';
import { debounce } from 'lodash-es';
import style from './index.less';

function AddTeacherToBatchModal({
  visible,
  setVisible,
  dispatch,
  primaryColor,
  fetching,
  loading,
  trainersOfCurrentBatch,
}) {
  const [teachers, setTeachers] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const { batchId } = useParams();

  const getTeachers = (keyword) =>
    dispatch({
      type: 'staff/getStaffList',
      payload: {
        query: {
          statusId: 'PARTYINV_ACCEPTED',
          viewSize: 10000,
          keyword,
        },
        pathParams: { batchId },
      },
    }).then((res) => {
      const idsOfPrevTrainer = trainersOfCurrentBatch?.map((trainer) => trainer?.id);
      // remove  trainer already in the batch
      setStaffList({
        records: res?.records?.filter((trainer) => !idsOfPrevTrainer?.includes(trainer?.partyId)),
      });
    });
  const debounceSearch = debounce(getTeachers, 400);

  useEffect(() => {
    getTeachers('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTeachersToBatch = (teachersArr) => {
    dispatch({
      type: 'batch/addTeachersToBatch',
      payload: {
        body: teachersArr,
        pathParams: { batchId },
      },
    })
      .then(() => {
        dispatch({
          type: 'batch/getTrainerAssignToBatch',
          payload: { pathParams: { batchId } },
        }).catch(() => {});
        setVisible(false);
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Add teachers to batch"
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      destroyOnClose
      bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
      afterClose={() => {
        setTeachers([]);
      }}
      footer={
        <div className="flex justify-between ">
          <div>{teachers?.length} Record(s)</div>
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              handleAddTeachersToBatch(teachers?.map((teacher) => ({ id: teacher })));
            }}
          >
            Add
          </Button>
        </div>
      }
    >
      <div className={` ${style.overRideSelect} w-full`}>
        <Select
          onChange={(ev) => {
            setTeachers(ev);
          }}
          placeholder="Search teachers"
          mode="multiple"
          value={teachers}
          showSearch
          filterOption={false}
          notFoundContent={
            fetching ? (
              <div className="flex justify-center">
                <Spin size="small" />{' '}
              </div>
            ) : null
          }
          onSearch={debounceSearch}
          className="w-full"
          size="large"
        >
          {staffList?.records?.map((teacher) => (
            <Select.Option key={teacher?.partyId}>
              <div className="w-full flex">
                <div>
                  <Avatar style={{ background: primaryColor }} src={teacher?.photoUrl}>
                    {getInitials(teacher?.displayName)}
                  </Avatar>
                </div>
                <div className="pl-4 pb-2">
                  <p className="mb-0 ">{teacher?.displayName}</p>
                  <p className="mb-0 text-gray-600">{teacher?.primaryEmail}</p>
                </div>
              </div>
            </Select.Option>
          ))}
        </Select>
      </div>
    </Modal>
  );
}
export default connect(({ batch, settings, loading }) => ({
  primaryColor: settings.primaryColor,
  trainersOfCurrentBatch: batch.trainersOfCurrentBatch,
  fetching: loading.effects['batch/getTrainers'],
  loading: loading.effects['batch/addTeachersToBatch'],
}))(AddTeacherToBatchModal);
