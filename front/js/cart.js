var products = [];

//getting the current localStorage
function getCurrentCart(){;
  //checking the localStorage 'cart' already exist
  if(localStorage.getItem('cart') === null){
    products = [];
    localStorage.setItem('cart', JSON.stringify(products));
  }
  else
    products = JSON.parse(localStorage.getItem('cart'));
}

//displaying cart
function displayCart(products){
  //setting the div that will contain our display
  var productContainer = document.getElementById("cart__items");
  productContainer.innerHTML = "";
    //foreach product in our data we get from API

    products.forEach(element => {
      var product = document.createElement("article");
        product.className = "cart__item";
        product.setAttribute('data-id', element.id);
        product.setAttribute('data-color', element.color)
        product.innerHTML = ' \
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
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+element.number+'"onClick="updatingFromCart(\''+element.id+'\',\''+element.color+'\')"> \
                </div> \
                <div class="cart__item__content__settings__delete"> \
                  <p class="deleteItem" onClick=\"removeFromCart(\''+element.id+'\',\''+element.color+'\')">Supprimer</p> \
                </div> \
              </div> \
            </div>';
          productContainer.appendChild(product);
  });
}

//deleting product
function removeFromCart(id,color){
  //filter for search product in the localStorage
  var filter = {
    color: color,
    id: id
  };

  //filter the product to search for existant product in localStorage
  var indexItem = products.findIndex(
    element => element.color == color && element.id == id
  );

  //if the current product and color does no exist
  products = products.slice(indexItem, 1);
  console.log(products);

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
  getCurrentCart();
  displayCart(products);
}

//updating product
function updatingFromCart(id,color){
  var number = parseInt(document.querySelector("[data-id='"+id+"'][data-color='"+color+"'] .itemQuantity").value);

  //filter for search product in the localStorage
  var filter = {
    color: color,
    id: id
  };

  //filter the product to search for existant product in localStorage
  var indexItem = products.findIndex(
    element => element.color == color && element.id == id
  );

  //if the current product and color does no exist
  products[indexItem].number = number;

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
  getCurrentCart();
  displayCart(products);
}

getCurrentCart();
displayCart(products);
