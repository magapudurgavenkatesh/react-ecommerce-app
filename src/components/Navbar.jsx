import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "./Data";

import {  FaShoppingCart} from 'react-icons/fa';
const Navbar = ({ setData ,cart}) => {
  const location=useLocation()
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  const filterByCategory = (category) => {
    const element = items.filter((product) => product.category === category);
    setData(element);
    window.scrollTo({
    top: 0,
    behavior: "smooth",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };
  return (
    <>
      <header className="custom-sticky">
        <div className="nav-bar">
          <Link to={"/"} className="brand" onClick={() => setData(items)}>
            E-Commerce
          </Link>

          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            ></input>
          </form>

          <Link to={"/Cart"} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              < FaShoppingCart/>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {
                  cart.reduce(
                   (total, item) => total + item.quantity,0)
                }
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </Link>
        </div>

        {
          location.pathname==='/'&&(
            <div className="nav-bar-wrapper">
          <div onClick={() => setData(items)} className="items">
            For You
          </div>
          <div onClick={() => filterByCategory("mobiles")} className="items">
            Mobiles
          </div>
          <div onClick={() => filterByCategory("laptops")} className="items">
            Laptops
          </div>
          <div onClick={() => filterByCategory("fashion")} className="items">
            Fashion
          </div>
          <div
            onClick={() => filterByCategory("electronics")}
            className="items"
          >
            Electronics
          </div>
          <div onClick={() => filterByCategory("appliances")} className="items">
            Appliances
          </div>
          <div onClick={() => filterByCategory("furniture")} className="items">
            Furniture
          </div>
          <div onClick={() => filterByCategory("gaming")} className="items">
            Gaming
          </div>
        </div>
          )
        }
      </header>
    </>
  );
};

export default Navbar;
