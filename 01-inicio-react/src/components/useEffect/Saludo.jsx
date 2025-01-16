import { useEffect, useState } from "react";

const Saludo = () => {
    const [edad, setEdad] = useState(0);
    const [sexo, setSexo] = useState('M');

    // useEffect(() => {
    //     console.log("Renderizando al montar el componente");
    // });

    // useEffect(() => {
    //     console.log("Renderizando solo al montar el componente");
    // },[]);

    useEffect(() => {
        console.log("Renderizamos al montar el componente y cuando modifique el estado sexo");
    },[sexo]);

    const handleClickEdad = () => {
        setEdad((prevEdad)=> prevEdad +1 );
    };

    const handleClickSexo = () => {
        setSexo((prevSexo)=> prevSexo === 'M' ? 'F' : 'M');
    };

  return (
    <>
    <p>Edad: {edad}</p>
    <button onClick={handleClickEdad}>Aumentar edad</button>
    <p>Sexo: {sexo}</p>
    <button onClick={handleClickSexo}>Cambiar sexo</button>

    </>
  );
};

export default Saludo