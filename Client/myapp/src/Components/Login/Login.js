import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../Config/Config';
import { useNavigate } from "react-router-dom";
import iimg from '../5836.jpg'
import './Login.css';
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { BookAppData } from '../Context/BookContext';
import {  toast } from 'react-toastify';
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'password length should greater then 6'),
});



export default function Login() {
    const { setisAuthenticated } = React.useContext(BookAppData);
    const [showPassword, setShowPassword] = React.useState(true);

    let navigate = useNavigate();

    return (
        <Row style={{ margin: '0', padding: '0' }} >

            <Col md={12} lg={6} style={{ backgroundColor: 'white', }} className="d-flex justify-content-center align-items-center colheight">
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {

                        try {
                            const data = await axios.post(config.apiUrlLogin, values, {
                                headers: {
                                    "Content-Type": "application/json"
                                }, withCredentials: true
                            });
                            setisAuthenticated(true);
                            toast.success('Logged In', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            navigate('/');

                        } catch {
                            
                            toast.error('Please Check Your Email and Password!', {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }

                    }}
                >
                    {({ errors, touched, handleChange, handleBlur }) => (
                        <Form className='form'  >
                            <h2 className="text-center">Login </h2>
                            <div className="form-group">
                                <label>Email</label>
                                <input id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control" placeholder="Enter email" />
                                {errors.email && touched.email ? <div className='err'>{errors.email}</div> : null}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-group mb-3">
                                    <input type={!showPassword ? 'text' : 'password'} name="password"
                                        id="password" className="form-control" placeholder="Enter password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className="input-group-text" onClick={(e) => { setShowPassword(!showPassword) }}>
                                        {showPassword
                                            ? <VisibilityOffIcon />
                                            : <VisibilityIcon />
                                        }

                                    </span>
                                </div>
                                {errors.password && touched.password ? (
                                    <div className='err'>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="d-grid mt-2">
                                <button type="submit" className="btn btn-dark btn-md"
                                >Login</button>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className="forgot-password text-right mt-2">
                                    <Link component={Link} to="/ForgetPassword" style={{ textDecoration: 'none', marginLeft: '5px' }}>Forget Password?</Link>
                                </p>
                                <p className="forgot-password text-right mt-2">
                                    Create New Account ?
                                    <Link component={Link} to="/register" style={{ textDecoration: 'none', marginLeft: '5px' }}>Sign Up</Link>
                                </p>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Col>
            <Col md={12} lg={6} className="d-flex justify-content-center align-items-center colheight">
                <img src={iimg} className='bgimg' />
            </Col>
        </Row>
    )
}
