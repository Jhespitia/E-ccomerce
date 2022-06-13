import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCart } from '../Store/Slices/Cart.slice';
import '../Styles/navbar.css'

import SideBar from './SideBar';



// IMAGES
import cart from '../Assets/Images/cart.png'
import files from '../Assets/Images/files.png'
import user from '../Assets/Images/user.png'
import home from '../Assets/Images/home.png'
import category from '../Assets/Images/category.png'
import logout from '../Assets/Images/logout.png'
import market from'../Assets/Images/market.png'



const NavBar = ({ categories, selectCategory }) => {

  //console.log(categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch])

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
    alert('Logout Successful');
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setShow(true);
    }else{
      navigate('/login');
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <div className='navbar-brand'>
            <img className='logo-img' src={market} alt=""/>
            <a className="jl" href="/home">JL</a>
            <a className='shop' href="/home">SHOP</a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">

            </ul>
            <li className="nav-item">
              <div className='stats'>

                <a className="nav-link active" href="/">
                  <img className='homei' src={home} alt="" /></a>
              </div>
            </li>

            <li className="nav-item">
              <div className='stats'>
                <a className="nav-link" href="/#/user"><img className='user' src={user} alt="" /></a>
              </div>
            </li>

            <li className="nav-item">
              <div className='stats'>
                <a className="nav-link" href="/#/purchases">
                  <img className='files' src={files} alt="" /></a>
              </div>
            </li>

            <li className="nav-item">
              <div className='stats'>
                <div className="nav-link">
                  <img 
                  onClick={handleShow} placement="end"
                  className='cart' src={cart} alt="" /></div>
              </div>
            </li>

            <li className="nav-item">
              <div className='stats'>
                <div className="nav-link" >
                  <img
                    onClick={logOut}
                    className='logout' src={logout} alt="" /></div>
              </div>
            </li>

            <li className="nav-item dropdown">
              <div className='stats'>
                <img className='category' src={category} alt="" />
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/#/" role="button" aria-haspopup="true" aria-expanded="false">Categories</a>
                <div
                  className="dropdown-menu">
                  {
                    categories?.map(category => (
                      <a
                        className="dropdown-item"
                        href='/#/'
                        key={category.id}
                        onClick={() => selectCategory(category.id)}>
                        {category.name}
                      </a>
                    ))
                  }
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/home">HOME</a>
                </div>
              </div>
            </li>
          </div>
        </div>
      </nav>

     <SideBar 
     show={show} 
     handleClose={handleClose}/>
    </div>


    /* SEARCH IN THE NAVBAR */

    /* <div className="d-flex">
      <input 
        className="form-control me-sm-2" 
        type="text" 
        placeholder="Search Item"
        onChange={(e) =>  setSearch(e.target.value)}
        value={search}
         />

        <button 
        className="btn btn-secondary my-2 my-sm-0" 
        type="submit"
        onClick={filterProducts}
        >Search
        </button>
    </div> */

  )
};
export default NavBar;