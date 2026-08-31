const API_URL = "http://localhost:5000/api/orders";

const ordersContainer =
document.getElementById("orders-container");

const token =
localStorage.getItem("token");

// =========================
// Check Login
// =========================

if (!token) {

  
ordersContainer.innerHTML = `
    <div class="empty-orders">

        <h2>
            Please Login
        </h2>

        <p>
            You need to login to view your orders.
        </p>

        <a href="login.html">
            Login
        </a>

    </div>
`;
  

} else {

  
getOrders();
  

}

// =========================
// Get User Orders
// =========================

async function getOrders() {

  
try {

    const response = await fetch(
        API_URL,
        {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );


    const data = await response.json();

    console.log(
        "Orders Response:",
        data
    );


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to load orders"
        );

    }


    displayOrders(data.orders);


} catch (error) {

    console.error(
        "Orders Error:",
        error
    );


    ordersContainer.innerHTML = `
        <div class="empty-orders">

            <h2>
                Failed to load orders
            </h2>

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
// Display Orders
// =========================

function displayOrders(orders) {

  
if (
    !orders ||
    orders.length === 0
) {

    ordersContainer.innerHTML = `
        <div class="empty-orders">

            <h2>
                No Orders Yet 📦
            </h2>

            <p>
                You haven't placed any orders yet.
            </p>

            <a href="index.html">
                Start Shopping
            </a>

        </div>
    `;

    return;
}


ordersContainer.innerHTML = orders.map(
    (order, index) => {

        const orderDate =
            new Date(
                order.createdAt
            ).toLocaleDateString();


        const orderTotal =
            Number(order.totalAmount || 0);


        return `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <h2>
                            Order #${index + 1}
                        </h2>

                        <p>
                            Date: ${orderDate}
                        </p>

                    </div>


                    <span class="order-status">
                        ${order.status || "Pending"}
                    </span>

                </div>


                <div class="order-items">

                    ${
                        order.items.map(item => `

                            <div class="order-item">

                                <div class="order-product">

                                    ${
                                        item.product
                                            ? `
                                                <img
                                                    src="${
                                                        item.product.image ||
                                                        'https://via.placeholder.com/100'
                                                    }"
                                                    alt="${item.product.name}"
                                                >

                                                <div>

                                                    <h3>
                                                        ${item.product.name}
                                                    </h3>

                                                    <p>
                                                        Price:
                                                        Rs. ${item.price}
                                                    </p>

                                                </div>
                                            `
                                            : `
                                                <div>

                                                    <h3>
                                                        Product unavailable
                                                    </h3>

                                                </div>
                                            `
                                    }

                                </div>


                                <div class="order-quantity">

                                    Qty:
                                    ${item.quantity}

                                </div>


                                <div class="order-item-total">

                                    Rs.
                                    ${
                                        Number(item.price) *
                                        Number(item.quantity)
                                    }

                                </div>

                            </div>

                        `).join("")
                    }

                </div>


                <div class="order-footer">

                    <strong>
                        Total:
                        Rs. ${orderTotal}
                    </strong>

                </div>

            </div>

        `;

    }
).join("");
  

}
