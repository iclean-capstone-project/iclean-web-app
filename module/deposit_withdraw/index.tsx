import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  notification,
  Table,
  Tag,
  Tooltip,
} from "antd";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";

import {DownloadOutlined, UploadOutlined} from "@ant-design/icons";
import ApiUser, {IGetListUser} from "@app/api/ApiUser";
import FilterGroupGlobal, {
  ListSelectOptionType,
} from "@app/components/FilterGroupGlobal";
import {IRootState} from "@app/redux/store";
import {
  IMoneyRequest,
  IMoneyRequestValidated,
  moneyRequest,
  moneyRequestValidated,
} from "../../api/ApiMoney";

interface DataType {
  key: string;
  userId: number;
  name: string;
  avatar: string;
  address: string;
  description: string;
  transport: string;
  phoneNumber: string;
  isLocked: boolean;
}

export function DepositWithdraw(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUserInit, setDataUserInit] = useState<any>([]);
  const [paramFilter, setParamFilter] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [sentOtp, setSentOtp] = useState<boolean>(false);
  const [typeDW, setTypeDW] = useState<string>("");
  const [titlePopupDW, setTitlePopupDW] = useState<string>("");
  const [form] = Form.useForm();

  const user = useSelector((state: IRootState) => state.user);
  console.log(user);
  const getDataListUser = (): Promise<IGetListUser> =>
    ApiUser.getAllUser({
      page: 1,
      size: 10,
      role: paramFilter,
    });

  const {refetch} = useQuery(["GET_DATE_LIST_USER"], getDataListUser, {
    onSuccess: (res) => {
      setDataUserInit(res?.data?.content ?? []);
    },
  });

  const handleSubmit = async (formData: any) => {
    const selectedUser = dataUserInit.find(
      (user: {userId: number | undefined}) => user.userId === selectedUserId
    );

    if (selectedUser) {
      if (sentOtp) {
        try {
          const data: IMoneyRequestValidated = {
            phoneNumber: selectedUser.phoneNumber,
            otpToken: formData.otp,
          };
          const res = moneyRequestValidated(data);
          console.log("Yêu cầu thành công >> ", (await res).status);
          closeModal();
          notification.success({
            message: "Yêu cầu thành công",
            description: "Yêu cầu của bạn đã được xử lý thành công.",
          });
          setSentOtp(false);
        } catch (err) {
          notification.error({
            message: "Lỗi",
            description:
              "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
          });
        }
      } else {
        const data: IMoneyRequest = {
          userPhoneNumber: selectedUser.phoneNumber,
          balance: formData.balance,
          moneyRequestType: typeDW,
        };
        moneyRequest(data);
        setSentOtp(true);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, [paramFilter]);

  const listSelectOption: ListSelectOptionType[] = [
    {
      title: "Lọc",
      handleChange: (value: string): void => {
        setParamFilter(value === "all" ? "" : value);
      },
      placeholder: "Lọc theo quyền",
      defaultValue: "all",
      optionSelect: [
        {
          value: "all",
          label: "Tất cả",
        },
        {
          value: "Employee",
          label: "Employee",
        },
        {
          value: "Renter",
          label: "Renter",
        },
      ],
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 80,
      render: (_, dataIndex) => (
        <div>{dataUserInit.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      align: "center",
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={100}
            height={100}
            preview={false}
            src={dataIndex.avatar}
          />
        </div>
      ),
      align: "center",
      width: 130,
    },
    {
      title: "phoneNumber",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: 120,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      align: "center",
      width: 120,
    },
    {
      title: "Địa chỉ",
      dataIndex: "defaultAddress",
      key: "defaultAddress",
      align: "center",
      width: 150,
    },
    {
      title: "Quyền",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
      width: 100,
      fixed: "right",
    },
    {
      title: "Trạng thái",
      dataIndex: "isLocked",
      key: "isLocked",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, dataIndex) => {
        return (
          <div>
            {dataIndex?.isLocked ? (
              <Tag color="green">Unlock</Tag>
            ) : (
              <Tag color="magenta">Locked</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      render: (_, dataIndex) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tooltip title="Rút tiền">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => handleWithdraw(dataIndex.userId)}>
                <UploadOutlined
                  style={{
                    fontSize: 22,
                    transform: "rotate(90deg)",
                  }}
                />
              </div>
            </Tooltip>
            <div style={{width: "10px"}} />
            <Tooltip title="Nạp tiền">
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div onClick={() => handleDeposit(dataIndex.userId)}>
                <DownloadOutlined
                  style={{
                    fontSize: 22,
                  }}
                />
              </div>
            </Tooltip>
          </div>
        );
      },
      width: 100,
    },
  ];

  const handleWithdraw = (userId: number) => {
    setSelectedUserId(userId);
    setTypeDW("withdraw");
    setTitlePopupDW("Rút tiền");
    openModal();
  };

  const handleDeposit = (userId: number) => {
    setSelectedUserId(userId);
    setTypeDW("deposit");
    setTitlePopupDW("Nạp tiền");
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSentOtp(false);
    form.resetFields();
  };

  return (
    <div className="deposit-withdraw-container">
      <FilterGroupGlobal listSelectOption={listSelectOption} />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 800, y: 400}}
        columns={columns}
        dataSource={dataUserInit}
        pagination={false}
      />
      <Modal
        title="Yêu cầu"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          name="deposit-withdraw"
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          action="POST"
        >
          <Form.Item label={titlePopupDW} name="balance">
            <Input placeholder="Nhập số tiền" />
          </Form.Item>

          <Form.Item label="OTP" name="otp">
            <Input placeholder="Nhập OTP" disabled={!sentOtp} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#52C41A",
                borderColor: "#52C41A",
                marginRight: "10px",
              }}
            >
              {sentOtp ? "Xác nhận" : "Gửi"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
