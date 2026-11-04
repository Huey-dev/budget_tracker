"use client";

import { useState } from "react";

export default function TransactionForm() {
  const [amount, setAmount] = useState("");

  return (
    <form>
      <h1>hi welcome</h1>
      <input
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Enter amount"
      />
    </form>
  );
}
