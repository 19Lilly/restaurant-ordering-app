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
            <button class="add-item" data-add-btn="${menu.uuid}">+</button>

        </section>
        <div class="divider"></div>`;
  });

  return feedHtml;
}

function render() {
  document.getElementById('section-el').innerHTML = getFeedHtml();
}

render();

const orderHtml = document.getElementById('order-process');
const orderTitleHtml = document.querySelector('.title');
const summaryEl = document.querySelector('#summary');

document.addEventListener('click', function (e) {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  }
  if (e.target.dataset.removeBtn) {
    handleRemoveBtnClick(e.target.dataset.removeBtn);
  }
});

function handleAddBtnClick(addBtnId) {
  //console.log(addBtnId);

  const targetAddBtn = menuArray.filter(function (menuItem) {
    return menuItem.uuid === addBtnId;
  })[0];

  targetAddBtn.numberOrdered++;
  orderDisplay();
  orderProcess();
}

function handleRemoveBtnClick(removeBtnId) {
  const targetRemoveBtn = menuArray.filter(function (menuItem) {
    return menuItem.uuid === removeBtnId;
  })[0];
  targetRemoveBtn.numberOrdered--;
  orderProcess();
}

const orderDisplay = () => {
  orderTitleHtml.classList.remove('hidden');
};

const orderProcess = function () {
  orderHtml.innerHTML = ``;
  summaryEl.innerHTML = '';
  let totalPrice = 0;
  menuArray.forEach(function (menu) {
    if (menu.numberOrdered > 0) {
      orderHtml.innerHTML += `
    <div class="order-wrapper">
        <p class="order-first">${menu.name}<button data-remove=${
        menu.uuid
      } class="remove-btn" data-remove-btn ="${menu.uuid}">remove</button></p>
        <p class="order-second">${menu.price * menu.numberOrdered}$</p>
    </div>`;
    }

    totalPrice += menu.price * menu.numberOrdered;
  });
  summaryEl.innerHTML = `
  <div class="divider-total"></div>
  <div class="total total-wrapper">
    <h3>Total price:</h3>
    <p>${totalPrice}$</p>
  </div>
  <button class="complete-order-btn wrapper" id="complete-order-btn">Complete Order</button>`;

  if (totalPrice === 0) {
    orderTitleHtml.classList.add('hidden');
    orderHtml.innerHTML = ``;
    summaryEl.innerHTML = '';
  }
};
/* function processOrder() {
  let orderHtml = document.getElementById('order-process');
  let orderTitleHtml = document.querySelector('.title');
  let summaryEl = document.querySelector('#summary');
  const addBtnAll = document.querySelectorAll('.add-item');

  const orderDisplay = () => {
    orderTitleHtml.classList.remove('hidden');
    summaryEl.classList.remove('hidden');
  };

  let orderObj = {};
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
               <p class="order-first">${name}<button data-remove=${menuArray.uuid} class="remove-btn">remove</button></p>
               <p class="order-second">${prices[name]}$</p>
             </div>`;
          orderHtml.addEventListener('click', event => {
            // if (event.target.dataset) {
            //   console.log('a teraz co? To este musis vymysliet');
            // }
            console.log(event.target.dataset.remove);
          });
        });

        //console.log(Object.values(prices));
        totalPrice = Object.values(prices).reduce((a, b) => a + b);
        //console.log(totalPrice);

        orderHtml.innerHTML = html;
        const displayTotal = function () {
          summaryEl.innerHTML = '';
          let totalHtml = '';
          totalHtml = `
          
          <div class="divider-total"></div>
          <div class="total total-wrapper">
            <h3>Total price:</h3>
            <p>${totalPrice}$</p>
          </div>
          <button class="complete-order-btn wrapper" id="complete-order-btn">Complete Order</button>`;

          summaryEl.innerHTML = totalHtml;
        };
        displayTotal();
      };

      displayOrder();

      summaryEl.addEventListener('click', event => {
        if (event.target.id === 'complete-order-btn') {
          console.log('click, click, click');
        }
      });
    });
  }
}

processOrder();
 */
