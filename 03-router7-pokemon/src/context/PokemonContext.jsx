import { createContext, useContext, useState } from "react";

//creacion del contexto
const PokemonContext = createContext();

//creacion del proveedor del contexto
export function PokemonProvider({ children }) {
    //hook
    const [favorites, setFavorites] = useState([]);
    
    const addToFavorites = (pokemon)=> {
        //verificamos ya esta en favoritos
        if(favorites.some (poke => poke.id === pokemon.id)){
            //Lanzamos error con sonner
            return;
        }
        //Sino esta repetido lo agrego
        setFavorites((preFavoritos)=>[...preFavoritos, pokemon]);
    };

    const removeFromFavorites = (pokemonId)=> {
    };

    //funcionalidades del provider

    return(
        <PokemonContext.Provider value={{}}>
            {children}
        </PokemonContext.Provider>
    );
}

//me creo un hooks personalizado para cargar el contexto
export const usePokemon = ()=> {
    //para usar el contexto hacia:
    const context = useContext(PokemonContext);
    if(context === undefined){
        throw new Error("No se ha encontrado el contexto PokemonProvider");
    }
    return context;
};
