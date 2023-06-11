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
  let summaryEl = document.querySelector('.summary');
  const addBtnAll = document.querySelectorAll('.add-item');
  const removeBtn = document.querySelector('.remove-btn');

  const orderDisplay = () => {
    orderTitleHtml.classList.remove('hidden');
    summaryEl.classList.remove('hidden');
  };

  const orderObj = {};

  let totalPrice = 0;

  for (let i = 0; i < addBtnAll.length; i++) {
    addBtnAll[i].addEventListener('click', function () {
      orderDisplay();
      orderObj[menuArray[i].name]
        ? orderObj[menuArray[i].name]++
        : (orderObj[menuArray[i].name] = 1);

      console.log(orderObj);
    });

    // const displayOrder = function (orderObj)

    // const displayOrder = function (orderObj) {
    //   orderHtml.innerHTML = '';

    //   x.forEach(function (order){
    //     const html = `<div class="order-wrapper">
    //     // <p class="order-first">${menuArray[i].name}</p>
    //     // <button class="remove-btn order-second">remove</button>
    //     // <p class="order-third">${menuArray[i].price}$</p>
    //     // </div>`
    //   })
    // };

    //     orderHtml.innerHTML += `
    // <div class="order-wrapper">
    // <p class="order-first">${menuArray[i].name}</p>
    // <button class="remove-btn order-second">remove</button>
    // <p class="order-third">${menuArray[i].price}$</p>
    // </div>`;

    //     console.log(orderObj);
  }
}

processOrder();

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';

//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };
