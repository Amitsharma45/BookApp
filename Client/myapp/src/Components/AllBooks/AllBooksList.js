import Spinner from "../Spinner/Spinner";
import "./AllBooksListStyle.css";
import BookGrid from "../BookGrid/BookGrid";
import NotFound from "../404/NotFound";

function AllBooksList(props) {
    return (
        <div>
            {props.books &&
                <div className="container" id="allbooks-container">
                    <div className="row" id="category">
                        <div className="col-12"><h2 id="explore-heading">
                            {props.category === undefined
                                ? `Books based on your search`
                                : props.category === "favourites"
                                    ? `Your Favourites`
                                    : `Books on ${props.category}`
                            }
                        </h2></div>
                    </div>
                    {props.loading
                        ? <Spinner />
                        : props.books[0] === "Not Found"
                            ? <NotFound />
                            : <BookGrid books={props.books} />
                    }
                </div>
            }
        </div>
    )
}

export default AllBooksList;
