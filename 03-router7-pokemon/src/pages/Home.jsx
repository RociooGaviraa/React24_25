import React, { useEffect, useState } from 'react'

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    fetchPokemons();
  }, []);
  
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      if (!response.ok){
        throw new Error("Error al cargar los pokemones");
      }
      const data = await response.json()
      //Obtenemos los datos de los pokemons en paralelo
      const pokemonsDetails = await Promise.all(
        data.results.map( async  (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(pokemonsDetails);
    } catch(error) {
      console.log("Error fetchingPokemon");
    }
    finally{
      setLoading(false);
    }
    };

  return (
    <div className='container mx-auto p-'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Pokemons Disponibles</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        {
          pokemons.map(pokemon => (
            <div 
            key={pokemon.id} 
            className='bg-white rounded-xq p-6 hover:shadow-sm'
            >
              <div className=''>
                <img 
                className = "mx-auto"
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}/>
                <h2 className="text-xl font-bold text-center mt-4">{pokemon.name}</h2>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home