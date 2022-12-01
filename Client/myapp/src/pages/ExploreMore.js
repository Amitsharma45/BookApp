import { useEffect, useState } from "react";
import axios from "axios";
import AllBooksList from "../Components/AllBooks/AllBooksList";
import Footer from "../Components/Footer/Footer";
import ReactPaginate from "react-paginate";

function ExploreMore(props) {
    const [books, setBooks] = useState([]);
    let offset = 0;
    const [pageCount, setPageCount] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:5000/api/getWorks/subject?subject=${props.category}&limit=24&offset=0`);
            setBooks(data.worksData);
            setPageCount(Math.ceil(data.work_count / 24));
            setLoading(false);
        }
        getBooks();
    }, []);

    const getBooksByOffset = async () => {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/getWorks/subject?subject=${props.category}&limit=24&offset=${offset}`);
        setBooks(data.worksData);
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
            <AllBooksList category={props.category} books={books} loading={loading} />
            <ReactPaginate
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
            />
        </div>
    )
}

export default ExploreMore;