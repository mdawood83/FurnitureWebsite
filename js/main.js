
$(document).ready(function(){
    
    //=========================== Show and Hide Products ======================//
    $('.item_wrapper p, button.enlarge, button.goShopping').hide();

    var products = $('.item_wrapper');
	$(products).mouseenter(function(){
		
		var desc = $(this).find('p, button.enlarge, button.goShopping');
		desc.slideDown(300);
    })
    $(products).mouseleave(function(){
		
		var desc = $(this).find('p, button.enlarge, button.goShopping');
		desc.slideUp(300);
    })

    $('button.goShopping').click(function(){

        window.open('shopping.html', '_self');
    })
    
    //======================================================================//

    //=============== Logout Button ====================//
    $('#logout').click(function(){
        alert('Thank you for visiting my website!');
    })

    //======================================================================//

    //=============== Place Order Button ====================//
    var placeOrderBtn = document.querySelector("input[type='submit'].btn");
    var inputs = document.querySelectorAll(".row input.required");
    console.log(inputs);
    
    $(placeOrderBtn).click(function(e){
        e.preventDefault();
        if (inputs != null){
            alert("You must fill up the form!");
        }
        else if(inputs == null){
            alert("Thank you for your shopping");
        }
    })
    
})

//=========================== Login Form ======================//
// var loginForm = document.getElementsByName("loginForm");
var loginBtn = document.getElementsByClassName("botton_1")[0];

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (username == "admin" && password == "12345"){
        alert("Welcome to my website!");
        window.open("welcome.html", '_self');
    }
    else if (username == "" && password == ""){
        alert("Username and Password are required");
    }
    else{
        alert("Invalid Username or Password");
    }
})

//=============================================================//

//========================= Search Products ===============================//

var myProducts = document.querySelectorAll(".singleProduct");
var myProductsArray = Array.from(myProducts);
var search = document.querySelector("input[type='search']");
var searchBtn = document.querySelector("input[type='submit']");

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    let term = search.value.toLowerCase();

    myProductsArray.forEach((product)=>{
        let title = product.textContent.toLowerCase();
        if(title.indexOf(term) != -1){
            product.style.display = "block";
            // console.log(title[title.indexOf(term)]);
        }else{
            product.style.display = "none";
        }
    })
})

//=============================================================//

//========================== CART INFO ================================//

var cartBtn = document.querySelector(".cartBtn");
var cartContent = document.querySelector(".cartContent");

let products = [
    {
        title: 'Living Room Seating',
        price: '4500.00',
        qty: 0,
    },
    {
        title: 'Multifunctional Furniture',
        price: '1500.50',
        qty: 0
    },
    {
        title: 'Dining Table',
        price: '600.50',
        qty: 0
    },
    {
        title: 'Wall Art',
        price: '150.00',
        qty: 0
    },
    {
        title: 'Accent Mirror',
        price: '200.00',
        qty: 0
    },
    {
        title: 'Bedroom Furniture',
        price: '2000.50',
        qty: 0
    },
    {
        title: 'Bathroom Vanity',
        price: '700.00',
        qty: 0
    },
    {
        title: 'Canvas Set',
        price: '250.50',
        qty: 0
    },
    {
        title: 'Kitchen & Dining Furniture',
        price: '500.00',
        qty: 0
    },
    {
        title: 'Entertainment Furniture',
        price: '650.00',
        qty: 0
    },
    {
        title: 'Lighting',
        price: '150.50',
        qty: 0
    },
    {
        title: 'Office Furniture',
        price: '350.00',
        qty: 0
    },
]

// Add To Cart //
var addToCartBtn = document.querySelectorAll(".addToCart");
    for (let i=0; i < addToCartBtn.length; i++){
        addToCartBtn[i].addEventListener("click", function(){
            cartCount(products[i]);
            totalAmount(products[i]);
        })
    }

// Cart Count Load //
var cartItems = document.querySelector(".cartItems");
function onLoadCartCount(){
    let productCount = localStorage.getItem('cartCount');
    if(productCount){
        cartItems.textContent = productCount;
    }
}

