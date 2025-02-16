import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRouter from '../components/ProtectedRouter';
import Dashboard from '../pages/Dashboard';
import RootLayout from '../layout/RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRouter>
                        <Dashboard />
                    </ProtectedRouter>
                ),
            }
        ],
    }
]);