import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomTextField from "../CustomTextField";
import { DataContext } from "../../store";
// import useStore from "../../store";

function MachineForm({
  fuelType,
  sale,
  price,
  setSale,
  setPrice,
  shift,
  machine,
}) {
  // const [closingBalanceMs, setClosingBalanceMs] = useState();
  // const [openingBalanceMs, setOpeningBalanceMs] = useState();
  // const [tankerMs, setTankerMs] = useState();
  // const [msPrice, setMsPrice] = useState();
  const { data, updateData, updatePrice } = useContext(DataContext);
  const openingBalanceMs =
    data?.[shift]?.[machine]?.[`openingBalance${fuelType}`];
  const closingBalanceMs =
    data?.[shift]?.[machine]?.[`closingBalance${fuelType}`];
  const tankerMs = data?.[shift]?.[machine]?.[`tanker${fuelType}`];
  const msPrice = data?.[shift]?.[`price${fuelType}`];
  const calculateMsTotal = useCallback(() => {
    if (closingBalanceMs && openingBalanceMs && msPrice) {
      const total = (closingBalanceMs - openingBalanceMs - tankerMs) * msPrice;
      updateData(shift, machine, `totalPrice${fuelType}`, total);
    } else {
      updateData(shift, machine, `totalPrice${fuelType}`, 0.0);
    }
  }, [closingBalanceMs, openingBalanceMs, msPrice, tankerMs]);
  const calculateTotalSale = useCallback(() => {
    if (closingBalanceMs && openingBalanceMs) {
      const tanker = tankerMs > 0 ? tankerMs : 0;
      const total = closingBalanceMs - openingBalanceMs - tanker;
      updateData(shift, machine, `totalSale${fuelType}`, total);
    } else {
      updateData(shift, machine, `totalSale${fuelType}`, 0.0);
    }
  }, [closingBalanceMs, openingBalanceMs, tankerMs]);
  useEffect(() => {
    calculateMsTotal();
    calculateTotalSale();
  }, [
    closingBalanceMs,
    openingBalanceMs,
    msPrice,
    tankerMs,
    calculateMsTotal,
    calculateTotalSale,
  ]);

  return (
    <>
      <div className="machine-balance-input">
        <CustomTextField
          required
          id="closing-balance-ms"
          label={`Closing Balance ${fuelType}`}
          value={data?.[shift]?.[machine]?.[`closingBalance${fuelType}`]}
          onChange={(e) => {
            updateData(
              shift,
              machine,
              `closingBalance${fuelType}`,
              parseFloat(e?.target?.value)
            );
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomTextField
          required
          id="opening-balance-ms"
          label={`Opening Balance ${fuelType}`}
          value={data?.[shift]?.[machine]?.[`openingBalance${fuelType}`]}
          onChange={(e) => {
            updateData(
              shift,
              machine,
              `openingBalance${fuelType}`,
              parseFloat(e?.target?.value)
            );
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CustomTextField
          id="tanker-ms"
          label={`Tanker ${fuelType}`}
          value={data?.[shift]?.[machine]?.[`tanker${fuelType}`]}
          onChange={(e) => {
            updateData(
              shift,
              machine,
              `tanker${fuelType}`,
              parseFloat(e?.target?.value)
            );
          }}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {
          <CustomTextField
            required
            id="price-ms"
            label={`Price ${fuelType}`}
            value={
              data?.[shift]?.[`price${fuelType}`] > 0
                ? data?.[shift]?.[`price${fuelType}`]
                : ""
            }
            onChange={(e) => {
              updatePrice(shift, `price${fuelType}`, e?.target?.value);
            }}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        }
      </div>
      {/* <div className="sale-description">
        <span>{`${fuelType} Sale: ${parseFloat(
          data?.[shift]?.[machine]?.[`totalSale${fuelType}`]
        ).toFixed(2)} Ltrs`}</span>
        <span>{`Price: Rs ${parseFloat(
          data?.[shift]?.[machine]?.[`totalPrice${fuelType}`]
        ).toFixed(2)}`}</span>
      </div> */}
    </>
  );
}

export default MachineForm;
