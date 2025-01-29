import React from "react"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { PokemonProvider } from "./context/PokemonContext";


const App = () => {
  // cuando usemos REACT ROUTER DOM App solo deberia tener el ROUTER PROVIDER 
  // y el resto de cosas deberian de estar en RootLayout
  return (
    <PokemonProvider>
    <RouterProvider router={router} />
    </PokemonProvider>
    );
};

export default App;