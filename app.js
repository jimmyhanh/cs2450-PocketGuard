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
  spent: 2579,
  transactions: [
    { category: 'Groceries', amount: 852, date: '2026-04-01' },
    { category: 'Transport', amount: 210, date: '2026-04-04' },
    { category: 'Entertainment', amount: 1105, date: '2026-04-10' }
  ]
};

let state = {
  user: 'User',
  budget: 3000,
  spent: 2579,
  transactions: [
    { category: 'Groceries', amount: 852, date: '2026-04-01' },
    { category: 'Transport', amount: 210, date: '2026-04-04' },
    { category: 'Entertainment', amount: 1105, date: '2026-04-10' }
  ]
};

// Load user data from localStorage
function loadUserData(username) {
  const userData = localStorage.getItem(`user_${username}`);
  if (userData) {
    return JSON.parse(userData);
  }
  return { ...defaultData };
}

// Save user data to localStorage
function saveUserData(username) {
  localStorage.setItem(`user_${username}`, JSON.stringify({
    budget: state.budget,
    spent: state.spent,
    transactions: state.transactions
  }));
}

function showScreen(screenId) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === screenId));
  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.screen === screenId));
  const bottomNav = document.querySelector('.bottom-nav');
  bottomNav.style.display = (screenId === 'login-screen' || screenId === 'signup-screen') ? 'none' : 'flex';
}

function updateSummary() {
  userDisplay.textContent = state.user;
  budgetAmount.textContent = state.budget.toLocaleString();
  targetAmount.textContent = state.budget.toLocaleString();
  actualAmount.textContent = state.spent.toLocaleString();
  spentAmount.textContent = state.spent.toLocaleString();
  breakdownTotal.textContent = state.spent.toLocaleString();
  accountUsername.textContent = state.user;
  transactionCount.textContent = state.transactions.length;
  totalSpentAccount.textContent = state.spent.toLocaleString();
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
  const userData = loadUserData(username);
  state.budget = userData.budget;
  state.spent = userData.spent;
  state.transactions = userData.transactions;
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
  saveUserData(state.user);
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
  showScreen('success-screen');
});

initialize();
