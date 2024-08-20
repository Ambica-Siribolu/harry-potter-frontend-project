import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
const Cart = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
 
  
 useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('cart')) || [];
    setFavorites(storedFavorites);
  }, []);

 
  const removeFromCart = (index) => {
    const updatedCart = favorites.filter((_, i) => i !== index);
    localStorage.setItem('favorites', JSON.stringify(updatedCart));
    setFavorites(updatedCart);
  };
  const getCartTotalPrice = () => {
    return favorites.reduce((total, book) => total + (book.pages || 0), 0);
  };

  
  const openPaymentModal = (amount) => {
    const options = {
      key: 'rzp_test_GHqJHD4DXabY3z',
      amount: amount * 100, 
      currency: "INR",
      description: "BOOKS",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          navigate('/checkOut',{ state:favorites });
        } else {
          console.error("Payment failed", response);
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay script not loaded");
    }
  };


  const handleBuyNow = () => {
    const totalPrice = getCartTotalPrice();
    if (totalPrice > 0) {
      openPaymentModal(totalPrice);
    } else {
      alert('Cart is empty!');
    }
  };
  


 return (
  <>
  <h2 className='text-center'>Your Cart</h2>
    <div className="text-center pt-5 cart border border-dark shadow w-50 m-auto bg-secondary text-white">
      
      {favorites.length === 0 ? (
        <p>Your Cart is empty</p>
      ) : (
        favorites.map((book,index) => (
          <div>

             <div className='d-flex justify-content-around align-items-center gap-5 border border-1 m-1 p-2'>
            
              
             
                <div> <img src={book.cover} alt="Cover" height={100} /></div>
                <div> <p>{book.title}</p></div>
                <div> <p>Price: &#8377;{book.pages}</p></div>
                <div><button className="btn btn-warning" onClick={() => removeFromCart(index)}>Remove from Cart</button></div>
             
               
             
            </div>
            
            
          </div>
          
           ))
          )}
          <div className='text-end'>
                <h5 className='me-4 text-dark'>Total Price:<span className='text-white fs-5'>&#8377; {favorites.reduce((total, book) => total + (book.pages || 0), 0)}</span></h5>
                
              </div>
              <div className='text-center '>
              <button className="btn btn-info w-25 mb-3 " onClick={handleBuyNow}>Buy Now</button>
              </div>
             
              
          </div>
          <div className='text-center'>
          <button className='btn btn-dark mt-3 '><Link className='text-decoration-none text-white ' to='/books' >Go Back To Shop</Link></button>
          </div>
          </>
)};

export default Cart;

 

 

 

