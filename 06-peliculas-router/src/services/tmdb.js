const API_KEY=import.meta.env.VITE_API_KEY;
const BASE_URL=import.meta.env.VITE_BASE_URL;
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

//tamaños de las imagenes
export const SIZE = {
    POSTER: "w500",
    ORIGINAL: "original",
}
//funcion para hacer fetch a la API, opciones
const fetchFromAPI = async (endpoint, options = {}) => {
    try{
        //https://api.themoviedb.org/3/movie/popular?api_key=ea94b631548a7f5e84625b7f51b7ab11&language=es-ES
        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES&${new URLSearchParams(options)}`
        );
        if(!response.ok){
            throw new Error("Error en la petición a la API");
        }
        const data = await response.json();
        return data;

    }catch(error){   
        console.error(error);
        throw error;
    }
};
//funcion para obtener las peliculas populares/favoritas
export const getPopularMovies = async (page) => {
    return await fetchFromAPI("/movie/popular", {page});
};
//funcion para obtener los detalles de una pelicula por su id
export const getMovieDetails = async (id) => {
  return await fetchFromAPI(`/movie/${id}`, {
    append_to_response: 'reviews'
  });
};

//funcion para obtener las imagenes de las peliculas
export const getImageURL = (path, size = SIZE.POSTER) => {
    return `${BASE_IMAGE_URL}/${size}${path}`;
};
//funcion para obtener las peliculas con video por su id
export const getMovieVideos = async (id) => {
    return await fetchFromAPI(`/movie/${id}/videos`);
};
//funcion para hacer busqueda de peliculas
export const searchMovies = async (query) => {
  return await fetchFromAPI('/search/movie', { query });
};
  
//funcion para obtener todas las peliculas
export const getAllMovies = async (page = 1, sortBy = "popularity.desc") => {
  return await fetchFromAPI("/discover/movie", { page, sort_by: sortBy });
};
//funcion para obtener las peliculas por año
export const getMoviesByYear = async (year, page = 1) => {
  return await fetchFromAPI('/discover/movie', {
    primary_release_year: year,
    page,
    sort_by: 'popularity.desc'
  });
};
//funcion para obtener las peliculas por puntuación
export const getMoviesByRating = async (rating, page = 1) => {
  return await fetchFromAPI('/discover/movie', {
    'vote_average.gte': rating,
    'vote_count.gte': 100,
    page,
    sort_by: 'vote_average.desc'
  });
};
//funcion para obtener los idiomas disponibles
export const getLanguages = async () => {
  return await fetchFromAPI('/configuration/languages');
};

//funcion para obtener películas por idioma
export const getMoviesByLanguage = async (language, page = 1) => {
  return await fetchFromAPI('/discover/movie', {
    with_original_language: language,
    page,
    sort_by: 'popularity.desc'
  });
};
