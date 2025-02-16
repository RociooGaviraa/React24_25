import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";
import { getMovieDetails } from "../services/tmdb";
import GridLoader from "../components/LoadingSpinner";
import { getImageURL } from "../services/tmdb";


const MovieDetail = () => {

  const { id } = useParams();
  const { data, loading, error } = useFetch( () => getMovieDetails(id), [id]);

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-700">
          Error al cargar la película {error}
        </p>
      </div>
    ); 
  }

  if (loading) {
    return <GridLoader color="#327fa9"/>  
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="relative h-96 mb-8">
        <img src={getImageURL(data?.backdrop_path,"original")} alt={data?.title}
        className="w-full h-full object-cover rounded-lg"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <div className="absolute bottom-2 text-white p-6">
            <h1 className="text-4xl font-bold">
              {data?.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <section className="grid md:grid-cols-3 gap-8">
        {/* Poster */}
        <div >
          <img src={getImageURL(data?.poster_path)} alt={data?.title}
          className="w-full rounded-lg mb-10"/>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex item gap-4 text-sm text-gray-700">
          <span className="font-bold mt-4">
            {data?.release_date?.split('-')[0]}
          </span>
          <span className="font-bold mt-4">
            {data?.runtime} min
          </span>
          <span className="font-bold mt-4">
            {Number(data?.vote_average).toFixed(1)} ⭐ 
          </span>
          </div>
{/* SEGUNDA COLUMNA */}
          <section>
            generos
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Sinopsis
            </h2>
            <p>
              {data?.overview}
            </p>
          </section>
        </div>
      </section>
    </article>
  );
};

export default MovieDetail;