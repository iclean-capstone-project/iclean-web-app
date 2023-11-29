import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Image, Table, Tag} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {useQuery} from "react-query";
import {
  getAllService,
  IGetListServiceRes,
  IItemService,
} from "@app/api/ApiService";

interface DataType {
  serviceId: string;
  serviceImage: string;
  serviceName: string;
  isDeleted: string;
  createAt: string;
}

export function ListService(): JSX.Element {
  const [dataInit, setDataInit] = useState<IItemService[]>([]);
  const getDataListService = (): Promise<IGetListServiceRes> => getAllService();

  const {refetch} = useQuery(["GET_LIST_SERVICE"], getDataListService, {
    onSuccess: (res) => {
      console.log("res1111", res?.data);
      setDataInit(res?.data ?? []);
    },
  });

  const showModal = () => {};

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
  };
  const listSearchText = [
    {
      placeHolder: "Tìm kiếm...",
      onSearch: handleSearch,
      maxLength: 255,
      tooltip: "Từ khóa: Tiêu đề",
    },
  ];
  const listDatePicker = [
    {
      onChange: (startTime: number, endTime: number): void => {
        console.log("sss");
      },
      tooltip: "Ngày tạo",
      title: "Ngày tạo",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: 50,
      render: (_, dataIndex: any) => (
        <div>{dataInit.indexOf(dataIndex) + 1}</div>
      ),
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      width: 100,
      align: "center",
    },
    {
      title: "Ảnh dịch vụ",
      dataIndex: "avatar",
      key: "image",
      render: (_, dataIndex) => (
        <div>
          <Image
            style={{borderRadius: 100}}
            width={100}
            height={100}
            preview={false}
            src={dataIndex.serviceImage}
          />
        </div>
      ),
      align: "center",
      width: 100,
    },
    {
      title: "Trạng thái",
      key: "isDeleted",
      dataIndex: "isDeleted",
      align: "center",
      render: (_, dataIndex) => (
        <div>
          {dataIndex.isDeleted ? (
            <Tag color="green">Đang hoạt động</Tag>
          ) : (
            <Tag color="red">Không hoạt động</Tag>
          )}
        </div>
      ),
      width: 100,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: 100,
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: () => (
        <div
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{marginLeft: 8}}>
            <EditOutlined style={{fontSize: 22, color: "blue"}} />
          </div>
        </div>
      ),
      fixed: "right",
      width: 100,
    },
  ];

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      <Table
        style={{marginTop: 10}}
        scroll={{x: 1000, y: 400}}
        columns={columns}
        dataSource={dataInit}
        pagination={false}
      />
    </div>
  );
}
