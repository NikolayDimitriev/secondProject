window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    //Таймер
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        const updateClockId = setInterval(() => {
            const timer = getTimeRemaining();
            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                if (timer.hours < 10) {
                    timerHours.textContent = '0' + timer.hours;
                } else {
                    timerHours.textContent = timer.hours;
                }

                if (timer.minutes < 10) {
                    timerMinutes.textContent = '0' + timer.minutes;
                } else {
                    timerMinutes.textContent = timer.minutes;
                }

                if (timer.seconds < 10) {
                    timerSeconds.textContent = '0' + timer.seconds;
                } else {
                    timerSeconds.textContent = timer.seconds;
                }

                if (timer.timeRemaining === 0) {
                    clearInterval(updateClockId);
                }
            }
        }, 1000);
    }
    countTimer('2 jule 2020');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            nextSlideBtn = document.querySelector('main>a'),
            anchors = [...menu.querySelectorAll('li>a[href*="#"]')]; //все якоря

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach(item => item.addEventListener('click', handlerMenu)); //закрытие меню после перехода

        anchors.forEach(item => { //плавное перемешение к якорю
            item.addEventListener('click', e => {
                e.preventDefault(); //сбросили стандартную анимацию
                const blockId = item.getAttribute('href'); //получаем ссылку на какой блок ссылкает
                document.querySelector('' + blockId).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                }); //прокручиваем скрол к объекту
            });
        });
        nextSlideBtn.addEventListener('click', e => {
            e.preventDefault();
            const blockId = nextSlideBtn.getAttribute('href'); //получаем ссылку на какой блок ссылкает
            document.querySelector('' + blockId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popUpContent = document.querySelector('.popup-content'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            widthWindow = document.documentElement.clientWidth;

        //страшная анимация
        let count = 0;
        let rideInterval;
        const showPopUp = () => {
            rideInterval = requestAnimationFrame(showPopUp);
            count += 100;
            if (count < (widthWindow - 150) / 2) { //грубо говоря середина, правда моего экрана)
                popUpContent.style.left = count + 'px';
            } else {
                cancelAnimationFrame(rideInterval);
            }
        };

        popUpBtn.forEach(item => {
            item.addEventListener('click', () => {
                if (widthWindow > 768) {
                    rideInterval = requestAnimationFrame(showPopUp);
                    count = 0;
                } else {
                    cancelAnimationFrame(rideInterval);
                }
                popUp.style.display = 'block';
            });
        });

        popUp.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });

    };
    tabs();
});