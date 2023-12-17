import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import React, {useEffect, useState} from "react";
import {FormServiceUnit} from "../list_service/components/FormServiceUnit";
import {IService, getServiceById} from "@app/api/ApiService";
import {useRouter} from "next/router";
import TextArea from "antd/lib/input/TextArea";
import "./index.scss";

export function DetailService() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [unit, setUnit] = useState<number>(1);
  const [dataInit, setDataInit] = useState<IService>();
  const router = useRouter();

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
    console.log(unit);
  };

  console.log("object");

  const serviceId = router?.query?.id
    ? parseInt(router.query.id as string, 10)
    : 1;

  useEffect(() => {
    getServiceById(serviceId)
      .then((res) => {
        console.log("service >>> ", res.data);
        setDataInit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [serviceId]);

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

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const contentList: Record<string, React.ReactNode> = {
    tab1: (
      <>
        <Form layout="vertical" onFinish={onFinish} initialValues={dataInit}>
          <Form.Item name={"serviceName"} label={"Tên dịch vụ"}>
            <Input defaultValue={dataInit?.serviceName}></Input>
          </Form.Item>
          <Form.Item name={"description"} label={"Mô tả"}>
            <TextArea rows={8} defaultValue={dataInit?.description}></TextArea>
          </Form.Item>
          <Form.Item name={"serviceAvatar"} label={"Icon dịch vụ"}>
            <div className="d_flex">
              <div className="me_2">
                <Image
                  src={dataInit?.serviceIcon}
                  width={102}
                  height={102}
                ></Image>
              </div>
              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{marginTop: 8}}>Chọn icon</div>
                </div>
              </Upload>
            </div>
          </Form.Item>
          <Form.Item
            name={"serviceFileImages"}
            label="Hình ảnh dịch vụ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <div className="d_flex">
              {dataInit?.images.map((item, i) => (
                <div key={i} className="me_2">
                  <Image
                    src={item.serviceImage}
                    width={102}
                    height={102}
                  ></Image>
                </div>
              ))}
              <div>
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{marginTop: 8}}>Thêm ảnh</div>
                  </div>
                </Upload>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              Lưu
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
    <Card
      style={{width: "100%"}}
      tabList={tabList}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
    >
      {contentList[activeTabKey]}
    </Card>
  );
}
