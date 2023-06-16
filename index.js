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
const paymentModal = document.querySelector('.payment');
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
  else if (e.target.dataset.pay) handlePayBtnclick(e.target.dataset.pay);
});

//Add and Remove btns

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
};

//pay btn
function handlePayBtnclick() {
  console.log('all done');
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
  clearAllInputs();
}

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
  menuArray.forEach(function (menu) {
    if (menu.numberOrdered > 0) {
      orderHtml.innerHTML += `
    <div class="order-wrapper">
        <p class="order-first">${menu.name}<button data-remove=${
        menu.uuid
      } class="remove-btn" data-remove-btn ="${menu.uuid}">remove</button></p>
        <p class="order-second"><small>${menu.numberOrdered}x</small>${
        menu.price * menu.numberOrdered
      }$</p>
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
