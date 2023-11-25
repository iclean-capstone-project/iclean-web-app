import React from "react";
import "./style.scss";
import {Button, Image, notification, Tag} from "antd";
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
}
export function ListServiceApply(props: IProps): JSX.Element {
  const {listService, idApply, isRefetch} = props;
  console.log("listService", listService);

  const confirmApplyMutate = useMutation(confirmApply);
  const handleAcceptApply = (serviceRegistrationId?: number) => {
    if (idApply && serviceRegistrationId) {
      confirmApplyMutate.mutate(
        {
          id: idApply,
          serviceRegistrationIds: [serviceRegistrationId],
        },
        {
          onSuccess: () => {
            isRefetch();
            notification.success({
              message: "Phê duyệt thành công!",
            });
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
              <span>{item?.serviceName}</span>
            </div>
            <Tag style={{paddingTop: 4}} color="green">
              {item?.status}
            </Tag>
          </div>
          {item.status !== "ACTIVE" && (
            <Button
              onClick={() => handleAcceptApply(item.serviceRegistrationId)}
              shape="round"
              type="primary"
            >
              Xác nhận
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
