const API_BASE_URL = 'http://localhost:3000/api/auth';
const DASHBOARD_URL = '../tour/index (1).html';

const container = document.querySelector('.container');
const loginLink = document.querySelector('.SignInLink');
const registerLink = document.querySelector('.SignUpLink');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const signupUsernameInput = document.getElementById('signup-username');
const signupEmailInput = document.getElementById('signup-email');
const signupPhoneInput = document.getElementById('signup-phone');
const signupPasswordInput = document.getElementById('signup-password');
const signupConfirmPasswordInput = document.getElementById('signup-confirm-password');
const loginErrorMessage = document.getElementById('login-error');
const signupErrorMessage = document.getElementById('signup-error');
const signupSuccessMessage = document.getElementById('signup-success');

const clearMessages = () => {
  loginErrorMessage.textContent = '';
  loginErrorMessage.style.display = 'none';
  signupErrorMessage.textContent = '';
  signupErrorMessage.style.display = 'none';
  signupSuccessMessage.textContent = '';
  signupSuccessMessage.style.display = 'none';
};

registerLink?.addEventListener('click', (e) => {
  e.preventDefault();
  container?.classList.add('active');
  clearMessages();
});

loginLink?.addEventListener('click', (e) => {
  e.preventDefault();
  container?.classList.remove('active');
  clearMessages();
});

const handleLogin = async (event) => {
  event.preventDefault();
  clearMessages();

  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (!email || !password) {
    loginErrorMessage.textContent = 'Please enter email and password';
    loginErrorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = DASHBOARD_URL;
    } else {
      loginErrorMessage.textContent = data.message || 'Login failed. Please try again.';
      loginErrorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Login error:', error);
    loginErrorMessage.textContent = 'Network error. Please check if the server is running.';
    loginErrorMessage.style.display = 'block';
  }
};

const handleSignup = async (event) => {
  event.preventDefault();
  clearMessages();

  const username = signupUsernameInput.value.trim();
  const email = signupEmailInput.value.trim();
  const phone = signupPhoneInput.value.trim();
  const password = signupPasswordInput.value.trim();
  const confirmPassword = signupConfirmPasswordInput.value.trim();

  if (!username || !email || !phone || !password || !confirmPassword) {
    signupErrorMessage.textContent = 'Please fill in all fields';
    signupErrorMessage.style.display = 'block';
    return;
  }

  if (password !== confirmPassword) {
    signupErrorMessage.textContent = 'Passwords do not match';
    signupErrorMessage.style.display = 'block';
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    signupErrorMessage.textContent = 'Please enter a valid email address';
    signupErrorMessage.style.display = 'block';
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, phone })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      signupSuccessMessage.textContent = 'Account created! Redirecting to dashboard...';
      signupSuccessMessage.style.display = 'block';
      setTimeout(() => {
        window.location.href = DASHBOARD_URL;
      }, 1500);
    } else {
      signupErrorMessage.textContent = data.message || 'Registration failed. Please try again.';
      signupErrorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Registration error:', error);
    signupErrorMessage.textContent = 'Network error. Please check if the server is running.';
    signupErrorMessage.style.display = 'block';
  }
};

loginForm?.addEventListener('submit', handleLogin);
signupForm?.addEventListener('submit', handleSignup);