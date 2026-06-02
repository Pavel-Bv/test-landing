function initParticipantsSlider() {
    const track = document.querySelector('.participants__track');
    const cards = document.querySelectorAll('.participants__card');
    const prevBtn = document.querySelector('.participants__nav-prev');
    const nextBtn = document.querySelector('.participants__nav-next');
    const counter = document.querySelector('.participants__nav-counter');

    // Настройки
    let cardsToShow = window.innerWidth <= 1024 ? 1 : 3;      // Сколько карточек показываем за раз
    const totalCards = cards.length;                          // Всего карточек
    let currentIndex = 0;                                     // Текущий индекс
    let totalSlides = Math.ceil(totalCards / cardsToShow); // Всего слайдов

    // Проверка, что все элементы найдены
    if (!track || !cards.length || !prevBtn || !nextBtn || !counter) {
        console.error('Не найдены элементы слайдера');
        return;
    }

    // Функция обновления слайдера
    function updateSlider() {
        // Вычисление ширины одной карточки с учетом отступа
        const targetCard = cards[currentIndex * cardsToShow];

        // Сдвиг трек
        track.style.transform = `translateX(-${targetCard.offsetLeft}px)`;

        // Обновление счетчика
        const start = currentIndex * cardsToShow + 1;
        const end = Math.min(start + cardsToShow - 1, totalCards);

        // Форматирование счетчика
        counter.innerHTML = `<span>${end}</span> / ${totalCards}`;

        // Обновление состояние кнопок
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }

    // Обработчик кнопки "Назад"
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Обработчик кнопки "Вперед"
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Поддержка свайпов на мобильных
    const slider = document.querySelector('.participants__slider');
    let touchStartX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        // Свайп влево (следующий слайд)
        if (diff > 50 && currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlider();
        }

        // Свайп вправо (предыдущий слайд)
        if (diff < -50 && currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Обновление при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Пересчитываем слайды для нового размера экрана
            if (window.innerWidth <= 1024) {
                cardsToShow = 1;
            } else {
                cardsToShow = 3;
            }

            totalSlides = Math.ceil(totalCards / cardsToShow);

            // Если текущий индекс больше недоступен - сбрасывает
            if (currentIndex >= totalSlides) {
                currentIndex = totalSlides - 1;
            }

            updateSlider();
        }, 250);
    });

    updateSlider();
}
