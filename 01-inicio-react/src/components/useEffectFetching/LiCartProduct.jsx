
const LiCartProduct = (props) => {
  const { product, index } = props;
  return (
    <li className="bg-gray-300 shadow-lg rounded-lg p-6 flex flex-grow justify-between mb-8" 
    key={index}>
      <span className="text-xl text-blue-500 font-semibold">
        {product.titulo}
      </span>
      <span className="text-2xl text-green-800 font-semibold">
      {product.precio}
      </span>
      <button className="bg-slate-600 hover:bg-slate-900 px-4 py-2 rounded-lg text-white">Quitar del carrito</button>
    </li>
  )
}

export default LiCartProduct;