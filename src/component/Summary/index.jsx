import React, { useCallback, useContext, useMemo } from "react";
import { DataContext } from "../../store";
import { Collapse } from "antd";
import "./index.css";

function Summary({ machine, shift }) {
  const { Panel } = Collapse;
  const { data } = useContext(DataContext);
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
  } = data?.[shift]?.[machine];
  const { priceMS, priceHSD } = data?.[shift];
  const listUI = useCallback((list) => {
    return (
      <ul className="list-ui-container">
        {list.map((ele, index) => {
          return (
            <li key={`${ele} - ${index}`}>
              <span
                style={{ fontWeight: "600", padding: "6px", color: "#000" }}
              >
                {ele}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, []);
  const detailListUI = useCallback((list) => {
    return (
      <ul className="list-ui-container">
        {list.map(({ item, comment }, index) => {
          return (
            <li key={`${item} - ${index}`}>
              <span
                style={{ fontWeight: "600", padding: "6px", color: "#000" }}
              >
                {`${item} - ${comment}`}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }, []);
  return (
    <div className="summary-main-container">
      <div className="total-fuel-calculations-container-1">
        <div className="total-fuel-calculations">
          <span>{machine === "machine1" ? "Machine 1" : "Machine 2"}</span>
        </div>
      </div>
      <div className="total-fuel-calculations-container">
        <div className="total-fuel-calculations">
          <span>
            Closing Balance: {parseFloat(closingBalanceMS).toFixed(2)} litres
          </span>
          <span>
            Opening Balance: {parseFloat(openingBalanceMS).toFixed(2)} litres
          </span>
          <span>
            Total MS Sale: {parseFloat(totalSaleMS).toFixed(2)} litres
          </span>
          <span>Total MS Price: Rs {parseFloat(totalPriceMS).toFixed(2)}</span>
        </div>
        <div className="total-fuel-calculations">
          <span>
            Closing Balance: {parseFloat(closingBalanceHSD).toFixed(2)} litres
          </span>
          <span>
            Opening Balance: {parseFloat(openingBalanceHSD).toFixed(2)} litres
          </span>
          <span>
            Total HSD Sale: {parseFloat(totalSaleHSD).toFixed(2)} litres
          </span>
          <span>
            Total HSD Price: Rs {parseFloat(totalPriceHSD).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="total-fuel-calculations-container">
        <span>{"Total Sale Price ( MS Price + HSD Price ) : "}</span>
        <span className="highlight-totals">
          Rs {parseFloat(totalPriceHSD + totalPriceMS).toFixed(2)}
        </span>
      </div>
      <Collapse bordered={false} style={{ paddingBottom: "8px" }}>
        <Panel
          header={
            <div className="panel-header-details">
              <span>{"Paytm"}</span>
              <span>Rs {totalPaytm}</span>
            </div>
          }
          key="1"
        >
          <p>{listUI(listPaytm)}</p>
        </Panel>
      </Collapse>
      <Collapse bordered={false} style={{ paddingBottom: "8px" }}>
        <Panel
          header={
            <div className="panel-header-details">
              <span>{"Borrowings"}</span>
              <span>Rs {totalBorrowings}</span>
            </div>
          }
          key="1"
        >
          <p>{detailListUI(listBorrowings)}</p>
        </Panel>
      </Collapse>
      <Collapse bordered={false} style={{ paddingBottom: "8px" }}>
        <Panel
          header={
            <div className="panel-header-details">
              <span>{"Spendings"}</span>
              <span>Rs {totalSpendings}</span>
            </div>
          }
          key="1"
        >
          <p>{detailListUI(listSpendings)}</p>
        </Panel>
      </Collapse>

      <Collapse bordered={false} style={{ paddingBottom: "8px" }}>
        <Panel
          header={
            <div className="panel-header-details">
              <span>{"Deposits"}</span>
              <span>Rs {totalDeposits}</span>
            </div>
          }
          key="1"
        >
          <p>{listUI(listDeposits)}</p>
        </Panel>
      </Collapse>
      <div className="total-fuel-calculations-container">
        <span>{"Due : "}</span>
        <span className="highlight-totals">
          Rs {parseFloat(totalDue).toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Summary;
