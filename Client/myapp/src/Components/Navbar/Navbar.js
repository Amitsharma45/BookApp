import './navStyle.css'
import { Link } from "react-router-dom";
import React from 'react';
import { BookAppData } from '../Context/BookContext';
import {  toast } from 'react-toastify';

function Navbar() {
    const { isAuthenticated, userData, setisAuthenticated ,setUserData } = React.useContext(BookAppData);
    
    async function logout() {
        var token = document.cookie;
        document.cookie = token + "=;expires=" + new Date(0).toUTCString();
        setisAuthenticated(false);
        setUserData([]);
        toast.success('Logout ', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const applyActive = (e) => {
        const navLinks = document.getElementsByClassName("nav-link");
        for (let item of navLinks) {
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                break;
            }
        }
        e.target.classList.add("active");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <Link to="/" className="nav-link active">
                        <img src="https://www.bookapp.ch/assets/images/logo.png" alt="" />
                    </Link>
                </span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" onClick={(e) => applyActive(e)}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about" onClick={(e) => applyActive(e)}>About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact" onClick={(e) => applyActive(e)}>Contact</Link>
                        </li>
                    </ul>
                    {isAuthenticated === false
                        ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <Link className="btns text-sm-center" id="login-btn" to='/Login'>Log In</Link>
                            <Link className="btns text-sm-center " to='/register'>Sign Up</Link>
                        </ul>
                        : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <div className="d-flex justify-content-center align-items-center nav-item">
                                <Link id="fav-btn" to='/favourites'>Favourites</Link>
                            </div>
                            <div className="dropdown ">
                                <button className="btn btns dropdown-toggle" type="button" id="dropdown-btn" data-bs-toggle="dropdown">
                                    Welcome ,
                                    {userData.firstname}
                                </button>
                                <ul className="dropdown-menu text-center" id="dropdown-menu">
                                    <li><Link className="dropdown-item" to='/profile'>Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
                                </ul>
                            </div>
                        </ul>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;