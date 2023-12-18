import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  notification,
} from "antd";
import React, {useState} from "react";
import {FormServiceUnit} from "../FormServiceUnit";

interface IProps {
  open: any;
  close: any;
}

export function PopupAddService(props: IProps) {
  const {open, close} = props;
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [unit, setUnit] = useState<number>(1);

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    console.log(unit);
  };

  const tabList = [
    {
      key: "tab1",
      tab: "Thông tin dịch vụ",
    },
    {
      key: "tab2",
      tab: "Đơn vị 1",
    },
    {
      key: "tab3",
      tab: "Đơn vị 2",
    },
    {
      key: "tab4",
      tab: "Đơn vị 3",
    },
  ];

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const addService = async (values: any) => {
    console.log(values);
    notification.success({
      message: "Thành công",
      description: "Thêm mới dịch vụ thành công.",
    });
    setActiveTabKey("tab2");
  };

  const handleChangeUnit = (e: any) => {
    console.log(e);
    setUnit(e);
  };

  const nextTab = () => {
    switch (activeTabKey) {
      case "tab1":
        setActiveTabKey("tab2");
        break;
      case "tab2":
        setActiveTabKey("tab3");
        break;
      case "tab3":
        setActiveTabKey("tab4");
        break;
    }
  };

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <>
        <Form layout="vertical" onFinish={addService}>
          <Form.Item name={"serviceName"} label={"Tên dịch vụ"}>
            <Input></Input>
          </Form.Item>
          <Form.Item name={"description"} label={"Mô tả"}>
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Form.Item
              name={"unit"}
              label={"Đơn vị tính"}
              style={{display: "inline-block", width: "calc(50% - 16px)"}}
            >
              <Select
                defaultValue={unit}
                onChange={handleChangeUnit}
                options={[
                  {value: 1, label: "m2"},
                  {value: 4, label: "m3"},
                  {value: 7, label: "người"},
                  {value: 10, label: "hp"},
                  {value: 13, label: "kg"},
                ]}
              />
            </Form.Item>
            <Form.Item
              name={"serviceAvatar"}
              label={"Icon dịch vụ"}
              style={{
                display: "inline-block",
                width: "calc(50% - 16px)",
                float: "right",
              }}
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Form.Item>
          <Form.Item
            name={"serviceFileImages"}
            label="Hình ảnh dịch vụ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{marginTop: 8}}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
      </>
    ),
    tab2: <FormServiceUnit unitId={unit} serviceId={1}></FormServiceUnit>,
    tab3: <FormServiceUnit unitId={unit + 1} serviceId={1}></FormServiceUnit>,
    tab4: <FormServiceUnit unitId={unit + 2} serviceId={1}></FormServiceUnit>,
  };

  return (
    <Modal
      className="border_radius"
      title={"Thêm dịch vụ"}
      open={open}
      footer={[]}
      onCancel={close}
      width={1000}
    >
      <Card
        className="border_radius"
        style={{width: "100%"}}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    </Modal>
  );
}
