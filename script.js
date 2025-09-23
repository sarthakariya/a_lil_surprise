// --- UNIQUE LIQUID BACKGROUND ANIMATION ---
const canvas = document.getElementById('liquid-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

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
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    const colors = ['#ff69b4', '#9932cc', '#ff1493', '#da70d6'];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

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
    init();
});

// --- ENVELOPE & HEART SHATTER ANIMATION ---
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const heartSeal = document.querySelector('.heart-seal');
const shatterSound = document.getElementById('shatter-sound');

if (envelopeWrapper) {
    let isAnimating = false;
    envelopeWrapper.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        shatterSound.play();
        
        // Function to shatter the heart
        function shatterHeart() {
            heartSeal.style.transition = 'none';
            heartSeal.style.opacity = 0;
            
            const fragmentsContainer = document.createElement('div');
            fragmentsContainer.className = 'heart-fragments';
            envelopeWrapper.appendChild(fragmentsContainer);
            
            for (let i = 0; i < 30; i++) {
                const fragment = document.createElement('div');
                fragment.className = 'fragment';
                const randomX = (Math.random() - 0.5) * 400;
                const randomY = (Math.random() - 0.5) * 400;
                const randomRot = Math.random() * 360;
                
                fragment.style.setProperty('--x', `${randomX}px`);
                fragment.style.setProperty('--y', `${randomY}px`);
                fragment.style.setProperty('--rot', `${randomRot}deg`);
                
                fragmentsContainer.appendChild(fragment);
            }
        }

        shatterHeart();
        envelopeWrapper.classList.add('open');

        // Redirect after animation is complete
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 3000); // Redirect after 3 seconds to allow animation to play
    });
}
