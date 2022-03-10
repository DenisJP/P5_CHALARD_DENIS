//getting the current URL as string
const url = window.location.href;
//convert the URL as url object
var paramsUrl = new URL(url);
//getting the ID params from the URL
const id = paramsUrl.searchParams.get('id');

//setting an empty product var
var productCartData = {
  "color": "",
  "id": id,
  "name": "",
  "price": 0,
  "number": 0,
  "imageUrl": "",
  "altTxt": ""
};

var products = [];

//fetching data from API using ID to get one product only
fetch("http://localhost:3000/api/products/"+id)
.then(function (response) {
  //convert data to JSON object
  return response.json();
}).then(function (data) {
  //using data.XXX to change HTML content according to it
  document.getElementById("title").innerHTML = data.name;
  productCartData.name = data.name;
  document.getElementById("price").innerHTML = data.price;
  productCartData.price = data.price;
  document.getElementById("description").innerHTML = data.description;
  document.getElementsByClassName("item__img")[0].innerHTML = '<img src="'+data.imageUrl+'" alt="'+data.altTxt+'">';
  productCartData.imageUrl = data.imageUrl;
  productCartData.altTxt = data.altTxt;

  //for each color in our data.colors ARRAY
  data.colors.forEach(element => {
    //create an HTML option element for the current color in the loop
    var options = document.createElement('option');
    //setting the value of the option
    options.value = element;
    //setting the text of the option
    options.text = element;
    //adding the current color HTML to the container
    document.getElementById("colors").appendChild(options);
  });
})

//getting the current localStorage
function getCurrentCart(){;
  //checking the localStorage 'cart' already exist
  if(localStorage.getItem('cart') === null){
    products = [];
    localStorage.setItem('cart', products);
  }
  else
    products = JSON.parse(localStorage.getItem('cart'));

  console.log(products);
}

//adding the current product information sort by color to cart
function addToCart(){
  getCurrentCart();
  //getting the current product color select
  var color = document.querySelector("#colors").value;
  //getting the current product quantity number select
  var number = parseInt(document.querySelector("#quantity").value);
  
  //filter for search product in the localStorage
  var filter = {
    color: color,
    id: id
  };

  //filter the product to search for existant product in localStorage
  var result = products.filter(function(item) {
    for (var key in filter) {
      if (item[key] === undefined || item[key] != filter[key])
        return false;
      else
        indexItem = products.indexOf(item);
    }
    return true;
  });

  //if the current product and color does no exist
  if(result.length === 0){
    //set the product color
    productCartData.color = color;
    //set the product quantity
    productCartData.number = number;
    //add the product to the current products list
    products.push(productCartData);
  }else{
    products[indexItem].number += number;
  }

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
}

