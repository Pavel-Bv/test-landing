function initFadeAnimations() {
    const fadeUpElements  = document.querySelectorAll('.fade-up');
    const fadeDownElements = document.querySelectorAll('.fade-down');
    const fadeLeftElements = document.querySelectorAll('.fade-left');
    const fadeInElements = document.querySelectorAll('.fade-in');

    // Если элементов нет - выходим
    if (!fadeUpElements.length && !fadeDownElements.length && !fadeInElements.length && !fadeLeftElements.length) return;

    // Функция проверки видимости элемента
    function isElementVisible(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // offset из data-атрибута или 100 по умолчанию
        const offset = parseInt(el.dataset.offset) || 100;

        // Элемент виден когда верхняя граница ниже верха окна на offset или на 100
        return rect.top <= windowHeight - offset;
    }

    // Функция обработки одного элемента
    function handleElement(el) {
        if (isElementVisible(el)) {
            el.classList.add('visible');

            const delay = el.dataset.delay || 600;

            // Вложенный элементы с анимацией
            const animElement = el.querySelector(
                '.anim-pendulum-left, .anim-pendulum-right, .anim-slip-left, .anim-slip-right, .anim-circle, .anim-pulse'
            );

            if (animElement) {
                animElement.style.setProperty('--anim-delay', delay + 'ms');
                animElement.classList.add('animate');
            }
        }
    }

    // Функция показа видимых элементов
    function showVisibleElements() {
        fadeUpElements.forEach(el => handleElement(el));
        fadeDownElements.forEach(el => handleElement(el));
        fadeLeftElements.forEach(el => handleElement(el));
        fadeInElements.forEach(el => handleElement(el));
    }

    // Показ элементов при загрузке
    showVisibleElements();

    // Показ элементов при скролле
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Троттлинг для производительности
        if (scrollTimeout) return;

        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            showVisibleElements();
        }, 50);
    }, { passive: true });
}
