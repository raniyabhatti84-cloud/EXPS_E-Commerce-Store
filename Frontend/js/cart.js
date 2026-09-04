const API_URL = "http://localhost:5000/api/cart";

const cartContainer = document.getElementById("cart-container");

// Get Token
const token = localStorage.getItem("token");

// =========================
// Check Login
// =========================

if (!token) {

 
cartContainer.innerHTML = `
    <div class="empty-cart">

        <h2>Please Login</h2>

        <p>
            You need to login to view your cart.
        </p>

        <a href="login.html">
            Login
        </a>

    </div>
`;
 

} else {

 
getCart();
 

}

// =========================
// Get Cart
// =========================

async function getCart() {

 
try {

    const response = await fetch(API_URL, {

        method: "GET",

        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }

    });


    const data = await response.json();

    console.log("Cart Response:", data);


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch cart"
        );

    }


    displayCart(data.cart);


} catch (error) {

    console.error("Cart Error:", error);

    cartContainer.innerHTML = `
        <div class="empty-cart">

            <h2>Failed to load cart</h2>

            <p>
                ${error.message}
            </p>

            <a href="index.html">
                Continue Shopping
            </a>

        </div>
    `;

}
 

}

// =========================
// Display Cart
// =========================

function displayCart(cart) {

 
if (
    !cart ||
    !cart.items ||
    cart.items.length === 0
) {

    cartContainer.innerHTML = `
        <div class="empty-cart">

            <h2>Your cart is empty 🛒</h2>

            <p>
                Add some products to your cart.
            </p>

            <a href="index.html">
                Continue Shopping
            </a>

        </div>
    `;

    return;
}


// Calculate Total

const totalAmount = cart.items.reduce(
    (total, item) => {

        return total +
            (item.product.price * item.quantity);

    },
    0
);


cartContainer.innerHTML = `

    <div class="cart-items">

        ${cart.items.map(item => `

            <div class="cart-item">

                <img
                    src="${item.product.image || 'https://via.placeholder.com/150'}"
                    alt="${item.product.name}"
                >

                <div class="cart-item-info">

                    <h3>
                        ${item.product.name}
                    </h3>

                    <p>
                        Price: Rs. ${item.product.price}
                    </p>


                    <!-- Quantity Controls -->

                    <div class="quantity-controls">

                        <button
                            onclick="updateQuantity(
                                '${item.product._id}',
                                ${item.quantity - 1}
                            )"
                            ${item.quantity <= 1 ? "disabled" : ""}
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="updateQuantity(
                                '${item.product._id}',
                                ${item.quantity + 1}
                            )"
                        >
                            +
                        </button>

                    </div>


                    <!-- Remove Button -->

                    <button
                        class="remove-button"
                        onclick="removeFromCart(
                            '${item.product._id}'
                        )"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `).join("")}

    </div>


    <!-- Cart Summary -->

    <div class="cart-summary">

        <h2>
            Cart Total
        </h2>

        <p>
            Total: <strong>Rs. ${totalAmount}</strong>
        </p>


        <button
            class="clear-cart-button"
            onclick="clearCart()"
        >
            Clear Cart
        </button>

    </div>

`;
 

}

// =========================
// Update Quantity
// =========================

async function updateQuantity(productId, quantity) {

 
if (quantity < 1) {
    return;
}


try {

    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                quantity: quantity
            })
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to update cart"
        );

    }


    console.log("Cart Updated:", data);

    displayCart(data.cart);


} catch (error) {

    console.error("Update Cart Error:", error);

    alert(error.message);

}
 

}

// =========================
// Remove Product
// =========================

async function removeFromCart(productId) {

 
const confirmRemove = confirm(
    "Are you sure you want to remove this product?"
);


if (!confirmRemove) {
    return;
}


try {

    const response = await fetch(
        `${API_URL}/${productId}`,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to remove product"
        );

    }


    console.log("Product Removed:", data);

    displayCart(data.cart);


} catch (error) {

    console.error("Remove Cart Error:", error);

    alert(error.message);

}
 

}

// =========================
// Clear Cart
// =========================

async function clearCart() {

 
const confirmClear = confirm(
    "Are you sure you want to clear your cart?"
);


if (!confirmClear) {
    return;
}


try {

    const response = await fetch(
        API_URL,
        {
            method: "DELETE",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to clear cart"
        );

    }


    console.log("Cart Cleared:", data);

    displayCart(data.cart);


} catch (error) {

    console.error("Clear Cart Error:", error);

    alert(error.message);

}
 

}
