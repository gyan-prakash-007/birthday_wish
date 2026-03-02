window.addEventListener('load', () => {
    
    // --- 1. Generate Floating Stars ---
    const starsContainer = document.getElementById('stars-container');
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 2 + 1; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = Math.random() * 2 + 2 + 's'; 
        starsContainer.appendChild(star);
    }
    for(let i=0; i<100; i++) { createStar(); } 

    // --- 2. Screen Transitions ---
    const introScreen = document.getElementById('intro-screen');
    const magicalLoader = document.getElementById('magical-loader');
    const mainContent = document.getElementById('main-content');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const oracleRejection = document.getElementById('oracle-rejection');

    // If they click No
    btnNo.addEventListener('click', () => {
        oracleRejection.classList.remove('hidden');
    });

    // If they click Yes
    btnYes.addEventListener('click', () => {
        // Fade out Intro
        introScreen.style.opacity = '0';
        
        setTimeout(() => {
            introScreen.classList.add('hidden');
            
            // Show Magical Loader
            magicalLoader.classList.remove('hidden');
            
            // Spin the loader for 3 seconds, then reveal scrolls
            setTimeout(() => {
                magicalLoader.style.opacity = '0';
                
                setTimeout(() => {
                    magicalLoader.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                }, 1000); 
                
            }, 3000); 
            
        }, 1000); 
    });

    // --- 3. The Prophecies ---
    const messages = {
        success: "The weave of fate shows great triumphs ahead. As you step into this new year, wield your courage like a blade, for untold victories and prosperity are yours to claim.",
        health: "The ancient energies pulse with vitality. Your physical vessel shall remain unbroken, your mind a sharpened fortress, and your spirit a beacon of enduring strength.",
        life: "The constellations spell out a tapestry of joy. You shall find profound peace in quiet moments, laughter alongside true companions, and a lifetime rich with radiant memories.",
        destiny: "YOUR GRAND DESTINY AWAITS! The scrolls have spoken and the ancient rites are complete. Go forth into this cycle without fear, and forge a legacy that the stars will remember!"
    };

    // --- 4. Scroll UI Logic ---
    const scrollBoxes = document.querySelectorAll('.scroll-box');
    const prophecyOverlay = document.getElementById('prophecy-overlay');
    const mysticalSeal = document.getElementById('mystical-seal');
    const scrollTextWrapper = document.getElementById('scroll-text-wrapper');
    const textContainer = document.getElementById('typewriter-text');
    const closeBtn = document.getElementById('close-btn');
    const grandDestinyBtn = document.getElementById('grand-destiny-btn');
    
    let openedCount = 0;
    let currentMessage = "";
    let typewriterTimeout;
    let isTyping = false;

    function typeWriter(text, i) {
        if (i < text.length) {
            textContainer.innerHTML += text.charAt(i);
            i++;
            typewriterTimeout = setTimeout(() => typeWriter(text, i), 40); 
        } else {
            isTyping = false;
        }
    }

    scrollBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.classList.contains('opened')) return; 
            
            const type = box.getAttribute('data-type');
            currentMessage = messages[type];
            
            box.classList.add('opened');
            openedCount++;

            textContainer.innerHTML = '';
            scrollTextWrapper.classList.add('hidden');
            closeBtn.classList.add('hidden');
            mysticalSeal.classList.remove('hidden', 'broken');
            prophecyOverlay.classList.remove('hidden');
        });
    });

    mysticalSeal.addEventListener('click', () => {
        mysticalSeal.classList.add('broken'); 
        
        setTimeout(() => {
            mysticalSeal.classList.add('hidden');
            scrollTextWrapper.classList.remove('hidden');
            closeBtn.classList.remove('hidden');
            
            isTyping = true;
            typeWriter(currentMessage, 0);
        }, 600);
    });

    closeBtn.addEventListener('click', () => {
        prophecyOverlay.classList.add('hidden');
        clearTimeout(typewriterTimeout);
        isTyping = false;

        if (openedCount === 3) {
            grandDestinyBtn.classList.remove('hidden');
        }
    });

    grandDestinyBtn.addEventListener('click', () => {
        currentMessage = messages.destiny;
        textContainer.innerHTML = '';
        
        mysticalSeal.classList.add('hidden');
        scrollTextWrapper.classList.remove('hidden');
        closeBtn.classList.remove('hidden');
        prophecyOverlay.classList.remove('hidden');
        
        isTyping = true;
        typeWriter(currentMessage, 0);
    });
});
