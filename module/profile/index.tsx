import {FormOutlined} from "@ant-design/icons";
import ApiProfile, { DataType, IInfoUser, IUpdateProfileData } from "@app/api/ApiProfile";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Upload,
  notification,
} from "antd";
import React, {useEffect, useState} from "react";
import { useQuery } from "react-query";

export function Profile(): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<DataType>();

  // ApiProfile.getProfile()
  //   .then((res) => {
  //     setUserData(res.data);
  //     console.log(userData);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // useEffect(() => {
  // }, []);
  
    console.log("aaaa");

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const apiUrl = 'https://iclean.azurewebsites.net/api/v1/profile';
    const requestData = {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      fileImage: 'base64encodedimage',
    };

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));

    // Prepare the data for the updateProfile function
    // const updatedProfileData: IUpdateProfileData = {
    //   fullName: values.fullName,
    //   dateOfBirth: "",
    //   fileImage: "", // Add the logic to get the fileImage data if needed
    // };

    // console.log(updatedProfileData);

    // // Call the updateProfile function
    // ApiProfile.updateProfile(updatedProfileData)
    //   .then((response) => {
    //     console.log("Profile updated successfully:", response.data);
    //     setIsEdit(true);
    //     // You may want to update the local state with the updated data if needed
    //     setUserData(response.data);
    //     notification.success({
    //       message: "Thành công",
    //       description: "Cập nhât thông tin thành công.",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error updating profile:", error);
    //     notification.error({
    //       message: "Lỗi",
    //       description:
    //         "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
    //     });
    //   });
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

  const getUserData = (): Promise<IInfoUser> =>
    ApiProfile.getInfoUser();

  const {refetch} = useQuery(["GET_DATA_USER"], getUserData, {
    onSuccess: (res: any) => {
      console.log("User data: ", res?.data);
      setUserData(res?.data ?? []);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

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
