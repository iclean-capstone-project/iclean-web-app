import {fetcher} from "./Fetcher";
export interface ISystemParameter {
  parameterId: number;
  parameterField: string;
  parameterValue: string;
  updateAt: string;
  updateVersion: string;
}

export interface IResSystemParameter {
  data: ISystemParameter[];
}

const path = {
  getSystemParameter: "/system-parameter",
};

function getSystemParameter(): Promise<IResSystemParameter> {
  return fetcher({
    url: path.getSystemParameter,
    method: "get",
  });
}

export {getSystemParameter};
