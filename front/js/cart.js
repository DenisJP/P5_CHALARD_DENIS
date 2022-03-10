
    //getting current cart
    function getCurrentCart(){
      //checking if cart already exist
      if(localStorage.getItem('cart') != null){
        var products = JSON.parse(localStorage.getItem('cart'));
        displayCart(products);
      }
    }

    //deleting 
    function removeFromCart(color, id){
        var products = localStorage.getItem('cart');
        var indexItem = "";
        products.forEach(element => {
            console.log(element);
            if(element.color == color && element.id == id){
                indexItem = products.indexOf(element);
                products = products.slice(indexItem, 1);
                displayCart(products);
            }
        });
        localStorage.setItem('cart', JSON.stringify(products));
    }

    //displaying cart
    function displayCart(products){
      var mainContainer = document.getElementById("cart__items");
      products.forEach(element => {
        var div = document.createElement("div");
            div.innerHTML = ' \
            <article class="cart__item" data-id="'+element.id+'" data-color="'+element.color+'"> \
              <div class="cart__item__img"> \
                <img src="'+element.data.imageUrl+'" alt="'+element.data.altTxt+'"> \
              </div> \
              <div class="cart__item__content"> \
                <div class="cart__item__content__description"> \
                  <h2>'+element.data.name+'</h2> \
                  <p>'+element.color+'</p> \
                  <p>'+element.data.price+'</p> \
                </div> \
                <div class="cart__item__content__settings"> \
                  <div class="cart__item__content__settings__quantity"> \
                    <p>Qté : '+element.number+'</p> \
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+element.number+'"> \
                  </div> \
                  <div class="cart__item__content__settings__delete"> \
                    <p class="deleteItem" onClick=\'removeFromCart("'+element.color+'","'+element.id+'")\'>Supprimer</p> \
                  </div> \
                </div> \
              </div> \
            </article>';
            mainContainer.appendChild(div);
      });
    }
    getCurrentCart();
