import {ReactNode} from "react";
import {
  BlockOutlined,
  IdcardOutlined,
  MoneyCollectOutlined,
  PicRightOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export interface IRoute {
  path: string;
  name: string;
  isSidebar: boolean;
  isLanding?: boolean;
  icon?: ReactNode;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/login",
    name: "Đăng nhập",
    isSidebar: false,
    isLanding: true,
  },
  {
    path: "/manager_user",
    name: "Quản lý người dùng",
    isSidebar: true,
    icon: <UserOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_booking",
    name: "Danh sách đơn đặt",
    isSidebar: true,
    icon: <PicRightOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_service",
    name: "Danh sách dịch vụ",
    isSidebar: true,
    icon: <BlockOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_apply",
    name: "Danh sách ứng tuyển",
    isSidebar: true,
    icon: <IdcardOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_transaction",
    name: "Danh sách nạp rút tiền",
    isSidebar: true,
    icon: <MoneyCollectOutlined className="icon-sidebar" />,
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    isSidebar: true,
    icon: <SettingOutlined className="icon-sidebar" />,
  },
];

export default routes;
