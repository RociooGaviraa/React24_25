
function Hijo(props) {
    const { info, handleClickEdad }=props;

  return (
    <>
    <div>Eres Hijo de {info.nombre}</div>
    <div>
        <button onClick={handleClickEdad}>Aumentar edad desde hijo</button>
    </div>
    </>
  );
};

export default Hijo