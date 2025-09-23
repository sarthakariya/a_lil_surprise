// --- UNIQUE PARTICLE BACKGROUND ANIMATION ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(255, 105, 180, 0.5)';
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = '#ff69b4';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// --- Envelope & Letter Animation ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');

    heartSeal.addEventListener('click', () => {
        // Step 1: Open the envelope flap
        envelopeWrapper.classList.add('open');
        
        // Wait for the animation to complete, then redirect
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 3000); // Wait for the envelope and flap animations
    });
}

// --- Typing Animation for Letter.html ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('letter-page')) {
        const elements = document.querySelectorAll('.typing-animation');

        const typewriter = (element, text, speed) => {
            return new Promise(resolve => {
                let i = 0;
                element.textContent = ''; // Clear existing text
                const interval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(interval);
                        // Remove the blinking cursor at the end
                        element.style.borderRight = 'none';
                        resolve();
                    }
                }, speed);
            });
        };

        const startTyping = async () => {
            const typingSpeed = 50; // Milliseconds per character
            for (const el of elements) {
                const text = el.getAttribute('data-text');
                await typewriter(el, text, typingSpeed);
                await new Promise(resolve => setTimeout(resolve, 500)); // Pause between lines
            }
        };

        // Start the typing animation after a brief delay
        setTimeout(() => {
            startTyping();
        }, 1000);
    }
});
