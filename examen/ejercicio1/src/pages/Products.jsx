import React from 'react'
import { useParams } from 'react-router-dom'

const Products = ({ action }) => {
  const { id } = useParams();
  return (
    <div>
      Product action : {action} - Product ID: {id}
    </div>
  )
}

export default Products