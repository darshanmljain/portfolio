document.addEventListener('DOMContentLoaded', () => {

    // Dynamic Year Update
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Audio Playback Handler
    const bgAudio = document.getElementById('bgAudio');
    const audioToggleBtn = document.getElementById('audioToggleBtn');

    if (bgAudio && audioToggleBtn) {
        let isPlaying = false;

        async function playAudio() {
            try {
                await bgAudio.play();
                isPlaying = true;
                audioToggleBtn.classList.add('playing');
                removeInteractionListeners();
            } catch (err) {
                console.warn('Autoplay waiting for user interaction:', err);
            }
        }

        function pauseAudio() {
            bgAudio.pause();
            isPlaying = false;
            audioToggleBtn.classList.remove('playing');
        }

        function handleFirstInteraction() {
            if (!isPlaying) {
                playAudio();
            }
        }

        function removeInteractionListeners() {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            document.removeEventListener('mousemove', handleFirstInteraction);
            document.removeEventListener('scroll', handleFirstInteraction);
        }

        // Listen for any initial interaction to satisfy browser autoplay policies
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('mousemove', handleFirstInteraction, { once: true });
        document.addEventListener('scroll', handleFirstInteraction, { once: true });

        // Circular 💿 Button Manual Toggle
        audioToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });

        // 404 / Audio Load Error Detection
        bgAudio.addEventListener('error', () => {
            console.error('Audio Error Code:', bgAudio.error);
            alert('⚠️ Audio Load Error: Could not find "audio/fur-elise.mp3". Please verify that the file exists in your PORTFOLIO/audio folder and is named exactly "fur-elise.mp3".');
        });
    }

    // Mobile Navigation Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Photo Lightbox Zoom Modal
    const modal = document.getElementById('imageModal');
    const profileImg = document.getElementById('profileImg');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');

    if (profileImg && modal && modalImg) {
        profileImg.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            modalImg.src = profileImg.src;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === modalClose) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Custom Trailing Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = -100;
        let mouseY = -100;
        let outlineX = -100;
        let outlineY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .skill-card, .social-btn, .tag, .profile-img');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

});