import {ReactNode} from "react";
import {
  BlockOutlined,
  IdcardOutlined,
  LogoutOutlined,
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
    name: "Quản lí",
    isSidebar: true,
    icon: <UserOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_booking",
    name: "Yêu cầu",
    isSidebar: true,
    icon: <PicRightOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_service",
    name: "Dịch vụ",
    isSidebar: true,
    icon: <BlockOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_apply",
    name: "Ứng tuyển",
    isSidebar: true,
    icon: <IdcardOutlined className="icon-sidebar" />,
  },
  {
    path: "/detail_apply",
    name: "Chi tiết ứng tuyển",
    isSidebar: false,
  },
  {
    path: "/list_transaction",
    name: "Giao dịch",
    isSidebar: true,
    icon: <MoneyCollectOutlined className="icon-sidebar" />,
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    isSidebar: true,
    icon: <SettingOutlined className="icon-sidebar" />,
  },
  {
    path: "/deposit_withdraw",
    name: "Nạp rút tiền",
    isSidebar: true,
    icon: <LogoutOutlined className="icon-sidebar" />,
  },
];

export default routes;
