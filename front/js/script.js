//fetching data from API
fetch("http://localhost:3000/api/products")
.then(function (response) {
  //convert data to JSON object
  return response.json();
}).then(function (data) {
  //sending data to the display function
  appendData(data, "items");
})


function appendData(data, section) {
  //getting the sectionok see you that will contain our display
  var productContainer = document.getElementById(section);
      //foreach product in our data we get from API
      data.forEach(product => {
        //create an HTML a element for the current product in the loop
        var link = document.createElement("a");
        //setting the link of the a element
        link.href = "./product.html?id="+product._id
        //setting the content between the a and /a
        link.innerHTML = 
        '\<article> \
            <img src="'+ product.imageUrl +'" alt="'+ product.altTxt +'"> \
            <h3 class="productName">'+ product.name +'</h3> \
            <p class="productDescription">'+product.description+'</p> \
          </article>';
        //adding the current product HTML to the container
        productContainer.appendChild(link);
    });
}