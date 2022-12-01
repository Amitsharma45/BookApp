import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import ExploreMore from "./pages/ExploreMore";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import BookDetails from "./pages/BookDetails/BookDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Profile from './Components/Profile/Profile';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import UserContext from './Components/Context/BookContext'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import NotFound from './Components/404/NotFound';
import AuthHoc from './Components/HOC/AuthHoc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <>
      <UserContext >
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <AuthHoc />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/romance" element={<ExploreMore category="Romance" />} />
            <Route path="/war" element={<ExploreMore category="War" />} />
            <Route path="/adventures" element={<ExploreMore category="Adventures" />} />
            <Route path="/crime" element={<ExploreMore category="Crime" />} />
            <Route path="/fantasy" element={<ExploreMore category="Fantasy" />} />
            <Route path="/thrillers" element={<ExploreMore category="Thrillers" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/details/works/:key" element={<BookDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/ForgetPassword" element={<ForgetPassword />} /> 
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ UserContext >
    </>
  );
}

export default App;
