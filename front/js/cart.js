var products = JSON.parse(localStorage.getItem('cart') || "[]");

var totalPrice = 0;

//displaying cart
function displayCart(products){
  //setting the div that will contain our display
  var productContainer = document.getElementById("cart__items");
  productContainer.innerHTML = "";
    //foreach product in our data we get from API

    products.forEach(element => {
      var productArticle = document.createElement("article");
      productArticle.className = "cart__item";
      productArticle.setAttribute('data-id', element.id);
      productArticle.setAttribute('data-color', element.color)
      productArticle.innerHTML = ' \
            <div class="cart__item__img"> \
              <img src="'+element.imageUrl+'" alt="'+element.altTxt+'"> \
            </div> \
            <div class="cart__item__content"> \
              <div class="cart__item__content__description"> \
                <h2>'+element.name+'</h2> \
                <p>'+element.color+'</p> \
                <p>'+element.price+'</p> \
              </div> \
              <div class="cart__item__content__settings"> \
                <div class="cart__item__content__settings__quantity"> \
                  <p>Qté : '+element.number+'</p> \
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+element.number+'" onClick="updatingFromCart(\''+element.id+'\',\''+element.color+'\',\''+parseInt(element.number) * parseInt(element.price)+'\')"> \
                </div> \
                <div class="cart__item__content__settings__delete"> \
                  <p class="deleteItem" onClick=\"removeFromCart(\''+element.id+'\',\''+element.color+'\',\''+parseInt(element.number) * parseInt(element.price)+'\')">Supprimer</p> \
                </div> \
              </div> \
            </div>';
            totalPrice += parseInt(element.number) * parseInt(element.price);
            productContainer.appendChild(productArticle);
  });
  
document.getElementById("totalPrice").innerHTML = totalPrice;
}

//deleting product
function removeFromCart(id,color, total){
  //if the current product and color does no exist
  products = products.filter((item) => (item.uuid !== id.toString()+color.toString()));
  document.querySelector("[data-id='"+id+"'][data-color='"+color+"']").outerHTML = "";

  //updating price
  totalPrice -= total;
  document.getElementById("totalPrice").innerHTML = totalPrice;

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
}

//updating product
function updatingFromCart(id,color,total){
  var number = parseInt(document.querySelector("[data-id='"+id+"'][data-color='"+color+"'] .itemQuantity").value);
  var uuid = id.toString()+color.toString();

  //filter the product to search for existant product in localStorage
  var result = products.findIndex(product => {
    return product.uuid === uuid;
  });

  //updating price
  totalPrice -= products[result].number*products[result].price;
  totalPrice += number*products[result].price;
  document.getElementById("totalPrice").innerHTML = totalPrice;

  //if the current product and color does no exist
  products[result].number = number;
  document.querySelector("[data-id='"+id+"'][data-color='"+color+"'] .cart__item__content__settings__quantity p").innerHTML = 'Qté : '+number;

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
}

//displaying product
displayCart(products);
