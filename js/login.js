const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Local Storage se users nikalo
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Email aur password match karo
    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {

        // Logged in user save karo
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login Successful!");

        // Home page par redirect
        window.location.href = "home.html";

    } else {

        alert("Invalid Email or Password");

    }

});