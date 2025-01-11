import React from "react";

function ExpenseList({ expenses, onRemoveExpense }) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-blue-700 mb-3">Expense List</h2>
      <ul className="divide-y divide-gray-300">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center p-3 bg-blue-50 rounded-md shadow-inner">
            No expenses added yet.
          </p>
        ) : (
          expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center p-3 bg-white rounded-md shadow-md my-2 hover:bg-gradient-to-r from-blue-50 to-blue-200 transition-all duration-300"
            >
              <div className="flex flex-col">
                <span className="text-blue-900 font-medium">{expense.title}</span>
                <span className="text-gray-500 text-sm italic">#{expense.id}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-blue-600 font-bold text-lg">
                Rs.{expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onRemoveExpense(expense.id)}
                  className="text-white bg-red-500 py-1 px-3 rounded-md shadow hover:bg-red-600 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;
