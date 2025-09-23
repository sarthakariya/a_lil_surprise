// --- Envelope & Letter Animation ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heart = document.querySelector('.heart');

    heart.addEventListener('click', () => {
        // Add the 'open' class to trigger the new animations
        envelopeWrapper.classList.add('open');
        
        // Wait for the full animation to finish (approx. 7 seconds from your code)
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 7000); 
    });
}

// --- Typing Animation for Letter.html ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('letter-page')) {
        const elements = document.querySelectorAll('.typing-animation');

        const typewriter = (element, text, speed) => {
            return new Promise(resolve => {
                let i = 0;
                element.textContent = '';
                element.style.opacity = 1;

                const interval = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(interval);
                        element.style.borderRight = 'none';
                        resolve();
                    }
                }, speed);
            });
        };

        const startTyping = async () => {
            const typingSpeed = 50;
            for (const el of elements) {
                const text = el.getAttribute('data-text');
                await typewriter(el, text, typingSpeed);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        };

        setTimeout(() => {
            startTyping();
        }, 1000);
    }
});
