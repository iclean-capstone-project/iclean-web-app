import React, {useEffect, useState} from "react";
import {Image, notification, Table, Tabs, TabsProps, Tag, Tooltip} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  getAllApply,
  IGetAllApplyRes,
  IItemApplyRes,
  rejectAproveBooking,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";

export function ListApply(): JSX.Element {
  const [dataApply, setDataApply] = useState<IItemApplyRes[]>([]);

  const [keyTabSelected, setKeyTabSelected] = useState<string>("");

  // action reject - post
  const rejectBookingMutate = useMutation(rejectAproveBooking);
  const getDataListApply = (): Promise<IGetAllApplyRes> =>
    // IGetAllBookingRes
    getAllApply({
      page: 1,
      size: 10,
    });

  const dataListApply = useQuery(["GET_LIST_APPLY"], getDataListApply, {
    onSuccess: (res) => {
      console.log("res", res?.data?.content);
      setDataApply(res?.data?.content ?? []);
    },
  });

  const handleAcceptBooking = (id?: number) => {
    if (id) {
      rejectBookingMutate.mutate(
        {
          id: id,
          action: "approved",
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Phê duyệt thành công!",
            });
            dataListApply.refetch();
          },
          onError: () => {},
        }
      );
    }
  };

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };

  const onChangeTab = (key: string) => {
    setKeyTabSelected(key === "all" ? "" : key);
  };

  useEffect(() => {
    dataListApply.refetch();
  }, [keyTabSelected]);

  const itemsTab: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "WAITING_FOR_APPROVE",
      label: "Chờ duyệt",
    },
    {
      key: "WAITING_FOR_CONFIRM",
      label: "Chờ xác nhận",
    },
  ];

  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];
  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        console.log("startTime", startTime);
        console.log("endTime", endTime);
      },
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
    },
  ];
  const columns: any = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 70,
      render: (_: any, dataIndex: any) => (
        <div>{dataApply.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      width: 170,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "personalAvatar",
      key: "image",
      render: (_, dataIndex: any) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={100}
            height={100}
            preview={false}
            src={dataIndex.personalAvatar}
          />
        </div>
      ),
      align: "center",
      width: 140,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
      width: 220,
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      width: 140,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      align: "center",
      width: 140,
    },
    {
      title: "Tạm trú",
      dataIndex: "placeOfResidence",
      key: "placeOfResidence",
      align: "center",
      width: 200,
    },
    {
      title: "Quê quán",
      dataIndex: "homeTown",
      key: "homeTown",
      align: "center",
      width: 200,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 170,
      render: (_, dataIndex: any) => (
        <div>
          {dataIndex.status === "WAITING_FOR_APPROVE" && (
            <Tag color="cyan">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "WAITING_FOR_CONFIRM" && (
            <Tag color="lime">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "DISABLED" && (
            <Tag color="red">{dataIndex.status}</Tag>
          )}
          {dataIndex.status === "ONLINE" && (
            <Tag color="green">{dataIndex.status}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, dataIndex: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dataIndex.status === "WAITING_FOR_CONFIRM" ? (
            <Tooltip placement="top" title="confirm">
              <div style={{marginLeft: 8}}>
                <CheckCircleOutlined style={{fontSize: 22, color: "blue"}} />
              </div>
            </Tooltip>
          ) : (
            <Tooltip placement="top" title="approve">
              <div style={{marginLeft: 8}}>
                <CheckCircleOutlined style={{fontSize: 22, color: "green"}} />
              </div>
            </Tooltip>
          )}
          <Tooltip placement="top" title="reject">
            <div style={{marginLeft: 8}}>
              <CloseCircleOutlined style={{fontSize: 22, color: "orange"}} />
            </div>
          </Tooltip>
        </div>
      ),
      fixed: "right",
      width: 140,
    },
  ];
  return (
    <div className="list-apply-container">
      <Tabs defaultActiveKey="all" items={itemsTab} onChange={onChangeTab} />
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 600, y: 485}}
        columns={columns}
        dataSource={dataApply}
      />
    </div>
  );
}
