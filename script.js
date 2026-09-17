document.addEventListener('DOMContentLoaded', () => {

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

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

    const canvas = document.getElementById('cursorCanvas');
    if (canvas && window.innerWidth > 768) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        let mouse = { x: -100, y: -100 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            for (let i = 0; i < 2; i++) {
                particles.push(new CloudParticle(mouse.x, mouse.y));
            }
        });

        class CloudParticle {
            constructor(x, y) {
                this.x = x + (Math.random() - 0.5) * 6;
                this.y = y + (Math.random() - 0.5) * 6;
                this.radius = Math.random() * 6 + 6;
                this.maxRadius = this.radius + Math.random() * 18 + 12;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6 - 0.2;
                this.alpha = 0.5;
                this.decay = Math.random() * 0.015 + 0.01;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.radius < this.maxRadius) {
                    this.radius += 0.35;
                }
                this.alpha -= this.decay;
            }

            draw() {
                if (this.alpha <= 0) return;
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);

                let gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, Math.max(0.1, this.radius)
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                gradient.addColorStop(0.4, 'rgba(215, 238, 255, 0.4)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.1, this.radius), 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            if (mouse.x > 0 && mouse.y > 0) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.restore();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

});