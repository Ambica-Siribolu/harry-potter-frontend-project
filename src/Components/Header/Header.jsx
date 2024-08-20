import React, { useContext } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { UserProvider } from '../AuthProvider';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(UserProvider)
  const navigate = useNavigate();

  const userLogoutHandler = async () => {
  const data = await logout();
    if (data) {
        navigate('/');
    }
};

  return (
    <div className='d-flex  justify-content-around align-items-center' >
        <div className='d-flex align-items-center' >
          <span><Link to='/' ><img height={100} src="/harry-potter-logo-32525.png" alt="logo"/></Link> </span>
        </div>
        <ul className='d-flex' >
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none  nav-link' to='/' >HOME</Link></li>
            <li className='list-unstyled ms-4'>{isAuthenticated ?<Link className='text-decoration-none text-white' onClick={userLogoutHandler}>LOGOUT</Link> :<Link className='text-decoration-none nav-link' to='/login'>LOGIN</Link>}</li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none  nav-link' to='/houses' >HOUSES</Link></li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none  nav-link' to='/Characters' >CHARACTERS</Link></li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none  nav-link' to='/Spells' >SPELLS</Link></li>
            <li className='list-unstyled ms-3' ><Link className='text-decoration-none  nav-link ms-1' to='/cart' ><FaCartShopping size={20}/></Link></li>
        </ul>
    </div>
  )
}

export default Header;