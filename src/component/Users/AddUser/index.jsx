import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import CustomTextField from "../../CustomTextField";
import axios from "axios";
import { urlDev, urlProd } from "../../../constants";

function AddUser({ refetch: refetchFlag, setRefetch: setRefetchFlag }) {
  const [user, setUser] = useState({
    name: "",
    number: "",
    village: "",
  });

  const updateUserData = (value, key) => {
    setUser({ ...user, [key]: value });
  };

  const addUser = () => {
    if (user.name && user.number) {
      axios
        .post(`${urlProd}/users`, { ...user })
        .then((res) => {
          setUser({
            name: "",
            number: "",
            village: "",
          });
          setRefetchFlag(true);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <Row style={{ marginTop: "15px" }}>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <CustomTextField
          required
          id="username"
          label="Account Holder Name"
          value={user.name}
          onChange={(e) => updateUserData(e?.target?.value, "name")}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomTextField
          required
          id="number"
          label="Mobile Number"
          value={user.number}
          onChange={(e) => updateUserData(e?.target?.value, "number")}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomTextField
          id="address"
          label="Address/Village"
          value={user.village}
          onChange={(e) => updateUserData(e?.target?.value, "village")}
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          style={{
            background: "#021d2b",
            borderRadius: "20px",
            boxSizing: "border-box",
            paddingBottom: "8px",
            color: "#fff",
            fontWeight: 500,
            fontSize: "16px",
          }}
          onClick={addUser}
        >
          Add Account
        </Button>
      </Col>
    </Row>
  );
}

export default AddUser;
