let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem('data')) || [];


let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x)=>{
    let {id,name,price,img,desc} = x;
    let search = basket.find((x)=> x.id === id) || [];
    return `
    <div id ="product-id-${id}" class="item">
    <img width="220" src=${img} alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i onclick = "decrement(${id})" class="bi bi-dash-lg"></i>
                <div id ="${id}" class="quantity">
                ${search.item === undefined? 0 : search.item}</div>
                <i  onclick = "increment(${id})"  class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
</div>
    `
  }).join(""));
};

generateShop();

let increment = (id)=>{
let selecetedItem = id;
let search = basket.find((x)=> x.id === selecetedItem.id);
if (search === undefined) {
  basket.push({
    id :selecetedItem.id,
    item : 1,
  });
}
else{
  search.item += 1;
}

localStorage.setItem("data",JSON.stringify(basket));
// console.log(basket);
update(selecetedItem.id);
};



let decrement = (id)=>{
  let selecetedItem = id;
  let search = basket.find((x)=> x.id === selecetedItem.id);
  if(search === undefined) return;
  else if (search.item === 0) return;
  else{
    search.item -= 1;
}
update(selecetedItem.id);
basket = basket.filter((x)=>x.item !== 0);
  // console.log(basket);
localStorage.setItem("data",JSON.stringify(basket));

};



let update = (id)=>{
  let search = basket.find((x)=>x.id === id);
console.log(search.item);
document.getElementById(id).innerHTML = search.item;
calculation();
};

let calculation = ()=>{
let cartIcon = document.getElementById("cartAmount");
cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
}

calculation();


/**
 * !JS FOR DROP DOWNS
 * **/
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}