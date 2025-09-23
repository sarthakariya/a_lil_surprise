// --- Relaxed Particle Background Animation ---
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
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 5000;
    const colors = ['#ff69b4', '#d49ac8', '#f8c8dc', '#ffaddd'];
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];
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
    init();
});

// --- Envelope Opening on Click ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');

    heartSeal.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 5000); // 5 seconds to allow the full animation to play out
    });
}
