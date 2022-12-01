import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import config from '../Config/Config';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './forget.css';

function ForgetPassword() {

    let navigate = useNavigate();
    const [showotp, setshowotp] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(true);
    const [confshowPassword, setConfShowPassword] = React.useState(true);
    const [email, setemailid] = React.useState();
    function GetEmail() {
        const SignupSchema = Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
        });
        return (<Formik
            initialValues={{
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
                try {
                    setemailid(values.email)
                    const { data } = await axios.post(config.apiUrlCreateOTP, values, {
                        headers: {
                            "Content-Type": "application/json"
                        }, withCredentials: true
                    });
                    setshowotp(true);
                    toast.success(data, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } catch {
                    toast.error('Please Check Your Email Id', {
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
                    <div className="d-grid mt-2">
                        <button type="submit" className="btn btn-dark btn-md"
                        >Send OTP</button>
                    </div>
                </Form>
            )}
        </Formik>
        )
    }

    function SendOTP() {
        const SignupSchema = Yup.object().shape({
            otp: Yup.string().length(6, 'OTP contain 6 Digit').required('Opt Required'),
            password: Yup.string().min(6, 'Password length should greater then 6').required('Required'),
            confirmpassword: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                )
            }).required('Required')
        });
        return (
            <>
                <Formik
                    initialValues={{
                        password: '',
                        otp: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async ({ otp, password }) => {
                        try {
                            const { data } = await axios.post(config.apiUrlResetPassword, { email, password, otp }, {
                                headers: {
                                    "Content-Type": "application/json"
                                }, withCredentials: true
                            });
                            toast.success(data, {
                                position: "top-center",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setTimeout(() => {
                                navigate('/login')
                            }, 3000)
                        } catch {
                            toast.error('Please Check Your One Time Password(OTP)', {
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
                            <div className="form-group">
                                <label>One Time Password</label>
                                <input id="otp"
                                    name="otp"
                                    type="number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="form-control" placeholder="Enter OTP" />
                                {errors.otp && touched.otp ? <div className='err'>{errors.otp}</div> : null}
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
                                <button type="submit" className="btn btn-dark btn-md"
                                >Reset Password</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
        )
    }


    return (
        <>
            <div className='container mt-5 d-flex justify-content-center align-items-center flex-column'>
                <h2>Reset Password</h2>
                {showotp === false ?
                    <GetEmail />
                    :
                    <SendOTP />
                }
            </div>
        </>
    )
}

export default ForgetPassword;