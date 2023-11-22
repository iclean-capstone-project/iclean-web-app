import {fetcher} from "./Fetcher";
import store from "../redux/store";

export interface ILoginBody {
  username: string;
  password: string;
  // has_role: boolean;
}
export interface ILoginResponse {
  response: {
    accesstoken: string;
    expires_in: number;
    pass_jwt: string;
  };
  role: any;
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IGetUserResponse {
  response?: {
    data?: {
      id?: number;
      firstname?: string;
      email?: string;
      url_image?: string;
    };
  };
}

const path = {
  getUser: "/auth/get-user",
  login: "/auth",
};

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher({url: path.login, method: "post", data: body});
}

function getUser(): Promise<IGetUserResponse> {
  return fetcher({url: path.getUser, method: "get"});
}

function isLogin(): boolean {
  const {user} = store.getState();
  return !!user?.accesstoken;
}

export default {
  login,
  isLogin,
  getUser,
};
