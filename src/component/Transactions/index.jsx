import React from "react";
import AddTransaction from "./AddTransactions";
import TransactionList from "./TransactionList";
import { useParams } from "react-router-dom";

function TransactionsLayout() {
  const { id: userId } = useParams();
  return (
    <div>
      <AddTransaction userId={userId} />
    </div>
  );
}

export default TransactionsLayout;
