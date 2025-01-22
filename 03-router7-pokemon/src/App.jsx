import React from "react"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";


const App = () => {
  // cuando usemos REACT ROUTER DOM App solo deberia tener el ROUTER PROVIDER 
  // y el resto de cosas deberian de estar en RootLayout
  return (
    <RouterProvider router={router} />

    );
};

export default App;