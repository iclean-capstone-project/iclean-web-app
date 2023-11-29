import {fetcher} from "./Fetcher";

export interface IItemReport {
  reportId?: number;
  fullName?: string;
  phoneNumber?: string;
  reportTypeDetail?: string;
  detail?: string;
  createAt?: string;
  reportStatus?: string;
}

export interface IGetListReportRes {
  data?: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    numberOfElements?: number;
    sortBy?: null;
    content?: IItemReport[];
  };
}

export interface IParamGetAllReport {
  renterName?: string;
  displayAll?: boolean;
  page?: number;
  size?: number;
}

const path = {
  getAllReport: "/report",
};

function getAllReport(params: IParamGetAllReport): Promise<IGetListReportRes> {
  return fetcher({
    url: path.getAllReport,
    method: "get",
    params: params,
  });
}

export {getAllReport};
