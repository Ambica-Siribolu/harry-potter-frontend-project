import React, { useContext, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserProvider } from '../AuthProvider';
import './Login.css';

const Login = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserProvider)

  const loginHandler = async (e) => {
    try {
      setLoading(true)
      e.preventDefault();
      const userData = await login(loginData);
      if (userData?.data) {
        toast.success("User logged in successfully...");
        setLoading(false)
        return navigate("/books");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setLoading(false)
    }
  };

  const loginInputData = (e) => {

    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name] : value,
    })

  }


  return (
    <>
    <div className="spinner">
      {loading && <Spinner animation="border" variant="info" />}
    </div>
    <div>
      <h2 style={{ textAlign: "center" }}> Login</h2>
      <div className="Login">
        <form>
        <input name="email"  onChange={loginInputData} className="form-control w-50 mb-3 input-field" type="email" placeholder="Enter your Email..." />
        <input name="password" onChange={loginInputData} className="form-control w-50 mb-3 input-field" type="password" placeholder="Enter your Password..." />
        <button onClick={loginHandler} className="button mb-3"> Login </button>
        <p> Don't have an account?<Link to="/signUp" className='text-primary text-decoration-none'>Create an account</Link> </p>
        </form>
       </div>
    </div>
    </>
  )
}

export default Login