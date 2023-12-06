import React, {useEffect, useState} from "react";
import {Image, Modal, notification, Table, Tabs, Tag, Tooltip} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {
  getAllBooking,
  IListItemBooking,
  rejectAproveBooking,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import {ModalViewDetailBooking} from "@app/module/list_booking/components/ModalViewDetailBooking";
import "./index.scss";
import {itemsTab} from "@app/module/list_booking/listDataDefault";
import {ModalDeleteBooking} from "@app/module/list_booking/components/ModalDeleteBooking";
import { formatDateTime } from "@app/utils/formatTime";

export function ListBooking(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteBooking, setIsModalDeleteBooking] = useState(false);
  const [dataBooking, setDataBooking] = useState<IListItemBooking[]>([]);
  const [bookingIdSelected, setBookingIdSelected] = useState<
    number | undefined
  >(undefined);
  const [keyTabSelected, setKeyTabSelected] = useState<string>("");

  // action reject - post
  const rejectBookingMutate = useMutation(rejectAproveBooking);
  const getDataListBooking = (): Promise<any> =>
    // IGetAllBookingRes
    getAllBooking({
      page: 1,
      size: 10,
      statuses: keyTabSelected,
    });

  const dataListBooking = useQuery(["GET_LIST_ICON"], getDataListBooking, {
    onSuccess: (res) => {
      console.log("res1111", res?.data?.content);

      setDataBooking(res.data.content);
    },
  });

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setBookingIdSelected(id);
  };

  const showModalDeleteBooking = (id: number) => {
    setIsModalDeleteBooking(true);
    setBookingIdSelected(id);
  };

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
            dataListBooking.refetch();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalDeleteBooking(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };

  const onChangeTab = (key: string) => {
    setKeyTabSelected(key === "all" ? "" : key);
  };

  useEffect(() => {
    dataListBooking.refetch();
  }, [keyTabSelected]);

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
        <div>{dataBooking.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "bookingCode",
      key: "bookingCode",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "renterAvatar",
      key: "image",
      render: (_: any, dataIndex: any) => (
        <div>
          <Image
            style={{borderRadius: 55}}
            width={55}
            height={55}
            preview={false}
            src={dataIndex.renterAvatar}
          />
        </div>
      ),
      align: "center",
      width: 140,
    },
    {
      title: "Người thuê",
      key: "renterName",
      dataIndex: "renterName",
      align: "center",
      // render: (_, dataIndex) => <div>Phân loại: {dataIndex.description}</div>,
      width: 140,
    },
    {
      title: "SĐT người thuê",
      dataIndex: "renterPhoneNumber",
      key: "renterPhoneNumber",
      align: "center",
      width: 140,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
      width: 140,
      render: (_: any, dataIndex: any) => {
        return <span>
          {formatDateTime(dataIndex.orderDate)}
        </span>
      }
    },
    {
      title: "Số lượng yêu cầu",
      dataIndex: "requestCount",
      key: "requestCount",
      align: "center",
      width: 150,
    },
    {
      title: "Tổng giá",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      width: 140,
    },
    {
      title: "Giá thực tế",
      dataIndex: "totalPriceActual",
      key: "totalPriceActual",
      align: "center",
      width: 140,
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      align: "center",
      fixed: "right",
      width: 170,
      render: (_: any, dataIndex: any) => (
        <div>
          {dataIndex.bookingStatus === "NOT_YET" && (
            <Tag color="cyan">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "ON_CART" && (
            <Tag color="volcano">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "REJECTED" && (
            <Tag color="orange">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "APPROVED" && (
            <Tag color="green">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "FINISHED" && (
            <Tag color="red">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "NO_MONEY" && (
            <Tag color="purple">{dataIndex.bookingStatus}</Tag>
          )}
          {dataIndex.bookingStatus === "CANCELED" && (
            <Tag color="red">{dataIndex.bookingStatus}</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_: any, dataIndex: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button type="primary" shape="round"> */}
          {/*  Xem chi tiết */}
          {/* </Button> */}
          <Tooltip placement="top" title="xem chi tiết">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              onClick={() => showModal(dataIndex.bookingId)}
              style={{marginLeft: 8}}
            >
              <EyeOutlined style={{fontSize: 27, color: "blue"}} />
            </div>
          </Tooltip>

          {dataIndex.bookingStatus === "NOT_YET" && (
            <>
              <Tooltip placement="top" title="approve">
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  onClick={() => handleAcceptBooking(dataIndex.bookingId)}
                  style={{marginLeft: 8}}
                >
                  <CheckCircleOutlined style={{fontSize: 22, color: "green"}} />
                </div>
              </Tooltip>

              <Tooltip placement="top" title="reject">
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <div
                  onClick={() => showModalDeleteBooking(dataIndex.bookingId)}
                  style={{marginLeft: 8}}
                >
                  <CloseCircleOutlined
                    style={{fontSize: 22, color: "orange"}}
                  />
                </div>
              </Tooltip>
            </>
          )}
        </div>
      ),
      fixed: "right",
      width: 140,
    },
  ];

  return (
    <div className="list-booking-container">
      <Tabs defaultActiveKey="all" items={itemsTab} onChange={onChangeTab} />
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 600, y: 505}}
        columns={columns}
        dataSource={dataBooking}
        className="table-list-booking"
        pagination={false}
      />
      <Modal
        title="Chi tiết đơn hàng"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={false}
      >
        <ModalViewDetailBooking bookingId={bookingIdSelected} />
      </Modal>

      <ModalDeleteBooking
        bookingId={bookingIdSelected}
        isModalDeleteBooking={isModalDeleteBooking}
        handleCancel={handleCancel}
      />
    </div>
  );
}
