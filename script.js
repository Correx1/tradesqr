// Initialize AOS
AOS.init({ 
    duration: 800, 
    once: true,
    offset: 100,
    easing: 'ease-out'
});

// Typing Effect
const phrases = [
    "Simple.",
    "Secure.",
    "Profitable.",
    "For Everyone."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// Sticky Navbar Logic
const nav = document.getElementById('main-nav');
const logo = document.getElementById('nav-logo-img');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Optional: Toggle icon
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileToggle.innerHTML = isOpen 
        ? '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        : '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
});

// Close Mobile Menu on Link Click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileToggle.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjust scroll offset for fixed navbar
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Pricing Data
const pricingPlans = [
    {
        name: 'Starter',
        price: '$0',
        period: '/month',
        description: 'Perfect for beginners',
        features: [
            'Access to basic trading courses',
            'Community forum access',
            'Weekly market updates',
            'Email support'
        ],
        popular: false
    },
    {
        name: 'Professional',
        price: '$149',
        period: '/month',
        description: 'For serious traders',
        features: [
            'All Starter features',
            'Advanced trading strategies',
            'Daily live trading sessions',
            'Priority support',
            '1-on-1 monthly mentoring',
            'Trading signals'
        ],
        popular: true
    },
    {
        name: 'Elite',
        price: '$399',
        period: '/month',
        description: 'Maximum results',
        features: [
            'All Professional features',
            'Personal trading coach',
            'Unlimited 1-on-1 sessions',
            'Custom strategy development',
            'VIP community access',
            'Exclusive masterclasses'
        ],
        popular: false
    }
];

const pricingGrid = document.getElementById('pricing-grid');
pricingPlans.forEach((plan, index) => {
    const card = document.createElement('div');
    card.className = `pricing-card rounded-xl p-8 ${plan.popular ? 'popular' : ''}`;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', index * 100);
    
    card.innerHTML = `
        ${plan.popular ? '<div class="text-center mb-4"><span class="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</span></div>' : ''}
        <h3 class="text-2xl font-semibold mb-2 text-gray-900">${plan.name}</h3>
        <p class="text-gray-600 text-xs mb-6">${plan.description}</p>
        <div class="mb-6">
            <span class="text-4xl font-semibold text-gray-900">${plan.price}</span>
            <span class="text-gray-500 text-sm">${plan.period}</span>
        </div>
        <ul class="space-y-3 mb-8">
            ${plan.features.map(f => `
                <li class="flex items-start text-sm text-gray-700">
                    <svg class="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>${f}</span>
                </li>
            `).join('')}
        </ul>
        <button class="w-full ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-300'} py-3 rounded-xl text-sm font-semibold transition-all">
            Get Started
        </button>
    `;
    
    pricingGrid.appendChild(card);
});

// FAQ Data
const faqs = [
    {
        question: 'What experience level do I need to join?',
        answer: 'Our community welcomes traders of all levels, from complete beginners to experienced professionals. We offer tailored content and support for each skill level.'
    },
    {
        question: 'How do the live trading sessions work?',
        answer: 'Live sessions are conducted via video conferencing where our expert traders analyze real-time markets, execute trades, and answer your questions in real-time.'
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time with no penalties or long-term commitments. Your access will continue until the end of your billing period.'
    },
    {
        question: 'What markets and instruments do you cover?',
        answer: 'We cover stocks, forex, cryptocurrencies, commodities, and options. Our strategies are applicable across multiple markets with specialized training for each.'
    },
    {
        question: 'Do you provide trading signals?',
        answer: 'Professional and Elite members receive daily trading signals with entry points, stop losses, and take profit levels. These are educational tools to help you learn our strategies.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: 'We offer a 30-day money-back guarantee for first-time members. If you\'re not satisfied with the value provided, we\'ll refund your first month\'s payment.'
    }
];

const faqContainer = document.getElementById('faq-container');
faqs.forEach((faq, index) => {
    const item = document.createElement('div');
    item.className = 'faq-item rounded-lg';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', index * 50);
    
    item.innerHTML = `
        <div class="faq-question">
            <h3 class="text-base font-medium text-gray-900 pr-4">${faq.question}</h3>
            <svg class="w-5 h-5 faq-icon text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </div>
        <div class="faq-answer">
            <p class="text-gray-600 text-sm leading-relaxed">${faq.answer}</p>
        </div>
    `;
    
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');
    
    question.addEventListener('click', () => {
        // Close other open FAQs
        document.querySelectorAll('.faq-answer.active').forEach(openAnswer => {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('active');
                openAnswer.previousElementSibling.querySelector('.faq-icon').classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('active');
        icon.classList.toggle('active');
    });
    
    faqContainer.appendChild(item);
});
