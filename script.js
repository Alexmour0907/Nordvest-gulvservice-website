// Testimonial Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.testimonial-slides');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    let autoSlideInterval;
    let slidesToShow = 3; // Default for desktop
    let dots = [];
    
    // Function to determine how many slides to show based on screen size
    function updateSlidesToShow() {
        if (window.innerWidth <= 768) {
            slidesToShow = 1;
        } else {
            slidesToShow = 3;
        }
    }
    
    // Function to create dots based on current slidesToShow
    function createDots() {
        dotsContainer.innerHTML = '';
        dots = [];
        
        const numDots = Math.ceil(slides.length / slidesToShow);
        
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.setAttribute('data-slide', i);
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                currentIndex = i * slidesToShow;
                updateCarousel();
                stopAutoSlide();
                startAutoSlide();
            });
            
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }
    
    // Function to update the carousel display
    function updateCarousel() {
        const slideWidth = 100 / slidesToShow;
        const translateX = -(currentIndex * slideWidth);
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
        });
        
        // Calculate which dot should be active
        const activeDotIndex = Math.floor(currentIndex / slidesToShow);
        if (dots[activeDotIndex]) {
            dots[activeDotIndex].classList.add('active');
        }
    }
    
    // Function to go to next slide
    function nextSlide() {
        const maxIndex = slides.length - slidesToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateCarousel();
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const maxIndex = slides.length - slidesToShow;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateCarousel();
    }
    
    // Function to go to specific slide group
    function goToSlide(index) {
        const maxIndex = slides.length - slidesToShow;
        currentIndex = Math.min(index * slidesToShow, maxIndex);
        updateCarousel();
    }
    
    // Function to start auto-sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Function to stop auto-sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Pause auto-slide on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const previousSlidesToShow = slidesToShow;
        updateSlidesToShow();
        
        // Recreate dots if slidesToShow changed
        if (previousSlidesToShow !== slidesToShow) {
            currentIndex = 0;
            createDots();
        }
        
        updateCarousel();
    });
    
    // Initialize carousel
    updateSlidesToShow();
    createDots();
    updateCarousel();
    startAutoSlide();
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Make hero CTA button functional
document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.querySelector('.btn-donate');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            document.getElementById('kontakt').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
