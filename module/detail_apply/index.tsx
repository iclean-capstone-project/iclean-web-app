import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "./style.scss";
import {HelperInfo} from "@app/module/detail_apply/components/HelperInfo";
import {ListServiceApply} from "@app/module/detail_apply/components/ListServiceApply";
import {
  acceptApply,
  getDetailApplyById,
  IGetDetailApplyRes,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import {Button, notification} from "antd";
import {ModalDeleteApply} from "@app/module/detail_apply/components/ModalDeleteApply";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

export function DetailApply(): JSX.Element {
  const router = useRouter();
  const [dataInit, setDataInit] = useState<any | undefined>(undefined);
  const [isOpenModalDeleteApply, setIsOpenModalDeleteApply] =
    useState<boolean>(false);
  const getDataDetailApply = (): Promise<IGetDetailApplyRes> =>
    getDetailApplyById({
      id: router?.query?.id ? parseInt(router.query.id as string, 10) : 1,
    });

  const {refetch} = useQuery(["GET_DETAIL_APPLY"], getDataDetailApply, {
    onSuccess: (res) => {
      setDataInit(res?.data);
    },
  });

  const handleCancel = (): void => {
    setIsOpenModalDeleteApply(false);
  };

  const showModalDeleteApply = (id: number) => {
    setIsOpenModalDeleteApply(true);
  };
  const acceptApplyMutate = useMutation(acceptApply);

  const handleAcceptApply = () => {
    if (router.query.id) {
      acceptApplyMutate.mutate(
        {
          id: parseInt(router.query.id as string, 10),
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Phê duyệt thành công!",
            });
            // dataListApply.refetch();
          },
        }
      );
    }
  };

  useEffect(() => {
    refetch();
  }, [router.query.id]);

  console.log("dataInit", dataInit);
  return (
    <div className="detail-apply-container">
      <div className="button-reject">
        {dataInit?.status !== "WAITING_FOR_CONFIRM" && (
          <Button
            loading={acceptApplyMutate.isLoading}
            style={{
              borderRadius: 12,
              backgroundColor: "blue",
              color: "white",
              borderColor: "blue",
              marginRight: 8,
            }}
            onClick={handleAcceptApply}
            icon={<CheckOutlined />}
          >
            Phê duyệt
          </Button>
        )}

        {/* )} */}
        <Button
          style={{
            borderRadius: 12,
            backgroundColor: "red",
            color: "white",
            borderColor: "red",
          }}
          onClick={() => showModalDeleteApply(1)}
          icon={<CloseOutlined />}
        >
          Từ chối
        </Button>
      </div>
      <div className="detail-apply-main">
        <div className="info-helper">
          <HelperInfo dataInfoHelper={dataInit} />
        </div>
        <div className="list-service">
          <ListServiceApply
            isRefetch={refetch}
            idApply={parseInt(router.query.id as string, 10)}
            listService={dataInit?.services}
            isChangeStatus={dataInit?.status}
          />
        </div>
      </div>
      <ModalDeleteApply
        idApply={parseInt(router.query.id as string, 10)}
        isModalDeleteApply={isOpenModalDeleteApply}
        handleCancel={handleCancel}
      />
    </div>
  );
}
