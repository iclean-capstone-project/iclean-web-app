import {TabsProps} from "antd";

export const itemsTab: TabsProps["items"] = [
  {
    key: "all",
    label: "Tất cả",
  },
  {
    key: "NOT_YET",
    label: "Chưa duyệt",
  },
  {
    key: "APPROVED",
    label: "Đã duyệt",
  },
  {
    key: "REJECTED",
    label: "Đã từ chối",
  },
  {
    key: "ON_CART",
    label: "Báo cáo",
  },
  {
    key: "FINISHED",
    label: "Đã hoàn thành",
  },
  {
    key: "NO_MONEY",
    label: "Báo cáo",
  },
  {
    key: "CANCELED",
    label: "Đã hủy",
  },
];
