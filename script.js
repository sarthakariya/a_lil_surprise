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
