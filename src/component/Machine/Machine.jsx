import React, { useCallback, useContext, useEffect } from "react";
import "./Machine.css";
import MachineForm from "../MachineForm";
import InputList from "../InputList";
import InputListWithDetails from "../InputListWithDetails";
import { DataContext } from "../../store";
import { formatDate } from "../../utils";

function Machine({ machine, shift }) {
  const { data, updateData } = useContext(DataContext);
  const totalMsPrice = data?.[shift]?.[machine]?.["totalPriceMS"];
  const totalHsdPrice = data?.[shift]?.[machine]?.["totalPriceHSD"];
  const totalBorrowing = data?.[shift]?.[machine]?.["totalBorrowings"];
  const totalDeposits = data?.[shift]?.[machine]?.["totalDeposits"];
  const totalPaytm = data?.[shift]?.[machine]?.["totalPaytm"];
  const totalSpending = data?.[shift]?.[machine]?.["totalSpendings"];

  const calculateTotalDue = useCallback(() => {
    const total =
      totalMsPrice +
      totalHsdPrice -
      totalBorrowing -
      totalDeposits -
      totalPaytm -
      totalSpending;
    updateData(shift, machine, "totalDue", total);
  }, [
    totalBorrowing,
    totalDeposits,
    totalHsdPrice,
    totalMsPrice,
    totalPaytm,
    totalSpending,
  ]);
  useEffect(() => {
    calculateTotalDue();
  }, [calculateTotalDue]);

  return (
    <div className="machine-main-container">
      <MachineForm
        key={`MS-${machine}`}
        fuelType={"MS"}
        price={totalMsPrice}
        machine={machine}
        shift={shift}
      />
      <MachineForm
        key={`HSD-${machine}`}
        fuelType={"HSD"}
        price={totalHsdPrice}
        machine={machine}
        shift={shift}
      />
      {/* <div className="sale-description">
        <span>{`Total Price : ${parseFloat(
          data?.[shift]?.[machine]?.[`totalPriceHSD`] +
            data?.[shift]?.[machine]?.[`totalPriceMS`]
        ).toFixed(2)}`}</span>
      </div> */}

      <InputListWithDetails
        key={`borrowings-${machine}`}
        type={"Borrowings"}
        total={totalBorrowing}
        machine={machine}
        shift={shift}
      />

      <InputListWithDetails
        key={`spendings-${machine}`}
        type={"Spendings"}
        total={totalSpending}
        machine={machine}
        shift={shift}
      />
      <InputList
        key={`deposits-${machine}`}
        type={"Deposits"}
        total={totalDeposits}
        machine={machine}
        shift={shift}
      />
      <InputList
        key={`paytm-${machine}`}
        type={"Paytm"}
        total={totalPaytm}
        machine={machine}
        shift={shift}
      />
    </div>
  );
}

export default Machine;
