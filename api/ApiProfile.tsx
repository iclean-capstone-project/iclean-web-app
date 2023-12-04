import {IDataWithMeta, fetcher} from "@app/api/Fetcher";

export interface IInfoUser {
  data: {
    fullName: string,
    phoneNumber: string,
    roleName: string,
    dateOfBirth: string,
    defaultAddress: string,
    avatar: string,
  }
}

export interface IInfoUserData {
  fullName: string,
  dateOfBirth: string,
  fileImage: string,
}

const path = {
  getProfile: "/profile",
  getInfoUser: "/profile",
  updateProfile: "/profile"
};

export interface DataType {
  fullName: string,
  phoneNumber: string,
  roleName: string,
  dateOfBirth: string,
  defaultAddress: string,
  avatar: string,
}

function getInfoUser(): Promise<IInfoUser> {
  return fetcher({
    url: path.getInfoUser,
    method: "get",
    params: "",
  });
}

export function getProfile(): Promise<IDataWithMeta<DataType>> {
  return fetcher({
    url: path.getProfile,
    method: "get",
  });
}

function updateInfoUser(body: IInfoUserData): Promise<IInfoUser> {
    return fetcher({
      url: path.getInfoUser,
      method: "put",
      data: body,
    });
  }

export default {getInfoUser, updateInfoUser};
