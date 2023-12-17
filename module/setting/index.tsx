import {ISystemParameter, getSystemParameter} from "@app/api/ApiSystem";
import {Button, Card, Col, Form, Input, Row} from "antd";
import React, {useEffect, useState} from "react";

export function Setting() {
  const [dataInit, setDataInit] = useState<ISystemParameter[]>();
  useEffect(() => {
    getSystemParameter()
      .then((res) => {
        console.log(res.data);
        setDataInit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const genLabel = (name: string): string => {
    if (name === "max_update_minutes") {
      return "Số phút cập nhật tối đa";
    } else if (name === "max_end_time_minutes") {
      return "Số phút tối đa kết thúc";
    } else if (name === "max_distance") {
      return "Khoảng cách tối đa";
    } else if (name === "point_to_money") {
      return "Điểm";
    } else if (name === "request_booking_count") {
      return "Số lượng yêu cầu đặt dịch vụ";
    } else if (name === "delay_minutes") {
      return "Thời gian được phép trễ (phút)";
    } else if (name === "max_minutes_send_money") {
      return "Thời gian tối đa để gửi tiền";
    } else if (name === "max_minutes_cancel_booking") {
      return "Thời gian tối đa để huỷ dịch vụ";
    } else if (name === "otp_message_default") {
      return "Tin nhắn hệ thống";
    }
    return "";
  };

  return (
    <div>
      <Card>
        <h2>Thông số</h2>
        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={[48, 24]}>
            {dataInit?.map((item, index) => (
              <Col span={12} key={index}>
                <Form.Item
                  name={item.parameterField}
                  label={genLabel(item.parameterField)}
                >
                  <Input defaultValue={item.parameterValue}></Input>
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Button type="primary" htmlType="submit" style={{float: "right"}}>
            Lưu
          </Button>
        </Form>
      </Card>
    </div>
  );
}
