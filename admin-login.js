// Admin Login JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'dashboard.html';
    }
    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// Handle login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        if (validateCredentials(username, password)) {
            // Success
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            
            if (remember) {
                localStorage.setItem('adminRemember', 'true');
            }
            
            showSuccessMessage('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Error
            showErrorMessage('Invalid username or password');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
        }
    }, 1500);
}

// Validate credentials
function validateCredentials(username, password) {
    // For demo purposes, use these credentials
    // In production, this should be server-side validation
    const validCredentials = {
        'admin': 'solarze2024',
        'solarze': 'admin123',
        'rakesh': 'pandey2024'
    };
    
    return validCredentials[username] === password;
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message success';
    messageDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
}

// Show error message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error';
    messageDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 5000);
}

// Add password visibility toggle
function addPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const passwordField = passwordInput.parentElement;
    
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'password-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    toggleBtn.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        padding: 5px;
    `;
    
    passwordField.style.position = 'relative';
    passwordField.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
}

// Initialize password toggle
addPasswordToggle();

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Enter to submit form
    if (e.ctrlKey && e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        document.getElementById('loginForm').reset();
    }
});

// Add form validation
function addFormValidation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    usernameInput.addEventListener('input', function() {
        validateField(this, this.value.length >= 3, 'Username must be at least 3 characters');
    });
    
    passwordInput.addEventListener('input', function() {
        validateField(this, this.value.length >= 6, 'Password must be at least 6 characters');
    });
}

// Validate field
function validateField(field, isValid, message) {
    const formGroup = field.parentElement;
    
    if (!isValid) {
        formGroup.classList.add('error');
        if (!formGroup.querySelector('.error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = message;
            errorMsg.style.cssText = `
                color: #e74c3c;
                font-size: 0.8rem;
                margin-top: 0.25rem;
            `;
            formGroup.appendChild(errorMsg);
        }
    } else {
        formGroup.classList.remove('error');
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
}

// Initialize form validation
addFormValidation();

// Add remember me functionality
function setupRememberMe() {
    const rememberCheckbox = document.getElementById('remember');
    
    // Check if remember me was previously set
    if (localStorage.getItem('adminRemember') === 'true') {
        rememberCheckbox.checked = true;
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername) {
            document.getElementById('username').value = savedUsername;
        }
    }
    
    // Save username when remember me is checked
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('adminRemember', 'true');
        } else {
            localStorage.removeItem('adminRemember');
            localStorage.removeItem('savedUsername');
        }
    });
}

// Initialize remember me
setupRememberMe();

// Add security features
function addSecurityFeatures() {
    // Prevent multiple form submissions
    let isSubmitting = false;
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 2000);
    });
    
    // Add CAPTCHA-like protection (simple)
    let loginAttempts = 0;
    const maxAttempts = 5;
    
    function checkLoginAttempts() {
        loginAttempts++;
        if (loginAttempts >= maxAttempts) {
            showErrorMessage('Too many login attempts. Please try again later.');
            document.querySelector('.login-btn').disabled = true;
            setTimeout(() => {
                document.querySelector('.login-btn').disabled = false;
                loginAttempts = 0;
            }, 30000); // 30 seconds lockout
            return false;
        }
        return true;
    }
    
    // Override handleLogin to include attempt checking
    const originalHandleLogin = handleLogin;
    handleLogin = function() {
        if (!checkLoginAttempts()) {
            return;
        }
        originalHandleLogin();
    };
}

// Initialize security features
addSecurityFeatures(); 