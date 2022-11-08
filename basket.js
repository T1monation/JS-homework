let myBasket = new Object();

/* делаем кликабельным иконку меню
*/
document.querySelector(".cartIconWrap").addEventListener('click', event => {
    document.querySelector(".basket").classList.toggle('hidden');
});

/*
По нажатию на нужную кнопку добавляем объект в хранилище
и на это же событие вешаем создание html-разметки
для вывода выбранных элементов в корзину. перед этим очищаем добавленную разметку, что бы
при каждом клике не дублировалось содержимое
Получаем динамически-реагирующкю на каждое добавление корзину
*/

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.classList.contains('addToCart')) {
        // всплываем до нужного нам родительского класса
        const findEl = event.target.parentElement.parentElement.parentElement;
        // создаем новый "подобъект" со счетчиком количества 1
        if (!myBasket[`${findEl.dataset.id}`]) {
            myBasket[`${findEl.dataset.id}`] = {
                id: findEl.dataset.id,
                name: findEl.dataset.name,
                price: findEl.dataset.price,
                count: 1,
            }
            // или увеличиваем счетчик на 1, если такой "подобъект" уже существует
        } else {
            myBasket[`${findEl.dataset.id}`].count++;
        }

        makeBasket(myBasket);
    };
});

function makeBasket(basketObj) {
    let totalPrice = 0;
    let productCounter = 0;
    let tempString = '';
    for (el in basketObj) {
        productCounter += basketObj[el].count;
        totalPrice += basketObj[el].price * basketObj[el].count;
        tempString += `<div class="tempBasket">${basketObj[el].name}</div>
        <div class="tempBasket">${basketObj[el].count} шт.</div>
        <div class="tempBasket">\$${basketObj[el].price}</div>
        <div class="tempBasket">\$${basketObj[el].price * basketObj[el].count}</div>`;
    }
    document.querySelectorAll('.tempBasket').forEach(el => {
        el.remove('tempBasket');
    })
    document.querySelector('.basketHeader').innerHTML += tempString;
    document.querySelector('.basketTotalValue').textContent = totalPrice;
    document.querySelector('.elemCount').textContent = productCounter;
}

