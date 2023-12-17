import { ListReport } from '@app/module/list_report';
import { IRootState } from '@app/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function list_report() {
    const user = useSelector((state: IRootState) => state.user);
    return (
      <>
        {user.userInformationDto.roleName === "manager" ? (
          <ListReport></ListReport>
        ) : (
          <div></div>
        )}
      </>
    );
}
