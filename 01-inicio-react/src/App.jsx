import Contador from "./components/Contador"
import ContadorDoble from "./components/ContadorDoble"

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
  </div>

  )
}

export default App