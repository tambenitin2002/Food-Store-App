// Define Variables
let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let dynamic_count = document.querySelector(".dynamic-count");
let tContainer = document.querySelector(".tContainer");
let line = document.querySelector(".line");
let total_price = document.getElementById("total_price");
let emptyCart = document.querySelector(".emptyCart");
let cItems = document.querySelector(".cItems");
let emptyC = false;
let arrr = [];
let calculateTotal = [];

// Get Data From API
async function getData() {
  const res = await fetch("https://dummyjson.com/recipes");
  const data = await res.json();

  data.recipes.map((ele) => {
    let productMainDiv = document.createElement("div");
    let createImgEle = document.createElement("img");
    let createTitle = document.createElement("p");
    let createRatingEle = document.createElement("p");
    let btnEle = document.createElement("button");
    let btnText = document.createTextNode("Add to Cart");
    let createRatingText = document.createTextNode(`Rating : ${ele.rating}`);
    let createTextTitle = document.createTextNode(
      `${ele.name.slice(0, 35)}...`
    );

    createImgEle.setAttribute("src", ele.image);
    createImgEle.setAttribute("class", "myImages");
    productMainDiv.setAttribute("class", "box-main");
    createTitle.appendChild(createTextTitle);
    createRatingEle.setAttribute("class", "price-element");
    btnEle.setAttribute("class", "btn-element");
    createRatingEle.appendChild(createRatingText);
    createTitle.setAttribute("class", "productTitle");
    btnEle.appendChild(btnText);
    productMainDiv.appendChild(createImgEle);
    productMainDiv.appendChild(createTitle);
    productMainDiv.appendChild(createRatingEle);
    productMainDiv.appendChild(btnEle);
    renderData.appendChild(productMainDiv);

    function addToCart(img, rating) {
      arrr.push({ ii: img, pp: rating });
      alert("Product Added to Cart");
      dynamic_count.innerHTML++;
      emptyC = true;

      if (emptyC) {
        cItems.style.display = "flex";
        emptyCart.style.display = "none";
      }

      let cartMDiv = document.createElement("div");
      let cartImgEle = document.createElement("img");
      let cartTrashBtn = document.createElement("i");
      cartTrashBtn.setAttribute("class", "fa-solid fa-trash");
      tContainer.style.display = "flex";
      line.style.display = "block";

      cartTrashBtn.addEventListener("click", () => deleteItem(rating, cartMDiv));
      cartImgEle.setAttribute("src", img);
      cartImgEle.setAttribute("class", "cartImgElement");
      cartMDiv.setAttribute("class", "cart-styling");

      let cartRatingEle = document.createElement("p");
      let cartRatingText = document.createTextNode(`${rating}`);
      cartRatingEle.setAttribute("class", "cart-Rating");
      cartRatingEle.appendChild(cartRatingText);

      cartMDiv.appendChild(cartImgEle);
      cartMDiv.appendChild(cartRatingEle);
      cartMDiv.appendChild(cartTrashBtn);
      renderCartData.appendChild(cartMDiv);

      calculateTotal.push(rating);
      updateTotal();
    }

    function deleteItem(pr, cartMDiv) {
      cartMDiv.remove();
      calculateTotal = calculateTotal.filter((price) => price !== pr);
      updateTotal();
      dynamic_count.innerHTML--;
      if (dynamic_count.innerHTML == 0) {
        emptyCart.style.display = "block";
        cItems.style.display = "none";
        tContainer.style.display = "none";
        line.style.display = "none";
      }
    }

    function updateTotal() {
      // let myTotal = calculateTotal.reduce((accum, curVal) => accum + curVal, 0);
      // total_price.innerHTML = `Total Price : $${myTotal.toFixed(2)}`;
    }

    btnEle.addEventListener("click", () => addToCart(ele.image, ele.rating));
  });
}

getData();
