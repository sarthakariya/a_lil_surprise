// --- Envelope Opening on Click & Music Toggle ---
if (document.querySelector('.envelope-wrapper')) {
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    const heartSeal = document.querySelector('.heart-seal');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Toggle music on heart click
    heartSeal.addEventListener('click', () => {
        if (!isPlaying) {
            backgroundMusic.play();
            isPlaying = true;
            // Start the envelope animation after a short delay
            setTimeout(() => {
                envelopeWrapper.classList.add('open');
                setTimeout(() => {
                    window.location.href = 'letter.html';
                }, 5000); // 5 seconds to allow the full animation to play out
            }, 500);
        }
    });

    // Handle music pause on document click to allow for user interaction
    document.addEventListener('click', function(e) {
        if (!heartSeal.contains(e.target) && isPlaying) {
            backgroundMusic.pause();
            isPlaying = false;
        }
    });
}
