import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./booksList.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import BookGrid from "../BookGrid/BookGrid";

function BooksList(props) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8000/api/getWorks/subject?subject=${props.category}&limit=6&offset=0`);
            setBooks(data.worksData);
            setLoading(false);
        }
        getBooks();
    }, []);

    return (
        <div>
            {books &&
                <div className="container" id="books-container">
                    <div className="row" id="category">
                        <div className="col-2"><h3>{props.category}</h3></div>
                        <div className="col-10" id="explore-btn"><Link to={`/${props.category.toLowerCase()}`}>Explore more</Link></div>

                    </div>
                    {loading
                        ? <Spinner />
                        : <BookGrid books={books} />
                    }
                </div>
            }
        </div>

    );
}

export default BooksList;