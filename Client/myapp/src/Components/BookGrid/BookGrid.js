import { Link } from "react-router-dom";
import "./booksGrid.css";
import axios from "axios";
import config from "../Config/Config";
import { BookAppData } from '../Context/BookContext';
import React from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function BookGrid(props) {

    const { userData, favoriteBook, setrealod } = React.useContext(BookAppData);
    async function addFavorite(book) {
        if(userData.length !== 0){
            const _id = userData._id;
            const {coverImage , title ,key} = book;
            try {
                const { data } = await axios.post(config.apiUrladdfavorite, { coverImage ,title,key, _id }, {
                    headers: {
                        "Content-Type": "application/json"
                    }, withCredentials: true
                });
                // console.log(data);
                setrealod(true);
                toast.success('Book  Added to Favorite!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch {
                
            }
        }else{
            toast.error('Your are not Logged In', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    async function removeFavorite(coverImage) {
        const _id = userData._id;
        try {
            const { data } = await axios.put(config.apiUrlremovefavorite, { coverImage, _id }, {
                headers: {
                    "Content-Type": "application/json"
                }, withCredentials: true
            });
            console.log(data);
            setrealod(true);
            toast.success('Book  Removed from Favorite!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch {

        }
    }
    function geticon(key) {
        if (favoriteBook) {
            const isFound = favoriteBook.some(element => {
                if (element.key === key) {
                    return true;
                }
                return false;
            });
            return isFound;
        }
    }

    return (
        <div className="row" id="books">
            {props.books !== undefined && props.books.map(book => (
                <div key={book.key} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 d-flex justify-content-center">
                    <div className="card book-card">
                        <Link to={`/details${book.key}`} className="card-text">
                            {book.coverImage !== undefined && book.coverImage !== null
                                ? <img src={`https://covers.openlibrary.org/b/id/${book.coverImage}-M.jpg`} className="card-img-top book-covers" alt="cover" />
                                : <img src="https://libribook.com/Images/her-one-mistake-pdf.jpg" className="card-img-top book-covers" alt="cover" />
                            }
                        </Link>
                        <div className="card-body book-title d-flex justify-content-between">
                            <Link to={`/details${book.key}`} className="card-text">{book.title}</Link>
                            {geticon(book.key) === true ?
                                <i className="fa-solid fa-heart fav-btn-r" onClick={() => { removeFavorite(book.coverImage) }}></i>
                                :
                                <i className="fa-solid fa-heart fav-btn" onClick={() => { addFavorite(book) }}></i>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BookGrid;
