import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Modal, Pagination, Table} from "antd";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {useQuery} from "react-query";
import {
  getAllReport,
  IGetListReportRes,
  IParamGetAllReport,
} from "@app/api/ApiReport";
import {LoadingGlobal} from "@app/components/Loading";
import { formatDateTime } from "@app/utils/formatTime";
import { DetailReport } from "../detail_report";
import { useRouter } from "next/router";

interface DataType {
  key: string;
  reportId: number;
  fullName: string;
  phoneNumber: string;
  reportTypeDetail: string;
  detail: string;
  createAt: string;
  reportStatus: string;
}

export function ListReport(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataInit, setDataInit] = useState<any>([]);
  const [paramsGetReport, setParamsGetReport] = useState<IParamGetAllReport>({
    renterName: "",
    page: 1,
    size: 10,
  });
  const [itemSelected, setItemSelected] = useState<number>(1)
  const router = useRouter()

  const getDataDetailReport = (): Promise<IGetListReportRes> =>
    getAllReport({
      renterName: paramsGetReport.renterName,
      displayAll: true,
      page: paramsGetReport.page,
      size: paramsGetReport.size,
    });

  const {refetch, data, isLoading} = useQuery(
    ["GET_DETAIL_REPORT"],
    getDataDetailReport,
    {
      onSuccess: (res) => {
        console.log(res?.data?.content);
        setDataInit(res?.data?.content);
      },
    }
  );

  const onChangePagination = (page: number): void => {
    console.log("sdasdasdasd", typeof page);
    setParamsGetReport({...paramsGetReport, page: page});
  };

  console.log("dataInit", dataInit);
  const showModal = (reportId : number) => {
    setItemSelected(reportId)
    setIsModalOpen(true);
    console.log(itemSelected);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    console.log("data", data);
  };

  const handleSearch = (valueSearch: string): void => {
    console.log("Ssss");
    setParamsGetReport({...paramsGetReport, renterName: valueSearch});
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
      render: (_, dataIndex) => <div>{dataInit.indexOf(dataIndex) + 1}</div>,
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      key: "fullName",
      width: 100,
      align: "center",
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 80,
    },
    {
      title: "Loại báo cáo",
      dataIndex: "reportTypeDetail",
      key: "reportTypeDetail",
      align: "center",
      width: 120,
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
      align: "center",
      width: 170,
    },
    {
      title: "Trạng tháio",
      dataIndex: "reportStatus",
      key: "reportStatus",
      align: "center",
      width: 120,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: 120,
      render: (_, dataIndex) => (<span>{formatDateTime(dataIndex.createAt)}</span>)
    },
    {
      title: "Chi tiết",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_, dataIndex) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <Button
          onClick={() => goToDetailReport(dataIndex.reportId)}
          type="primary"
          style={{
            borderRadius: "16px"
          }}
        >
            Xem
        </Button>
      ),
      fixed: "right",
      width: 80,
    },
  ];

  useEffect(() => {
    refetch();
  }, [paramsGetReport]);

  const goToDetailReport = (idValue: number): void => {
    router.push({
      pathname: "/detail_report",
      query: {
        id: idValue,
      },
    });
  };

  return (
    <div className="manager-user-container">
      <FilterGroupGlobal
        listSearchText={listSearchText}
        listDatePicker={listDatePicker}
      />
      {isLoading ? (
        <LoadingGlobal />
      ) : (
        <Table
          style={{marginTop: 10}}
          scroll={{x: 600, y: 550}}
          columns={columns}
          dataSource={dataInit}
          pagination={false}
        />
      )}

      {/* <div className="pagination-table">
        <Pagination
          onChange={onChangePagination}
          defaultCurrent={1}
          total={data?.data?.totalElements}
        />
      </div> */}
    </div>
  );
}
