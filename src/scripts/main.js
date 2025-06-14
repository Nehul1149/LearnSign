// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile nav when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-links li');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Generate Sign Language Alphabet Cards
const alphabetGrid = document.querySelector('.alphabet-grid');

// Create alphabet array
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Generate alphabet cards
alphabet.forEach(letter => {
    const letterCard = document.createElement('div');
    letterCard.className = 'letter-card';
    
    const letterImage = document.createElement('div');
    letterImage.className = 'letter-image';
    letterImage.style.backgroundImage = `url(src/assets/alphabet/${letter.toLowerCase()}.png)`;
    
    const letterText = document.createElement('div');
    letterText.className = 'letter-text';
    letterText.textContent = letter;
    
    letterCard.appendChild(letterImage);
    letterCard.appendChild(letterText);
    
    // Add hover effect to show the corresponding sign
    letterCard.addEventListener('mouseenter', () => {
        letterCard.classList.add('hovered');
    });
    
    letterCard.addEventListener('mouseleave', () => {
        letterCard.classList.remove('hovered');
    });
    
    alphabetGrid.appendChild(letterCard);
});

// Add CSS for the alphabet cards
const style = document.createElement('style');
style.textContent = `
    .letter-card {
        background: white;
        border-radius: 10px;
        box-shadow: var(--box-shadow);
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition);
        height: 120px;
        position: relative;
        overflow: hidden;
    }
    
    .letter-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
        border-bottom: 3px solid var(--primary-color);
    }
    
    .letter-image {
        width: 60px;
        height: 60px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
        position: absolute;
        top: 10px;
    }
    
    .letter-text {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color);
        transition: var(--transition);
        transform: translateY(0);
    }
    
    .letter-card.hovered .letter-text {
        transform: translateY(20px);
        font-size: 1.2rem;
    }
    
    .letter-card.hovered .letter-image {
        opacity: 1;
    }
`;

document.head.appendChild(style);

// Add scroll reveal animations
window.addEventListener('scroll', revealElements);

function revealElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.classList.add('revealed');
        }
    });
}

// Add CSS for scroll reveal animations
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(revealStyle);

// Update active navigation based on scroll position
window.addEventListener('scroll', updateActiveNavigation);

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        if (sectionTop < 100 && sectionTop > -100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize functions
revealElements();
updateActiveNavigation(); 