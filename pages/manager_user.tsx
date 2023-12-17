import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";
import ManagerUser from ".";

export default function manager_user() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <>
      {user.userInformationDto.roleName === "admin" ? (
        <ManagerUser></ManagerUser>
      ) : (
        <div></div>
      )}
    </>
  );
}
