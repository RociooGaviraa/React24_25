import { useEffect, useState } from 'react';

export const useFetch = (fetchFunction, dependencies=[]) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            //otra forma de ponerlo
            //setData(await fetchFunction());
            const result = await fetchFunction();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //es un objeto que me permite abortar una peticion fetch
        const abortController = new AbortController();
        //me pongo en modo de carga
        setLoading(true);
        //llamo a la funcion que me pasan los parametros
        fetchData();
        //limpiamos los errores
        setError(null);

        return () => {
            //se hara cuando se este desmontando el componente
            abortController.abort();
        };
    }, dependencies);
    
    return { data, loading, error };
};