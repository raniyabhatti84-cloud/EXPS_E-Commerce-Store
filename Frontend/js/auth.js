const API_URL = "http://localhost:5000/api/auth";


// =========================
// Register
// =========================

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        const message = document.getElementById("register-message");

        try {
            message.textContent = "Creating account...";

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            message.textContent = "Registration successful!";

            registerForm.reset();

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);

        } catch (error) {

            console.error("Register Error:", error);

            message.textContent = error.message;
        }
    });
}


// =========================
// Login
// =========================

const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim();

        const password = document
            .getElementById("login-password")
            .value;

        const message = document.getElementById("login-message");

        try {
            message.textContent = "Logging in...";

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            // Save JWT token
            localStorage.setItem("token", data.token);

            // Save user information if available
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            message.textContent = "Login successful!";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        } catch (error) {

            console.error("Login Error:", error);

            message.textContent = error.message;
        }
    });
}