import React, { useEffect, useState } from 'react';
import { Avatar, Modal, Select, Button, Spin, message } from 'antd';
import { connect, useParams } from 'umi';
import { getInitials } from '@/utils/common';
import { debounce } from 'lodash-es';
import style from './index.less';

function AddStudentToBatchModal({
  visible,
  setVisible,
  dispatch,
  primaryColor,
  fetching,
  studentsOfCurrentBatch,
  loading,
}) {
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const { batchId } = useParams();

  const getStudents = (keyword) =>
    dispatch({
      type: 'student/getAllStudentList',
      payload: {
        query: {
          viewSize: 10000,
          keyword,
        },
      },
    })
      .then((res) => {
        const arrOfIdsStudentsOfCurrentBatch = studentsOfCurrentBatch?.map(
          (student) => student?.student?.id,
        );
        setStudentList(
          res?.records?.filter((student) => !arrOfIdsStudentsOfCurrentBatch?.includes(student?.id)),
        );
      })
      .catch(() => {});
  const debounceSearch = debounce(getStudents, 400);

  useEffect(() => {
    if (visible) {
      getStudents('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleAddStudentsToBatch = (studentsArr) => {
    dispatch({
      type: 'batch/addStudentsToBatch',
      payload: {
        body: studentsArr,
        pathParams: { batchId },
      },
    })
      .then(() => {
        dispatch({
          type: 'batch/getStudentAssignToBatch',
          payload: { pathParams: { batchId } },
        }).catch(() => {});
        message.success(`${studentsArr?.length} student(s) added to the batch successfully`);
        setVisible(false);
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Add students to batch"
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      destroyOnClose
      bodyStyle={{ maxHeight: '60vh', overflow: 'auto' }}
      afterClose={() => {
        setStudents([]);
        setStudentList([]);
      }}
      footer={
        <div className="flex justify-between ">
          <div>{students?.length} Record(s)</div>
          <Button
            type="primary"
            loading={loading}
            onClick={() => {
              handleAddStudentsToBatch(students?.map((student) => ({ id: student })));
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
            setStudents(ev);
          }}
          placeholder="Search students"
          mode="multiple"
          value={students}
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
          {studentList?.map((student) => (
            <Select.Option key={student?.id}>
              <div className="w-full flex">
                <div>
                  <Avatar style={{ background: primaryColor }} src={student?.photoUrl}>
                    {getInitials(student?.name)}
                  </Avatar>
                </div>
                <div className="pl-4 pb-2">
                  <p className="mb-0 ">{student?.name}</p>
                  <p className="mb-0 text-gray-600">{student?.primaryEmail}</p>
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
  studentsOfCurrentBatch: batch.studentsOfCurrentBatch,
  fetching: loading.effects['student/getAllStudentList'],
  loading: loading.effects['batch/addStudentsToBatch'],
}))(AddStudentToBatchModal);
