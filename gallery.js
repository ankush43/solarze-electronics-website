// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupFilters();
    loadPinterestImages();
});

// Initialize gallery
function initializeGallery() {
    // Add loading animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item-large');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-large');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Load Pinterest images
function loadPinterestImages() {
    // Pinterest image URLs for solar panels
    const pinterestImages = [
        {
            url: 'https://i.pinimg.com/564x/8b/8b/8b/8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b.jpg',
            title: 'Residential Solar Installation',
            description: '5kW Solar System',
            category: 'residential'
        },
        {
            url: 'https://i.pinimg.com/564x/9c/9c/9c/9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c.jpg',
            title: 'Commercial Solar Setup',
            description: '20kW System',
            category: 'commercial'
        },
        {
            url: 'https://i.pinimg.com/564x/a1/a1/a1/a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1.jpg',
            title: 'Industrial Solar Plant',
            description: '50kW Installation',
            category: 'industrial'
        },
        {
            url: 'https://i.pinimg.com/564x/b2/b2/b2/b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2.jpg',
            title: 'Hybrid Solar System',
            description: '10kW with Battery Backup',
            category: 'hybrid'
        },
        {
            url: 'https://i.pinimg.com/564x/c3/c3/c3/c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3.jpg',
            title: 'Rooftop Solar Panels',
            description: '3kW Residential',
            category: 'residential'
        },
        {
            url: 'https://i.pinimg.com/564x/d4/d4/d4/d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4.jpg',
            title: 'Solar Farm Installation',
            description: '100kW Commercial',
            category: 'commercial'
        }
    ];
    
    // Update gallery with Pinterest images
    const galleryGrid = document.querySelector('.gallery-grid-large');
    if (galleryGrid) {
        pinterestImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item-large';
            galleryItem.setAttribute('data-category', image.category);
            
            galleryItem.innerHTML = `
                <div class="gallery-image-large">
                    <img src="${image.url}" alt="${image.title}" onerror="this.src='https://via.placeholder.com/400x300/f39c12/ffffff?text=Solar+Installation'">
                    <div class="gallery-overlay-large">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                        <div class="project-details">
                            <span><i class="fas fa-calendar"></i> Completed: ${getRandomDate()}</span>
                            <span><i class="fas fa-solar-panel"></i> ${getRandomPanels()} Panels</span>
                            <span><i class="fas fa-bolt"></i> ${getRandomCapacity()} Capacity</span>
                        </div>
                        <div class="pinterest-link">
                            <a href="https://in.pinterest.com/" target="_blank" class="btn btn-small">
                                <i class="fab fa-pinterest"></i>
                                View on Pinterest
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Get random date
function getRandomDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = 2023 + Math.floor(Math.random() * 2);
    return `${month} ${year}`;
}

// Get random panels
function getRandomPanels() {
    const panels = [9, 15, 21, 30, 45, 60, 75, 90, 150];
    return panels[Math.floor(Math.random() * panels.length)];
}

// Get random capacity
function getRandomCapacity() {
    const capacities = ['3kW', '5kW', '7kW', '10kW', '15kW', '20kW', '25kW', '30kW', '50kW'];
    return capacities[Math.floor(Math.random() * capacities.length)];
}

// Add hover effects
function addHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item-large');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Add image lazy loading
function addLazyLoading() {
    const images = document.querySelectorAll('img[src*="pinimg.com"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.dataset.src = img.src;
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
addLazyLoading();

// Add Pinterest integration
function addPinterestIntegration() {
    // Add Pinterest save button to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item-large');
    
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay-large');
        if (overlay) {
            const pinterestBtn = document.createElement('button');
            pinterestBtn.className = 'pinterest-save-btn';
            pinterestBtn.innerHTML = '<i class="fab fa-pinterest"></i> Save';
            pinterestBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: #e60023;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.8rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            item.addEventListener('mouseenter', () => {
                pinterestBtn.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                pinterestBtn.style.opacity = '0';
            });
            
            pinterestBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                saveToPinterest(item);
            });
            
            overlay.appendChild(pinterestBtn);
        }
    });
}

// Save to Pinterest
function saveToPinterest(item) {
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;
    
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(img.src)}&description=${encodeURIComponent(`${title} - ${description} by Solarze Electronics`)}`;
    
    window.open(pinterestUrl, '_blank', 'width=750,height=550');
}

// Initialize Pinterest integration
addPinterestIntegration();

// Add search functionality
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'gallery-search';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 300px;
        padding: 10px 15px;
        border: 2px solid #e9ecef;
        border-radius: 25px;
        margin-bottom: 2rem;
        font-size: 1rem;
    `;
    
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        filterContainer.parentElement.insertBefore(searchInput, filterContainer);
    }
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item-large');
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Initialize search functionality
addSearchFunctionality();

// Add statistics animation
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
                animateNumber(target, finalValue);
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate number
function animateNumber(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 30);
}

// Initialize statistics animation
animateStatistics(); 