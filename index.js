import { menuArray } from "./data.js";

function getFeedHtml(){
    let feedHtml = ``
    
    menuArray.forEach(function(menu){
        feedHtml += `
        <section class="wrapper">
      
            <div class="image-item">${menu.emoji}</div>
            <div class="middle">
                <h1>${menu.name}</h1>
                <h2>${menu.ingredients}</h2>
                <h1>$${menu.price}</h1>
            </div>
            <button class="add-item">+</button>

        </section>
        <div class="divider"></div>`
    })

    return feedHtml
}


function render(){
    document.getElementById('section-el').innerHTML = getFeedHtml()
}

render()