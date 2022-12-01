import React from 'react'
import { BookAppData } from '../Context/BookContext';
import { Navigate } from "react-router-dom";

export default function AuthHoc(Component) {
  
  const NewComponent = () => {
    const { isAuthenticated } = React.useContext(BookAppData);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      return <Navigate to='/' />
    }
    return <Component />
  }

  return NewComponent;
}
