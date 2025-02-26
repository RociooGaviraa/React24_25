import React from 'react'
import { ProductProvider } from './context/ProductContext'
import ProductList from '../../ejercicio1/src/components/ProductList'

const App = () => {
  return (
    <div>
      <ProductProvider>
        <ProductList/>
      </ProductProvider>
    </div>
  )
}

export default App