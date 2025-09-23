// --- Envelope & Letter Animation ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');
    const letter = document.querySelector('.letter');

    heartSeal.addEventListener('click', () => {
        // Step 1: Open the envelope flap
        envelopeWrapper.classList.add('open');
        
        // Step 2: Animate the letter's entrance
        setTimeout(() => {
            letter.style.opacity = 1;
            letter.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 1500); // Wait for the envelope flap animation to start
        
        // Step 3: Wait for the letter animation to complete, then redirect
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 3000); // Total animation time
    });
}

// --- Typing Animation for Letter.html ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('letter-page')) {
        const elements = document.querySelectorAll('.typing-animation');

        const typewriter = (element, text, speed) => {
            return new Promise(resolve => {
                let i = 0;
                element.innerHTML = '<span></span>'; // Create a span for the text
                const textSpan = element.querySelector('span');
                
                const interval = setInterval(() => {
                    if (i < text.length) {
                        textSpan.textContent += text.charAt(i);
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
