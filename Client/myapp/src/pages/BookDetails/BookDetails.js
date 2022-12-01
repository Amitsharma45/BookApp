import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./bookDetails.css";
import Spinner from "../../Components/Spinner/Spinner";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";
import config from "../../Components/Config/Config";
import { BookAppData } from '../../Components/Context/BookContext';
import { toast } from 'react-toastify';
function BookDetails() {
    const { key } = useParams();
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/getDetails?key=${key}`);
            setDetails(data);
            if (data.authors.length !== 0) {
                data.authors.forEach(async (item) => {
                    let key = item.author.key.substring(9);
                    const { data } = await axios.get(`http://localhost:5000/api/getName?key=${key}`);
                    if (authors.indexOf(data) === -1)
                        setAuthors(prevAuthors => [...prevAuthors, data]);
                })
            }
            setLoading(false);
        }
        getDetails();
    }, []);

    const { userData, favoriteBook, setrealod } = React.useContext(BookAppData);
    async function addFavorite(key, coverImage, title) {
        if (userData.length !== 0) {

            const _id = userData._id;
            try {
                const { data } = await axios.post(config.apiUrladdfavorite, { coverImage ,title,key, _id }, {
                    headers: {
                        "Content-Type": "application/json"
                    }, withCredentials: true
                });
                toast.success('Book  Added to Favorite!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setrealod(true);
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
            setrealod(true);
            toast.success('Book  Removed from Favorite!', {
                position: "top-center",
                autoClose: 2000,
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
        <>
            <div style={{ marginTop: '20px ', marginLeft: '30px' }} ><Link className="btn  btn-outline-secondary btn-sm" to='/'><KeyboardBackspaceIcon /> Back</Link></div>

            <div className="container" id="details-container">
                <h2 id="explore-heading">Book Details</h2>
                {loading === true
                    ? <Spinner />
                    : details.length !== 0 && authors.length !== 0
                        ? <div className="row">
                            <div className="col-12 col-md-4 col-lg-3 text-center mt-2 mb-4">
                                <div className="row">
                                    <div className="col-12">
                                        {details.covers !== undefined
                                            ? <img src={`https://covers.openlibrary.org/b/id/${details.covers[0]}-M.jpg`} className="card-img-top book-covers" id="details-img" alt="cover" />
                                            : <img src="https://libribook.com/Images/her-one-mistake-pdf.jpg" className="card-img-top book-covers" id="details-img" alt="cover" />
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {geticon(details.key) === true ?
                                            <button className="btn btns" id="add-fav-btn" style={{ backgroundColor: 'red' }} onClick={() => { removeFavorite(details.covers[0]) }}>Remove from favourites</button>
                                            :
                                            <button className="btn btns" id="add-fav-btn" onClick={() => { addFavorite(details.key, details.covers[0], details.title) }}>Add to favourites</button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-9 my-2 px-4">
                                <h1 className="fw-bold">{details.title}</h1>
                                {authors.length !== 0
                                    ? <h6 className="fst-italic">by {
                                        authors.map(author => (
                                            authors.indexOf(author) === authors.length - 1
                                                ? author
                                                : author.concat(", ")
                                        ))
                                    }
                                    </h6>
                                    : <h4 className="fst-italic"></h4>
                                }
                                <p>{(typeof details.description === "object") === true
                                    ? details.description.value
                                    : details.description
                                }
                                </p>
                                <p>
                                    <strong>First published on: </strong>
                                    {details.first_publish_date !== undefined
                                        ? details.first_publish_date
                                        : `not available`
                                    }
                                </p>
                                <p>
                                    <strong>Subjects: </strong>
                                    {details.subjects.length !== 0
                                        ? details.subjects.map(subject => (
                                            details.subjects.indexOf(subject) === details.subjects.length - 1
                                                ? subject
                                                : subject.concat(", ")
                                        ))
                                        : `not available`
                                    }
                                </p>
                                <p>
                                    <strong>Subject places: </strong>
                                    {details.subject_places !== undefined
                                        ? details.subject_places.map(subject => (
                                            details.subject_places.indexOf(subject) === details.subject_places.length - 1
                                                ? subject
                                                : subject.concat(", ")
                                        ))
                                        : `not available`
                                    }
                                </p>
                                <p>
                                    <strong>Subject times: </strong>
                                    {details.subject_times !== undefined
                                        ? details.subject_times.map(subject => (
                                            details.subject_times.indexOf(subject) === details.subject_times.length - 1
                                                ? subject
                                                : subject.concat(", ")
                                        ))
                                        : `not available`
                                    }
                                </p>
                            </div>
                        </div>
                        : <div className="row"></div>
                }
            </div>
        </>
    )
}

export default BookDetails;