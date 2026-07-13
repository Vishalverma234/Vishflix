console.log("Signup JS Loaded");
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const message = document.getElementById("message");

// Auto fill email from Get Started
const savedEmail = localStorage.getItem("email");

if (savedEmail) {
    emailInput.value = savedEmail;
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Empty Fields
    if (!name || !email || !password || !confirmPassword) {

        message.style.color = "red";
        message.textContent = "Please fill all fields.";
        return;
    }

    // Password Match
    if (password !== confirmPassword) {

        message.style.color = "red";
        message.textContent = "Passwords do not match.";
        return;
    }

    // Get Existing Users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check Duplicate Email
    const userExists = users.find(user => user.email === email);

    if (userExists) {

        message.style.color = "orange";
        message.textContent = "Email already registered.";
        return;
    }

    // Save User
    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "lime";
    message.textContent = "Account Created Successfully!";

    // Clear Get Started email
    localStorage.removeItem("email");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

});