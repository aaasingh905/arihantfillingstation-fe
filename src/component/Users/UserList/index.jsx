import React, { useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { urlDev, urlProd } from "../../../constants";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "../index.css";
import { SendOutlined } from "@ant-design/icons";
const UserList = ({ refetch: refetchFlag, setRefetch: setRefetchFlag }) => {
  const queryClient = useQueryClient();
  const fetchUsers = async (page = 1, limit = 24) => {
    const response = await axios.get(
      `${urlProd}/getusers?page=${page}&limit=${limit}`
    );
    return response.data;
  };

  const { isLoading, isError, data, error, refetch } = useQuery("users", () =>
    fetchUsers()
  );

  const handleNextPage = () => {
    if (data.page < Math.ceil(data.totalUsers / data.limit)) {
      queryClient.prefetchQuery("users", () =>
        fetchUsers(data.page + 1, data.limit)
      );
    }
  };

  const handlePreviousPage = () => {
    if (data.page > 1) {
      queryClient.prefetchQuery("users", () =>
        fetchUsers(data.page - 1, data.limit)
      );
    }
  };

  const UserListUI = useCallback(
    (column) => {
      return data?.users?.length > 0 ? (
        <ul className="list-container-user-list">
          <li key="Table-Titles" className="list-headers-user-list">
            <span>Name</span>
            <span>Number</span>
            <span>Village</span>
            <span
              style={{
                borderRadius: "20px",
                padding: "8px",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              Due Amount
            </span>
            <span style={{ display: "flex", justifyContent: "center" }}>
              Action
            </span>
          </li>
          {data?.users.map((ele, index) => {
            const { name, number, totalDueAmount, village, _id } = ele;
            if ((index < 12 && column === 1) || (index > 11 && column === 2)) {
              return (
                <li key={`${index}-${name}`} className="list-item-users">
                  <span>{name}</span>
                  <span>{number}</span>
                  <span>{village}</span>
                  <span>
                    <div
                      style={{
                        background: "rgba(249, 37, 37, 0.93)",
                        borderRadius: "20px",
                        padding: "8px",
                        boxSizing: "border-box",
                        textAlign: "center",
                        maxWidth: "140px",
                      }}
                    >
                      {parseFloat(totalDueAmount).toFixed(2)}
                    </div>
                  </span>
                  <Link
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
                  </Link>
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
  useEffect(() => {
    if (refetchFlag) {
      refetch();
      setRefetchFlag(false);
    }
  }, [refetchFlag]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* <Row justify={"center"}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <h1 style={{ margin: "10px", color: "#021d2b" }}>Account List</h1>
        </Col>
      </Row> */}
      <Row justify={"start"} style={{ height: "100%" }}>
        <Col
          span={12}
          style={{
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {UserListUI(1)}
        </Col>
        <Col
          span={12}
          style={{
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {data?.users?.length > 15 && UserListUI(2)}
        </Col>
      </Row>
      {data?.users?.length > 0 && (
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

export default UserList;
