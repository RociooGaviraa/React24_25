import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

const ProtectedRoute = () => {};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />,
          </ProtectedRoute>
        ),
      },
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);