import React, {useState} from "react";
import {useRouter} from "next/router";
import "./style.scss";
import {HelperInfo} from "@app/module/detail_apply/components/HelperInfo";
import {ListServiceApply} from "@app/module/detail_apply/components/ListServiceApply";
import {getDetailApplyById, IGetDetailApplyRes} from "@app/api/ApiProduct";
import {useQuery} from "react-query";
import {Button} from "antd";
import {ModalDeleteBooking} from "@app/module/list_booking/components/ModalDeleteBooking";
import {ModalDeleteApply} from "@app/module/detail_apply/components/ModalDeleteApply";

export function DetailApply(): JSX.Element {
  const router = useRouter();
  const [dataInit, setDataInit] = useState<any | undefined>(undefined);
  const [isOpenModalDeleteApply, setIsOpenModalDeleteApply] =
    useState<boolean>(false);
  const getDataDetailApply = (): Promise<IGetDetailApplyRes> =>
    getDetailApplyById({
      id: router?.query?.id ? parseInt(router.query.id, 10) : 1,
    });

  const {refetch} = useQuery(["GET_DETAIL_APPLY"], getDataDetailApply, {
    onSuccess: (res) => {
      // console.log("ress", res?.data);
      setDataInit(res?.data);
    },
  });

  const handleCancel = (): void => {
    setIsOpenModalDeleteApply(false);
  };

  const showModalDeleteApply = (id: number) => {
    setIsOpenModalDeleteApply(true);
  };

  console.log("router", typeof parseInt(router.query?.id, 10));
  return (
    <div className="detail-apply-container">
      <div className="button-reject">
        <Button
          style={{
            borderRadius: 12,
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          }}
          onClick={() => showModalDeleteApply(1)}
        >
          Từ chối đơn ứng tuyển
        </Button>
      </div>
      <div className="detail-apply-main">
        <div className="info-helper">
          <HelperInfo dataInfoHelper={dataInit} />
        </div>
        <div className="list-service">
          <ListServiceApply
            isRefetch={refetch}
            idApply={parseInt(router.query.id, 10)}
            listService={dataInit?.services}
          />
        </div>
      </div>
      <ModalDeleteApply
        idApply={parseInt(router.query.id, 10)}
        isModalDeleteApply={isOpenModalDeleteApply}
        handleCancel={handleCancel}
      />
    </div>
  );
}
