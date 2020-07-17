const sendForm = () => {
    const statusMessage = document.createElement('img');
    statusMessage.src = './images/loader.gif';
    const successMessage = document.createElement('div');
    successMessage.style.cssText = 'font-size: 2rem; color: white;';
    successMessage.textContent = 'Ваша заявка принята';

    //для каждой формы
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            form.appendChild(statusMessage);

            const formData = new FormData(form);
            const body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });

            // eslint-disable-next-line no-use-before-define
            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200.');
                    }
                    form.removeChild(statusMessage);
                    form.appendChild(successMessage);
                })
                .catch(error => console.error(error));

            //через 3 секунды очищаем инпуты
            setTimeout(() => {
                form.querySelectorAll('input').forEach(item => {
                    item.value = '';
                });
            }, 3000);

            //через 7 секунд убирается запись об успешной отправке
            setTimeout(() => {
                form.removeChild(successMessage);
            }, 7000);

        });
    });

    //функция запроса на сервер
    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

};

export default sendForm;
