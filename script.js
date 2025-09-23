// --- Envelope & Letter Animation with GSAP ---

if (document.querySelector('.envelope-wrapper')) {

    const envelopeWrapper = document.querySelector('.envelope-wrapper');

    const heartSeal = document.querySelector('.heart-seal');

    const envelope = document.querySelector('.envelope');

    const letter = document.querySelector('.letter');



    // Add GSAP library link to the HTML

    const gsapScript = document.createElement('script');

    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';

    document.head.appendChild(gsapScript);



    heartSeal.addEventListener('click', () => {

        // Step 1: Open the envelope flap

        envelopeWrapper.classList.add('open');

        

        // Wait for the flap to open, then start the letter animation

        setTimeout(() => {

            // Step 2: Animate the letter to scale up and fill the screen

            gsap.to(letter, {

                scale: 10,

                x: '0%',

                y: '0%',

                ease: "power2.inOut",

                duration: 2.5,

                onComplete: () => {

                    // Step 3: Redirect after the animation is complete

                    window.location.href = 'letter.html';

                }

            });

        }, 1500); // Wait for the envelope flap animation to finish

    });

}



// --- Typing Animation for Letter.html ---

// This code will only run on the letter.html page

document.addEventListener('DOMContentLoaded', () => {

    if (document.body.classList.contains('letter-page')) {

        // Select all elements with the typing-animation class

        const elements = document.querySelectorAll('.typing-animation');

        

        // Function to remove cursor and show the full text

        const showFullText = (el) => {

            el.style.width = 'auto';

            el.style.borderRight = 'none';

        };



        // Function to run the typing animation

        const runTypingAnimation = (elements) => {

            let delay = 0;

            elements.forEach(el => {

                const text = el.textContent.trim();

                el.textContent = '';

                el.style.opacity = 1;

                el.style.width = '0%';

                

                // Use a loop to type out each character

                let i = 0;

                const speed = 50; // typing speed in milliseconds

                const type = () => {

                    if (i < text.length) {

                        el.textContent += text.charAt(i);

                        i++;

                        setTimeout(type, speed);

                    } else {

                        // Animation complete, remove cursor

                        showFullText(el);

                    }

                };

                

                // Start typing after a short delay

                setTimeout(type, delay);

                delay += text.length * speed + 500; // Increase delay for the next element

            });

        };



        runTypingAnimation(elements);

    }

});
