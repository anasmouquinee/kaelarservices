// Chatbot Responses
const chatbotResponses = {
    greeting: [
        "Bonjour! 👋 Bienvenue chez Kaelar Services. Comment puis-je vous aider?",
        "Salut! 😊 Que puis-je faire pour vous aujourd'hui?"
    ],
    pricing: [
        "Nos tarifs sont:\n• Starter: 1500 dh/HT\n• Standard: 2200 dh/HT\n• Professionnel: 4500 dh/HT\n• Sur Mesure: Sur Devis",
        "Vous cherchez une offre spécifique? Nos packages offrent d'excellent rapport qualité-prix!"
    ],
    services: [
        "Nous offrons:\n✓ Création de sites web\n✓ Adresses email professionnelles\n✓ Design responsive\n✓ SEO et référencement\n✓ Google Analytics\n✓ Maintenance continue",
    ],
    contact: [
        "Vous pouvez nous contacter via:\n📞 +212 6 60 48 79 69\n📧 kaelarservices@gmail.com\nOu utilisez le formulaire de contact ci-dessous!",
    ],
    default: [
        "Je ne suis pas sûr de bien comprendre. Pouvez-vous reformuler?",
        "Pardonnez-moi, pouvez-vous être plus précis?",
        "Intéressant! Avez-vous d'autres questions?",
        "Pour les tarifes tapez prix, pour les services tapez service, pour nous contacter tapez contact."
    ]
};

// Chatbot Message Handler
function getChatbotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("bonjour") || lowerMessage.includes("salut") || lowerMessage.includes("allo")) {
        return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    }
    
    if (lowerMessage.includes("prix") || lowerMessage.includes("tarif") || lowerMessage.includes("coût")) {
        return chatbotResponses.pricing[Math.floor(Math.random() * chatbotResponses.pricing.length)];
    }
    
    if (lowerMessage.includes("service") || lowerMessage.includes("offre")) {
        return chatbotResponses.services[Math.floor(Math.random() * chatbotResponses.services.length)];
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("téléphone") || lowerMessage.includes("email")) {
        return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    }
    
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

// Chatbot Toggle
function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    const toggle = document.getElementById("chatbotToggle");
    chatbot.classList.toggle("active");
    toggle.style.display = chatbot.classList.contains("active") ? "none" : "block";
}

// Send Chat Message
function sendChatMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    
    if (message === "") return;
    
    const chatMessages = document.getElementById("chatMessages");
    
    // Add user message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user";
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);
    
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add bot response after a short delay
    setTimeout(() => {
        const response = getChatbotResponse(message);
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "message bot";
        botMessageDiv.textContent = response;
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

// Handle Chat Input Enter Key
function handleChatInput(event) {
    if (event.key === "Enter") {
        sendChatMessage();
    }
}

// Send Contact Request
function sendRequest(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const packageType = document.getElementById("package").value;
    const message = document.getElementById("message").value;
    const formMessage = document.getElementById("formMessage");
    
    // Show processing message
    formMessage.className = "form-message success";
    formMessage.textContent = "⏳ Envoi de votre demande...";
    formMessage.style.display = "block";
    
    // Prepare email parameters for EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        package_type: packageType,
        message: message,
        reply_to: email
    };
    
    console.log('Sending email with params:', templateParams);
    
    // Send email via EmailJS with timeout
    const sendEmail = emailjs.send("service_wg0nla9", "template_hx75dxx", templateParams);
    
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 10000)
    );
    
    Promise.race([sendEmail, timeout])
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            formMessage.className = "form-message success";
            formMessage.textContent = "✓ Merci! Votre demande a été envoyée avec succès à kaelarservices@gmail.com. Nous vous répondrons bientôt!";
            
            // Reset form
            document.getElementById("contactForm").reset();
            
            // Hide message after 6 seconds
            setTimeout(() => {
                formMessage.style.display = "none";
            }, 6000);
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            formMessage.className = "form-message error";
            formMessage.textContent = "✗ Erreur lors de l'envoi. Veuillez réessayer ou contacter directement: kaelarservices@gmail.com";
            formMessage.style.display = "block";
            
            // Hide message after 6 seconds
            setTimeout(() => {
                formMessage.style.display = "none";
            }, 6000);
        });
}

// Open Contact Form with Selected Package
function openContactForm(packageName) {
    document.getElementById("package").value = packageName;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    document.getElementById("name").focus();
}

// Scroll Animation - Add animation classes to elements as they come into view
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = getAnimationForElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
}

function getAnimationForElement(element) {
    if (element.classList.contains('service-card')) {
        return 'scaleIn 1.1s ease forwards';
    }
    if (element.classList.contains('pricing-card')) {
        return 'slideInUp 1.1s ease forwards';
    }
    return 'fadeIn 1.1s ease forwards';
}

// Mouse Follow Effect on Hero
function addMouseFollowEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        hero.style.backgroundPosition = `${x}% ${y}%`;
    });
}

// Floating Animation for Service Icons
function animateServiceIcons() {
    const icons = document.querySelectorAll('.service-card i');
    icons.forEach((icon, index) => {
        icon.style.animation = `bounce 2s ease-in-out infinite ${index * 0.15}s`;
    });
}

// Button Ripple Effect
function addRippleEffect() {
    const buttons = document.querySelectorAll('.price-btn, .cta-button, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Parallax Scroll Effect
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    });
}

// Initialize All Animations on Page Load
document.addEventListener("DOMContentLoaded", function() {
    // Initialize chatbot
    const chatMessages = document.getElementById("chatMessages");
    const welcomeMessage = document.createElement("div");
    welcomeMessage.className = "message bot";
    welcomeMessage.textContent = "Bienvenue chez Kaelar Services! 👋 Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui? Pour plus de details n'hesiter pas a taper 'contact'";
    chatMessages.appendChild(welcomeMessage);

    // Add animations
    observeElements();
    animateServiceIcons();
    addRippleEffect();
    animateCounters();
    addMouseFollowEffect();
    addParallaxEffect();

    // Add scroll animations to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add glow effect on scroll
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    
    // Update navbar based on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.style.boxShadow = `0 5px 20px rgba(102, 126, 234, ${scrollPercent * 0.3})`;
    }
});
