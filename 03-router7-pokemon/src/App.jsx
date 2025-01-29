import React from "react"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { PokemonProvider } from "./context/PokemonContext";
import { Toaster } from "sonner";


const App = () => {
  // cuando usemos REACT ROUTER DOM App solo deberia tener el ROUTER PROVIDER 
  // y el resto de cosas deberian de estar en RootLayout
  return (
    <PokemonProvider>
      <Toaster position="top-right" richColors duration={2000} />
      <RouterProvider router={router} />
    </PokemonProvider>
    );
};

export default App;