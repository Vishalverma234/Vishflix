const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "login.html";
}

document.getElementById("userEmail").innerText =
    `Welcome, ${loggedInUser.name}`;

document.getElementById("logoutBtn").addEventListener("click", () => {

    const isLogout = confirm("Are you sure you want to logout?");

    if (isLogout) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

});


document.querySelector(".play-btn").addEventListener("click", () => {
    alert("Movie will play soon...");
});
const API_KEY = "25704c08dd525cf51b86c76a9bb57758";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

async function loadTrendingMovies() {

    try {

        const response = await fetch(
            `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );

        const data = await response.json();

        const container = document.getElementById("trendingMovies");

        container.innerHTML = "";

        data.results.slice(0, 10).forEach(movie => {

            const img = document.createElement("img");

            img.src = IMAGE_URL + movie.poster_path;

            img.alt = movie.title;

            img.title = movie.title;

            img.classList.add("movie-poster");

            container.appendChild(img);

        });

    } catch (error) {

        console.log(error);

    }

}


async function loadMovies(endpoint, containerId) {

    try {

        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}`
        );

        const data = await response.json();

        const container = document.getElementById(containerId);

        container.innerHTML = "";

        data.results.slice(0, 10).forEach(movie => {

            const img = document.createElement("img");

            img.src = IMAGE_URL + movie.poster_path;

            img.alt = movie.title;

            img.className = "movie-poster";

            img.addEventListener("click", () => {
            document.getElementById("watchTrailerBtn").onclick = () => {
            openTrailer(movie.id);
         };
         document.getElementById("addToListBtn").onclick = () => {
         addToMyList(movie);
           };

         document.getElementById("movieModal").style.display = "flex";

             document.getElementById("modalPoster").src =
             IMAGE_URL + movie.poster_path;

              document.getElementById("modalTitle").innerText =
                movie.title;

            document.getElementById("modalRating").innerText =
            movie.vote_average;

              document.getElementById("modalRelease").innerText =
            movie.release_date;
  
              document.getElementById("modalOverview").innerText =
                    movie.overview;

                 });

            container.appendChild(img);

        });

    } catch (error) {

        console.log(error);

    }

}
loadMovies("/trending/movie/week", "trendingMovies");

loadMovies("/movie/popular", "popularMovies");

loadMovies("/movie/top_rated", "topRatedMovies");

const modal = document.getElementById("movieModal");
const closeBtn = document.getElementById("closeModal");

closeBtn.onclick = function () {
    console.log("Close button clicked");
    modal.style.display = "none";
};
window.addEventListener("click", (event) => {

    const modal = document.getElementById("movieModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});
async function searchMovies() {

    const query = document.getElementById("searchInput").value.trim();

    if(query==="") return;

    const response = await fetch(

`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

    );

    const data = await response.json();

    const container = document.getElementById("searchResults");

    container.innerHTML="";

    data.results.slice(0,10).forEach(movie=>{

        const img=document.createElement("img");

        img.className="movie-poster";

        img.src = movie.poster_path
            ? IMAGE_URL + movie.poster_path
            : "images/no-image.png";

        img.onclick=()=>{

            document.getElementById("movieModal").style.display="flex";

            document.getElementById("modalPoster").src=img.src;

            document.getElementById("modalTitle").innerText=movie.title;

            document.getElementById("modalRating").innerText=movie.vote_average.toFixed(1);

            document.getElementById("modalRelease").innerText=movie.release_date || "Coming Soon";

            document.getElementById("modalOverview").innerText=movie.overview || "No description available.";

        };

        container.appendChild(img);

    });

}
document.getElementById("searchBtn").addEventListener("click", searchMovies);
document.getElementById("searchInput").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        searchMovies();

    }

});
async function openTrailer(movieId) {

    try {

        const response = await fetch(
            `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );

        const data = await response.json();

        const trailer = data.results.find(
            video =>
                video.type === "Trailer" &&
                video.site === "YouTube"
        );

        if (trailer) {

            window.open(
                `https://www.youtube.com/watch?v=${trailer.key}`,
                "_blank"
            );

        } else {

            alert("Trailer not available.");

        }

    } catch (error) {

        console.log(error);

    }

}
function addToMyList(movie) {

    let myList = JSON.parse(localStorage.getItem("myList")) || [];

    // Duplicate check
    const exists = myList.find(m => m.id === movie.id);

    if (exists) {
        alert("Movie already in My List ❤️");
        return;
    }

    myList.push(movie);

    localStorage.setItem("myList", JSON.stringify(myList));

    alert("Movie Added to My List ❤️");

}