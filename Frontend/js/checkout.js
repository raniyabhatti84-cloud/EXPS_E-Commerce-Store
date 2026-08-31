const CART_API_URL = "http://localhost:5000/api/cart";
const ORDER_API_URL = "http://localhost:5000/api/orders";

const token = localStorage.getItem("token");

const checkoutItems =
document.getElementById("checkout-items");

const checkoutTotal =
document.getElementById("checkout-total");

const placeOrderButton =
document.getElementById("place-order-button");

const checkoutMessage =
document.getElementById("checkout-message");

// =========================
// Check Login
// =========================

if (!token) {

 
checkoutItems.innerHTML = `
    <div class="empty-cart">

        <h2>Please Login</h2>

        <p>
            You need to login before checkout.
        </p>

        <a href="login.html">
            Login
        </a>

    </div>
`;

placeOrderButton.disabled = true;
 

} else {

 
getCart();
 

}

// =========================
// Get Cart
// =========================

async function getCart() {

 
try {

    const response = await fetch(
        CART_API_URL,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to load cart"
        );

    }


    displayCheckout(data.cart);


} catch (error) {

    console.error(
        "Checkout Cart Error:",
        error
    );


    checkoutItems.innerHTML = `
        <div class="empty-cart">

            <h2>
                Failed to load cart
            </h2>

            <p>
                ${error.message}
            </p>

            <a href="cart.html">
                Back to Cart
            </a>

        </div>
    `;

    placeOrderButton.disabled = true;

}
 

}

// =========================
// Display Checkout
// =========================

function displayCheckout(cart) {

 
if (
    !cart ||
    !cart.items ||
    cart.items.length === 0
) {

    checkoutItems.innerHTML = `
        <div class="empty-cart">

            <h2>
                Your cart is empty 🛒
            </h2>

            <p>
                Add products before checkout.
            </p>

            <a href="index.html">
                Continue Shopping
            </a>

        </div>
    `;

    placeOrderButton.disabled = true;

    checkoutTotal.textContent =
        "Rs. 0";

    return;
}


let total = 0;


checkoutItems.innerHTML = `

    ${cart.items.map(item => {

        const itemTotal =
            item.product.price * item.quantity;

        total += itemTotal;


        return `

            <div class="checkout-item">

                <img
                    src="${
                        item.product.image ||
                        'https://via.placeholder.com/120'
                    }"
                    alt="${item.product.name}"
                >


                <div class="checkout-item-info">

                    <h3>
                        ${item.product.name}
                    </h3>

                    <p>
                        Price:
                        Rs. ${item.product.price}
                    </p>

                    <p>
                        Quantity:
                        ${item.quantity}
                    </p>

                    <p>
                        Item Total:
                        <strong>
                            Rs. ${itemTotal}
                        </strong>
                    </p>

                </div>

            </div>

        `;

    }).join("")}

`;


checkoutTotal.textContent =
    `Rs. ${total}`;
 

}

// =========================
// Place Order
// =========================

placeOrderButton.addEventListener(
"click",
placeOrder
);

async function placeOrder() {

 
try {

    placeOrderButton.disabled = true;

    placeOrderButton.textContent =
        "Processing...";


    checkoutMessage.textContent =
        "";


    const response = await fetch(
        ORDER_API_URL,
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );


    const data = await response.json();


    console.log(
        "Order Response:",
        data
    );


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to place order"
        );

    }


    checkoutMessage.textContent =
        "Order placed successfully! 🎉";


    checkoutMessage.style.color =
        "green";


    placeOrderButton.textContent =
        "Order Placed ✓";


    // Go to Order History

    setTimeout(() => {

        window.location.href =
            "orders.html";

    }, 1500);


} catch (error) {

    console.error(
        "Place Order Error:",
        error
    );


    checkoutMessage.textContent =
        error.message;


    checkoutMessage.style.color =
        "red";


    placeOrderButton.disabled =
        false;


    placeOrderButton.textContent =
        "Place Order";

}
 

}
