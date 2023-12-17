import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import { Button, Card, Form, Image, Input, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IService, getServiceById} from "@app/api/ApiService";
import TextArea from "antd/lib/input/TextArea";

import { IServiceUnit, getAllServiceUnit } from "@app/api/ApiServiceUnit";
import { FormServiceUnit } from "./components/FormServiceUnit";
import "./index.scss"

export function DetailService() {
  const [activeTabKey, setActiveTabKey] = useState<string>("tab1");
  const [dataInit, setDataInit] = useState<IService>();
  const [serviceUnit, setServiceUnit] = useState<IServiceUnit[]>([]);
  const router = useRouter();

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

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

    getAllServiceUnit({serviceId: serviceId})
    .then((res) => {
      console.log(res);
      setServiceUnit(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
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
          <Form.Item
            name={"serviceAvatar"}
            label={"Icon dịch vụ"}
          >
            <div className="d_flex">
              <div className="me_2">
                <Image src={dataInit?.serviceIcon} width={102} height={102} ></Image>
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
                {
                  dataInit?.images.map((item, i) => (<div key={i} className="me_2" ><Image src={item.serviceImage} width={102} height={102} ></Image></div>))
                }
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
    tab2: <FormServiceUnit key={1} serviceUnitId={serviceUnit[0]?.serviceUnitId}  unitDetail={serviceUnit[0]?.unitDetail} defaultPrice={serviceUnit[0]?.defaultPrice}></FormServiceUnit>,
    tab3: <FormServiceUnit key={2} serviceUnitId={serviceUnit[1]?.serviceUnitId}  unitDetail={serviceUnit[1]?.unitDetail} defaultPrice={serviceUnit[1]?.defaultPrice}></FormServiceUnit>,
    tab4: <FormServiceUnit key={3} serviceUnitId={serviceUnit[2]?.serviceUnitId}  unitDetail={serviceUnit[2]?.unitDetail} defaultPrice={serviceUnit[2]?.defaultPrice}></FormServiceUnit>,
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
