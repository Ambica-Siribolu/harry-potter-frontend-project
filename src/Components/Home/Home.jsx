import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <h6 className='para text-center p-1'>Discover the Magic of Harry Potter | Get Lost in the Wizarding World | Explore Harry Potter Books by Characters</h6>
      <div className='text-center'>
      <button className=' button1 '>
        <Link className='text-decoration-none text-dark' to='/signUp'>
          Create an Account
        </Link>
        </button><br/>
        <h6 className='mt-4 text'>Already have an account <Link className='text-decoration-none text-warning' to='/login'><br/>
         <button className=' p-1 button2 mt-1'> Login here</button>
        </Link></h6>
      </div>
    </div>
  );
}

export default Home;
