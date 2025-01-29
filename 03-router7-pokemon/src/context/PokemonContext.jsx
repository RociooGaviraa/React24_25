import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

//creacion del contexto
const PokemonContext = createContext();

//creacion del proveedor del contexto
export function PokemonProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // useEffect(() => {
    //   console.log(favorites);
    // }, [favorites])
    
    //hook
    
    const addToFavorites = (pokemon)=> {
        //verificamos ya esta en favoritos
        if(favorites.some(poke => poke?.id === pokemon.id)){
            //Lanzamos error con sonner
            toast.error(`${pokemon.name} ya está en tus favoritos.`, {
                style:{
                    backgroundColor: "red",
                    color: "white",
                    border: "2px solid red"
                },
                icon:"⭐"
            });
            return;
        }
        //Sino esta repetido lo agrego
        setFavorites((preFavorites)=>[...preFavorites, pokemon]);
        //sonner de todo 
        toast.info(`${pokemon.name} añadido a favoritos.`, {
            style:{
                backgroundColor: "green",
                color: "white",
                border: "2px solid green"
            },
            icon:"⭐"
        });

    };

    const removeFromFavorites = (pokemonId)=> {
        setFavorites((preFavorites)=> preFavorites.filter((p) => p?.id!== pokemonId));
    toast.error(`${pokemon.name} ya está eliminado.`, {
        style:{
            backgroundColor: "red",
            color: "white",
            border: "2px solid red"
        },
        icon:"🗑️"
    });
    };

    //funcionalidades del provider

    return(
        <PokemonContext.Provider value={{favorites, addToFavorites, removeFromFavorites}}>
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
