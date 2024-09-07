import * as React from "react";
import { Alert, Button, Col, Radio, Row, Tabs } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { DataContext } from "../../store";
import Machine from "../Machine/Machine";
import MachineCalculations from "../MachineCalculations";
import SearchRecordInput from "../SearchRecordInput";
import { urlProd } from "../../constants";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../store/UserStore";

export default function AddRecord() {
  const { user } = React.useContext(UserContext);
  const { token } = user;
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [shift, setShift] = React.useState(1);
  const { data } = React.useContext(DataContext);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const tabItems = [
    {
      label: `Machine 1`,
      key: "machine1",
      children: (
        <Row justify="start">
          <Col span={12}>
            <Machine
              key={"machine1"}
              machine={"machine1"}
              shift={`shift${shift}`}
            />
          </Col>
          <Col span={12}>
            <MachineCalculations
              key={"machine1"}
              machine={"machine1"}
              shift={`shift${shift}`}
            />
          </Col>
        </Row>
      ),
    },
    {
      label: `Machine 2`,
      key: "machine2",
      children: (
        <Row justify="start">
          <Col span={12}>
            <Machine
              key={"machine2"}
              machine={"machine2"}
              shift={`shift${shift}`}
            />
          </Col>
          <Col span={11}>
            <MachineCalculations
              key={"machine2"}
              machine={"machine2"}
              shift={`shift${shift}`}
            />
          </Col>
        </Row>
      ),
    },
  ];
  const saveRecord = () => {
    setSaving(true);
    axios
      .post(`${urlProd}/shifts`, data)
      .then((res) => {
        if (res.status === 201 || res.status === 203) {
          setSuccess(true);
          setSaving(false);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
      })
      .catch((err) => {
        setError(true);
        setSaving(false);
        setTimeout(() => {
          setError(false);
        }, 3000);
      });
  };
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {success && (
        <Row justify={"center"}>
          <Col span={24}>
            <Alert
              message="Data Successfully Added"
              type="success"
              showIcon
              action={
                <Button size="large" type="text">
                  X
                </Button>
              }
            />
          </Col>
        </Row>
      )}
      {error && (
        <Row justify={"center"}>
          <Col span={24}>
            <Alert
              message="Data Submission Failed"
              type="error"
              showIcon
              action={
                <Button size="large" type="text">
                  X
                </Button>
              }
            />
          </Col>
        </Row>
      )}
      <div className="app-container">
        <Row justify={"space"}>
          <Col span={8}>
            <SearchRecordInput setLoading={setLoading} />
          </Col>
          {!loading && (
            <>
              <Col span={8}>
                <div className="search-record-container1">
                  <Radio.Group
                    onChange={(e) => setShift(e?.target.value)}
                    value={shift}
                  >
                    <Radio value={1}>Shift 1</Radio>
                    <Radio value={2}>Shift 2</Radio>
                  </Radio.Group>
                </div>
              </Col>
              <Col span={8}>
                <Button
                  type="primary"
                  style={{ float: "right", background: "green" }}
                  icon={<SaveOutlined />}
                  onClick={saveRecord}
                  disabled={saving}
                >
                  Save
                </Button>
              </Col>
            </>
          )}
        </Row>
        {!loading && (
          <Row justify={"center"}>
            <Col span={24}>
              <Tabs
                key={shift}
                defaultActiveKey="1"
                centered
                items={tabItems}
                style={{ border: "none" }}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}
