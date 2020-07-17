const calc = (price = 1000) => {
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

        // eslint-disable-next-line no-use-before-define
        numAnimate(totalValue, +totalValue.textContent, total, 500);
    };

    //анимация изменения цифр
    const numAnimate = (totalValue, from, to, duration) => {
        const elem = totalValue;
        const start = Date.now();
        let timerId = setTimeout(function tick() {
            const now = Date.now() - start;
            const progress = now / duration; //шаг
            const result = Math.floor((to - from) * progress + from);
            elem.textContent = progress < 1 ? result : to;

            // eslint-disable-next-line no-unused-vars
            if (progress < 1) timerId = setTimeout(tick, 10);
        }, 10);
    };

    // numAnimate('example', 0, 5000, 9000);

    calcBlock.addEventListener('change', event => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;
