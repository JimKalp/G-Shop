import React from 'react'

const Product = ({ product }) => {
    return (
        <div>
            <p>{product.id}, {product.price}, {product.category}</p>
        </div>
    )
}

export default Product
