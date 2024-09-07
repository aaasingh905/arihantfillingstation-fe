import React, { useContext } from "react";
import "./index.css";
import { DataContext } from "../../store";
function MachineCalculations({ shift, machine }) {
  const { data } = useContext(DataContext);
  const {
    totalPriceMS,
    totalPriceHSD,
    totalSaleMS,
    totalSaleHSD,
    totalPaytm,
    totalBorrowings,
    totalSpendings,
    totalDeposits,
  } = data?.[shift]?.[machine];
  return (
    <div className="machine-calculations-container">
      <div className="total-fuel-calculations-container">
        <div className="total-fuel-calculations">
          <span>
            Total MS Sale: {parseFloat(totalSaleMS).toFixed(2)} litres
          </span>
          <span>Total MS Price: Rs {parseFloat(totalPriceMS).toFixed(2)}</span>
        </div>
        <div className="total-fuel-calculations">
          <span>
            Total HSD Sale: {parseFloat(totalSaleHSD).toFixed(2)} litres
          </span>
          <span>
            Total HSD Price: Rs {parseFloat(totalPriceHSD).toFixed(2)}
          </span>
        </div>
      </div>

      {!(shift === "shift2" && machine === "machine2") && (
        <>
          <div className="total-fuel-calculations-container-sub">
            <span>{"Total Borrowings : "}</span>
            <span>Rs {totalBorrowings}</span>
          </div>
          <div className="total-fuel-calculations-container-sub">
            <span>{"Total Spendings : "}</span>
            <span>Rs {totalSpendings}</span>
          </div>
          <div className="total-fuel-calculations-container-sub">
            <span>{"Total Deposits : "}</span>
            <span>Rs {totalDeposits}</span>
          </div>
          <div className="total-fuel-calculations-container-sub">
            <span>{"Total Paytm : "}</span>
            <span>Rs {totalPaytm}</span>
          </div>
        </>
      )}
      <div className="total-fuel-calculations-container">
        <span>{"Total Sale Price ( MS Price + HSD Price ) : "}</span>
        <span className="highlight-totals">
          Rs {parseFloat(totalPriceHSD + totalPriceMS).toFixed(2)}
        </span>
      </div>

      {shift === "shift1" && (
        <>
          {" "}
          <div className="total-fuel-calculations-container">
            <span>{"( Total Sale Price - Borrowings ) : "}</span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD + totalPriceMS - totalBorrowings
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>{"( Total Sale Price - Borrowings - Spendings ) : "}</span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD + totalPriceMS - totalBorrowings - totalSpendings
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>
              {"( Total Sale Price - Borrowings - Spendings - Deposits ) : "}
            </span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings -
                  totalSpendings -
                  totalDeposits
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>
              {
                "( Total Sale Price - Borrowings - Spendings - Deposits - Paytm  ) : "
              }
            </span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings -
                  totalSpendings -
                  totalDeposits -
                  totalPaytm
              ).toFixed(2)}
            </span>
          </div>
        </>
      )}
      {shift === "shift2" && machine === "machine1" && (
        <>
          {" "}
          <div className="total-fuel-calculations-container">
            <span> Shift Summary : </span>
          </div>
          <div className="total-fuel-calculations-container">
            <div className="total-fuel-calculations">
              <span>
                Shift MS Sale:{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalSaleMS +
                    data?.shift2?.machine2?.totalSaleMS
                ).toFixed(2)}{" "}
                litres
              </span>
              <span>
                Shift MS Price: Rs{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalPriceMS +
                    data?.shift2?.machine2?.totalPriceMS
                ).toFixed(2)}
              </span>
            </div>
            <div className="total-fuel-calculations">
              <span>
                Shift HSD Sale:{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalSaleHSD +
                    data?.shift2?.machine2?.totalSaleHSD
                ).toFixed(2)}{" "}
                litres
              </span>
              <span>
                Shift HSD Price: Rs{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalPriceHSD +
                    data?.shift2?.machine2?.totalPriceHSD
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="total-fuel-calculations-container">
            <span>{"Shift 2 Total Sale Price ( MS Price + HSD Price ) :"}</span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS +
                  data?.shift2?.machine2?.totalPriceMS +
                  data?.shift2?.machine2?.totalPriceHSD
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>{"( Total Sale Price - Borrowings ) : "}</span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings +
                  data?.shift2?.machine2?.totalPriceMS +
                  data?.shift2?.machine2?.totalPriceHSD
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>{"( Total Sale Price - Borrowings - Spendings ) : "}</span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings -
                  totalSpendings +
                  data?.shift2?.machine2?.totalPriceMS +
                  data?.shift2?.machine2?.totalPriceHSD
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>
              {"( Total Sale Price - Borrowings - Spendings - Deposits ) : "}
            </span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings -
                  totalSpendings -
                  totalDeposits +
                  data?.shift2?.machine2?.totalPriceMS +
                  data?.shift2?.machine2?.totalPriceHSD
              ).toFixed(2)}
            </span>
          </div>
          <div className="total-fuel-calculations-container">
            <span>
              {
                "( Total Sale Price - Borrowings - Spendings - Deposits - Paytm  ) : "
              }
            </span>
            <span className="highlight-totals">
              Rs{" "}
              {parseFloat(
                totalPriceHSD +
                  totalPriceMS -
                  totalBorrowings -
                  totalSpendings -
                  totalDeposits -
                  totalPaytm +
                  data?.shift2?.machine2?.totalPriceMS +
                  data?.shift2?.machine2?.totalPriceHSD
              ).toFixed(2)}
            </span>
          </div>
        </>
      )}
      {shift !== "shift2" && (
        <div className="total-fuel-calculations-container">
          <span>Due {machine === "machine1" ? "Machine 1" : "Machine 2"} </span>
          <span className="highlight-totals">
            Rs{" "}
            {parseFloat(
              totalPriceHSD +
                totalPriceMS -
                totalPaytm -
                totalBorrowings -
                totalSpendings -
                totalDeposits
            ).toFixed(2)}
          </span>
        </div>
      )}
      <div className="total-fuel-calculations-container">
        <span>Total Due ( Machine 1 + Machine 2 ) : </span>
        <span className="highlight-totals">
          Rs{" "}
          {parseFloat(
            data?.[shift]?.["machine1"]?.totalDue +
              data?.[shift]?.["machine2"]?.totalDue
          ).toFixed(2)}
        </span>
      </div>
      {shift === "shift2" && machine === "machine2" && (
        <>
          <div className="total-fuel-calculations-container">
            <span> Day Summary : </span>
          </div>
          <div className="total-fuel-calculations-container">
            <div className="total-fuel-calculations">
              <span>
                Day MS Sale:{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalSaleMS +
                    data?.shift2?.machine2?.totalSaleMS +
                    data?.shift1?.machine1?.totalSaleMS +
                    data?.shift1?.machine2?.totalSaleMS
                ).toFixed(2)}{" "}
                litres
              </span>
              <span>
                Day MS Price: Rs{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalPriceMS +
                    data?.shift2?.machine2?.totalPriceMS +
                    data?.shift1?.machine1?.totalPriceMS +
                    data?.shift1?.machine2?.totalPriceMS
                ).toFixed(2)}
              </span>
            </div>
            <div className="total-fuel-calculations">
              <span>
                Day HSD Sale:{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalSaleHSD +
                    data?.shift2?.machine2?.totalSaleHSD +
                    data?.shift1?.machine1?.totalSaleHSD +
                    data?.shift1?.machine2?.totalSaleHSD
                ).toFixed(2)}{" "}
                litres
              </span>
              <span>
                Day HSD Price: Rs{" "}
                {parseFloat(
                  data?.shift2?.machine1?.totalPriceHSD +
                    data?.shift2?.machine2?.totalPriceHSD +
                    data?.shift1?.machine1?.totalPriceHSD +
                    data?.shift1?.machine2?.totalPriceHSD
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MachineCalculations;
