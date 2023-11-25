import {fetcher} from "./Fetcher";

export interface IItemService {
  serviceId?: number;
  serviceName?: string;
  serviceImage?: string;
  isDeleted?: boolean;
  createAt?: string;
}

export interface IGetListServiceRes {
  data?: IItemService[];
}

const path = {
  getUser: "/auth/get-user",
  login: "/auth",
  getAllService: "/service/inactive",
};

function getAllService(): Promise<IGetListServiceRes> {
  return fetcher({
    url: path.getAllService,
    method: "get",
  });
}

export {getAllService};
