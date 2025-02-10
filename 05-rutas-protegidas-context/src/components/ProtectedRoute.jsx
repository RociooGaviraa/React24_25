import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
  const { isAutenticated } = useAuth();
  console.log("Authenticated es: ",isAutenticated);

  if(!isAutenticated){
    //lo mando a la pagina del login / 
    return <Navigate to="/" replace={true}/>;
  }else{
    //si puedes pasar, entonces children
    return children;
  }

};

export default ProtectedRoute;
