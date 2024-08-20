import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart/Cart';
import Characters from './Components/Characters/Characters';
import CheckOut from './Components/CheckOutPage/CheckOut';
import Header from './Components/Header/Header';
import Spells from './Components/Spells/Spells';
const Books=lazy(()=>(import('./Components/Books/Books')));
const BooksInfo=lazy(()=>(import( './Components/BooksInfo/BooksInfo')));
const Home= lazy(()=>import('./Components/Home/Home'));
const Houses=lazy(()=> import('./Components/Houses/Houses'));
const Login=lazy(()=>import('./Components/Login/Login'));
const SignUp=lazy(()=> import('./Components/SignUp/SignUp'));

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Suspense fallback={<h3>page is loading please wait...!</h3>}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/books' element={<Books />} />
            <Route path='/houses' element={<Houses />} />
            <Route path='/characters' element={<Characters />} />
            <Route path='/spells' element={<Spells />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/bookInfo/:index' element={<BooksInfo/>}/>
            <Route path='/checkOut' element={<CheckOut/>}/>
            <Route path='*' element={<h1>Page Not Found</h1>} /> 

      </Routes>
        </Suspense>  
  </BrowserRouter>
  )
}

export default App;

