import { Link } from "react-router-dom"
import { getImageURL } from "../services/tmdb"

const MovieCard = ({ movie }) => {

  return (
    <div>
        <Link to={`/movie/${movie?.id}`} className="group">
        <article className="card transform transition-transform duration-200 group-hover:scale-105">
            <div className="relative aspect-[2/3]">
                <img src={getImageURL(movie?.poster_path)} alt={movie?.title}  
                className="w-full h-full object-cover rounder-lg"
                loading="lazy"/>
                <div className="absolute top-2 right-4 bg-black text-white px-2 py-4 rounded-lg">
                  {/* Puntuación */}
                  ⭐ {Number(movie?.vote_average).toFixed(1)}
                </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-sky-800 group-hover:text-blue-700">
                {movie?.title}
              </h3>
              <p className="">
                {movie?.release_date.split("-")[0]}
              </p>
            </div>
        </article>
        </Link>
    </div>
  )
}

export default MovieCard;