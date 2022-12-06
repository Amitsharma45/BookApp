import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import AllBooksList from "../AllBooks/AllBooksList";

function SearchResults(props) {
    const [books, setBooks] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [loading, setLoading] = useState(false);
    let offset = 0;

    useEffect(() => {
        const getBooks = async () => {
            setLoading(true);
            if (props.option === "1") {
                try {
                    const { data } = await axios.get(`http://localhost:8000/api/getWorks/title?title=${props.search}&limit=24&offset=0`);
                    setBooks(data.worksData);
                    setPageCount(Math.ceil(data.work_count / 24));
                } catch (error) {
                    setBooks(prevData => [error.response.data, ...prevData]);
                }
            }
            else if (props.option === "2") {
                try {
                    const { data } = await axios.get(`http://localhost:8000/api/getWorks/author?author=${props.search}&limit=24&offset=0`);
                    setBooks(data.worksData);
                    setPageCount(Math.ceil(data.work_count / 24));
                } catch (error) {
                    setBooks(prevData => [error.response.data, ...prevData]);
                }
            }
            else {
                try {
                    const { data } = await axios.get(`http://localhost:8000/api/getWorks/subject?subject=${props.search}&limit=24&offset=0`);
                    setBooks(data.worksData);
                    setPageCount(Math.ceil(data.work_count / 24));
                } catch (error) {
                    setBooks(prevData => [error.response.data, ...prevData]);
                }
            }
            setLoading(false);
        }

        getBooks();
    }, [props.search])

    const getBooksByOffset = async () => {
        setLoading(true);
        if (props.option === "1") {
            const { data } = await axios.get(`http://localhost:8000/api/getWorks/title?title=${props.search}&limit=24&offset=${offset}`);
            setBooks(data.worksData);
        }
        else if (props.option === "2") {
            const { data } = await axios.get(`http://localhost:8000/api/getWorks/author?author=${props.search}&limit=24&offset=${offset}`);
            setBooks(data.worksData);
        }
        else {
            const { data } = await axios.get(`http://localhost:8000/api/getWorks/subject?subject=${props.search}&limit=24&offset=${offset}`);
            setBooks(data.worksData);
        }
        setLoading(false);
    }

    const handlePageClick = async (data) => {
        if (data.selected + 1 > prevPage) {
            offset = (data.selected) * 24 + 1;
            await getBooksByOffset();
        }
        else {
            if (data.selected === 0)
                offset = 0;
            else
                offset = (data.selected) * 24 + 1;
            await getBooksByOffset();
        }
        setPrevPage(data.selected + 1);
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-end">
                        <button className="btns" onClick={() => props.changeSearching()}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
            </div>
            <AllBooksList books={books} loading={loading} />
            {books[0] !== "Not Found" && <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />}

        </div>
    )
}

export default SearchResults;
