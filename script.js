// --- Chatbot Logic ---
const chatbotResponses = {
    greeting: [
        "👋 Bonjour! Je suis l'IA de Kaelar. Comment puis-je booster votre business aujourd'hui?",
        "Bienvenue! Un projet web en tête ? Je suis là pour vous aider."
    ],
    pricing: [
        "💎 Nos packs sont transparents :\n• Starter: 1500 DH (Site vitrine)\n• Standard: 2200 DH (Le best-seller)\n• Pro: 4500 DH (Performance max)",
        "💡 Le pack Standard est le plus populaire. Il inclut 10 pages et le SEO de base."
    ],
    services: [
        "🚀 Nos expertises :\n1. Création Web & Mobile\n2. Design UI/UX\n3. SEO & Marketing Digital\n4. Emailing Pro",
    ],
    contact: [
        "📞 Appelez-nous : +212 6 60 48 79 69\n📧 Email : kaelarservices@gmail.com\n📍 Ou remplissez le formulaire à gauche !",
    ],
    default: [
        "Je ne suis qu'un robot 🤖, mais mon équipe humaine est très réactive. Tapez 'contact' pour leur parler.",
        "Je peux vous renseigner sur nos 'prix', nos 'services' ou comment nous 'contacter'."
    ]
};

function getChatbotResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    if (lower.match(/bonjour|salut|hey|hello/)) return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    if (lower.match(/prix|tarif|cout|argent|combien/)) return chatbotResponses.pricing[Math.floor(Math.random() * chatbotResponses.pricing.length)];
    if (lower.match(/service|offre|site|web/)) return chatbotResponses.services[Math.floor(Math.random() * chatbotResponses.services.length)];
    if (lower.match(/contact|tel|mail|appeler/)) return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    const toggle = document.getElementById("chatbotToggle");
    chatbot.classList.toggle("active");
    
    // Animation reset
    if(chatbot.classList.contains('active')) {
        toggle.style.transform = "scale(0)";
        setTimeout(() => toggle.style.display = "none", 300);
    } else {
        toggle.style.display = "block";
        setTimeout(() => toggle.style.transform = "scale(1)", 10);
    }
}

function sendChatMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (message === "") return;
    
    const chatMessages = document.getElementById("chatMessages");
    
    // User Message
    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.textContent = message;
    chatMessages.appendChild(userDiv);
    
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Bot Response (Simulated Delay)
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot";
    typingDiv.innerHTML = "<em>Écrit...</em>";
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        chatMessages.removeChild(typingDiv);
        const response = getChatbotResponse(message);
        const botDiv = document.createElement("div");
        botDiv.className = "message bot";
        botDiv.innerText = response; // innerText handles \n newlines
        chatMessages.appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

function handleChatInput(event) {
    if (event.key === "Enter") sendChatMessage();
}

// --- Contact Form Logic (EmailJS) ---
function sendRequest(event) {
    event.preventDefault();
    
    const btn = document.querySelector('.submit-btn') || document.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    const formMessage = document.getElementById("formMessage");
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    btn.disabled = true;

    // Get values
    const params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        package_type: document.getElementById("package").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_wg0nla9", "template_hx75dxx", params)
        .then(() => {
            formMessage.className = "form-message success";
            formMessage.innerHTML = "<i class='fas fa-check'></i> Message envoyé ! On vous répond vite.";
            formMessage.style.display = "block";
            document.getElementById("contactForm").reset();
        })
        .catch((err) => {
            console.error("Email Error:", err);
            formMessage.className = "form-message error";
            formMessage.textContent = "Oups, erreur technique. Envoyez-nous un email direct.";
            formMessage.style.display = "block";
        })
        .finally(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            setTimeout(() => formMessage.style.display = "none", 5000);
        });
}

function openContactForm(packageName) {
    const packInput = document.getElementById("package");
    packInput.value = packageName;
    // Add visual focus effect
    packInput.parentElement.classList.add('highlight-input');
    setTimeout(() => packInput.parentElement.classList.remove('highlight-input'), 2000);
    
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// --- UI Animations & Stats ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Animate Stats Numbers
    const stats = document.querySelectorAll('[data-count]');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-count');
                let count = 0;
                const inc = target / 50;
                const updateCount = () => {
                    count += inc;
                    if(count < target) {
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                statObserver.unobserve(entry.target);
            }
        });
    });
    stats.forEach(stat => statObserver.observe(stat));

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.card, .hero-content, .section-header');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        revealObserver.observe(el);
    });

    // 3. Navbar Glass Effect on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.background = "rgba(30, 41, 59, 0.9)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
        } else {
            nav.style.background = "rgba(30, 41, 59, 0.7)";
            nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.1)";
        }
    });
});