// Cart Counter //
function cartCount(products){
    let productCount = localStorage.getItem('cartCount');
    
    productCount = parseInt(productCount);
    if(productCount){
        localStorage.setItem('cartCount', productCount + 1);
        cartItems.textContent = productCount + 1;
    } else{
        localStorage.setItem('cartCount', 1);
        cartItems.textContent = 1;
    }
    setItems(products);
}

// Products in Cart //
function setItems(products){
    let cartProducts = localStorage.getItem("productsInCart");
    cartProducts = JSON.parse(cartProducts);
    if(cartProducts != null){

        if(cartProducts[products.title] == undefined){
            cartProducts = {
                ...cartProducts,
                [products.title]: products
            }
        }
        cartProducts[products.title].qty += 1;
    } else{
        products.qty = 1
        cartProducts = {
        [products.title]:  products
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartProducts));
}

// Total Amount //
function totalAmount(products){
    let cartTotal = localStorage.getItem("totalAmount");

    if(cartTotal != null){
        cartTotal = parseFloat(cartTotal);
        products.price = parseFloat(products.price);
        localStorage.setItem("totalAmount", cartTotal + products.price);
    }else{
        localStorage.setItem("totalAmount", products.price);
    }
}

// Display Cart //
function displayCart(){
    let cartProducts = localStorage.getItem("productsInCart");
    cartProducts = JSON.parse(cartProducts);
    
    let content = document.querySelector(".productCart");
    let purchase = document.querySelector("form #purchase");
    
    let cartTotal = localStorage.getItem("totalAmount");
    cartTotal = parseFloat(cartTotal);
    let tax = cartTotal * 0.15;
    let Total = cartTotal + tax;
    Total = parseFloat(Total);

    if(cartProducts && content){

        content.innerHTML = '';
        Object.values(cartProducts).map(item =>{
            content.innerHTML += `
                <div class="product">
                    <span>${item.title}</span>
                    <span class="fa fa-remove clearCart"> Clear Cart</span>
                    <div class="price">$${item.price}</div>
                    <div class="quantity">${item.qty}</div>
                    <div class="total">$${item.qty * item.price}</div>
                <div>
                `
        });

        content.innerHTML += `
            <div class="cartSubtotalContainer">
                <h4 class="cartSubtotalTitle">Subtotal:</h4>
                <h4 class="cartSubtotal">$${cartTotal}</h4>
            </div>    
            <div class="cartTaxContainer">
                <h4 class="cartTaxTitle">TPS/TVQ (15%):</h4>
                <h4 class="cartTax">$${tax}</h4>
            </div>
            <div class="cartTotalContainer">
                <h4 class="cartTotalTitle">Cart Total:</h4>
                <h4 class="cartTotal">$${Total}</h4>
            </div>
        `
        purchase.value = Total;
    }
    
    // Clear Cart //
    var clearCart = document.getElementsByClassName("clearCart");
        
        for(var i=0; i < clearCart.length; i++){
            var clearButton = clearCart[i]

            clearButton.addEventListener("click", function(e){
            e.target.parentElement.remove();
            localStorage.clear('productsInCart');
            localStorage.clear('cartCount');
            localStorage.clear('totalAmount');
            content.textContent = "";
            })
        }
        
}

onLoadCartCount();
displayCart();


//========================= Validation (RegEx) ===============================//

var inputs = document.querySelectorAll(".form-container input");

var pattern = {
    
	cardNo:/^[\d]{4}\s[\d]{4}\s[\d]{4}\s[\d]{4}$/,  // (0000 0000 0000 0000)
	cvc:/^[\d]{3}$/,                                // (123)
    nameCard:/^([a-zA-Z]{3,})\s([a-zA-Z]{3,})$/,    // (abc def)
    exp:/^(0[1-9]|1[0-2])[/][\d]{2}$/,              // (MM/YY)

    name:/^([a-zA-Z]{3,})\s([a-zA-Z]{3,})$/,        // (abc def)
    postal:/^[A-Z]{1}\d[A-Z]{1}\s\d[A-Z]{1}\d$/,    // (H0H 0H0)
}

function validate(field, regex){
	if(regex.test(field.value)){
		
		field.className = "valid";
	}else{
		field.className = "invalid";
	}	
}

inputs.forEach((input)=>{
	input.addEventListener("keyup",(e)=>{

		validate(e.target, pattern[e.target.attributes.id.value]);
	})
})

