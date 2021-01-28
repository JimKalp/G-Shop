import React from 'react'

const Product = ({ product }) => {
    return (
        <div className="container">
                <p>{product.image}</p>
                    <div className="card-body">
                    <p>{product.description}</p>
                    <p>{product.price}</p> 
                    <p>{product.category}</p>
                    </div>
            <div><button className='btn'>Add to Cart</button></div>
        </div>
        
    )
}

export default Product
