function initStagesSlider() {
    const track = document.querySelector('.stages__track');
    const slides = document.querySelectorAll('.stages__slide');
    const prevBtn = document.querySelector('.stages__nav-prev');
    const nextBtn = document.querySelector('.stages__nav-next');
    const dotsContainer = document.querySelector('.stages__nav-dots');

    // Проверка, что все элементы найдены
    if (!track || !slides.length) return;

    // Настройки
    const totalSlides = slides.length; // Всего слайдов
    let currentIndex = 0;              // Текущий слайд

    // Проверка, активен ли слайдер
    function isSliderActive() {
        return window.innerWidth < 1024;
    }

    // Создание навигационных точек
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'stages__nav-dot';
            dot.setAttribute('aria-label', `Слайд ${i + 1}`);

            dot.addEventListener('click', () => goToSlide(i));

            dotsContainer.appendChild(dot);
        }
    }

    // Обновление состояния слайдера
    function updateSlider() {
        //  Отключение на десктопе слайдер
        if (!isSliderActive()) {
            track.style.transform = 'none';
            return;
        }

        // Сдвиг трека
        const offset = currentIndex * 100;
        track.style.transform = `translateX(-${offset}%)`;

        // Обновление активной точки
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.stages__nav-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Обновление состояния кнопок
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
    }

    // Переход к указанному слайду
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentIndex = index;
        updateSlider();
    }

    // Обработчик кнопки "Назад"
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // Обработчик кнопки "Вперед"
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Поддержка свайпов на мобильных
    let touchStartX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isSliderActive()) return;

        const diff = touchStartX - e.changedTouches[0].clientX;

        // Свайп влево (следующий слайд)
        if (diff > 50) goToSlide(currentIndex + 1);

        // Свайп вправо (предыдущий слайд)
        if (diff < -50) goToSlide(currentIndex - 1);
    });

    // Обновление при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // При переходе на десктоп сбрасывает позицию
            if (!isSliderActive()) {
                currentIndex = 0;
                track.style.transform = 'none';
            }
            updateSlider();
        }, 250);
    });

    createDots();
    updateSlider();
}
