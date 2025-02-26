import { createContext, useEffect, useState } from "react";



export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // estado para almacenar la info del usuario  logueado
const [user, setUser] = useState(null)
  //  verificar si el usuario esta logueado o tengo un token
const [isLogin, setIsLogin] = useState(false)
// estoy haciendo feching y loading la data??
const [isLoading, setIsLoading] = useState(true)
// si hay un error en el login
const [error, setError] = useState(null)

useEffect(() => {
  checkAuth()
}, [])

// funcion para verificar si el usuario esta logueado porque existe el token en el localstorage
const checkAuth = () => {
  try {
    const token = localStorage.getItem('token')
    if(token){
      // aquí volveré para decodificar el token y hacer uso si es necesario
      // const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      // setUser(userInfo)
      setIsLogin(true)
    }
  } catch (error) {
    console.log("Error al verificar el usuario logueado", error.message)
    setError(error.message)
  } finally {
    setIsLoading(false)
  }
}


  const value = {user,isLoading,error,isLogin}

  return  <AuthContext.Provider value={value }>{children}</AuthContext.Provider>;
}