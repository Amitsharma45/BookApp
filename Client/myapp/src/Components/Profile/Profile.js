import React from 'react'
import './Profile.css'
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import config from '../Config/Config';
import { Link } from "react-router-dom";
import { BookAppData } from '../Context/BookContext';
import {  toast } from 'react-toastify';
import AuthHoc from "../HOC/AuthHoc";

function Profile() {
    const { userData ,setrealod} = React.useContext(BookAppData);
    const [changeProfile, setchangeProfile] = React.useState(false);
    
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    });
    return (
        <>
            <div className='container d-flex justify-content-center align-items-center mt-5' style={{ heigth: '300px' }}>

                <Formik
                    initialValues={{
                        firstName: userData.firstname,
                        lastName: userData.lastname,
                        email: userData.email,
                    }}
                    enableReinitialize
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            var token = document.cookie.split('=')[1];
                            token = localStorage.getItem('jwt');
                            toast.success('Your Profile Update Successfully', {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setchangeProfile(false)
                            const { data } = await axios.put(config.apiUrlchangeProfile, values, {
                                headers: {
                                    "Content-Type": "application/json",
                                    'Authorization': token

                                }, withCredentials: true
                            });
                            setrealod(true)
                            
                            
                        } catch {
                            // alert("User  email already exists");
                        }
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur, values }) => (
                        <Form className='form' >
                            <h2 className="text-center mb-3">Profile Details</h2>
                            {changeProfile === false ?

                                <div className="forgot-password text-center" style={{ marginLeft: '5px', fontSize: '16px', color: 'blue' }}>
                                    <div onClick={() => setchangeProfile(!changeProfile)} style={{ textDecoration: 'none' }}>Edit Profile</div>
                                </div>

                                :
                                <div className="forgot-password text-center" style={{ marginLeft: '5px', fontSize: '16px', color: 'blue' }}>
                                    <div onClick={() => setchangeProfile(!changeProfile)} style={{ textDecoration: 'none' }}> Profile</div>
                                </div>
                            }
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" id="firstName"
                                    disabled={!changeProfile}
                                    name="firstName" placeholder="First name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className='err'>{errors.firstName}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label>Last name</label>
                                <input type="text" className="form-control" placeholder="Last name" id="lastName"
                                    disabled={!changeProfile}
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className='err'>{errors.lastName}</div>
                                ) : null}
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input id="email"
                                    disabled={true}
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    className="form-control" placeholder="Enter email" />
                            </div>

                            {
                                changeProfile === false ?
                                    <p className="forgot-password text-right mt-2" style={{ marginLeft: '5px', fontSize: '16px' }}>
                                        <Link to="/changepassword" style={{ textDecoration: 'none' }} >Change Password </Link>
                                    </p>
                                    :
                                    <div className="d-grid mt-2">
                                        <button type="submit" className="btn btn-dark btn-sm"
                                        >Save</button>
                                    </div>

                            }



                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
export default  AuthHoc(Profile)