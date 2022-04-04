/*
*
* fetching one data from api
* displaying on data
* adding one data into localstorage
*
*/

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
  "altTxt": "",
  "uuid": ""
};

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
  document.querySelector(".item__img").innerHTML = '<img src="'+data.imageUrl+'" alt="'+data.altTxt+'">';
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

//adding the current product information sort by color to cart
function addToCart(){
  var products = JSON.parse(localStorage.getItem('cart') || "[]");
  //getting the current product color select
  var color = document.querySelector("#colors").value;
  //getting the current product quantity number select
  var number = parseInt(document.querySelector("#quantity").value);
  //getting the uuid
  var uuid = id.toString()+color.toString();
  
  //checking input
  if(color == ""){
    document.getElementById('addToCart').innerHTML = "Veuillez choisir une couleur";
  // break the loop
    return false;
  }else if(number < 1 || number > 100){
    document.getElementById('addToCart').innerHTML = "1-100 Article(s) obligatoire";
    return false;
  }else{
    document.getElementById('addToCart').innerHTML = "Article(s) ajouté(s)";
  }

  //filter the product to search for existant product in localStorage
  var result = products.findIndex(product => {
    return product.uuid === uuid;
  });

  //if the current product and color does no exist
  if(result === -1 ){
    //set the product color
    productCartData.color = color;
    //set the product quantity
    productCartData.number = number;
    //ser the uuid of the item
    productCartData.uuid = uuid;
    //add the product to the current products list
    products.push(productCartData);
  }else{
    products[result].number = number;
    document.getElementById('addToCart').innerHTML = "Nombre d'article mise à jour: " + number;
  }

  //set the products list into the localStorage
  localStorage.setItem('cart', JSON.stringify(products));
}

