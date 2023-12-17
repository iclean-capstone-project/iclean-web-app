import {fetcher} from "./Fetcher";
import axios from "axios";
import store from "@app/redux/store";

export interface IResGetUnit {
  data: IUnit[];
}

export interface IUnit {
  unitId: number;
  unitDetail: string;
  unitValue: string;
  isDeleted: boolean;
  createAt: string;
}

export interface IServicePrice {
  id: number;
  price: number;
  employeeCommission: number;
}

export interface IBodyCreateServiceUnit {
  defaultPrice: number;
  helperCommission: number;
  unitId: number;
  serviceId: number;
  servicePrices: IServicePrice[];
}

interface IRes {
  status: string;
  message: string;
  data: null;
}

export interface IServiceData {
  serviceName: string;
  description: string;
  serviceAvatar: any;
  serviceFileImages: any[];
}

const path = {
  getUnit: "/unit",
  createServiceUnit: "/service-unit",
};

function getUnit(): Promise<IResGetUnit> {
  return fetcher({
    url: path.getUnit,
    method: "get",
  });
}

function createServiceUnit(body: IBodyCreateServiceUnit): Promise<IRes> {
  return fetcher({
    url: path.createServiceUnit,
    method: "post",
    data: body,
  });
}

function createService(formData: FormData) {
  const state = store.getState();
  const token = state.user?.accessToken;
  // Cấu hình header
  console.log(token);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  };
  console.log(config.headers);
  axios
    .post("https://iclean.azurewebsites.net/api/v1/service", formData, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
}

export {getUnit, createServiceUnit, createService};
