import { useEffect, useState, useContext } from "react";
import AllBooksList from "../Components/AllBooks/AllBooksList";
import { BookAppData } from '../Components/Context/BookContext';
import AuthHoc from "../Components/HOC/AuthHoc";

function Favourites() {
    const { favoriteBook } = useContext(BookAppData);
    const [favourites, setFavourites] = useState(favoriteBook);
    const [loading, setLoading] = useState(false);


    // console.log(favourites
    useEffect(() => {
        setLoading(true);
        setLoading(false);
        setFavourites(favoriteBook);
    })

    return (
        <div>
            {favourites && favourites.length > 0 ?
                <AllBooksList category="favourites" books={favourites} loading={loading} />
                :
                <h4 className="mt-5 text-center" style={{marginBottom : '420px'}}>You Don't Have Add any Book to Favourites</h4>
            }
        </div>
    );
}

export default AuthHoc(Favourites)
