// Initialize EmailJS with your public key
emailjs.init({
    publicKey: '2aEuv9lrogCsuoAPP'  // Your existing public key
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('buttonmain');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get form values
            const fromName = document.getElementById('name').value.trim();
            const phone = document.getElementById('mobile').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (!fromName || !phone || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Phone number validation (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit mobile number.');
                document.getElementById('mobile').focus();
                return;
            }

            // Prepare EmailJS parameters
            const templateParams = {
                from_name: fromName,
                phone: phone,
                message: message
            };

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Send email
            emailjs.send('service_vv4cmrc', 'template_nfa1xcp', templateParams)
                .then(function(response) {
                    alert(`Thank you, ${fromName}! Your inquiry has been received. We will contact you soon at ${phone}.`);
                    contactForm.reset(); // Clear form
                }, function(error) {
                    console.error('EmailJS error:', error);
                    alert('Oops! Something went wrong. Please try again.');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send';
                });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

 const prices = {
    four: "₹4800/month",
    five: "₹4200/month",
    six: "₹3800/month",
    penthouse: "₹3600/month"
  };

  const roomTypeSelect = document.getElementById("roomType");
  const checkPriceBtn = document.getElementById("checkPriceBtn");
  const priceResult = document.getElementById("priceResult");

  checkPriceBtn.addEventListener("click", function () {
    const selectedValue = roomTypeSelect.value;

    if (!selectedValue) {
      priceResult.textContent = "Please select a room type.";
      return;
    }

    const price = prices[selectedValue];
    priceResult.textContent = `Price for ${roomTypeSelect.options[roomTypeSelect.selectedIndex].text}: ${price}`;
  });


// Image gallery data with captions
const images = [
    {
        url: 'pictures/biryani.jpg',
        caption: 'Delicious Biryani / Chicken curry on sundays'
    },
    {
        url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop',
        caption: 'Traditional Curry Dishes'
    },
    {
        url: 'pictures/dosa.jpg',
        caption: 'Tasty Tiffins'
    },
    {
        url: 'pictures/6165488118656601153.jpg',
        caption: 'Building Environment'
    },
    {
        url: 'pictures/women1.jpg',
        caption: 'Working Womens'
    },
    {
        url: 'pictures/women2.jpg',
        caption: 'Students'
    },
    {
        url: 'pictures/image1.jfif',
        caption: 'Clean and Hygienic Living Space with Attached Toilets'
    },
    {
        url: 'pictures/TV.jfif',
        caption: 'TV in dining area'
    }
];

let currentIndex = 0;

// DOM Elements
const galleryImage = document.getElementById('galleryImage');
const imageCaption = document.getElementById('imageCaption');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const dotsContainer = document.getElementById('dotsContainer');

// Initialize gallery
function initGallery() {
    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Display first image
    updateImage();
}

// Update image and caption
function updateImage() {
    galleryImage.src = images[currentIndex].url;
    imageCaption.textContent = images[currentIndex].caption;

    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to specific slide
function goToSlide(index) {
    currentIndex = index;
    updateImage();
}

// Navigate to next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Navigate to previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Event listeners
leftArrow.addEventListener('click', prevImage);
rightArrow.addEventListener('click', nextImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    }
});

// Auto-play functionality (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextImage, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pause auto-play on hover
const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('mouseenter', stopAutoPlay);
galleryContainer.addEventListener('mouseleave', startAutoPlay);

// Initialize on page load
initGallery();
// startAutoPlay(); // Uncomment to enable auto-play
