import React, { useState, createContext, useEffect } from "react";
import config from "../Config/Config";
import axios from "axios";


export const BookAppData = createContext();
const GetData = (props) => {
    const [userData, setUserData] = useState([]);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [favoriteBook,setfavoriteBook] = useState([]);
    const [reload,setrealod] =useState(false);

    useEffect(() => {
        var token = document.cookie.split('=')[1];
        token = localStorage.getItem('jwt');
        async function getprofile() {
            try {
                const { data } = await axios.get(config.apiUrlProfile, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    }, withCredentials: true
                });
                setrealod(false);
                setUserData(data);
            }
            catch {
                // console.log('errr')
            }
        }
        async function isAuth() {
            try {

                // var token = document.cookie.split('=')[1];
                const { data } = await axios.get(config.apiUrlisauthenticateed, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': token
                    }, withCredentials: true
                })
                setisAuthenticated(data.isAuthenticated);
            } catch {
                // setisAuthenticated(false);
                setUserData(false);
            }
        }
        if(token){
            getprofile();
            isAuth()
        }
    }, [isAuthenticated ,reload]);
    useEffect(()=>{
        async function getfavorite(){
            try{
                const {data} = await axios.get(config.apiUrlgetfavorite,{
                    params : {
                        _id : userData._id
                    }
                });
                setfavoriteBook(data.arr)
                setrealod(false);
            }catch{
                setfavoriteBook([])
            }
        }
        if(userData !== [] ){
            getfavorite();
        }else{
            setfavoriteBook([]);
        }
    },[reload,userData]);
    return (
        <BookAppData.Provider value={{ userData, isAuthenticated, setisAuthenticated ,favoriteBook ,setUserData,setrealod}} >
            {props.children}
        </BookAppData.Provider>
    );

}

export default GetData;