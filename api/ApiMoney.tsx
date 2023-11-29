import {fetcher} from "@app/api/Fetcher";

export interface IMoneyResponse {
  status: string;
  message: string;
  data: null;
}

export interface IMoneyRequest {
  userPhoneNumber?: string;
  balance?: number;
  moneyRequestType?: string;
}

export interface IMoneyRequestValidated {
  phoneNumber?: string;
  otpToken?: string;
}

const path = {
  sendRequest: "/money-request",
  confirmOtp: "/money-request/validated",
};

function moneyRequest(body: IMoneyRequest): Promise<any> {
  return fetcher({
    url: path.sendRequest,
    method: "post",
    data: body,
  });
}

function moneyRequestValidated(
  body: IMoneyRequestValidated
): Promise<IMoneyResponse> {
  return fetcher({
    url: path.confirmOtp,
    method: "post",
    data: body,
  });
}

export {moneyRequest, moneyRequestValidated};
