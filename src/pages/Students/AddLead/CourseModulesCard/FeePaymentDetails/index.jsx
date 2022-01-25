import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Select, DatePicker, Divider } from 'antd';
import { currencyFormatter, currencyParser, decodeDollarsToDigits } from '@/utils/utils';
import Card from '@/components/Structure/Card';
import moment from 'moment';
import DiscountDetails from '../DiscountDetails';
import { connect } from 'umi';

const FeePaymentDetails = ({
  courseDetailsForm,
  index,
  feeArray,
  feesDetailsForm,
  courseDisplayName,
  courseList,
  setInstallmentsLevel,
  setPaymentMode,
}) => {
  const modulesIds = courseDetailsForm.getFieldValue(['items', index, 'modulesList']);
  const modulesList = courseList[index]?.courseModulesArray?.filter((mod) =>
    modulesIds?.includes(mod?.id),
  );
  const [isAddOtherAddAdjustmentPresent, setIsAddOtherAddAdjustmentPresent] = useState({
    addAdjustment: false,
    addOther: false,
  });
  useEffect(() => {
    setIsAddOtherAddAdjustmentPresent({
      addAdjustment: feesDetailsForm?.getFieldValue(['items', index, 'feeTypeIdAdjustment']),
      addOther: feesDetailsForm.getFieldValue(['items', index, 'feeTypeIdOtherCharges']),
    });
  }, [feesDetailsForm, index]);
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(null);
  const cleanInput = (inp) => {
    if (inp) {
      return inp.replace(/(?!-)[^0-9.]/g, '').replace('-', '');
    }
    return '';
  };
  const onChange = (e, idx) => {
    const items = feesDetailsForm.getFieldValue('items');
    const values = cleanInput(e.toString());
    items[index].modulesItems[idx] = {
      ...items[index].modulesItems[idx],
      moduleNoOfDays: values,
    };
    feesDetailsForm.setFieldsValue({
      items,
    });
  };
  return (
    <Card>
      <h2 className="p-5 text-base font-semibold text-gray-800 ">
        {courseDetailsForm.getFieldValue(['items', index, 'addModulesCheckbox'])
          ? `${courseDisplayName} module wise fee details`
          : `${courseDisplayName} full course fee details`}
      </h2>
      <Divider style={{ margin: '0' }} />
      <div className="px-4 mt-4">
        {courseDetailsForm.getFieldValue(['items', index, 'addModulesCheckbox']) &&
          modulesList?.map((moduleItem, idx) => (
            <Row gutter={[12]} key={moduleItem?.id} Form={feesDetailsForm}>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <p className="font-medium text-gray-800">Module name</p>
                <Form.Item
                  name={['items', index, 'modulesItems', idx, 'moduleId']}
                  rules={[
                    {
                      required: true,
                      message: 'Please type name of the module',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Please list down the module name"
                    style={{ width: '100%' }}
                    getPopupContainer={(node) => node.parentNode}
                  >
                    <Select.Option value={moduleItem?.id}>{moduleItem?.displayName}</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <div className="">
                  <p className="font-medium text-gray-800">Frequency of time</p>
                  <Form.Item
                    name={['items', index, 'modulesItems', idx, 'moduleDurationUnitId']}
                    rules={[
                      {
                        required: true,
                        message: 'Please select module fee frequency',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      size="large"
                      getPopupContainer={(node) => node.parentNode}
                      placeholder="Select a frequency of time"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      onSelect={(val) => {
                        const items = feesDetailsForm.getFieldValue('items');

                        const fee1 = moduleItem?.fees?.find((amt) => amt?.feeDurationId === val)
                          ?.feeAmount;
                        setValue((prev) => {
                          return { ...prev, ...fee1 };
                        });
                        items[index].modulesItems[idx] = {
                          ...items[index].modulesItems[idx],
                          moduleBasicAmount: currencyFormatter.format(fee1),
                        };

                        let fee = 0;

                        items?.forEach((item, idxModules) => {
                          if (item?.modulesItems !== undefined) {
                            item?.modulesItems?.forEach((selectedAmt) => {
                              fee += Number(
                                decodeDollarsToDigits(selectedAmt?.moduleBasicAmount || 0),
                              );
                            });
                          } else {
                            fee += Number(decodeDollarsToDigits(item?.basicAmount || 0));
                          }
                          if (index !== idxModules) {
                            fee -= Number(decodeDollarsToDigits(item?.adjustmentAmount || 0));
                            fee += Number(decodeDollarsToDigits(item?.otherAmount || 0));
                          }
                        });

                        feesDetailsForm.setFieldsValue({
                          items,
                          feePayment: { totalFees: currencyFormatter.format(fee) },
                        });
                      }}
                      onChange={(val) => {
                        if (val) {
                          const items = feesDetailsForm.getFieldValue('items');
                          items[index] = {
                            ...items[index],
                            otherPurpose: '',
                            otherRemarks: '',
                            otherAmount: '',
                            adjustmentPurpose: '',
                            adjustmentRemarks: '',
                            adjustmentAmount: '',
                            feeTypeIdAdjustment: false,
                            feeTypeIdOtherCharges: false,
                          };

                          feesDetailsForm.setFieldsValue({
                            items,
                          });
                          setIsAddOtherAddAdjustmentPresent({
                            addAdjustment: false,
                            addOther: false,
                          });
                          // Resetting installments fields when frequency of time changes
                          if (
                            feesDetailsForm?.getFieldValue(['feePayment', 'numOfInstallments']) > 0
                          ) {
                            setInstallmentsLevel([0]);
                            setPaymentMode(false);

                            feesDetailsForm.setFieldsValue({
                              feePayment: {
                                mode: false,
                                numOfInstallments: 1,
                              },
                              feePayments: [],
                            });
                          }
                        }
                      }}
                    >
                      {moduleItem?.fees?.map((item) => (
                        <Select.Option value={item?.feeDurationId} key={item?.feeDurationId}>
                          {item?.feeDuration}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <p className="font-medium text-gray-800">Module start date</p>
                <Form.Item
                  name={['items', index, 'modulesItems', idx, 'moduleStartDate']}
                  rules={[
                    {
                      required: true,
                      message: 'Please select module start date',
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select module start date"
                    on
                    onChange={(val) => {
                      // if statement to check when deselect start date and resetting end date accordingly

                      if (val === null) {
                        const items = feesDetailsForm.getFieldValue('items');

                        items[index].modulesItems[idx] = {
                          ...items[index].modulesItems[idx],
                          moduleNoOfDays: undefined,
                          moduleEndDate: undefined,
                        };
                        feesDetailsForm.setFieldsValue({
                          items,
                        });
                      }

                      // if statement to check when entered start date and enabling end date accordingly

                      if (
                        feesDetailsForm.getFieldValue([
                          'items',
                          index,
                          'modulesItems',
                          idx,
                          'moduleEndDate',
                        ]) !== undefined
                      ) {
                        const a = moment(val);
                        const b = moment(
                          feesDetailsForm.getFieldValue([
                            'items',
                            index,
                            'modulesItems',
                            idx,
                            'moduleEndDate',
                          ]),
                        );

                        const items = feesDetailsForm.getFieldValue('items');

                        setValue((prev) => {
                          return { ...prev, ...a };
                        });

                        items[index].modulesItems[idx] = {
                          ...items[index].modulesItems[idx],
                          moduleNoOfDays: b.endOf('day').diff(a.startOf('day'), 'days') + 1,
                        };
                        feesDetailsForm.setFieldsValue({
                          items,
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <p className="font-medium text-gray-800">Module end date</p>
                <Form.Item
                  name={['items', index, 'modulesItems', idx, 'moduleEndDate']}
                  rules={[
                    {
                      required: true,
                      message: 'Please select module end date',
                    },
                  ]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select module end date"
                    onChange={(val) => {
                      if (
                        feesDetailsForm.getFieldValue([
                          'items',
                          index,
                          'modulesItems',
                          idx,
                          'moduleStartDate',
                        ]) !== undefined
                      ) {
                        const a = moment(
                          feesDetailsForm
                            .getFieldValue(['items', index, 'modulesItems', idx, 'moduleStartDate'])
                            ?.toISOString(),
                        );
                        const b = moment(val?.toISOString());

                        const items = feesDetailsForm.getFieldValue('items');

                        setValue((prev) => {
                          return { ...prev, ...b };
                        });

                        items[index].modulesItems[idx] = {
                          ...items[index].modulesItems[idx],
                          moduleNoOfDays: b.endOf('day').diff(a.startOf('day'), 'days') + 1,
                        };
                        feesDetailsForm.setFieldsValue({
                          items,
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <p className="font-medium text-gray-800">No. of days</p>
                <Form.Item
                  name={['items', index, 'modulesItems', idx, 'moduleNoOfDays']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter module no. of days',
                    },
                  ]}
                >
                  <Input
                    autoComplete="off"
                    size="large"
                    // type="number"
                    min={0}
                    placeholder="Enter no. of days"
                    onChange={(e) => onChange(e.target.value, idx)}
                  />
                </Form.Item>
              </Col>
              <Col lg={4} xl={4} md={12} sm={24} xs={24}>
                <div>
                  <p className="font-medium text-gray-800">Amount</p>
                  <Form.Item
                    name={['items', index, 'modulesItems', idx, 'moduleBasicAmount']}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter module amount',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      onFocus={(e) => e.target.select()}
                      placeholder="₹0.00"
                      autoComplete="off"
                      className="text-right"
                      onBlur={(event) => {
                        let i = 0;
                        let res = event.target.value
                          // replace the dots with empty string if value contains more than one dot
                          // leave first decimal
                          .replace(/\./g, () => {
                            i += 1;
                            return i >= 2 ? '' : '.';
                          })
                          // replace the commas too with empty string if have any
                          .replace(/,/g, '');
                        let mod;
                        if (res) {
                          res = res[0] === '₹' ? res.substring(1, res.length).trim() : res;
                          mod = Number(res).toFixed(2);
                        } else {
                          mod = event.target.value;
                        }

                        const items = feesDetailsForm.getFieldValue('items');

                        setValue((prev) => {
                          return { ...prev, ...mod };
                        });

                        items[index].modulesItems[idx] = {
                          ...items[index].modulesItems[idx],
                          moduleBasicAmount: currencyFormatter.format(currencyParser(mod)),
                        };

                        let fee = 0;

                        items?.forEach((item) => {
                          if (item?.modulesItems !== undefined) {
                            item?.modulesItems?.forEach((selectedAmt) => {
                              fee += Number(
                                decodeDollarsToDigits(selectedAmt?.moduleBasicAmount || 0),
                              );
                            });
                          } else {
                            fee += Number(decodeDollarsToDigits(item?.basicAmount || 0));
                          }

                          fee -= Number(decodeDollarsToDigits(item?.adjustmentAmount || 0));
                          fee += Number(decodeDollarsToDigits(item?.otherAmount || 0));
                        });

                        feesDetailsForm.setFieldsValue({
                          items,
                          feePayment: {
                            totalFees: currencyFormatter.format(fee),
                          },
                        });

                        // Resetting installments fields when modules amount changes
                        if (
                          feesDetailsForm?.getFieldValue(['feePayment', 'numOfInstallments']) > 0
                        ) {
                          setInstallmentsLevel([0]);
                          setPaymentMode(false);

                          feesDetailsForm.setFieldsValue({
                            feePayment: {
                              mode: false,
                              numOfInstallments: 1,
                            },
                            feePayments: [],
                          });
                        }
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          ))}

        {!courseDetailsForm.getFieldValue(['items', index, 'addModulesCheckbox']) && (
          <Row gutter={[12]}>
            {/* Row for full course wise fees */}
            <Col lg={12} xl={12} md={12} sm={24} xs={24}>
              <div className="">
                <p className="font-medium text-gray-800">Frequency of time</p>
                <Form.Item
                  name={['items', index, 'durationUnitId']}
                  rules={[
                    {
                      required: true,
                      message: 'Please select fee frequency',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    getPopupContainer={(node) => node.parentNode}
                    placeholder="Select a frequency of time"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={(val) => {
                      const items = feesDetailsForm.getFieldValue('items');

                      items[index] = {
                        ...items[index],
                        basicAmount: currencyFormatter.format(
                          feeArray?.find((item) => item?.feeDurationId === val)?.feeAmount,
                        ),
                      };

                      let fee = 0;

                      items?.forEach((item, idx) => {
                        if (item?.modulesItems !== undefined) {
                          item?.modulesItems?.forEach((selectedAmt) => {
                            fee += Number(
                              decodeDollarsToDigits(selectedAmt?.moduleBasicAmount || 0),
                            );
                          });
                        } else {
                          fee += Number(decodeDollarsToDigits(item?.basicAmount || 0));
                        }
                        if (index !== idx) {
                          fee -= Number(decodeDollarsToDigits(item?.adjustmentAmount || 0));
                          fee += Number(decodeDollarsToDigits(item?.otherAmount || 0));
                        }
                      });

                      feesDetailsForm.setFieldsValue({
                        items,
                        feePayment: { totalFees: currencyFormatter.format(fee) },
                      });
                    }}
                    onChange={(val) => {
                      if (val) {
                        const items = feesDetailsForm.getFieldValue('items');
                        items[index] = {
                          ...items[index],
                          otherPurpose: '',
                          otherRemarks: '',
                          otherAmount: '',
                          adjustmentPurpose: '',
                          adjustmentRemarks: '',
                          adjustmentAmount: '',
                        };

                        feesDetailsForm.setFieldsValue({
                          items,
                        });
                        setIsAddOtherAddAdjustmentPresent({
                          addAdjustment: false,
                          addOther: false,
                        });
                        // Resetting installments fields when frequency of time changes
                        if (
                          feesDetailsForm?.getFieldValue(['feePayment', 'numOfInstallments']) > 0
                        ) {
                          setInstallmentsLevel([0]);
                          setPaymentMode(false);

                          feesDetailsForm.setFieldsValue({
                            feePayment: {
                              mode: false,
                              numOfInstallments: 1,
                            },
                            feePayments: [],
                          });
                        }
                      }
                    }}
                  >
                    {feeArray?.map((item) => (
                      <Select.Option value={item?.feeDurationId} key={item?.feeDurationId}>
                        {item?.feeDuration}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>

            <Col lg={12} xl={12} md={12} sm={24} xs={24}>
              <div>
                <p className="font-medium text-gray-800">Amount</p>
                <Form.Item
                  name={['items', index, 'basicAmount']}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter course amount',
                    },
                  ]}
                >
                  <Input
                    size="large"
                    onFocus={(e) => e.target.select()}
                    placeholder="₹0.00"
                    autoComplete="off"
                    className="text-right"
                    onBlur={(event) => {
                      let i = 0;
                      let res = event.target.value
                        // replace the dots with empty string if value contains more than one dot
                        // leave first decimal
                        .replace(/\./g, () => {
                          i += 1;
                          return i >= 2 ? '' : '.';
                        })
                        // replace the commas too with empty string if have any
                        .replace(/,/g, '');
                      let mod;
                      if (res) {
                        res = res[0] === '₹' ? res.substring(1, res.length).trim() : res;
                        mod = Number(res).toFixed(2);
                      } else {
                        mod = event.target.value;
                      }

                      const items = feesDetailsForm.getFieldValue('items');

                      setValue((prev) => {
                        return { ...prev, ...mod };
                      });
                      items[index] = {
                        ...items[index],
                        basicAmount: currencyFormatter.format(currencyParser(mod)),
                      };

                      let fee = 0;

                      items?.forEach((item) => {
                        if (item?.modulesItems !== undefined) {
                          item?.modulesItems?.forEach((selectedAmt) => {
                            fee += Number(
                              decodeDollarsToDigits(selectedAmt?.moduleBasicAmount || 0),
                            );
                          });
                        } else {
                          fee += Number(decodeDollarsToDigits(item?.basicAmount || 0));
                        }

                        fee -= Number(decodeDollarsToDigits(item?.adjustmentAmount || 0));
                        fee += Number(decodeDollarsToDigits(item?.otherAmount || 0));
                      });

                      // Resetting installments fields when amount changes
                      if (feesDetailsForm?.getFieldValue(['feePayment', 'numOfInstallments']) > 0) {
                        setInstallmentsLevel([0]);
                        setPaymentMode(false);

                        feesDetailsForm.setFieldsValue({
                          feePayment: {
                            mode: false,
                            numOfInstallments: 1,
                          },
                          feePayments: [],
                        });
                      }
                      feesDetailsForm.setFieldsValue({
                        items,
                        feePayment: {
                          totalFees: currencyFormatter.format(fee),
                        },
                      });
                    }}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <DiscountDetails
        feesDetailsForm={feesDetailsForm}
        courseDisplayName={courseDisplayName}
        index={index}
        isAddOtherAddAdjustmentPresent={isAddOtherAddAdjustmentPresent}
        setIsAddOtherAddAdjustmentPresent={setIsAddOtherAddAdjustmentPresent}
        modulesList={modulesList}
        setValue={setValue}
        setInstallmentsLevel={setInstallmentsLevel}
        setPaymentMode={setPaymentMode}
      />
    </Card>
  );
};

export default connect(({ student }) => ({
  courseFee: student?.courseFee,
}))(FeePaymentDetails);
