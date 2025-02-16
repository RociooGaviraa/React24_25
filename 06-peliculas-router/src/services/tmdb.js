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
export const getPopularMovies = async (page=1) => {
    return await fetchFromAPI("/movie/popular", {page});
};
//funcion para obtener las peliculas por su id
export const getMovieDetails = async (id) => {
    return await fetchFromAPI(`/movie/${id}`);
};
//funcion para obtener las imagenes de las peliculas
export const getImageURL = (path, size = SIZE.POSTER) => {
    return `${BASE_IMAGE_URL}/${size}${path}`;
};
//funcion para obtener las peliculas con video por su id
export const getMovieVideos = async (id) => {
    return await fetchFromAPI(`/movie/${id}/videos`);
};