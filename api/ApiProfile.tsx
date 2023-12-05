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

// Define the interface for the update profile request body
export interface IUpdateProfileData {
  fullName: string;
  dateOfBirth: string;
  fileImage?: string;
}

// Create a function to update the profile information
export function updateProfile(profileData: IUpdateProfileData): Promise<IDataWithMeta<DataType>> {
  return fetcher({
    url: path.updateProfile,
    method: "put",
    data: profileData,
    headers: {
      'Content-Type': 'application/json', // Ensure this header is set
    },
  });
}

function getInfoUser(): Promise<IInfoUser> {
  return fetcher({
    url: path.getInfoUser,
    method: "get",
    params: "",
  });
}

function getProfile(): Promise<IDataWithMeta<DataType>> {
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

export default {getInfoUser, updateInfoUser, getProfile, updateProfile};
