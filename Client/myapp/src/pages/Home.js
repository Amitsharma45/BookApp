import { useState } from "react";
import BooksList from "../Components/Books/BooksList";
import SearchBox from "../Components/SearchBox/SearchBox";
import SearchResults from "../Components/SearchResults/SearchResults";


function Home() {
    const categories = ["Romance", "War", "Adventures", "Crime", "Fantasy", "Thrillers"];
    const [search, setSearch] = useState('');
    const [option, setOption] = useState(1);
    const [searching, setSearching] = useState(false);

    const getData = (search_text, search_option) => {
        setSearching(true);
        setSearch(search_text);
        setOption(search_option);
    }

    const changeSearching = () => setSearching(false);

    return (
        <>
            <SearchBox getData={getData} />
            {searching === false
                ? categories.map(category =>
                    <BooksList key={category} category={category} />
                )
                : <SearchResults search={search} option={option} changeSearching={changeSearching} />
            }
        </>
    )
}

export default Home;