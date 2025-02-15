import React, { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 p-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white shadow-2xl p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-6">
          Expense Tracker
        </h1>
        <ExpenseForm onAddExpense={addExpense} />
        <ExpenseList expenses={expenses} onRemoveExpense={removeExpense} />
      </div>
    </div>
  );
}

export default App;
