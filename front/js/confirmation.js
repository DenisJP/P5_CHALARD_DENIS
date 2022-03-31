//getting the current URL as string
const url = window.location.href;
//convert the URL as url object
var paramsUrl = new URL(url);
//getting the ID params from the URL
const orderId = paramsUrl.searchParams.get('orderId');

document.getElementById("orderId").innerHTML = orderId;
localStorage.removeItem('cart');