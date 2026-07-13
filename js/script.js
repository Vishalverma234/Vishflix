// FAQ

const questions = document.querySelectorAll(".question");

questions.forEach(question => {
    question.addEventListener("click", () => {
        question.nextElementSibling.classList.toggle("show");
        question.querySelector(".icon").classList.toggle("rotate");
    });
});

// Get Started

const getStartedBtn = document.getElementById("getStartedBtn");

getStartedBtn.addEventListener("click", () => {

    const email = document.getElementById("emailInput").value.trim();

    if (email === "") {
        alert("Please enter your email.");
        return;
    }

    localStorage.setItem("email", email);

    window.location.href = "signup.html";

});