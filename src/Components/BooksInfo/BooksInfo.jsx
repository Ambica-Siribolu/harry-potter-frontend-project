import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './BooksInfo.css';

  const BookInfo = () => {
    const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    sessionStorage.setItem("Hello", JSON.stringify('23454564545'))

    const [favorites, setFavorites] = useState([]);
  
    const options = (amount) => {
      return {
        key: "rzp_test_GHqJHD4DXabY3z",
        amount: amount * 100,
        currency: "INR",
        description: "HarryPotter",
        handler: function (response) {
          if (response.razorpay_payment_id) {
            return navigate("/checkOut");
          }
        },
      };
    };

    const buyNowHandler = (price) => {
      const razorPay = window.Razorpay(options(price));
  
      razorPay.open();
    };

    const {state}=useLocation();
    const {index,title,cover,originalTitle,releaseDate,pages,number}=state;
    
    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }, []);

   const isFavorite = (index) => {
      return favorites.includes(index);
    };
    const toggleFavorite = (index) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(index)) {
         
          return prevFavorites.filter(favIndex => favIndex !== index);
        } else {

          return [...prevFavorites, index];
        }
      });
    };

    const handleRatingChange = (event) => {
      setRating(Number(event.target.value));
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleCommentSubmit = () => {
      if (comment.trim()) {
        setCommentsList([...commentsList, { text: comment, rating }]);
        setComment("");
        setRating(0);
      }
    };
    const addToCart = () => {
      const newCart = { title, cover, originalTitle, releaseDate, pages, rating, commentsList };
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = [...storedCart, newCart];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Book added to cart!');
    };
   

   
  

  return (
    <>
      <div className="text-center pt-5 shadow w-50 m-auto bg-secondary text-white rounded mt-3">
      <div className="d-flex justify-content-around align-items-center ">
          <div>{isFavorite(index) ? (
            <FcLike className='heart' size={30} onClick={() => toggleFavorite(index)} alt="icon" /> ) : 
            (
            <GoHeart className='heart' size={30} onClick={() => toggleFavorite(index)} alt="icon" />
          )}
          </div>
      </div>
      <img height={200} src={cover} alt="image" />
      <h4>Title : {title}</h4>
      <p>Original Title:{originalTitle}</p>
      <p>Release Date: {releaseDate}</p>
      <h6 className="text-dark">Price : &#8377;{pages}</h6>
       <div>
        <button className="btn btn-outline-warning" onClick={() => buyNowHandler(pages)}>BuyNow</button>
        <button className='btn btn-outline-info m-3' onClick={addToCart}>Add to Cart</button>
     </div>
     </div>
     <div className="mt-4">
        <h5>Rate and Comment</h5>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input id="rating" placeholder="Add your rating by number 1 to 5" min={1} max={5} className="form-control" value={rating} onChange={handleRatingChange}/>
          </div> 
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment"  className="form-control w-50" rows="3" value={comment} onChange={handleCommentChange}></textarea>
        </div>
        <button className="btn btn-success mt-2" onClick={handleCommentSubmit}>Submit Comment</button>
        <div className="mt-4 w-50 bg-light text-primary">
          <h5 className="text-success">Comments:</h5>
          <ul className="list-unstyled">{commentsList.map((book, index) => (
              <li key={index} className="border-bottom pb-2 mb-2">
                <strong>Rating: {book.rating}<MdOutlineStarPurple500 /></strong>
                <p>{book.text}</p>
              </li>
            ))}
          </ul>
        </div>
     
     </>
    );
  };
         
  export default BookInfo;
  
  
  
