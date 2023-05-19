import { menuArray } from "./data.js";

function getFeedHtml(){
    let feedHtml = ``
    
    menuArray.forEach(function(menu){
        feedHtml += `
        <section class="wrapper">

            <img class="image-item" src="${menu.emoji}">      
            <div class="middle">
                <h1>${menu.name}</h1>
                <h2>${menu.ingredients}</h2>
                <h1>$${menu.price}</h1>
            </div>
            <button class="add-item" data-id="${menu.id}">+</button>

        </section>
        <div class="divider"></div>`
    })

    return feedHtml
}


function render(){
    document.getElementById('section-el').innerHTML = getFeedHtml()
}

render()

document.addEventListener('click', function(e){
    document.innerHTML= processOrder()

    
    
})

/*
handle click on the + button 
 */
function processOrder(){

    console.log(`click-click`)
    /* if (menu.id === 0){ 

        `<div>Pizza</div>`

    } */
}


console.log('vypisujem sa')