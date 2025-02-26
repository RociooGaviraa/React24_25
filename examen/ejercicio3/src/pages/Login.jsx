import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const { loginUser } = useAuth();
const navigate = useNavigate();

//para guardar dentro del estado
const handleChange = (e) => {
    const nombre = e.target.name;
    setFormData({...formData,[nombre]:e.target.value.trim()});
};

//voy a realizar una peticion a la API con los datos del formulario para verificar si el usuario existe y el password es correcto.
const handleSubmit = async (e) => {
    e.preventDefault();
    try {     
        //aqui hacemos el login
        await loginUser(formData);
        // redirigir a la página de productos si hay éxito
        navigate('dashboard');
    } catch(error){ 
        console.log("Error al iniciar sesión", error);
    }
};

  return (
    <div className='max-w-md mx-auto my-10 p-5 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-center text-gray-800'>
            INICIAR SESION
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor="email" className='block text-xl font-semibold text-gray-900'>
                    Correo Electrónico
                </label>
                <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} required 
                className='w-full px-4 py-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'/>
            </div>
            <div>
                <label htmlFor="password" className='block text-xl font-semibold text-gray-900'>
                    Password
                </label>
                <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} required
                className='w-full px-4 py-2 text-lg text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'/>
            </div>
            <button type='submit' 
            onClick={handleSubmit}
            className='w-full px-4 py-2 text-lg text-blue-900 border border-blue-300 rounded-lg focus:outline-none focus:border-gray-500'>
                Iniciar Sesión
            </button>
        </form> 
    </div>
  )
}

export default Login