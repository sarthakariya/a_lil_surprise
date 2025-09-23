// --- Envelope & Letter Animation with GSAP ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');

    heartSeal.addEventListener('click', () => {
        // Step 1: Open the envelope flap
        envelopeWrapper.classList.add('open');
        
        // Wait for the flap to open, then redirect with a short delay
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 1500); // Shorter delay for a smoother transition
    });
}

// --- Typing Animation for Letter.html ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('letter-page')) {
        const elements = document.querySelectorAll('.typing-animation');

        // GSAP Timeline to chain the animations
        const tl = gsap.timeline({
            defaults: {
                duration: 0.05,
                ease: "none"
            }
        });

        // Loop through each element and add a typing animation to the timeline
        elements.forEach((el, index) => {
            const fullText = el.getAttribute('data-text');
            el.textContent = "";
            
            // Animate the text and the cursor
            tl.to(el, {
                opacity: 1,
                onComplete: () => {
                    // Type out the text character by character
                    let charIndex = 0;
                    const typingInterval = setInterval(() => {
                        el.textContent += fullText[charIndex];
                        charIndex++;
                        if (charIndex === fullText.length) {
                            clearInterval(typingInterval);
                        }
                    }, 50); // Typing speed
                }
            })
            .to(el, {
                width: "100%",
                duration: fullText.length * 0.05, // Duration based on text length
            })
            .to(el, {
                borderRight: '2px solid transparent', // Animate cursor out
                repeat: 3,
                yoyo: true,
                duration: 0.5
            }, "+=0.5") // Add a small pause after typing
            .to(el, {
                borderRight: 'none', // Remove cursor
                duration: 0
            });
        });
    }
});
