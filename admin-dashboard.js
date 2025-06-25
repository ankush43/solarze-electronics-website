// Admin Dashboard JavaScript

// Check authentication
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initializeDashboard();
    initializeCharts();
    setupEventListeners();
});

// Initialize dashboard
function initializeDashboard() {
    // Update page title
    updatePageTitle('Dashboard');
    
    // Load initial data
    loadDashboardData();
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Image management
    setupImageManagement();
    
    // Content editor
    setupContentEditor();
    
    // Gallery manager
    setupGalleryManager();
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        updatePageTitle(getSectionTitle(sectionId));
    }
    
    // Load section-specific data
    loadSectionData(sectionId);
}

// Get section title
function getSectionTitle(sectionId) {
    const titles = {
        'dashboard': 'Dashboard',
        'analytics': 'Analytics',
        'images': 'Image Management',
        'content': 'Content Editor',
        'gallery': 'Gallery Manager',
        'settings': 'Settings'
    };
    return titles[sectionId] || 'Dashboard';
}

// Update page title
function updatePageTitle(title) {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.textContent = title;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading real data
    updateStats();
    loadRecentActivity();
}

// Update statistics
function updateStats() {
    // Simulate real-time stats updates
    const stats = {
        views: Math.floor(Math.random() * 1000) + 12000,
        visitors: Math.floor(Math.random() * 500) + 3000,
        calls: Math.floor(Math.random() * 50) + 150,
        whatsapp: Math.floor(Math.random() * 30) + 80
    };
    
    // Update stat numbers with animation
    Object.keys(stats).forEach(key => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            animateNumber(element, stats[key]);
        }
    });
}

