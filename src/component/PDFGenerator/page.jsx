import { Text, View } from "@react-pdf/renderer";
import React from "react";
import MachinePage from "./machinePage";

function PDFPage({ shift, data }) {
  return (
    <View style={{ flexDirection: "column", justify: "space-between" }}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 10,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text>
            {shift === "shift1" ? "Shift 1" : "Shift 2"} ({data?.date})
          </Text>
        </View>
        <MachinePage machine={"machine1"} shift={shift} data={data?.[shift]} />
      </View>
      <View style={{ width: "100%" }}>
        <MachinePage machine={"machine2"} shift={shift} data={data?.[shift]} />
      </View>
    </View>
  );
}

export default PDFPage;
