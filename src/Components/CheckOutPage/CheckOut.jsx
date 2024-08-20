

import React, { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

const CheckOut = () => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('cart')) || [];
    setFavorites(storedFavorites);
  }, []);

  const { state } = useLocation();
  return( 
    <>
    <div className="text-center mt-5 bg-light text-primary padding-5">
      <h2 className="text-success">
        Hurray..!! Your Order is placed Successfully &#129321; &#127881; &#127881;
      </h2>
  {favorites.map((book,index) => (
    <div>
    <div>
        <img height={100} src={book.cover} alt="img" />
        <h5>Ordered Product : {book.title}</h5>
        <h5 className="text-danger">Price : &#8377;{book.pages}</h5>
      </div>
      </div> 
  ))}
      
    </div>
   <div className="text-center">
   <button className='btn btn-dark mt-3 '><Link className='text-decoration-none text-white ' to='/' >Go Back To Home</Link></button>
   </div>
   </>
  );
};

export default CheckOut;
