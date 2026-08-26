const API_URL = "http://localhost:5000/api/products";

const productContainer = document.getElementById(
    "product-details-container"
);

// Get Product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Get Product Details
async function getProductDetails() {
    try {
        if (!productId) {
            throw new Error("Product ID not found");
        }

        const response = await fetch(`${API_URL}/${productId}`);

        const data = await response.json();

        console.log("Product Response:", data);

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

// Display Product
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

            </div>

        </div>
    `;
}

// Load Product
getProductDetails();