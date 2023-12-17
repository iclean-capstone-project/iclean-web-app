import React, { useEffect, useState } from "react";
import {Button, Col, Form, Input, Row} from "antd";
import { IServiceUnitDetail1, getServiceUnitDetail} from "@app/api/ApiServiceUnit";
import { formatMoney } from "@app/utils/formatMoney";

interface IProps {
  serviceUnitId: number
  unitDetail: string
  defaultPrice: number
}

export function FormServiceUnit(props : IProps) {
    const {
      serviceUnitId,
      unitDetail,
      defaultPrice
    } = props;

    const [dataInit, setDataInit] = useState<IServiceUnitDetail1>()

    useEffect(() => {
      getServiceUnitDetail(serviceUnitId)
      .then((res) => {
        console.log(res);
        setDataInit(res.data)
      })
    },[])


  const handleOnFinish = (e: any) => {
    console.log(e);
  };

  const initialValues = {
    unit: unitDetail,
    defaultPrice: formatMoney(defaultPrice),
  }

  return (
    <div>
      <Form 
      onFinish={handleOnFinish}
      initialValues={initialValues}
      key={unitDetail}
      >
        <Row gutter={[16, 8]}>
        <Col span={24}><h4>Chi tiết dịch vụ</h4></Col>
          <Col span={10}>
            <Form.Item name="unit" label="Đơn vị">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="defaultPrice" label="Mặc định">
              <Input></Input>
            </Form.Item>
          </Col>
          {dataInit?.servicePrices.map((item, index) => (
            <>
              <Col span={24}><h4>{`${item.startTime} - ${item.endTime}`}</h4></Col>
              <Col span={10}>
                <Form.Item name={item.id} label="Giá">
                  <Input defaultValue={item.price}></Input>
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item name="commission1" label="Hoa hồng">
                  <Input defaultValue={item.employeeCommission}></Input>
                </Form.Item>
              </Col>
            </>
          ))}
        </Row>
        <Form.Item>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>Lưu</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
