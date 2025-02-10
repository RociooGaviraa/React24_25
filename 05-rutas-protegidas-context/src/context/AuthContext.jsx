import { createContext, useContext, useState } from "react";

//creo el contexto
const AuthContext = createContext();

//creo el provider
export const AuthProvider = ( {children} ) => {
    const [isAutenticated, setIsAutenticated] = useState(false);
    //hacer el login
    //simulo el login, si existe el token en el localstorage con valor true, entonces el usuario esta logeado
    // const login = () => {
    //     if(JSON.parse(localStorage.getItem('token')) === true) {
    //         setIsAutenticated(true);
    //         return;
    //     }else{
    //         localStorage.setItem('token', JSON.stringify(true));
    //     }
    // }
    const login = () => {
        console.log("haciendo el login");
        setIsAutenticated(true);
        localStorage.setItem('token', JSON.stringify(true));
    }
    //hacer el logout
    const logout = () => {
        setIsAutenticated(false);
        localStorage.remove('token');
    }
    return (
        <AuthContext.Provider value={{isAutenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

//creo un hook personalizado para exportar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Error en el contexto");
    }
    return context;
}