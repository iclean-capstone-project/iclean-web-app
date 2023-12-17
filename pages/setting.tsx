import {Setting} from "@app/module/setting";
import {IRootState} from "@app/redux/store";
import React from "react";
import {useSelector} from "react-redux";

export default function setting() {
  const user = useSelector((state: IRootState) => state.user);
  return (
    <>
      {user.userInformationDto.roleName === "admin" ? (
        <Setting></Setting>
      ) : (
        <div></div>
      )}
    </>
  );
}
