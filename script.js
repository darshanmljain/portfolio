document.addEventListener('DOMContentLoaded', () =&gt; {
    
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle &amp;&amp; navMenu) {
        navToggle.addEventListener('click', () =&gt; {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link =&gt; {
            link.addEventListener('click', () =&gt; {
                navMenu.classList.remove('active');
            });
        });
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button =&gt; {
        button.addEventListener('click', () =&gt; {
            filterButtons.forEach(btn =&gt; btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card =&gt; {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');

    if (cursorDot &amp;&amp; cursorOutline &amp;&amp; window.innerWidth &gt; 768) {
        document.body.classList.add('custom-cursor-active');

        let mouseX = -100;
        let mouseY = -100;
        let outlineX = -100;
        let outlineY = -100;

        window.addEventListener('mousemove', (e) =&gt; {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .skill-card, .social-btn');
        
        interactiveElements.forEach(el =&gt; {
            el.addEventListener('mouseenter', () =&gt; {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () =&gt; {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

});