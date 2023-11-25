import React from "react";
import "./style.scss";
import {Image} from "antd";
import {MenuFoldOutlined, PhoneOutlined} from "@ant-design/icons";

interface IProps {
  dataInfoHelper?: any;
}
export function HelperInfo(props: IProps): JSX.Element {
  const {dataInfoHelper} = props;
  return (
    <div className="helper-info-container">
      <h3>THÔNG TIN</h3>
      <div className="avatar-helper">
        <Image
          preview={false}
          style={{borderRadius: "50%"}}
          width={180}
          src={dataInfoHelper?.personalAvatar}
        />
        <h3>{dataInfoHelper?.fullName}</h3>
      </div>
      <div className="list-info">
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.email}</div>
        </div>
        <div className="item-info">
          <PhoneOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.phoneNumber}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.dateOfBirth}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.placeOfResidence}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.homeTown}</div>
        </div>
        <div className="item-info">
          <MenuFoldOutlined className="icon" color="#EFF3FA" />
          <div>{dataInfoHelper?.status}</div>
        </div>
        {/* <b className="title-exp">Kinh nghiệm</b> */}
        {/* <div className="description-exp">sssss</div> */}
      </div>
    </div>
  );
}
