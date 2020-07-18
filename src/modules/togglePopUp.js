const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        popUpContent = document.querySelector('.popup-content'),
        popUpBtn = document.querySelectorAll('.popup-btn');

    let widthWindow = document.documentElement.clientWidth;

    window.addEventListener('resize', () => {
        widthWindow = document.documentElement.clientWidth;
    });

    //страшная анимация
    let count = 0;
    let rideInterval;
    const showPopUp = () => {
        rideInterval = requestAnimationFrame(showPopUp);
        count += 100;
        if (count < (widthWindow - 200) / 2) {
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
                popUpContent.style.left = ((widthWindow - 250) / 2) + 'px';
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

export default togglePopUp;
