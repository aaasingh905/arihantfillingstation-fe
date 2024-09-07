import { Button, Col, DatePicker, Radio, Row } from "antd";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../CustomTextField";
import { formatDate } from "../../../utils";
import axios from "axios";
import { urlDev, urlProd } from "../../../constants";
import TransactionList from "../TransactionList";

function AddTransaction({ userId }) {
  const [transaction, setTransaction] = useState({
    amount: 0,
    date: "",
    slipNo: "",
    type: "C",
  });
  const [transactionAdded, setTransactionAdded] = useState(false);

  const transactionData = (value, key) => {
    setTransaction({ ...transaction, [key]: value });
  };

  const onDateChange = (date, dateString) => {
    setTransaction({ ...transaction, date: formatDate(dateString) });
  };

  const addTransaction = () => {
    if (transaction.amount && transaction.date) {
      axios
        .post(`${urlProd}/addtransactions`, { ...transaction, userId })
        .then((res) => {
          setTransaction({
            amount: 0,
            date: "",
            slipNo: "",
            type: "C",
          });
          setTransactionAdded(true);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Row style={{ marginTop: "15px" }}>
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomTextField
            type="number"
            id="transaction-amount"
            label="Amount"
            value={transaction.amount}
            onChange={(e) =>
              transactionData(parseInt(e?.target?.value), "amount")
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CustomTextField
            id="slipno"
            label="Slip No"
            value={transaction.slipNo}
            onChange={(e) => transactionData(e?.target?.value, "slipNo")}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DatePicker
            onChange={onDateChange}
            size={"large"}
            style={{ margin: "10px" }}
          />
          <Radio.Group
            onChange={(e) => transactionData(e?.target.value, "type")}
            value={transaction.type}
          >
            <Radio value={"D"}>Deposit</Radio>
            <Radio value={"C"}>Credit</Radio>
          </Radio.Group>
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
            onClick={addTransaction}
          >
            Add Transaction
          </Button>
        </Col>
      </Row>
      {userId && (
        <Row>
          <Col span={24}>
            <TransactionList
              id={userId}
              refetch={transactionAdded}
              setRefetch={setTransactionAdded}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default AddTransaction;
