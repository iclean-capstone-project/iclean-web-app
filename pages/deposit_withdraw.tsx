import { DepositWithdraw } from '@app/module/deposit_withdraw';
import { IRootState } from '@app/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function deposit_withdraw() {
    const user = useSelector((state: IRootState) => state.user);
    return (
      <>
        {user.userInformationDto.roleName === "manager" ? (
          <DepositWithdraw></DepositWithdraw>
        ) : (
          <div></div>
        )}
      </>
    );
}
