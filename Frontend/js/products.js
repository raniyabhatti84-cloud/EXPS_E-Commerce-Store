const API_URL = "http://localhost:5000/api/products";

const productsContainer = document.getElementById("products-container");

// Get Products
async function getProducts() {
    try {
        const response = await fetch(API_URL);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch products");
        }

        displayProducts(data.products);

    } catch (error) {
        console.error("Error:", error);

        productsContainer.innerHTML = `
            <p>Failed to load products.</p>
        `;
    }
}


// Display Products
function displayProducts(products) {

    if (!products || products.length === 0) {
        productsContainer.innerHTML = `
            <p>No products available.</p>
        `;

        return;
    }

    productsContainer.innerHTML = products.map(product => `
        
        <div class="product-card">

            <img 
                src="${product.image || 'https://via.placeholder.com/300'}"
                alt="${product.name}"
            >

            <h3>${product.name}</h3>

            <p>${product.description || "No description available"}</p>

            <p class="product-price">
                Rs. ${product.price}
            </p>

            <button>
                View Details
            </button>

        </div>

    `).join("");
}


// Load products when page opens
getProducts();