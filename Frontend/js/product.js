const API_URL = "http://localhost:5000/api/products";
const CART_API_URL = "http://localhost:5000/api/cart";

const productContainer = document.getElementById(
"product-details-container"
);

// Get Product ID from URL

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// =========================
// Get Product Details
// =========================

async function getProductDetails() {

 
try {

    if (!productId) {
        throw new Error("Product ID not found");
    }

    const response = await fetch(
        `${API_URL}/${productId}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch product"
        );
    }

    displayProduct(data.product);

} catch (error) {

    console.error("Error:", error);

    productContainer.innerHTML = `
        <p>Failed to load product details.</p>
    `;
}
 

}

// =========================
// Display Product
// =========================

function displayProduct(product) {

 
productContainer.innerHTML = `

    <div class="product-details-card">

        <div class="product-image">

            <img
                src="${product.image || 'https://via.placeholder.com/500'}"
                alt="${product.name}"
            >

        </div>


        <div class="product-info">

            <h1>${product.name}</h1>

            <p class="product-description">
                ${product.description || "No description available"}
            </p>

            <p class="product-price">
                Rs. ${product.price}
            </p>

            <p>
                Stock: ${product.stock ?? "Available"}
            </p>

            <button id="add-to-cart">
                Add to Cart 🛒
            </button>

            <p id="cart-message"></p>

        </div>

    </div>

`;


// Add to Cart Button

const addToCartButton =
    document.getElementById("add-to-cart");

addToCartButton.addEventListener(
    "click",
    () => addToCart(product._id)
);
 

}

// =========================
// Add Product to Cart
// =========================

async function addToCart(productId) {

 
const token = localStorage.getItem("token");

const message =
    document.getElementById("cart-message");


// Check Login

if (!token) {

    message.textContent =
        "Please login to add products to cart.";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);

    return;
}


try {

    message.textContent = "Adding to cart...";


    const response = await fetch(
        `${CART_API_URL}/add`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                productId: productId,
                quantity: 1
            })
        }
    );


    const data = await response.json();

    console.log("Add Cart Response:", data);


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to add product to cart"
        );

    }


    message.textContent =
        "Product added to cart successfully! 🛒";


} catch (error) {

    console.error("Add Cart Error:", error);

    message.textContent =
        error.message;

}
 

}

// Load Product

getProductDetails();
