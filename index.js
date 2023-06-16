'use strict';
import { menuArray } from './data.js';

//render restaurant menu
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

//handle add/remove btn, display processed order in html
const orderHtml = document.getElementById('order-process');
const orderTitleHtml = document.querySelector('.title');
const summaryEl = document.querySelector('#summary');

document.addEventListener('click', function (e) {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  } else if (e.target.dataset.removeBtn) {
    handleRemoveBtnClick(e.target.dataset.removeBtn);
  } else if (e.target.dataset.completeOrder)
    handleCompleteOrderBtnClick(e.target.dataset.completeOrder);
});

function handleAddBtnClick(addBtnId) {
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

function handleCompleteOrderBtnClick() {}

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
  <button class="complete-order-btn wrapper" data-complete-order="complete-order">Complete Order</button>`;

  if (totalPrice === 0) {
    orderTitleHtml.classList.add('hidden');
    orderHtml.innerHTML = ``;
    summaryEl.innerHTML = '';
  }
};
