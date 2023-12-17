import { ListService } from '@app/module/list_service';
import { IRootState } from '@app/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function list_service() {
    const user = useSelector((state: IRootState) => state.user);
    return (
      <>
        {user.userInformationDto.roleName === "admin" ? (
          <ListService></ListService>
        ) : (
          <div></div>
        )}
      </>
    );
}
