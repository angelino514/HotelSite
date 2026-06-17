document.addEventListener('DOMContentLoaded', () => {
    
    // 1. COMPORTAMENTO DO MENU HAMBÚRGUER MOBILE
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    if (hamburgerBtn && mobileMenuOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
        });

        const mobileLinks = mobileMenuOverlay.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }

    // 2. INTERATIVIDADE DO CARROSSEL (HERO SLIDER)
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetSliderTimer(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetSliderTimer(); });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
            resetSliderTimer();
        });
    });

    function startSliderTimer() { slideInterval = setInterval(nextSlide, 5000); }
    function resetSliderTimer() { clearInterval(slideInterval); startSliderTimer(); }

    if(slides.length > 0) startSliderTimer();

    // 3. FILTRO FLUIDO DA GALERIA (WHY CHOOSE US)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('#gallery-grid .gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 4. VALIDAÇÃO INTELIGENTE DO WIDGET DE RESERVAS
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const bookingForm = document.getElementById('bookingForm');

    const today = new Date().toISOString().split('T')[0];
    if(checkinInput) checkinInput.min = today;

    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
            if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
                checkoutInput.value = checkinInput.value;
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('A sua simulação de reserva foi processada com sucesso!');
        });
    }

    // 5. ANIMAÇÕES DE ENTRADA AO FAZER SCROLL (INTERSECTION OBSERVER)
    const animatedElements = document.querySelectorAll('.scroll-animate');

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opcional: deixar de observar após a primeira execução para manter performance flat
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Gatilho dispara quando 15% do item estiver visível
        rootMargin: "0px 0px -50px 0px"
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
});
