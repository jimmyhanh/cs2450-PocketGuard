const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-btn');
const screenButtons = document.querySelectorAll('button[data-screen]');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const budgetForm = document.getElementById('budget-form');
const transactionForm = document.getElementById('transaction-form');
const userDisplay = document.getElementById('user-display');
const budgetAmount = document.getElementById('budget-amount');
const targetAmount = document.getElementById('target-amount');
const actualAmount = document.getElementById('actual-amount');
const overallAmount = document.getElementById('overall-amount');

const groceriesAmount = document.getElementById('groceriesAmount');
const transportAmount = document.getElementById('transportAmount');
const entertainmentAmount = document.getElementById('entertainmentAmount');
const rentAmount = document.getElementById('rentAmount');
const eatingOutAmount = document.getElementById('eatingOutAmount');
const savingsAmount = document.getElementById('savingsAmount');

const budgetAlert = document.getElementById("budgetAlert");
const overspendAmount = document.getElementById("budgetOverspending");

const spentAmount = document.getElementById('spent-amount');
const breakdownTotal = document.getElementById('breakdown-total');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const budgetInput = document.getElementById('budget-input');
const transactionAmount = document.getElementById('transaction-amount');
const transactionCategory = document.getElementById('transaction-category');
const transactionDate = document.getElementById('transaction-date');
const logoutBtn = document.getElementById('logout-btn');
const deleteBtn = document.getElementById('delete-btn');
const accountUsername = document.getElementById('account-username');
const transactionCount = document.getElementById('transaction-count');
const totalSpentAccount = document.getElementById('total-spent-account');

const defaultData = {
  budget: 3000,
  spent: 0,
  transactions: [
    { category: 'Groceries', amount: 0, date: '2026-04-01' },
    { category: 'Transport', amount: 0, date: '2026-04-04' },
    { category: 'Entertainment', amount: 0, date: '2026-04-10' },
    { category: 'Rent', amount: 0, date: '2026-04-10' },
    { category: 'Eating Out', amount: 0, date: '2026-04-10' },
    { category: 'Savings', amount: 0, date: '2026-04-10' },
  ]
};

let state = {
  user: 'User',
  budget: 3000,
  spent: 0,
  transactions: [
  ]
};

function showScreen(screenId) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === screenId));
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
  const bottomNav = document.querySelector('.bottom-nav');
  bottomNav.style.display = (screenId === 'login-screen' || screenId === 'signup-screen') ? 'none' : 'flex';
}

function updateSpending() {
  const groceriesTotal = state.transactions
  .filter(tx => tx.category === 'Groceries')
  .reduce((sum, tx) => sum + tx.amount, 0);

  const transportTotal = state.transactions
  .filter(tx => tx.category === 'Transport')
  .reduce((sum, tx) => sum + tx.amount, 0);

  const entertainmentTotal = state.transactions
  .filter(tx => tx.category === 'Entertainment')
  .reduce((sum, tx) => sum + tx.amount, 0);

  const rentTotal = state.transactions
  .filter(tx => tx.category === 'Rent')
  .reduce((sum, tx) => sum + tx.amount, 0);

  const eatingOutTotal = state.transactions
  .filter(tx => tx.category === 'Eating Out')
  .reduce((sum, tx) => sum + tx.amount, 0);

  const savingsTotal = state.transactions
  .filter(tx => tx.category === 'Savings')
  .reduce((sum, tx) => sum + tx.amount, 0);

  groceriesAmount.textContent = `$${groceriesTotal}`;
  transportAmount.textContent = `$${transportTotal}`;
  entertainmentAmount.textContent = `$${entertainmentTotal}`;
  rentAmount.textContent = `$${rentTotal}`;
  eatingOutAmount.textContent = `$${eatingOutTotal}`;
  savingsAmount.textContent = `$${savingsTotal}`;

  let totalAmount = groceriesTotal + transportTotal + entertainmentTotal + rentTotal + eatingOutTotal + savingsTotal;

  actualAmount.textContent = `${totalAmount}`;
  overallAmount.textContent = `${totalAmount}`;

  if (totalAmount >= state.budget) {
      budgetAlert.style.display = "block";
      overspendAmount.textContent = `$${totalAmount - state.budget}`;
  } else {
      budgetAlert.style.display = "none";
  }
}

function updateSummary() {
  userDisplay.textContent = state.user;
  budgetAmount.textContent = state.budget.toLocaleString();
  targetAmount.textContent = state.budget.toLocaleString();
  actualAmount.textContent = state.spent.toLocaleString();
  spentAmount.textContent = state.spent.toLocaleString();
  accountUsername.textContent = state.user;
  transactionCount.textContent = state.transactions.length;
  totalSpentAccount.textContent = state.spent.toLocaleString();
  updateSpending();
}

function initialize() {
  updateSummary();
  transactionDate.valueAsDate = new Date();
  showScreen('login-screen');
}

screenButtons.forEach(button => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.screen);
  });
});

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.screen);
  });
});

const reportTabs = document.querySelectorAll('#report-screen .tab');
reportTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.tab;
    reportTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    document.querySelectorAll('#report-screen .tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabName}-view`);
    });
  });
});

const spendingTabs = document.querySelectorAll('#spending-screen .tab');
spendingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const viewName = tab.dataset.view;
    spendingTabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewName));
    document.querySelectorAll('.spending-view').forEach(view => {
      view.classList.toggle('active', view.id === `${viewName}-view`);
    });
  });
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !password) return;
  state.user = username;
  usernameInput.value = '';
  passwordInput.value = '';
  showScreen('dashboard-screen');
  updateSummary();
});

signupForm.addEventListener('submit', event => {
  event.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm').value.trim();
  
  if (!username || !password || !confirmPassword) return;
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  state.user = username;
  state.budget = defaultData.budget;
  state.spent = defaultData.spent;
  state.transactions = [...defaultData.transactions];
  
  saveUserData(username);
  
  document.getElementById('signup-username').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm').value = '';
  
  showScreen('dashboard-screen');
  updateSummary();
});

logoutBtn.addEventListener('click', () => {
  state.user = 'User';
  state.budget = 3000;
  state.spent = 2579;
  state.transactions = [];
  usernameInput.value = '';
  passwordInput.value = '';
  showScreen('login-screen');
  updateSummary();
});

deleteBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete your account and all data? This cannot be undone.')) {
    localStorage.removeItem(`user_${state.user}`);
    state.user = 'User';
    state.budget = 3000;
    state.spent = 2579;
    state.transactions = [];
    usernameInput.value = '';
    passwordInput.value = '';
    showScreen('login-screen');
    updateSummary();
  }
});

budgetForm.addEventListener('submit', event => {
  event.preventDefault();
  const newBudget = Number(budgetInput.value);
  if (newBudget <= 0) return;
  state.budget = newBudget;
  budgetInput.value = '';
  updateSummary();
  showScreen('budget-screen');
});

transactionForm.addEventListener('submit', event => {
  event.preventDefault();
  const amount = Number(transactionAmount.value);
  const category = transactionCategory.value;
  const date = transactionDate.value;
  if (amount <= 0 || !category || !date) return;
  state.spent += amount;
  state.transactions.push({ category, amount, date });
  transactionAmount.value = '';
  transactionCategory.selectedIndex = 0;
  transactionDate.valueAsDate = new Date();
  updateSummary();
  updateSpending();
  showScreen('success-screen');
});

initialize();
