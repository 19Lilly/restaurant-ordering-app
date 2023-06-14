'use strict';
import { menuArray } from './data.js';

function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (menu) {
    feedHtml += `
        <section class="wrapper">

            <img class="image-item" src="${menu.emoji}">      
            <div class="middle">
                <h1>${menu.name}</h1>
                <h2>${menu.ingredients}</h2>
                <h1>$${menu.price}</h1>
            </div>
            <button class="add-item" id="id000${menu.id}">+</button>

        </section>
        <div class="divider"></div>`;
  });

  return feedHtml;
}

function render() {
  document.getElementById('section-el').innerHTML = getFeedHtml();
}

render();

function processOrder() {
  let orderHtml = document.getElementById('order-process');
  let orderTitleHtml = document.querySelector('.title');
  let summaryEl = document.querySelector('#summary');
  const addBtnAll = document.querySelectorAll('.add-item');
  console.log(addBtnAll);

  const orderDisplay = () => {
    orderTitleHtml.classList.remove('hidden');
    summaryEl.classList.remove('hidden');
  };

  const orderObj = {};
  let prices = {};

  let totalPrice = 0;

  for (let i = 0; i < addBtnAll.length; i++) {
    addBtnAll[i].addEventListener('click', function () {
      orderDisplay();
      orderObj[menuArray[i].name]
        ? (orderObj[menuArray[i].name][0]++,
          (orderObj[menuArray[i].name][1] = menuArray[i].price))
        : (orderObj[menuArray[i].name] = [1, menuArray[i].price]);

      console.log(orderObj);

      const displayOrder = function () {
        let html = ``;
        Object.entries(orderObj).forEach(function ([name, [number, price]]) {
          orderHtml.innerHTML = '';
          summaryEl.innerHTML = '';
          prices[name] = number * price;
          html += `
            <div class="order-wrapper">
               <p class="order-first">${name}<button class="remove-btn">remove</button></p>
               <p class="order-second">${prices[name]}$</p>
             </div>`;
        });

        const removeBtn = document.querySelectorAll('.remove-btn');
        console.log(removeBtn);
        //console.log(Object.values(prices));
        totalPrice = Object.values(prices).reduce((a, b) => a + b);
        //console.log(totalPrice);
        let totalHtml = '';
        totalHtml = `
        <div class="total">
          <h3>Total price:</h3>
          <p>${totalPrice}$</p>
        </div>`;

        orderHtml.insertAdjacentHTML('beforeend', html);
        summaryEl.insertAdjacentHTML('afterbegin', totalHtml);
      };

      displayOrder();
    });
  }
}

processOrder();
