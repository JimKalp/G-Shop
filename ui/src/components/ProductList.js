import React from 'react'
import Product from './Product'

const ProductList = ({ products }) => {
    return (
        <div>
            {products.map((product) => {
                return <Product product={product}/>
            })}
        </div>
    )
}

export default ProductList
