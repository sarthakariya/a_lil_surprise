/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@400;600&display=swap');

/* --- Global Styles & Background --- */
body {
    margin: 0;
    padding: 0;
    background: #0f0c29;
    background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
    height: 100vh;
    font-family: 'Quicksand', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

.container, main.letter-container {
    position: relative;
    z-index: 1;
}

/* --- Page 1: Envelope & Heart --- */
.envelope-wrapper {
    position: relative;
    perspective: 1000px;
    animation: float 5s ease-in-out infinite alternate;
}

@keyframes float {
    from { transform: translateY(0px) rotate(0deg); }
    to { transform: translateY(-10px) rotate(1deg); }
}

.envelope {
    position: relative;
    width: 300px;
    height: 200px;
    background: linear-gradient(145deg, #4d468d, #3b356d);
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2);
    transform-style: preserve-3d;
    transition: transform 2.5s 2s cubic-bezier(0.16, 1, 0.3, 1);
}

.envelope-wrapper.open .envelope {
    transform: translateY(100px) rotateX(-15deg);
}

/* Envelope Flap */
.envelope::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(165deg, #6059a9, #4d468d);
    border-radius: 10px 10px 0 0;
    transform-origin: top;
    transition: transform 1.5s 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform: rotateX(0deg);
    z-index: 10;
}
.envelope-wrapper.open .envelope::after {
    transform: rotateX(180deg);
}

/* Letter inside */
.letter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 90%;
    height: 90%;
    background: #d6b8a1; /* Light brownish tint */
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    transition: transform 2s 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    display: flex;
    justify-content: center;
    align-items: center;
}
.envelope-wrapper.open .letter {
    transform: translate(-50%, -50%) scale(1);
    transform: translate(-50%, -10px) scale(1); /* New final position for the letter */
}

/* Heart Seal is now an emoji */
.heart-seal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    font-size: 5rem;
    cursor: pointer;
    text-shadow: 0 0 20px #ff69b4, 0 0 40px #ff69b4;
    transition: transform 0.3s ease-in-out;
}

.heart-seal:hover {
    transform: translate(-50%, -50%) scale(1.1);
}

/* --- Page 2: Letter Page --- */
.letter-page {
    overflow-y: auto;
}
.letter-container {
    max-width: 90%;
    width: 600px;
    padding: 40px 50px;
    background: #d6b8a1; /* Brownish tint */
    border-radius: 25px; /* More rounded */
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: #4b3832; /* Dark brown text for contrast */
    text-align: left;
    transition: transform 1s ease-in-out;
}
.letter-container:hover {
    transform: translateY(-5px) scale(1.01);
}

.letter-container h1 {
    font-family: 'Dancing Script', cursive;
    color: #8c5e3d;
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 25px;
    text-shadow: 0 0 5px #ffedd0;
}

.letter-container p {
    font-size: 1.2rem;
    line-height: 1.8;
    text-shadow: 0 0 1px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}

.signature {
    font-family: 'Dancing Script', cursive;
    font-size: 2.5rem;
    color: #8c5e3d;
    text-align: right;
    margin-top: 40px;
    text-shadow: 0 0 5px #ffedd0;
}

/* --- Phone Optimization --- */
@media (max-width: 600px) {
    .envelope {
        width: 280px;
        height: 180px;
    }
    .heart-seal {
        font-size: 4rem;
    }
    .letter-container {
        width: auto;
        margin: 20px;
        padding: 25px;
    }
    .letter-container h1 { font-size: 2.8rem; }
    .letter-container p { font-size: 1.1rem; }
    .signature { font-size: 2.2rem; }
}
