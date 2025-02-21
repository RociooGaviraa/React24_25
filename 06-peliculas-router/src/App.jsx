import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { FavoritesProvider } from './contexts/FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />;
    </FavoritesProvider>
  );
};

export default App;