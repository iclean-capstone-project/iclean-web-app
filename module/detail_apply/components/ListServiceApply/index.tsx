import React, {useState} from "react";
import "./style.scss";
import {Button, Image, notification} from "antd";
import {
  confirmApply,
  IGetDetailApplyRes,
  IListServiceDetailApply,
} from "@app/api/ApiProduct";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

interface IProps {
  listService?: IListServiceDetailApply[];
  idApply?: number;
  isRefetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IGetDetailApplyRes, unknown>>;
  isChangeStatus: string;
}
export function ListServiceApply(props: IProps): JSX.Element {
  const {listService, idApply, isRefetch, isChangeStatus} = props;
  const [isService, setIsService] = useState(undefined);
  console.log("isChangeStatus", isChangeStatus);

  const confirmApplyMutate = useMutation(confirmApply);
  const handleAcceptApply = (serviceRegistrationId?: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setIsService(serviceRegistrationId);
    if (idApply && serviceRegistrationId) {
      confirmApplyMutate.mutate(
        {
          id: idApply,
          serviceRegistrationIds: [serviceRegistrationId],
        },
        {
          onSuccess: () => {
            if (isRefetch) {
              isRefetch().then((r) => console.log(r));
            }
            notification.success({
              message: "Phê duyệt thành công!",
            });
            setIsService(undefined);
          },
        }
      );
    }
  };

  return (
    <div className="list-service-apply-container">
      {listService?.map((item, index) => (
        <div key={index} className="item-service">
          <div className="row1">
            <div className="service">
              <Image
                width="30px"
                height="30px"
                src={item?.serviceIcon}
                preview={false}
              />
              <span>Dịch vụ đăng kí: {item?.serviceName}</span>
            </div>
            {/* <div style={{marginLeft: 40}}> */}
            {/*  <span>Trạng thái: </span> */}
            {/*  <Tag style={{paddingTop: 4}} color="green"> */}
            {/*    {item?.status} */}
            {/*  </Tag> */}
            {/* </div> */}
          </div>
          {isChangeStatus === "WAITING_FOR_CONFIRM" && (
            <Button
              onClick={() => handleAcceptApply(item.serviceRegistrationId)}
              shape="round"
              type="primary"
              loading={
                isService === item.serviceRegistrationId &&
                confirmApplyMutate.isLoading
              }
            >
              Xác nhận
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
