import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    //estado para almacenar el usuario logeado
    const [user, setUser] = useState(null);
    //verificar si el usuario está logeado o tengo un token 
    const [isLogin, setIsLogin] = useState(false);
    //si estoy haciendo el fetching y loading la data??
    const [isLoading, setIsLoading] = useState(true);
    //si hay un error en el login
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth();
    }, [])
    
    //funcion para verificar si el usuario está logeado porque existe el token en localStorage
    const checkAuth = () => {
        try {
            const token = localStorage.getItem('token');
            if(token) {
                //aqui volveré para decodificar el token y hacer uso si es necesario
                //
                // const token = JSON.parse(localStorage.getItem('token'));
                setIsLogin(true);
            }
        } catch (error) {   
            console.log("Error al verificar el usuario logueado", error.message);
            setError(error.message);
        }finally{
            setIsLoading(false);
        }
    }

    const value = { user, isLogin, isLoading, error};

    return <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>;

}