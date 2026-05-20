import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Product from './components/Product'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductDetail from './components/ProductDetail'
import SearchItem from './components/SearchItem'
import Cart from './components/Cart'
import { items } from './components/Data'

const App = () => {
  const [cart, setCart] = useState(() => {

  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];

});

useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}, [cart]);
  const [data, setData] = useState([...items])
  return (
    <>
    <Router>
      <Navbar cart={cart} setData={setData}/>
      <Routes>  
        <Route path="/" element={<Product cart={cart} setCart={setCart} items={data}/>}/>
        <Route path="/Product/:id" element={<ProductDetail cart={cart} setCart={setCart} />}/>
        <Route path="/Search/:term" element={<SearchItem cart={cart} setCart={setCart}/>}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />}/>

      </Routes>
    </Router>
    </>
  )
}

export default App