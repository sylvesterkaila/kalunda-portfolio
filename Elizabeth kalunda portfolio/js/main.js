// Get the menu button and side navigation
const menuBtn = document.querySelector('.menu-btn');
const sidenav = document.querySelector('.sidenav');
const closeBtn = document.querySelector('.closebtn');

// Open the side navigation
menuBtn.addEventListener('click', () => {
    sidenav.style.width = '250px';
});

// Close the side navigation
closeBtn.addEventListener('click', () => {
    sidenav.style.width = '0';
});

// Close the side navigation when clicking outside
document.addEventListener('click', (event) => {
    if (!sidenav.contains(event.target) && event.target !== menuBtn) {
        sidenav.style.width = '0';
    }
});

// Manifesto Download Functionality
const downloadManifesto = document.getElementById('downloadManifesto');

downloadManifesto.addEventListener('click', () => {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Set the PDF file path
    link.href = './pdfs/Manifesto.pdf';
    
    // Set the download attribute with the desired filename
    link.download = 'My-Manifesto.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Add a success message
    const successMessage = document.createElement('div');
    successMessage.className = 'download-success';
    successMessage.textContent = 'Download started!';
    document.body.appendChild(successMessage);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
});

// WhatsApp Chat Functionality
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');

// Replace YOUR_PHONE_NUMBER with your actual WhatsApp number
// Format: country code + number (without + or spaces)
// Example: 1234567890 for US number
const whatsappNumber = '+254704800012';

// Add initial message
addMessage('Hello! How can I help you today?', 'received');

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        // Update the WhatsApp link with the message
        sendButton.href = `https://wa.me/${+254704800012}?text=${encodedMessage}`;
        // Open in new tab
        window.open(sendButton.href, '_blank');
        // Clear input
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendButton.click();
    }
});

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Menu Toggle Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
let isMenuOpen = false;

// Function to toggle menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Event listener for menu toggle
menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu();
    }
});

// Close menu when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

// Smooth‐scroll for all intra‑page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

// Schedule Call Button Functionality
const scheduleCallBtn = document.querySelector('.cta-button');

scheduleCallBtn.addEventListener('click', () => {
    // Create modal for scheduling
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Schedule a Call</h2>
            <form id="scheduleForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Preferred Date</label>
                    <input type="date" id="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Preferred Time</label>
                    <input type="time" id="time" required>
                </div>
                <div class="form-group">
                    <label for="message">Additional Notes</label>
                    <textarea id="message" rows="4"></textarea>
                </div>
                <button type="submit" class="submit-btn">Schedule Call</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Form submission
    const form = modal.querySelector('#scheduleForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            date: form.querySelector('#date').value,
            time: form.querySelector('#time').value,
            message: form.querySelector('#message').value
        };

        // Here you would typically send this data to your backend
        console.log('Scheduling call with:', formData);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Call scheduled successfully! We will contact you shortly.';
        modal.querySelector('.modal-content').appendChild(successMessage);

        // Close modal after 3 seconds
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 3000);
    });
});

