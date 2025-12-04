// Animação de scroll suave
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

// Animação ao fazer scroll nas seções
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Validação do formulário de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterBtn = document.querySelector('.newsletter-btn');
const newsletterInputs = document.querySelectorAll('.newsletter-input');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        let isValid = true;
        let emptyFields = [];
        
        newsletterInputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                emptyFields.push(input.placeholder);
                input.style.border = '2px solid #ff4444';
                
                setTimeout(() => {
                    input.style.border = 'none';
                }, 2000);
            }
        });
        
        if (!isValid) {
            alert('Por favor, preencha todos os campos: ' + emptyFields.join(', '));
            return;
        }
        
        // Validar email
        const emailInput = document.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput && !emailRegex.test(emailInput.value)) {
            alert('Por favor, insira um email válido!');
            emailInput.style.border = '2px solid #ff4444';
            setTimeout(() => {
                emailInput.style.border = 'none';
            }, 2000);
            return;
        }
        
        // Sucesso
        alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
        newsletterInputs.forEach(input => input.value = '');
    });
}

// Adicionar efeito hover nos cards
const cards = document.querySelectorAll('.cashback-card, .icon-circle');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Contador animado (pode ser usado para estatísticas)
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Busca no header
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        if (searchInput.value.trim() !== '') {
            console.log('Buscando por:', searchInput.value);
            alert('Buscando por: ' + searchInput.value);
            // Aqui você pode adicionar a lógica real de busca
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            console.log('Buscando por:', this.value);
            alert('Buscando por: ' + this.value);
            // Aqui você pode adicionar a lógica real de busca
        }
    });
}

// Menu mobile (para telas pequenas)
let isMenuOpen = false;

function toggleMobileMenu() {
    const nav = document.querySelector('.nav .container');
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'flex';
    }
}

// Adicionar efeito de loading
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('FarmáciaDigi+ - Site carregado com sucesso!');