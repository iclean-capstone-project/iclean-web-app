import {Dashboard} from "@app/module/dashboard";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function dashboard() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <>
      {user.userInformationDto.roleName === "admin" ? (
        <Dashboard></Dashboard>
      ) : (
        <div></div>
      )}
    </>
  );
}
