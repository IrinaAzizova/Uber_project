window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    function toggleActive() {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    }

    hamburger.addEventListener('click', () => {
        toggleActive();
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            toggleActive();
        })
    })
    window.addEventListener('keydown', (event) => {
        if (event.key == 'Escape' && hamburger.classList.contains('hamburger_active')) {
            toggleActive();
        };
    });
})