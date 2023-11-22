import {downloadFile, fetcher} from "./Fetcher";

interface IParamsGetAllBooking {
  page?: number;
  size?: number;
  statuses?: string[];
  isHelper?: boolean;
  sort?: string[];
}

export interface IListItemBooking {
  bookingId?: number;
  bookingCode?: string;
  renterName?: string;
  renterAvatar?: string;
  renterPhoneNumber?: string;
  serviceNames?: string;
  serviceAvatar?: string;
  orderDate?: string;
  requestCount?: number;
  totalPrice?: number;
  totalPriceActual?: number;
  updateAt?: string;
  bookingStatus?: string;
  managerName?: string;
}

export interface IGetAllBookingRes {
  data?: {
    content?: [
      {
        bookingId?: number;
        bookingCode?: string;
        renterName?: string;
        renterAvatar?: string;
        renterPhoneNumber?: string;
        serviceNames?: string;
        serviceAvatar?: string;
        orderDate?: string;
        requestCount?: number;
        totalPrice?: number;
        totalPriceActual?: number;
        updateAt?: string;
        bookingStatus?: string;
        managerName?: string;
      }[]
    ];
  };
}

export interface IDetailBookingRes {
  data?: {
    bookingId?: number;
    latitude?: number | string;
    longitude?: number | string;
    locationDescription?: string;
    orderDate?: string;
    totalPrice?: number;
    totalPriceActual?: number;
    requestCount?: number;
    rejectionReasonContent?: string | null;
    rejectionReasonDescription?: string | null;
    bookingCode?: string;
    renterName?: string;
    currentStatus?: string;
    details?: {
      bookingDetailId?: number;
      bookingCode?: string;
      orderDate?: string;
      serviceId?: number;
      serviceUnitId?: number;
      serviceName?: string;
      serviceIcon?: string;
      workDate?: string;
      note?: string;
      workTime?: string;
      value?: string;
      equivalent?: number;
      price?: number;
      status?: string;
    }[];
  };
}

const path = {
  getAllBooking: "/booking",
  rejectApproveBookingPath: "/booking/manager",
};

function rejectAproveBooking(params: {
  id: number;
  action: string;
  rejectionReasonId?: number;
  rejectionReasonDetail?: number;
}): Promise<any> {
  return fetcher({
    url: `${path.rejectApproveBookingPath}/${params.id}`,
    method: "put",
    data: {
      action: params.action,
      rejectionReasonId: params.rejectionReasonId,
      rejectionReasonDetail: params.rejectionReasonDetail,
    },
  });
}

function getAllBooking(
  params: IParamsGetAllBooking
): Promise<IGetAllBookingRes> {
  return fetcher({
    url: path.getAllBooking,
    method: "get",
    params: params,
  });
}

function getDetailBooking(params: {id: number}): Promise<IDetailBookingRes> {
  return fetcher({
    url: `${path.getAllBooking}/${params.id}`,
    method: "get",
  });
}

export {getAllBooking, rejectAproveBooking, getDetailBooking};
