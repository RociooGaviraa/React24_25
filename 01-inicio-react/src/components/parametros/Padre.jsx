
const Padre = (props) => {
    let { info, setInfo, children, handleClickEdad } = props;

    const handleClick = () => {
        setInfo({... info, nombre:"Miguel"})
    };
    

  return (
    <>
    <section>
        <h2>Bienvenido {info.nombre}</h2>
        <p>Edad: {info.edad}</p>
        {info.isAdmin && (<p>Es Administrador</p>)}
        {info.edad <18
        ? <p>Eres menor de edad</p>
    
        : <p>Eres mayor de edad</p>}

        <div>
            <button onClick={handleClick}>Modificar</button><br/>
            <button onClick={handleClickEdad}>Aumentar Edad</button>
        </div>
    </section>
    <section>
        {children}
    </section>
    </>

  );
};

export default Padre