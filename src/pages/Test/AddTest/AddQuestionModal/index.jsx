/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import AppModal from '@/components/AppModal';

const Justification = ({ optName }) => {
  const { TextArea } = Input;
  return (
    <>
      <p className="mb-1 ml-6 font-medium text-gray-800">
        Justification &#x00028;Optional&#x00029;
      </p>
      <Form.Item
        name={[optName, 'justification']}
        rules={[
          {
            required: true,
            message: 'Please enter justification',
          },
        ]}
        initialValue=""
        style={{ paddingLeft: '22px' }}
      >
        <TextArea rows={2} placeholder="Enter a answer here" size="middle" />
      </Form.Item>
    </>
  );
};

const AddQuestionModal = ({
  isModalVisible,
  setIsModalVisible,
  setAllModalValues,
  setCorrectOptions,
  correctOptions,
  modalType,
  editModuleValues,
  allModalValues,
  setEditModuleValues,
  editModuleRecordIndex,
}) => {
  const { TextArea } = Input;

  const [form] = useForm();

  useEffect(() => {
    if (editModuleValues) {
      const [values] = editModuleValues;
      const options = ['A', 'B', 'C', 'D'];
      const getOption = (value) => options.filter((o) => (value === values[o].option ? o : false));
      const data = editModuleValues;
      data[0].answers = values.answers.map((a) => ({ ...a, option: getOption(a.value)[0] }));
      setEditModuleValues(data);
      form.setFieldsValue({ ...values });
      setCorrectOptions(values?.answers?.map(({ option }) => option));
    }
  }, [editModuleValues, form]);

  const onQuestionFinishHandler = (values) => {
    // Setting modal values in state on edit

    if (modalType === 'edit') {
      const array = allModalValues;

      array[editModuleRecordIndex] = {
        ...values,
        answers: correctOptions.map((val) => ({
          option: val,
          value: values[val].option,
          description: values[val].justification,
        })),
      };

      setAllModalValues(array);

      setIsModalVisible(false);
      setCorrectOptions([]);

      form.resetFields();
      return;
    }

    // Setting modal values in state on Adding

    setAllModalValues((prev) => {
      return [
        ...prev,
        {
          ...values,
          categoryId: 'MCQ',

          answers: correctOptions.map((val) => ({
            option: val,
            value: values[val].option,
            description: values[val].justification,
          })),
        },
      ];
    });

    setIsModalVisible(false);
    setCorrectOptions([]);
    form.resetFields();
  };

  return (
    <>
      {/* Modals */}
      <AppModal
        afterClose={() => {
          form.resetFields();
          setCorrectOptions([]);
        }}
        titleName={modalType === 'edit' ? 'Edit Questions' : 'Add Questions'}
        showModal={isModalVisible}
        setShowModal={() => setIsModalVisible(false)}
        maskClosable={false}
        destroyOnClose
        footer={
          <div className="flex justify-end">
            <div>
              <Button
                type="link"
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  form?.submit();
                }}
              >
                {modalType === 'edit' ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        }
        width={600}
      >
        <div
          className="p-4"
          style={{ maxHeight: '600px', overflowY: 'scroll', overflowX: 'hidden' }}
        >
          <Form
            form={form}
            initialValues={{
              remember: true,
            }}
            onFinish={onQuestionFinishHandler}
            onFinishFailed={(err) => err}
            requiredMark="optional"
          >
            <div>
              <p className="mb-1 font-medium text-gray-800">Question</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter  question',
                  },
                ]}
                initialValue=""
              >
                <TextArea rows={2} placeholder="Enter question here" size="middle" />
              </Form.Item>
            </div>

            <div>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={correctOptions}
                onChange={(v) => {
                  // Array of correctOptions
                  setCorrectOptions(v);
                }}
              >
                <label className="flex items-center cursor-pointer space-x-3 mb-3 w-28 ">
                  <Checkbox size="middle" value="A" />
                  <span className=" font-medium text-gray-800">Option A</span>
                </label>

                <Form.Item
                  name={['A', 'option']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option A',
                    },
                  ]}
                  initialValue=""
                  className="w-full"
                >
                  <TextArea rows={2} placeholder="Enter answer here" size="middle" />
                </Form.Item>
                {correctOptions?.includes('A') ? <Justification optName="A" /> : null}
                <label className="flex items-center cursor-pointer space-x-3 mb-3 w-28">
                  <Checkbox size="middle" value="B" />
                  <span className=" font-medium text-gray-800">Option B</span>
                </label>

                <Form.Item
                  name={['B', 'option']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option B',
                    },
                  ]}
                  initialValue=""
                  className="w-full"
                >
                  <TextArea rows={2} placeholder="Enter answer here" size="middle" />
                </Form.Item>
                {correctOptions?.includes('B') ? <Justification optName="B" /> : null}
                <label className="flex items-center cursor-pointer space-x-3 mb-3 w-28">
                  <Checkbox size="middle" value="C" />
                  <span className=" font-medium text-gray-800">Option C</span>
                </label>

                <Form.Item
                  name={['C', 'option']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option C',
                    },
                  ]}
                  initialValue=""
                  className="w-full"
                >
                  <TextArea rows={2} placeholder="Enter answer here" size="middle" />
                </Form.Item>
                {correctOptions?.includes('C') ? <Justification optName="C" /> : null}
                <label className="flex items-center cursor-pointer space-x-3 mb-3 w-28">
                  <Checkbox size="middle" value="D" />
                  <span className=" font-medium text-gray-800">Option D</span>
                </label>
                <Form.Item
                  name={['D', 'option']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter option D',
                    },
                  ]}
                  initialValue=""
                  className="w-full"
                >
                  <TextArea rows={2} placeholder="Enter answer here" size="middle" />
                </Form.Item>
                {correctOptions?.includes('D') ? <Justification optName="D" /> : null}
              </Checkbox.Group>
            </div>
          </Form>
        </div>
      </AppModal>
    </>
  );
};

export default AddQuestionModal;
