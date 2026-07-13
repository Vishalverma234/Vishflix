const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

const container = document.getElementById("myListContainer");

const myList = JSON.parse(localStorage.getItem("myList")) || [];

if (myList.length === 0) {

    container.innerHTML = `
        <p class="empty-message">
            ❤️ No movies added to My List.
        </p>
    `;

} else {

    myList.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";

       card.innerHTML = `
     <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

     <h3>${movie.title}</h3>

     <p>⭐ ${movie.vote_average}</p>

     <button class="remove-btn" data-id="${movie.id}">
        🗑 Remove
     </button>
     `;
        container.appendChild(card);

    });

}
document.querySelectorAll(".remove-btn").forEach(button => {

    button.addEventListener("click", function () {

        const movieId = Number(this.dataset.id);

        let myList = JSON.parse(localStorage.getItem("myList")) || [];

        myList = myList.filter(movie => movie.id !== movieId);

        localStorage.setItem("myList", JSON.stringify(myList));

        location.reload();

    });

});
// Logout

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

});