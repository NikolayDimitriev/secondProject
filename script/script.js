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
        const body = document.body,
            menu = document.querySelector('menu');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (target.closest('.menu')) { //открытые/закрытие на кнопку меню
                handlerMenu();
            } else if (target.classList.contains('close-btn')) { //закрытие на кнопку
                handlerMenu();
            } else if (target.closest('menu') && target.tagName === 'A') {
                const blockId = target.getAttribute('href');
                document.querySelector(`${blockId}`).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                handlerMenu();
            } else if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu')) {
                handlerMenu();
            } else if (target.parentNode.id === '#next-slide-btn' && target.tagName === 'IMG') {
                const blockId = target.parentNode.getAttribute('href');
                document.querySelector(`${blockId}`).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

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