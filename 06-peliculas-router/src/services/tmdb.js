const API_KEY=import.meta.env.VITE_API_KEY;
const BASE_URL=import.meta.env.VITE_BASE_URL;
const BASE_IMAGE_URL = import.meta.env.VITE_BASE_IMAGE_URL;

//tamaños de las imagenes
export const SIZE = {
    POSTER: "w500",
    ORIGINAL: "original",
}

//funcion para hacer fetch a lla API, opciones
const fetchFromAPI = async (endpoint, options = {}) => {
    try{ 
        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=es-ES`
        );
        if(!response.ok){
            throw new Error("Error en la petición a la API");
        }
        const { results } = await response.json();
        return results;

    }catch(error){   
        console.error(error);
        throw error;
    }
};

//funcion para obtener las peliculas populares/favoritas
export const getPopularMovies = async () => {
    return await fetchFromAPI("/movie/popular");
};

export const getMovieDetails = async (id) => {
    return await fetchFromAPI(`/movie/${id}`);
};

export const getMovieVideos = async (id) => {
    return await fetchFromAPI(`/movie/${id}/videos`);
};