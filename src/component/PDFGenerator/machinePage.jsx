import { Text, View } from "@react-pdf/renderer";
import React from "react";

function MachinePage({ machine, shift, data }) {
  const {
    openingBalanceHSD,
    closingBalanceHSD,
    openingBalanceMS,
    closingBalanceMS,
    tankerMS,
    tankerHSD,
    totalSaleMS,
    totalSaleHSD,
    totalPriceHSD,
    totalPriceMS,
    listPaytm,
    listBorrowings,
    listSpendings,
    listDeposits,
    totalPaytm,
    totalBorrowings,
    totalSpendings,
    totalDeposits,
    totalDue,
  } = data?.[machine];
  const { priceMS, priceHSD } = data;
  const listUI = (list) => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {list.map((ele) => (
          <Text style={{ fontSize: 10, border: 1, padding: 2 }}>{ele}</Text>
        ))}
      </View>
    );
  };
  const detailListUI = (list) => {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {list.map((ele) => (
          <Text style={{ fontSize: 10, border: 1, padding: 2 }}>
            {ele?.item} - {ele?.comment}{" "}
          </Text>
        ))}
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        <Text>{machine === "machine1" ? "Machine 1" : "Machine 2"}</Text>
      </View>

      <View style={{ flexDirection: "row", justify: "space-between" }}>
        <View style={{ flexDirection: "row", width: "65%" }}>
          <View style={{ width: "55%", fontWeight: "bold" }}>
            <Text style={{ fontSize: 10 }}>Closing Balance:</Text>
            <Text style={{ fontSize: 10 }}>Opening Balance:</Text>
            <Text style={{ fontSize: 10 }}>Tanker/Testing:</Text>
            <Text style={{ fontSize: 10 }}>Sale:</Text>
            <Text style={{ fontSize: 10 }}>Price(Sale * {priceMS}): </Text>
            <Text style={{ fontSize: 10 }}></Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              {parseFloat(closingBalanceMS).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              {parseFloat(openingBalanceMS).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              {parseFloat(tankerMS).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              {parseFloat(totalSaleMS).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "extrabold" }}>
              {parseFloat(totalPriceMS).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "35%" }}>
          <View style={{ width: "55%", fontWeight: "bold" }}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Closing Balance:
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Opening Balance:
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Tanker/Testing:
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Sale:</Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              Price(Sale * {priceHSD}):{" "}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}></Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ fontSize: 10 }}>
              {parseFloat(closingBalanceHSD).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {parseFloat(openingBalanceHSD).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>
              {parseFloat(tankerHSD).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {parseFloat(totalSaleHSD).toFixed(2)}
            </Text>
            <Text style={{ fontSize: 10 }}>
              {parseFloat(totalPriceHSD).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justify: "space-between" }}>
        <View
          style={{
            flexDirection: "column",
            justify: "flex-start",
            width: "65%",
            paddingRight: 20,
          }}
        >
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "15%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>Paytm :</Text>
            </View>
            <View style={{ width: "85%" }}>{listUI(listPaytm)}</View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "15%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Borrowing :
              </Text>
            </View>
            <View style={{ width: "85%" }}>{detailListUI(listBorrowings)}</View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "15%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Spendings :
              </Text>
            </View>
            <View style={{ width: "85%" }}>{detailListUI(listSpendings)}</View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "15%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Deposits :
              </Text>
            </View>
            <View style={{ width: "85%" }}>{listUI(listDeposits)}</View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            justify: "flex-start",
            width: "35%",
          }}
        >
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                (MS Price + HSD Price):
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {parseFloat(totalPriceMS + totalPriceHSD).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Total Paytm Amt:
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {" "}
                {parseFloat(totalPaytm).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Total Borrowing:
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {" "}
                {parseFloat(totalBorrowings).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Total Spending:
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {" "}
                {parseFloat(totalSpendings).toFixed(2)}
              </Text>
            </View>
          </View>
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 6,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Total Deposit:
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {" "}
                {parseFloat(totalDeposits).toFixed(2)}
              </Text>
            </View>
          </View>
          {shift === "shift1" && (
            <View
              style={{
                fontSize: 12,
                fontWeight: "bold",
                marginBottom: 10,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <View style={{ width: "55%", fontWeight: "bold" }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>Due:</Text>
              </View>
              <View style={{ width: "45%" }}>
                <Text style={{ fontSize: 10 }}>
                  {parseFloat(totalDue).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 10,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View style={{ width: "55%", fontWeight: "bold" }}>
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                Total Due(Machine 1 + Machine 2):
              </Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontSize: 10 }}>
                {parseFloat(
                  data?.["machine1"]?.totalDue + data?.["machine2"]?.totalDue
                ).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default MachinePage;
