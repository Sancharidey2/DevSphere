// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const totalSpentElement = document.getElementById('total-spent');
const monthlyBudgetElement = document.getElementById('monthly-budget');
const budgetWarningElement = document.getElementById('budget-warning');
const expenseChartCanvas = document.getElementById('expense-chart');

// Initial Setup
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const monthlyBudget = 1000; // Fixed monthly budget

// Pie chart data
let expenseCategories = {
  Food: 0,
  Travel: 0,
  Entertainment: 0,
  Bills: 0,
};

// Function to Update the Chart
function updateChart() {
  const ctx = expenseChartCanvas.getContext('2d');
  const data = {
    labels: Object.keys(expenseCategories),
    datasets: [{
      data: Object.values(expenseCategories),
      backgroundColor: ['#FF6347', '#36A2EB', '#FFCE56', '#4CAF50'],
    }]
  };

  new Chart(ctx, {
    type: 'pie',
    data: data,
  });
}

// Function to Update Total Expenses and Budget Status
function updateDashboard() {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalSpentElement.textContent = totalSpent;

  // Update expense categories
  expenseCategories = { Food: 0, Travel: 0, Entertainment: 0, Bills: 0 };
  expenses.forEach(expense => {
    expenseCategories[expense.category] += expense.amount;
  });

  // Update the chart
  updateChart();

  // Budget warning
  if (totalSpent > monthlyBudget) {
    budgetWarningElement.textContent = 'Warning: You have exceeded your monthly budget!';
  } else {
    budgetWarningElement.textContent = '';
  }
}

// Handle Form Submission
expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseCategory = expenseCategoryInput.value;

  if (expenseName && !isNaN(expenseAmount)) {
    const expense = { name: expenseName, amount: expenseAmount, category: expenseCategory };
    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset form
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
    
    updateDashboard();
  }
});

// Initialize Dashboard
updateDashboard();
