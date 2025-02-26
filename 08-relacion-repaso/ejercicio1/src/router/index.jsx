import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import ProtectedRoute from "../components/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <div>Register</div>,
      },
      // rutas de productos
      {
        path: "products",
        element: <div>Products</div>,
      },
      {
        path: "products/:id",
        element: <div>Products detail </div>,
      },
            {
        path:"products/create",
        element: (
          <ProtectedRoute>
            <ProductPage action="create" />
          </ProtectedRoute>
        )
        
      },
      {
        path: "products/:id/edit",
        element: (
          <ProtectedRoute>
            <ProductPage action="edit" />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id/delete",
        element: (
          <ProtectedRoute>
            <ProductPage action="delete" />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
