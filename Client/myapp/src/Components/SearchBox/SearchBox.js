import "./searchBoxStyle.css";
import { useState } from 'react';

function SearchBox(props) {
    const [search, setSearch] = useState('');

    const searchBooks = async () => {
        // console.log('clicked');
        if (search !== '') {
            let search_option = document.getElementById("search-filter").value;
            props.getData(search, search_option);
            document.getElementById("search-field").value = '';
        }
    }

    return (
        <div className="container-fluid search-container">
            <div className="container">
                <div className="row" id="heading">
                    <div className="col-12">
                        <h1>Books For All</h1>
                    </div>
                    <div className="col-12">
                        <p>Make up your mind and find a book to better formulate your own thoughts.</p>
                    </div>
                </div>
                <div className="row pt-4" id="search-box">
                    <div className="input-group mb-3">
                        <div className="col-3 col-sm-2">
                            <select className="form-select" id="search-filter">
                                <option value="1" defaultValue>Title</option>
                                <option value="2">Author</option>
                                <option value="3">Subject</option>
                            </select>
                        </div>
                        <div className="col-8 col-sm-9">
                            <input type="text" className="form-control" id="search-field" placeholder="Type to search..." onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="col-1 col-sm-1">
                            <button className="btn" id="search-btn" onClick={searchBooks}><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SearchBox;