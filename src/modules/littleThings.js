const littleThings = () => {
    function maskPhone(selector, masked = '+7 (___) ___-__-__') {
        const elems = document.querySelectorAll(selector);

        function mask(event) {
            const keyCode = event.keyCode;
            const template = masked,
                def = template.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, "");
            let i = 0,
                newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
            i = newValue.indexOf("_");
            if (i !== -1) {
                newValue = newValue.slice(0, i);
            }
            let reg = template.substr(0, this.value.length).replace(/_+/g,
                a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = newValue;
            }
            if (event.type === "blur" && this.value.length < 5) {
                this.value = "";
            }

        }

        for (const elem of elems) {
            elem.addEventListener("input", mask);
            elem.addEventListener("focus", mask);
            elem.addEventListener("blur", mask);
        }

    }

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

    //маска для ввода телефона
    // eslint-disable-next-line no-undef
    maskPhone('input[name="user_phone"]');

    //запрет ввода в инпуте "номера" всего кроме цифр и знака +
    document.querySelectorAll('input[name="user_phone"]').forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/^[-()]\d/g, '');
        });
    });
    //запрет ввода в инпуте "имя" и "сообщение" всего, кроме кириллицы и пробелов
    document.querySelectorAll('input[name="user_name"], input[name="user_message"]').forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-я\s]/gi, '');
        });
    });
};

export default littleThings;
