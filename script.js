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


// --- ENVELOPE & HEART SHATTER ANIMATION ---
// This code only runs on the first page (index.html)
if (document.querySelector('.envelope-wrapper')) {
    const envelope = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');

    // Function to shatter the heart
    function shatterHeart() {
        heartSeal.style.transition = 'none'; // Remove transition for instant disappearance
        heartSeal.style.opacity = 0;
        
        const fragmentsContainer = document.createElement('div');
        fragmentsContainer.className = 'heart-fragments';
        envelope.appendChild(fragmentsContainer);

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

    // Trigger animations after a short delay
    setTimeout(() => {
        shatterHeart();
        envelope.classList.add('open');
    }, 1500); // 1.5 second delay after page load

    // Redirect after animation is complete
    setTimeout(() => {
        window.location.href = 'letter.html';
    }, 6000); // 6 seconds total
}
