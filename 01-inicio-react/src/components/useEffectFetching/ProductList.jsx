import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import LiCartProduct from "./LiCartProduct";

const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalCarrito, setTotalCarrito] = useState(0);

    useEffect(() => {
        fetchProducts();

    },[]);

    const fetchProducts = async () =>{

        try {
            const response = await fetch("http://localhost:5173/src/data/db.json");
            if(!response.ok){
                throw new Error("Error en la petición");
            }
            setProduct(await response.json());
            console.log(product);

        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    const addCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        // console.log(totalCart(cart));
    };

    const totalCart = (carrito) => {
        //debe recorrer el array carrito y sumar los precios de los productos
        return carrito.reduce((acc, product) => acc + product.precio, 0);
    };

    const removeCart = (product) => {
        const newCart = cart.filter((item)=> item.id !== product.id);
        setCart(newCart);
    };

  return (
    <>
    <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">Lista de Libros</h1>
        {/* Div que llama a productCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                product.map((product)=> 
                (
                    <ProductCard key={product.id} product= {product} addCart={addCart} />
                ))
            }
        </div>
        {/* Div que pinta el carrito de libros */}
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Carrito de Compras
            </h2>
            <p className="text-xl font-semibold text-center ">
                Total carrito: {totalCarrito}
            </p>

            {/* si el carrito esta vacio, renderizo el parrafo p y si no renderizo ul con los libros del carrito */}
            {
                cart.length === 0 ? 
                (
                    <p>El carrito está vacio</p>
                ) : 
                (
                    <ul>
                        {cart.map((product, index) =>(<LiCartProduct index={index} product={product}/>))}
                    </ul>
                )            
            }

            {/* Si el carrito no está vacio, renderizo con UL los libros del carrito */}
        </div>
    </div>
    </>
  )
}

export default ProductList