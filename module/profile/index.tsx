import {FormOutlined, UploadOutlined} from "@ant-design/icons";
import ApiProfile, { DataType, IInfoUser, IInfoUserData, getProfile } from "@app/api/ApiProfile";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Upload,
} from "antd";
import { log } from "console";
import React, {useEffect, useState} from "react";

export function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<DataType>();
  


  useEffect(() => {
    // Fetch profile information when the component mounts
  }, []);
  
     const res = getProfile()
     console.log(res);
    

    const onFinish = (values: any) => {
      console.log("Success:", values);
      const updatedInfo: IInfoUserData = {
        fullName: values.fullName,
        dateOfBirth: values.datePicker.format("YYYY-MM-DD"),
        fileImage: "",
      };
  

      ApiProfile.updateInfoUser(updatedInfo)
        .then((response) => {
          console.log("User information updated successfully:", response.data);
          setIsEdit(true);
        })
        .catch((error) => {
          console.error("Error updating user information:", error);
        });
      setIsEdit(true);
    };
    
    const editInfo = () => {
      setIsEdit(false);
    };
    
    const handleImageChange = (info: any) => {
      console.log(info.file.status);
      if (info.file.status === 'done') {
        console.log(info.file.response.url);
        setSelectedImage(info.file.response.url);
    }
  };

  const initValue = {
    fullName: "userData?.fullNam",
    roleName: "userData",
  }

  console.log("initValue", initValue)
  return (
    <div className="profile-container">
      <Row>
        <Col span={4}>
        </Col>
        <Col span={16}>
          <Card>
            <Form
              name="profile"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              initialValues={userData}
            >
              <div style={{display: "flex", margin: "24px 0px"}}>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginRight: "24px",
                  }}
                >
                  <Image src={selectedImage || userData?.avatar} style={{objectFit: "cover", height: "100%"}} />
                </div>
                <div>
                  <h2>{userData?.fullName}</h2>
                  <Upload 
                    maxCount={1}
                    showUploadList={false}
                    onChange={handleImageChange}
                  >
                    <Button
                      style={{padding: "0", border: "none", color: "#1890ff"}}
                    >
                      Tải ảnh đại diện
                    </Button>
                  </Upload>
                </div>
              </div>
              <Form.Item  label="Họ và tên" name="fullName">
                <Row>
                  <Col span={22}>
                    <Input
                      // defaultValue={userData?.fullName}
                      readOnly={isEdit}
                      size={"large"}
                      placeholder="Họ và tên"
                    />
                  </Col>
                  <Col span={2} style={{display: "flex", justifyContent: "end"}}>
                    <Button
                      onClick={editInfo}
                      type="primary"
                      size="large"
                      icon={<FormOutlined />}
                    ></Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="Vai trò" name="roleName">
                <Input
                  readOnly={isEdit}
                  size={"large"}
                  placeholder="Vai trò"
                />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phoneNumber">
                <Input
                  name="phoneNumber"
                  readOnly={isEdit}
                  size={"large"}
                  placeholder="Số điện thoại"
                />
              </Form.Item>

              <Form.Item label="DatePicker" name="datePicker">
                <DatePicker style={{width: "100%", height: "40px"}} inputReadOnly={true}/>
              </Form.Item>

              <Form.Item label="Địa chỉ" name="defaultAddress">
                <Input
                  readOnly={isEdit}
                  size={"large"}
                  placeholder="Địa chỉ"
                />
              </Form.Item>

              <Form.Item wrapperCol={{span: 20}}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{width: "200px", height: "40px"}}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
