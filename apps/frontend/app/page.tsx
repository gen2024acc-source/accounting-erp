"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  // Fetch transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios.get("http://localhost:3001/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  };

  // Add transaction
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!amount) return alert("Enter amount");

    await axios.post("http://localhost:3001/transactions", {
      amount: Number(amount),
      type,
      category,
    });

    setAmount("");
    setCategory("");
    fetchTransactions();
  };

  // Calculate totals
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>💰 Accounting App</h1>

      {/* SUMMARY */}
      <div style={{ marginBottom: 20 }}>
        <h3>Balance: ${balance}</h3>
        <p>Income: ${income}</p>
        <p>Expense: ${expense}</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          placeholder="Category (e.g. Food, Salary)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* TRANSACTIONS */}
      <h2>Transactions</h2>

      {transactions.length === 0 && <p>No transactions yet</p>}

      {transactions.map((t, index) => (
        <div
          key={t.id ?? index}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <strong>{(t.type || "UNKNOWN").toUpperCase()}</strong> - ${t.amount}
          <br />
          <small>{t.category || "No category"}</small>
        </div>
      ))}
    </div>
  );
}