import React, {useEffect, useState} from "react";
import {Image, Input, Tag} from "antd";
import {
  getAllBooking,
  getDetailBooking,
  IDetailBookingRes,
} from "@app/api/ApiProduct";
import {useQuery} from "react-query";

interface IProps {
  bookingId: number | undefined;
}
export function ModalViewDetailBooking(props: IProps): JSX.Element {
  const {bookingId} = props;
  const [dataDetailBookingInit, setDataDetailBookingInit] = useState<
    IDetailBookingRes | undefined
  >(undefined);

  const getDataDetailBooking = (): Promise<IDetailBookingRes> =>
    // IGetAllBookingRes
    getDetailBooking({
      id: bookingId ?? 1,
    });

  const {refetch, data} = useQuery(
    ["GET_DATA_DETAIL_BOOKING"],
    getDataDetailBooking,
    {
      onSuccess: (res) => {
        console.log("res", res?.data);
        setDataDetailBookingInit(res);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [bookingId]);

  console.log("dataDetailBookingInit", dataDetailBookingInit?.data?.details);
  // eslint-disable-next-line react/no-unstable-nested-components
  function ItemInput(props: {title: string; value: any}): React.JSX.Element {
    const {title, value} = props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <div style={{width: "35%", color: "#495057", fontWeight: "500"}}>
          {title}
        </div>
        <Input
          style={{height: "35px"}}
          value={value}
          placeholder="Basic usage"
        />
      </div>
    );
  }

  return (
    <div>
      <h3>Thông tin khách hàng</h3>
      <div style={{marginTop: 10}}>
        <div style={{paddingLeft: "27%", marginBottom: 5}}>
          <Image
            preview={false}
            style={{borderRadius: "50%"}}
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <ItemInput
          title="Tên"
          value={dataDetailBookingInit?.data?.renterName}
        />
        <ItemInput
          title="Tổng đơn hàng"
          value={dataDetailBookingInit?.data?.totalPrice}
        />
        {/* <ItemInput title="Điện thoại" value="" /> */}
      </div>
      <h3>Chi tiết bài đăng</h3>
      <div style={{maxHeight: 280, overflowY: "scroll"}}>
        {dataDetailBookingInit?.data?.details &&
          dataDetailBookingInit.data.details.map((item, index) => (
            <div key={index} style={{marginTop: 10}}>
              <i style={{marginTop: 5, marginBottom: 5}}>Dịch vụ {index + 1}</i>
              <ItemInput title="Dịch vụ" value={item.serviceName} />
              <ItemInput title="Dung lượng" value={item.value} />
              <ItemInput title="Ngày đăng" value={item.orderDate} />
              <ItemInput title="Giá đơn hàng" value={item.price} />
              <ItemInput title="Ngày thực hiện" value={item.workDate} />
              <div style={{display: "flex"}}>
                <div
                  style={{width: "30%", color: "#495057", fontWeight: "500"}}
                >
                  Trạng thái
                </div>
                {item.status === "NOT_YET" && (
                  <Tag color="cyan">{item.status}</Tag>
                )}
                {item.status === "ON_CART" && (
                  <Tag color="volcano">{item.status}</Tag>
                )}
                {item.status === "REJECTED" && (
                  <Tag color="orange">{item.status}</Tag>
                )}
                {item.status === "APPROVED" && (
                  <Tag color="green">{item.status}</Tag>
                )}
                {item.status === "FINISHED" && (
                  <Tag color="red">{item.status}</Tag>
                )}
                {item.status === "NO_MONEY" && (
                  <Tag color="purple">{item.status}</Tag>
                )}
                {item.status === "CANCELED" && (
                  <Tag color="red">{item.status}</Tag>
                )}
                {/* <Tag color="volcano">{item.status}</Tag> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
