import { useState } from "react";

const ContadorDoble = () => {

    //hooks
    const [friends, setFriends] = useState({
        Juan:0,
        Carlos:0,
        Maria:0,
    });

    //variables

    //funciones
    function handleClickLikes(nombre, likes) {
        if (likes > 0 ) {
            setFriends((preValue)=>{
                return {...preValue, [nombre]: preValue[nombre] + likes};
            });
        } else if (likes < 0 && friends[nombre] > 0) {
            setFriends((preValue)=>{
                return {...preValue, [nombre]: preValue[nombre] + likes};
            });
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5 text-center">
            Contador de Like de mis amigos
        </h1>
        <div className="text-center mt-4">
            <span>
                Juan tiene <strong>{friends.Juan}</strong> likes
            </span>
            <div className="flex justify-center gap-4 mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={()=>handleClickLikes("Juan",1)}>
                    Me gusta
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={()=>handleClickLikes("Juan",-1)}>
                    No me gusta
                </button>
            </div>
        </div>
        <div className="text-center mt-4">
            <span>
                Maria tiene <strong>{friends.Maria}</strong> likes
            </span>
            <div className="flex justify-center gap-4 mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={()=>handleClickLikes("Maria",1)}>
                    Me gusta
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={()=>handleClickLikes("Maria",-1)}>
                    No me gusta
                </button>
            </div>
        </div>            
    </div>
  );
};

export default ContadorDoble;

//crear una etiqueta p que me haga la media aritmetica de los likes que tenemos