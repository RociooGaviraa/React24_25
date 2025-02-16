import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import RootLayout from "../layouts/RootLayout";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import Reviews from "../pages/Reviews";
import Search from "../pages/Search";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        error: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "movies",
                element: <MovieList />,
            },
            {
                path: "movie/:id",
                element: <MovieDetail />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "reviews",
                element: <Reviews />,
            },
            {
                path: "favorites",
                element: <Favorites />,
            }  
        ]
    }

])