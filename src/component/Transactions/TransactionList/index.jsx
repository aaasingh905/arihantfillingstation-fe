import React, { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { urlDev, urlProd } from "../../../constants";
import { Button, Col, Row } from "antd";
import "../index.css";
const TransactionList = ({
  id,
  refetch: refetchFlag,
  setRefetch: setRefetchFlag,
}) => {
  const queryClient = useQueryClient();
  const fetchTransactions = async (page = 1, limit = 20) => {
    const response = await axios.get(
      `${urlProd}/transactions/${id}?page=${page}&limit=${limit}`
    );
    return response.data;
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    "transactions",
    () => fetchTransactions()
  );

  const handleNextPage = () => {
    if (data.page < Math.ceil(data.totalUsers / data.limit)) {
      queryClient.prefetchQuery("transaction", () =>
        fetchTransactions(data.page + 1, data.limit)
      );
    }
  };

  const handlePreviousPage = () => {
    if (data.page > 1) {
      queryClient.prefetchQuery("transactions", () =>
        fetchTransactions(data.page - 1, data.limit)
      );
    }
  };
  useEffect(() => {
    if (refetchFlag) {
      refetch();
      setRefetchFlag(false);
    }
  }, [refetchFlag]);

  const TransactionListUI = useCallback(
    (column) => {
      return data?.transactions?.length > 0 ? (
        <ul className="list-container-transactions">
          <li key="Table-Titles" className="list-headers-transactions">
            <span>Amount</span>
            <span>Slip</span>
            <span>Date</span>
            <span
              style={{
                borderRadius: "20px",
                padding: "8px",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              Transaction Type
            </span>
            {/* <span style={{ display: "flex", justifyContent: "center" }}>
              Action
            </span> */}
          </li>
          {data?.transactions?.map((ele, index) => {
            const { amount, slipNo, date, type, _id } = ele;
            if ((index < 12 && column === 1) || (index > 11 && column === 2)) {
              return (
                <li key={`${index}-${amount}`} className="list-item-users">
                  <span>{amount}</span>
                  <span>{slipNo}</span>
                  <span>{date}</span>
                  <span>
                    <div
                      style={{
                        background: `${
                          type === "C"
                            ? "rgba(249, 37, 37, 0.93)"
                            : "rgb(80, 204, 80)"
                        }`,
                        borderRadius: "20px",
                        padding: "8px",
                        boxSizing: "border-box",
                        textAlign: "center",
                        maxWidth: "140px",
                      }}
                    >
                      {type === "C" ? "Credit" : "Deposit"}
                    </div>
                  </span>
                  {/* <Link
                    to={`/users/${_id}`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <SendOutlined
                        style={{
                          color: "#021d2b",
                          fontWeight: 600,
                          background: "rgb(80, 204, 80)",
                          borderRadius: "20px",
                          padding: "10px",
                        }}
                      />
                    </div>
                  </Link> */}
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <></>
      );
    },
    [data]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.userDetails?.name && (
        <Row justify={"center"}>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <span
              style={{
                margin: "10px",
                color: "#021d2b",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Name: {data?.userDetails?.name}
            </span>
            <span
              style={{
                margin: "10px",
                color: "#021d2b",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Mobile No. : {data?.userDetails?.number}
            </span>
            <span
              style={{
                margin: "10px",
                color: "#021d2b",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Address/Village: {data?.userDetails?.village}
            </span>
            <span
              style={{
                margin: "10px",
                color: "#021d2b",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Total Due Amount:{" "}
              {parseFloat(data?.userDetails?.totalDueAmount).toFixed(2)}
            </span>
          </Col>
        </Row>
      )}
      <Row justify={"start"} style={{ height: "100%" }}>
        <Col
          span={12}
          style={{
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {TransactionListUI(1)}
        </Col>
        <Col
          span={12}
          style={{
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {data?.transactions?.length > 15 && TransactionListUI(2)}
        </Col>
      </Row>
      {data?.transactions?.length > 0 && (
        <Row>
          <Col
            span={24}
            justify={"center"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={handleNextPage}
              disabled={data.page === Math.ceil(data.totalUsers / data.limit)}
              style={{ background: "#021d2b", color: "#fff" }}
            >
              Next
            </Button>
            <Button
              onClick={handlePreviousPage}
              disabled={data.page === 1}
              style={{ background: "#021d2b", color: "#fff" }}
            >
              Previous
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TransactionList;