// Animate number
function animateNumber(element, target) {
    const start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Load recent activity
function loadRecentActivity() {
    const activities = [
        { type: 'view', text: 'New visitor from Indore', time: '2 minutes ago' },
        { type: 'call', text: 'Phone call from 8819999343', time: '15 minutes ago' },
        { type: 'whatsapp', text: 'WhatsApp message received', time: '1 hour ago' },
        { type: 'review', text: 'New JustDial review', time: '2 hours ago' }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p>${activity.text}</p>
                    <span>${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Get activity icon
function getActivityIcon(type) {
    const icons = {
        'view': 'eye',
        'call': 'phone',
        'whatsapp': 'whatsapp',
        'review': 'star'
    };
    return icons[type] || 'info';
}

// Initialize charts
function initializeCharts() {
    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Page Views',
                    data: [1200, 1900, 1500, 2100, 1800, 2200, 2000],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Page Performance Chart
    const pageCtx = document.getElementById('pageChart');
    if (pageCtx) {
        new Chart(pageCtx, {
            type: 'doughnut',
            data: {
                labels: ['Home', 'About', 'Services', 'Gallery', 'Contact'],
                datasets: [{
                    data: [45, 20, 15, 12, 8],
                    backgroundColor: [
                        '#f39c12',
                        '#e67e22',
                        '#e74c3c',
                        '#9b59b6',
                        '#3498db'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Traffic Sources Chart
    const sourcesCtx = document.getElementById('sourcesChart');
    if (sourcesCtx) {
        new Chart(sourcesCtx, {
            type: 'pie',
            data: {
                labels: ['Direct', 'Google', 'JustDial', 'Social Media', 'Other'],
                datasets: [{
                    data: [35, 30, 20, 10, 5],
                    backgroundColor: [
                        '#f39c12',
                        '#e67e22',
                        '#e74c3c',
                        '#9b59b6',
                        '#3498db'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Device Types Chart
    const devicesCtx = document.getElementById('devicesChart');
    if (devicesCtx) {
        new Chart(devicesCtx, {
            type: 'bar',
            data: {
                labels: ['Mobile', 'Desktop', 'Tablet'],
                datasets: [{
                    label: 'Users',
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#f39c12',
                        '#e67e22',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Setup image management
function setupImageManagement() {
    const addImageBtn = document.getElementById('addImageBtn');
    const imageModal = document.getElementById('imageModal');
    const saveImageBtn = document.getElementById('saveImage');
    const cancelImageBtn = document.getElementById('cancelImage');
    
    if (addImageBtn) {
        addImageBtn.addEventListener('click', function() {
            showModal(imageModal);
        });
    }
    
    if (saveImageBtn) {
        saveImageBtn.addEventListener('click', function() {
            saveImage();
        });
    }
    
    if (cancelImageBtn) {
        cancelImageBtn.addEventListener('click', function() {
            hideModal(imageModal);
        });
    }
    
    // Image edit buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            editImage(this);
        });
    });
    
    // Image delete buttons
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteImage(this);
        });
    });
}

// Show modal
function showModal(modal) {
    modal.classList.add('active');
}

// Hide modal
function hideModal(modal) {
    modal.classList.remove('active');
}

// Save image
function saveImage() {
    const imageUrl = document.getElementById('imageUrl').value;
    const imageTitle = document.getElementById('imageTitle').value;
    const imageDescription = document.getElementById('imageDescription').value;
    const imageCategory = document.getElementById('imageCategory').value;
    
    if (!imageUrl || !imageTitle) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would typically save to a database
    console.log('Saving image:', { imageUrl, imageTitle, imageDescription, imageCategory });
    
    // Add to gallery
    addImageToGallery(imageUrl, imageTitle, imageDescription, imageCategory);
    
    // Hide modal
    hideModal(document.getElementById('imageModal'));
    
    // Clear form
    document.getElementById('imageUrl').value = '';
    document.getElementById('imageTitle').value = '';
    document.getElementById('imageDescription').value = '';
    document.getElementById('imageCategory').value = 'residential';
    
    showNotification('Image saved successfully!', 'success');
}

// Add image to gallery
function addImageToGallery(url, title, description, category) {
    const imageGrid = document.querySelector('.image-grid');
    if (imageGrid) {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        imageItem.innerHTML = `
            <img src="${url}" alt="${title}">
            <div class="image-overlay">
                <div class="image-actions">
                    <button class="btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="image-info">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        imageGrid.appendChild(imageItem);
    }
}

// Edit image
function editImage(button) {
    const imageItem = button.closest('.image-item');
    const image = imageItem.querySelector('img');
    const title = imageItem.querySelector('h4').textContent;
    const description = imageItem.querySelector('p').textContent;
    
    // Populate modal
    document.getElementById('imageUrl').value = image.src;
    document.getElementById('imageTitle').value = title;
    document.getElementById('imageDescription').value = description;
    
    showModal(document.getElementById('imageModal'));
}

// Delete image
function deleteImage(button) {
    if (confirm('Are you sure you want to delete this image?')) {
        const imageItem = button.closest('.image-item');
        imageItem.remove();
        showNotification('Image deleted successfully!', 'success');
    }
}

// Setup content editor
function setupContentEditor() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            showTab(tab);
        });
    });
}

// Show tab
function showTab(tabId) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Setup gallery manager
function setupGalleryManager() {
    const addGalleryItemBtn = document.getElementById('addGalleryItemBtn');
    
    if (addGalleryItemBtn) {
        addGalleryItemBtn.addEventListener('click', function() {
            showModal(document.getElementById('imageModal'));
        });
    }
}

// Load section data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'analytics':
            // Analytics data is already loaded with charts
            break;
        case 'images':
            // Image data is static for now
            break;
        case 'content':
            // Content data is static for now
            break;
        case 'gallery':
            // Gallery data is static for now
            break;
        case 'settings':
            // Settings data is static for now
            break;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Logout function
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Auto-refresh dashboard data every 30 seconds
setInterval(() => {
    if (document.querySelector('#dashboard.active')) {
        loadDashboardData();
    }
}, 30000); 