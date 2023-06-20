'use strict';
import { menuArray } from './data.js';

//render restaurant menu
function getFeedHtml() {
  let feedHtml = ``;

  menuArray.forEach(function (menu) {
    feedHtml += `
        <section class="menu-item-wrapper">

            <img class="image-item" src="${menu.emoji}">      
            <div class="menu-item">
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
const paymentModal = document.querySelector('form');
const overlay = document.querySelector('.overlay');
const orderTitleHtml = document.querySelector('.title');
const summaryEl = document.querySelector('#summary');

document.addEventListener('click', function (e) {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  } else if (e.target.dataset.removeBtn) {
    handleRemoveBtnClick(e.target.dataset.removeBtn);
  } else if (e.target.dataset.completeOrder)
    handleCompleteOrderBtnClick(e.target.dataset.completeOrder);
  else if (e.target.dataset.closeModal)
    handleCloseModalBtnClick(e.target.dataset.closeModal);
});

document.addEventListener('submit', function (e) {
  if (e.target.dataset.pay) return e.target.dataset.pay;
});

//Add and Remove btns

let orderArray = [];
function handleAddBtnClick(addBtnId) {
  const targetAddBtn = menuArray.filter(function (menuItem) {
    return menuItem.uuid === addBtnId;
  })[0];

  targetAddBtn.numberOrdered++;
  if (targetAddBtn.numberOrdered === 1) {
    orderArray.push([
      targetAddBtn.name,
      targetAddBtn.numberOrdered,
      targetAddBtn.price,
      targetAddBtn.uuid,
    ]);
  } else {
    for (let i = 0; i < orderArray.length; i++) {
      if (orderArray[i][0] === targetAddBtn.name) {
        orderArray[i][1] = targetAddBtn.numberOrdered;
        orderArray[i][2] = targetAddBtn.price * targetAddBtn.numberOrdered;
        orderArray[i][3] = targetAddBtn.uuid;
      }
    }
  }

  orderDisplay();
  orderProcess();
}

function handleRemoveBtnClick(removeBtnId) {
  const targetRemoveBtn = menuArray.filter(function (menuItem) {
    return menuItem.uuid === removeBtnId;
  })[0];
  targetRemoveBtn.numberOrdered--;

  for (let i = 0; i < orderArray.length; i++) {
    if (orderArray[i][0] === targetRemoveBtn.name) {
      orderArray[i][1] = targetRemoveBtn.numberOrdered;
      orderArray[i][2] = targetRemoveBtn.price * targetRemoveBtn.numberOrdered;
    }
    if (orderArray[i][1] === 0) {
      orderArray.splice(i, 1);
    }
  }

  orderProcess();
}

//complete order btn
function handleCompleteOrderBtnClick() {
  openModal();
}

//close payment Modal
function handleCloseModalBtnClick() {
  closeModal();
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !paymentModal.classList.contains('hidden')) {
    closeModal();
  }
});

const openModal = function () {
  paymentModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  paymentModal.classList.add('hidden');
  overlay.classList.add('hidden');
  event.preventDefault();
};

//pay btn

paymentModal.onsubmit = function () {
  closeModal();
  const buyerName = document.getElementById('buyer-name').value;
  orderTitleHtml.classList.add('hidden');
  orderHtml.innerHTML = '';
  summaryEl.innerHTML = '';
  orderHtml.innerHTML = `
  <div class="thank-you-message">Thanks, ${buyerName}! Your order is on its way!</div>`;
  menuArray.forEach(function (menu) {
    menu.numberOrdered = 0;
  });
  event.preventDefault();
  clearAllInputs();
};

//clear input fields
function clearAllInputs(event) {
  let allInputs = document.querySelectorAll('input');
  allInputs.forEach(singleInput => (singleInput.value = ''));
}

//display ordered items in html
const orderDisplay = () => {
  orderTitleHtml.classList.remove('hidden');
};

const orderProcess = function () {
  orderHtml.innerHTML = ``;
  summaryEl.innerHTML = '';
  let totalPrice = 0;

  orderArray.forEach(function ([name, numberOrdered, price, uuid]) {
    orderHtml.innerHTML += `
      <div class="order-wrapper">
          <p class="order-item">${name}<button data-remove=${uuid} class="remove-btn" data-remove-btn ="${uuid}">remove</button></p>
          <p class="order-price"><small>${numberOrdered}x</small>${price}$</p>
      </div>`;

    totalPrice += price;
  });

  summaryEl.innerHTML = `
  <div class="divider-total"></div>
  <div class="total total-wrapper">
    <h3>Total price:</h3>
    <p>${totalPrice}$</p>
  </div>
  <button class="complete-order-btn total-wrapper" data-complete-order="complete-order">Complete Order</button>`;

  if (totalPrice === 0) {
    orderTitleHtml.classList.add('hidden');
    orderHtml.innerHTML = ``;
    summaryEl.innerHTML = '';
  }
};
