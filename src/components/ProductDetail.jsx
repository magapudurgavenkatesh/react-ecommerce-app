import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { items } from './Data'
import Product from './Product'
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({cart,setCart}) => {
    const{id}=useParams()

    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])

   useEffect(() => {
    const filterProduct = items.filter(
        (product) => product.id == id
    )

    setProduct(filterProduct[0])

    const relatedProducts = items.filter(
        (p) => p.category === filterProduct[0].category
    )

    setRelatedProducts(relatedProducts)

}, [id])
  const addToCart = (id, price, title, description, imgSrc) => {

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item

    );

    setCart(updatedCart);

  } else {

    const obj = {
      id,
      price,
      title,
      description,
      imgSrc,
      quantity: 1,
    };

    setCart([...cart, obj]);
  }

  toast.success("Item added to cart");
};     
  return (
    <>
        
      <div className="conteiner  con">
        <div className="img">
          <img src={product.imgSrc}></img>
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() =>
              addToCart(
                product.id,
                product.price,
                product.title,
                product.description,
                product.imgSrc,
              )
            }
            className="btn btn-warning"
          >
            Add To Cart
          </button>{" "}
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
}

export default ProductDetail