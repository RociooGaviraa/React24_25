import { createBrowserRouter } from 'react-router-dom';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductsDetails from "../pages/ProductsDetails";
import ErrorPage from "../pages/ErrorPage";
import RootLayout from '../layout/RootLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import ProductList from '../components/ProductList';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />, // Corregido: errorElement en lugar de error
        children: [
            {
                index: true, // Página por defecto
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "/api/products",
                element: <ProductList />,
            },
            {
                path: "products/:id", // Corregido: sin espacio después de ":id"
                element: <ProductsDetails />,
            },
            {
                path: "products/new",
                element: (
                    <ProtectedRoute>
                        <Products action="new" />
                    </ProtectedRoute>
                ),
            },
            {
                path: "products/:id/edit",
                element: (
                    <ProtectedRoute>
                        <Products action="edit" />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);