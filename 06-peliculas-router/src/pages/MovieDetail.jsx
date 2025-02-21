import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";
import { getMovieDetails, getMovieVideos } from "../services/tmdb";
import GridLoader from "../components/LoadingSpinner";
import { getImageURL  } from "../services/tmdb";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(() => getMovieDetails(id), [id]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (id) {
        const videos = await getMovieVideos(id);
        const trailerVideo = videos.results.find(
          (video) => video.type === "Teaser" && video.site === "YouTube"
        );
        if (trailerVideo) setTrailer(trailerVideo.key);
      }
    };

    fetchTrailer();
  }, [id]);

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
        <img
          src={getImageURL(data?.backdrop_path, "original")}
          alt={data?.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
          <div className="absolute bottom-2 text-white p-6">
            <h1 className="text-4xl font-bold">{data?.title}</h1>
          </div>
        </div>
      </header>
      <div className="grid md:grid-cols-3 gap-8 px-4">
        <div>
          <img 
            src={getImageURL(data?.poster_path)} 
            alt={data?.title}
            className="w-full rounded-lg mb-10"
          />
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-700">
            <span className="font-bold">
              {data?.release_date.split("-")[0]}
            </span>
            <span className="font-bold">
              {data?.runtime} min
            </span>
            <span className="font-bold">
              {Number(data?.vote_average).toFixed(1)}⭐
            </span>
          </div>
          <section>
            <h3 className="text-lg font-bold mb-2">Géneros</h3>
            <div className="flex flex-wrap gap-2">
              {data?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-2">Sinopsis</h2>
            <p className="text-gray-700">{data?.overview}</p>
          </section>
          <section className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Trailer oficial</h2>
            <div className="aspect-video">
              <iframe 
                title="Trailer" 
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${trailer}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
            <div className="space-y-4">
              {data?.reviews?.results?.length > 0 ? (
                data.reviews.results.map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-sky-700">{review.author}</h3>
                      <span className="text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-yellow-400 mb-2">
                      {"⭐".repeat(Math.round(review.author_details?.rating || 0))}
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay reseñas disponibles para esta película.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default MovieDetail;