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
        }, 1500);
        
        // Step 3: Wait for the letter animation to complete, then redirect
        setTimeout(() => {
            window.location.href = 'letter.html';
        }, 3000);
    });
}

// --- Typing Animation for Letter.html ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('letter-page')) {
        const elements = document.querySelectorAll('.typing-animation');
        let delay = 1000; // Initial delay

        elements.forEach(el => {
            const fullText = el.getAttribute('data-text');
            const textLength = fullText.length;
            const typingSpeed = 50; // Milliseconds per character
            const animationDuration = textLength * typingSpeed;

            // Set a unique animation for each element
            el.style.animation = `typing ${animationDuration}ms steps(${textLength}, end) forwards, cursor-blink 0.75s step-end infinite`;
            el.style.animationDelay = `${delay}ms`;

            // Append the full text
            el.textContent = fullText;

            // Update delay for the next element
            delay += animationDuration + 500;
        });

        // Add a global typing animation keyframes
        const styleSheet = document.styleSheets[0];
        const typingKeyframes = `@keyframes typing { from { width: 0; } to { width: 100%; } }`;
        const cursorKeyframes = `@keyframes cursor-blink { from, to { border-color: transparent; } 50% { border-color: #4b3832; } }`;
        
        styleSheet.insertRule(typingKeyframes, styleSheet.cssRules.length);
        styleSheet.insertRule(cursorKeyframes, styleSheet.cssRules.length);
    }
});
