// import Contador from "./components/Contador"
// import ContadorDoble from "./components/ContadorDoble"
import { useState } from "react";
import Hijo from "./components/parametros/Hijo"
import Padre from "./components/parametros/Padre"

const initialStateInfo= {nombre:"Rocio", edad:15, isAdmin:false};

const App = () => {
  const [info, setInfo] = useState(initialStateInfo);

  const handleClickEdad = () => {
    setInfo((prevInfo)=> ({...prevInfo, edad:prevInfo.edad + 1}))
  };
  return (
    <>

    {/* <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold text-center mb-8">
      {""}
      Ejemplos de componentes y estados en React
    </h1>
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Contador Simple
        </h2>
        <Contador/>
    </div>
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Contador Doble
      </h2>
      <ContadorDoble/>
    </div>
  </div> */}

  <p>El nombre es: {info.nombre}</p>
  <p>La edad es: {info.edad}</p>
  <Padre info={ info } setInfo={ setInfo } handleClickEdad={handleClickEdad} >

    <Hijo info={info} handleClickEdad={handleClickEdad}/>

  </Padre>


  </>

  );
};

export default App