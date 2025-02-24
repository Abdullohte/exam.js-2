const movieForm = document.querySelector("#form");
const movieInput = document.querySelector("#input");
const movieSelect = document.querySelector("#select");
const movieOta = document.querySelector("#moviesWrapper");

function renderMovies(kino) {
    movieOta.innerHTML = "";

    kino.slice(0, 40).forEach(objectlar => {
        const newItem = document.createElement("li");
        newItem.className = "w-[400px] bg-[#fff] rounded flex flex-col items-center p-4 shadow-lg";

        newItem.innerHTML = `
                <img class = "mails" src="https://newcdn.igromania.ru/mnt/articles/1/f/7/9/c/3/31493/preview/cd17628744994af8_original.webp" alt="${objectlar.title}" class="w-full h-[300px] object-cover rounded">
                <h2 >${objectlar.Title}</h2>
                <div stylle="width:200px; ">
                    <span> ${objectlar.imdb_rating}</span>
                    <span> ${objectlar.movie_year}</span>
                    <span> ${objectlar.runtime} min</span>
                </div>
                <p class="bro text-sm text-gray-500 mt-2">${objectlar.Categories}</p>
            `;

        movieOta.appendChild(newItem);
    });
}
renderMovies(movies);
movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputQiymati = movieInput.value.toLowerCase().trim();

    const filterlanganKinolar = movies.filter(movie =>
        movie.Title && typeof movie.Title === "string" && movie.Title.toLowerCase().includes(inputQiymati)
    );

    renderMovies(filterlanganKinolar);
});
movieSelect.addEventListener("change", () => {
    let sortedMovies = [...movies];

    if (movieSelect.value === "az") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (movieSelect.value === "za") {
        sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    }

    renderMovies(sortedMovies);
});
const genreSelect = document.querySelector("#genreSelect");



genreSelect.addEventListener("change", () => {
    const selectedGenre = genreSelect.value; 
    let filteredMovies = [];

    if (selectedGenre === "all") {

        filteredMovies = movies;
    } else {

        filteredMovies = movies.filter(movie => 
            movie.Categories && movie.Categories.split("|").map(g => g.trim()).includes(selectedGenre)
        );
    }


    movieOta.innerHTML = "";


    renderMovies(filteredMovies);
});
