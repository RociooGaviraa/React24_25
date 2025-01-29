import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

//Para traer la ruta que llega a este componente
//Usamos useParams y useNavigate

const PokemonDetail = () => {
  //pokemon trae la data a traves de la funcionalidad loader de react-router-dom
  const pokemon = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Botón para volver hacia atras */}
        <button className="mb-4 text-blue-400 hover:underline"
        onClick={() => navigate(-1)}>
          Volver
        </button>
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} 
        className='w-48 h-48 mx-auto'/>
        <h1 className='text-3xl font-bold text-center mt-4'>
          {pokemon.name}
        </h1>
        {/* Información dentro de un grid */}
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>
              Estadisticas
            </h2>
            {
              pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <p className='capitalize'>
                    {stat.stat.name}:{stat.base_stat}
                  </p>
                </div>
              ))
            }
          </div>
          <div>
          <h2 className='text-xl font-semibold mb-2'>
            Tipos
          </h2>
          <div>
            {pokemon.types.map((type) => (
              <p key={type.type.name} className='capitalize'>
                {type.type.name}
              </p>
            ))}
          </div>
          </div>
          <button 
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-slate-900' 
          onClick={()=>{
            console.log("Añadir a favoritos");
          }}>
            Añadir a favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail