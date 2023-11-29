import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Modal, Pagination, Table} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {Formik} from "formik";
import UploadFileGlobal from "@app/components/UploadFileGlobal";
import {useQuery} from "react-query";
import {
  getAllReport,
  IGetListReportRes,
  IParamGetAllReport,
} from "@app/api/ApiReport";
import {LoadingGlobal} from "@app/components/Loading";

interface DataType {
  key: string;
  reportId: string;
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

  const getDataDetailReport = (): Promise<IGetListReportRes> =>
    getAllReport({
      renterName: paramsGetReport.renterName,
      page: paramsGetReport.page,
      size: paramsGetReport.size,
    });

  const {refetch, data, isLoading} = useQuery(
    ["GET_DETAIL_REPORT"],
    getDataDetailReport,
    {
      onSuccess: (res) => {
        setDataInit(res?.data?.content);
      },
    }
  );

  const onChangePagination = (page: number): void => {
    console.log("sdasdasdasd", typeof page);
    setParamsGetReport({...paramsGetReport, page: page});
  };
  console.log("dataInit", dataInit);
  const showModal = () => {
    setIsModalOpen(true);
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
      width: 120,
      align: "center",
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      align: "center",
      width: 120,
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
      title: "Trạng thái báo cáo",
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
    },
    {
      title: "Thao tác",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: () => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
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
      width: 80,
    },
  ];
  const listInputUser = [
    {
      title: "Tên người dùng",
      placeHolder: "Nhập tên người dùng",
      type: "input",
    },
    {
      title: "Ảnh đại diện",
      placeHolder: "Nhập tên người dùng",
      type: "uploadFile",
    },
    {
      title: "Email",
      placeHolder: "Nhập Email",
      type: "input",
    },
    {
      title: "Sách còn lại",
      placeHolder: "Nhập số sách còn lại",
      type: "input",
    },
    {
      title: "Số đơn giao dịch",
      placeHolder: "Nhập số đơn",
      type: "input",
    },
  ];

  useEffect(() => {
    refetch();
  }, [paramsGetReport]);

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

      <div className="pagination-table">
        <Pagination
          onChange={onChangePagination}
          defaultCurrent={1}
          total={data?.data?.totalElements}
        />
      </div>
      <Modal
        title="Sửa thông tin người dùng"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Formik
          initialValues={{}}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit}): JSX.Element => {
            return (
              <div>
                {listInputUser.map((item, index) => (
                  <div key={index}>
                    {item.type === "input" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <InputGlobal
                          name="username"
                          placeholder={item.placeHolder}
                          style={{width: "80%"}}
                          onPressEnter={(): void => handleSubmit()}
                        />
                        <ErrorMessageGlobal name="username" />
                      </div>
                    )}
                    {item.type === "uploadFile" && (
                      <div
                        style={{
                          marginBottom: 12,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span style={{width: "20%"}}>{`${item.title}:  `}</span>
                        <div style={{width: "80%"}}>
                          <UploadFileGlobal
                            handleChange={() => console.log("uploadFile")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
}
