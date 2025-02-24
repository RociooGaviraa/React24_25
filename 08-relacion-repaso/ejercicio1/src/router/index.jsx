import { createBrowserRouter } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductsDetails from "../pages/ProductsDetails";
import ErrorPage from "../pages/ErrorPage";
import PageLayout from '../layout/PageLayout';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        error: <ErrorPage />,
        children: [
            {
                index: true, //significa que es la pagina por defecto si no se especifica nada
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "products/:id ",
                element: <ProductsDetails/>,
            },
            //crear un nuevo
            {
                path:"products/new",
                element: (
                    //TENGO QUE CREAR ESTOS COMPONENTES
                    <ProtectedRoute>
                        <Products action="new" />
                    </ProtectedRoute>
                )
            },
            {
                path:"products/:id/edit",
                element: (
                    <ProtectedRoute>
                        <Products action="edit" />
                    </ProtectedRoute>
                )
            }

        ],
    },
])