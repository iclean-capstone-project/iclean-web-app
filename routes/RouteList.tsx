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
    name: "User",
    isSidebar: true,
    icon: <UserOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_booking",
    name: "Booking",
    isSidebar: true,
    icon: <PicRightOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_service",
    name: "Service",
    isSidebar: true,
    icon: <BlockOutlined className="icon-sidebar" />,
  },
  {
    path: "/list_apply",
    name: "Apply",
    isSidebar: true,
    icon: <IdcardOutlined className="icon-sidebar" />,
  },
  {
    path: "/detail_apply",
    name: "Detail Apply",
    isSidebar: false,
  },
  {
    path: "/list_transaction",
    name: "Transaction",
    isSidebar: true,
    icon: <MoneyCollectOutlined className="icon-sidebar" />,
  },
  {
    path: "/profile",
    name: "Profile",
    isSidebar: true,
    icon: <SettingOutlined className="icon-sidebar" />,
  },
  {
    path: "/deposit_withdraw",
    name: "Nạp rút tền",
    isSidebar: true,
    icon: <LogoutOutlined className="icon-sidebar" />,
  },
];

export default routes;
