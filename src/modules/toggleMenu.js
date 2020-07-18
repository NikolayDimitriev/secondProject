const toggleMenu = () => {
    const body = document.body,
        menu = document.querySelector('menu');


    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    body.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.menu')) { //открытые/закрытие на кнопку меню
            handlerMenu();
        } else if (target.classList.contains('close-btn')) { //закрытие на кнопку
            handlerMenu();
        } else if (target.closest('menu') && target.tagName.toLowerCase() === 'a') {
            event.preventDefault();

            const blockId = target.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            handlerMenu();
        } else if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu') && !target.matches('li')) {
            handlerMenu();
        } else if (target.parentNode.id === 'next-slide-btn' && target.tagName.toLowerCase() === 'img') {
            event.preventDefault();

            const blockId = target.parentNode.getAttribute('href');
            document.querySelector(blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

};

export default toggleMenu;
