$(document).ready(function () {
    $("#search-form").on("submit", (e) => {
        let pelicula = $("#buscador").val();
        getMovies(pelicula);
        e.preventDefault();
    });
});

function getMovies(pelicula) {
    //Consulta a la api de OMDBAPI, por get.
    axios
        .get(`http://www.omdbapi.com/?s=${pelicula}&apikey=5947cd1a`)
        //Estructura de promesas.
        .then((response) => {
            console.log(response);
            let peliculas = response.data.Search;
            let output = "";
            $.each(peliculas, (index, movie) => {
                output += ` 
                <div class="col-md-4 col-sm-6 col-lg-3 caja mt-2 my-4">
                    <div class="container2 text-center">
                        <img src="${movie.Poster}">
                        <h5 class="lead text-white my-3">${movie.Title}</h5>
                        <button onclick="movieSelected('${movie.imdbID}')" class="btn btn-info" autofocus>Ver Mas</button>
                    </div>
                </div>
            `;
            });

            $("#peliculas").html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

function movieSelected(id) {
    try {
        sessionStorage.setItem("movieId", id);
        window.location = "./movie.html";
        return false;
    } catch (error) {
        console.error({ error: error.message });
    }
}

async function getMovie() {
    let movieID = sessionStorage.getItem("movieId");
    console.log(movieID);

    await axios
        .get(`http://www.omdbapi.com/?i=${movieID}&apikey=5947cd1a`)
        //Estructura de promesas.
        .then((response) => {
            let movie = response.data;


            console.log(movie.Poster);
            let output = `
            <div class="row">
                <div class="col-md-4 center">
                    <img src="${movie.Poster}" class="image">
                </div>
                <div class="col-md-8">
                    <h2 class="text-light my-3">${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genero:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strongLanzamiento:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Valoración:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director/es:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Escritor/es:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actor/es:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3 class="text-light">Trama</h3>
                        <p class="text-light lead">${movie.Plot}</p>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">Ver en IMDB</a>
                        <a href="javascript: history.go(-1)" class="btn btn-warning text-light">Volver</a>
                    </div>
                </div>
            </div>
        `;

            $("#pelicula").html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}
