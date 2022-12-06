import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Register.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import config from '../Config/Config';
import { Link } from "react-router-dom";
import bgimg from '../11070.jpg'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import React from 'react';
import { Oval } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { BookAppData } from '../Context/BookContext';
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password length should greater then 6').required('Required'),
    confirmpassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    }).required('Required')
});
const Register = () => {
    const { setisAuthenticated } = React.useContext(BookAppData);
    const [showPassword, setShowPassword] = React.useState(true);
    const [confshowPassword, setConfShowPassword] = React.useState(true);
    const [loading, setloading] = React.useState(true);
    let navigate = useNavigate();
    return (
        <Row style={{ margin: '0', padding: '0', }} >
            <div className='lo' style={{ visibility: !loading ? 'visible' : 'hidden' }}>
                <Oval color="#000" height={80} width={80} />
            </div>
            <Col md={12} lg={6} className="d-flex justify-content-center align-items-center colheight"  >
                <img src={bgimg} className='bgimg' />
            </Col>
            <Col md={12} lg={6} className="d-flex justify-content-center align-items-center colheight">
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmpassword: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        try {
                            if (loading) {
                                setloading(false);
                                const  d  = await axios.post(config.apiUrlregister, values);
                                toast.success(d.data.message, {
                                    position: "top-center",
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setloading(true);
                                const { data } = await axios.post(config.apiUrlLogin, values, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }, withCredentials: true
                                });
                                localStorage.setItem("jwt", data.token);
                                // console.log(data)
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
                            }
                        } catch {
                            toast.error('User  email already exists', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setloading(true);
                        }
                    }}
                >
                    {({ errors, touched, handleChange, handleBlur }) => (
                        <Form className='form' >
                            <h2 className="text-center">Register</h2>
                            <div className="form-group">
                                <label>First name</label>
                                <input type="text" className="form-control" id="firstName"
                                    name="firstName" placeholder="First name"
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
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className='err'>{errors.lastName}</div>
                                ) : null}
                            </div>

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
                                <div className="input-group ">
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

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-group ">
                                    <input type={!confshowPassword ? 'text' : 'password'} name="confirmpassword"
                                        id="confirmpassword" className="form-control" placeholder="Confirm password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <span className="input-group-text" onClick={(e) => { setConfShowPassword(!confshowPassword) }}>
                                        {confshowPassword
                                            ? <VisibilityOffIcon />
                                            : <VisibilityIcon />
                                        }

                                    </span>
                                </div>
                                {errors.confirmpassword && touched.confirmpassword ? (
                                    <div className='err'>{errors.confirmpassword}</div>
                                ) : null}
                            </div>
                            <div className="d-grid mt-2">
                                <button type="submit" className="btn btn-dark btn-sm"
                                >Register</button>
                            </div>
                            <p className="forgot-password text-right mt-2" style={{ fontSize: '16px' }}>
                                Already Have Account ?
                                <Link to="/Login" style={{ textDecoration: 'none', marginLeft: '5px' }}>Login </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </Col>
        </Row >
    );
}

export default Register;

