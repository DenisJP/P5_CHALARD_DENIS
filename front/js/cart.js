document.querySelector(".cart__order__form").addEventListener("submit", function(event){
  event.preventDefault()
});

var products = JSON.parse(localStorage.getItem('cart') || "[]");
var arrayProduct = [];

var totalPrice = 0;

//displaying cart
function displayCart(products){
  //setting the div that will contain our display
  var productContainer = document.getElementById("cart__items");
  productContainer.innerHTML = "";
    //foreach product in our data we get from API

    products.forEach(element => {
      arrayProduct.push(element.id);
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
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+element.number+'" onChange="updatingFromCart(\''+element.id+'\',\''+element.color+'\',\''+parseInt(element.number) * parseInt(element.price)+'\')"> \
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
  arrayProduct = arrayProduct.slice(arrayProduct.indexOf(id), 1);
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
  if(number < 1) number = 1;
  if(number > 100) number = 100;
  document.querySelector("[data-id='"+id+"'][data-color='"+color+"'] .itemQuantity").value = number;
  document.querySelector("[data-id='"+id+"'][data-color='"+color+"'] .cart__item__content__settings__quantity p").innerHTML = "Qté : "+ number;
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

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
}


function orderProduct(inputFn, inputLn, inputAd, inputCt, inputEm){
  //getting contact informations object
  var contact = {
      firstName: inputFn,
      lastName: inputLn,
      address:  inputAd,
      city: inputCt,
      email: inputEm
  };

  var orderId = "";

    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: contact,
        products: arrayProduct
      })
    })
    .then((response) => response.json())
    .then(product => {
      orderId = product.orderId
    }).then(response => {
      window.location.href = "./confirmation.html?orderId="+orderId;
    })
    .catch(err => {
      return false;
    })


}

function checkInput(){
  //getting input
  var inputFn = document.getElementById("firstName").value;
  var inputLn = document.getElementById("lastName").value;
  var inputAd = document.getElementById("address").value;
  var inputCt = document.getElementById("city").value;
  var inputEm = document.getElementById("email").value;

  //regular expression
  var regEm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var regFLn = /^[A-Za-zÀ-ÿ:\-\s]+$/;
  var regAd = /^[a-zA-ZÀ-ÿ0-9:\-\s]+$/;

  if(!(regFLn.test(inputFn))){
    document.getElementById("firstNameErrorMsg").innerHTML = "Name is not valid";
    return false;
  }else document.getElementById("firstNameErrorMsg").innerHTML = "";
  if(!(regFLn.test(inputLn))){
    document.getElementById("lastNameErrorMsg").innerHTML = "LastName is not valid";
    return false;
  }else document.getElementById("lastNameErrorMsg").innerHTML = "";
  if(!(regAd.test(inputAd))){
    document.getElementById("addressErrorMsg").innerHTML = "Adress is not valid";
    return false;
  }else document.getElementById("addressErrorMsg").innerHTML = "";
  if(!(regFLn.test(inputCt))){
    document.getElementById("cityErrorMsg").innerHTML = "City is not valid";
    return false;
  }else document.getElementById("cityErrorMsg").innerHTML = "";
  if(!(regEm.test(inputEm))){
    document.getElementById("emailErrorMsg").innerHTML = "Email is not valid";
    return false;
  }else document.getElementById("emailErrorMsg").innerHTML = "";

  orderProduct(inputFn, inputLn, inputAd, inputCt, inputEm);
  
}

//displaying product
displayCart(products);
