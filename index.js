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

  let orderArr = new Array();
  let totalPrice = 0;

  for (let i = 0; i < addBtnAll.length; i++) {
    addBtnAll[i].addEventListener('click', function () {
      orderDisplay();
      orderHtml.innerHTML += `
        <div class="order-wrapper">
        <p class="order-first">${menuArray[i].name}</p>
        <button class="remove-btn order-second">remove</button>
        <p class="order-third">${menuArray[i].price}$</p>
        </div>`;
    });
  }
}

processOrder();
