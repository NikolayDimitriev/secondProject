window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
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
    countTimer('13 jule 2020');

    //Меню
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
            } else if (target.closest('menu') && target.tagName === 'A') {
                event.preventDefault();
                const blockId = target.getAttribute('href');
                document.querySelector(`${blockId}`).scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                handlerMenu();
            } else if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu')) {
                handlerMenu();
            } else if (target.parentNode.id === '#next-slide-btn' && target.tagName === 'IMG') {
                event.preventDefault();
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

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

        for (let i = 0; i < slide.length; i++) {
            const newElem = document.createElement('li');
            newElem.classList.add('dot');
            portfolioDots.append(newElem);
        }
        const dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(2000);
    };
    slider();

    //работа с мелькими вещами
    const littleThings = () => {
        const mouseOver = elem => {
            const target = elem.target;
            if (target.matches('.command__photo')) {
                target.dataset.image = target.src;
                target.src = target.dataset.img;
            }
        };
        const mouseOut = elem => {
            const target = elem.target;
            if (target.matches('.command__photo')) {
                target.src = target.dataset.image;
            }
        };

        //смена изображения при наведении
        document.querySelector('.command').addEventListener('mouseover', mouseOver);
        document.querySelector('.command').addEventListener('mouseout', mouseOut);

        //запрет ввода всего кроме цифр в калькуляторе
        // eslint-disable-next-line max-len
        const inputArray = [document.querySelector('.calc-square'), document.querySelector('.calc-count'), document.querySelector('.calc-day')];
        inputArray.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });

        //запрет ввода в инпуте "номера" всего кроме цифр и знака +
        document.querySelectorAll('input[name="user_phone"]').forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^\d+]/, '');
            });
        });
        //запрет ввода в инпуте "имя" и "сообщение" всего, кроме кириллицы и пробелов
        document.querySelectorAll('input[name="user_name"], input[name="user_message"]').forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-я\s]/gi, '');
            });
        });
    };
    littleThings();

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value < 5 && calcDay.value) {
                dayValue *= 2;
            } else if (calcDay.value < 10 && calcDay.value) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };
    calc(100);

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

<<<<<<< HEAD
=======
        // const form = document.getElementById('form1');
>>>>>>> 3800a2d81b24442ae34574b7cf5f422acbbd230a

        const statusMessage = document.createElement('div');
        statusMessage.textContent = 'Тут будет текст';
        statusMessage.style.cssText = 'font-size: 2rem;';

<<<<<<< HEAD
        //для каждой формы
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                form.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;

                const formData = new FormData(form);
                const body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });

                // eslint-disable-next-line no-use-before-define
                postData(body, () => {
                    statusMessage.textContent = successMessage;
                }, error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

                //через 3 секунды очищаем инпуты
                setTimeout(() => {
                    form.querySelectorAll('input').forEach(item => {
                        item.value = '';
                    });
                }, 3000);

            });
        });

        //функция запроса на сервер
        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
=======
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                console.log(e.target);
            });
        });
>>>>>>> 3800a2d81b24442ae34574b7cf5f422acbbd230a
    };
    sendForm();
});
