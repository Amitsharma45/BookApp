/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Formik, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import config from '../Config/Config';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";
import iimg from '../download.png'
import { toast } from 'react-toastify';
import AuthHoc from "../HOC/AuthHoc";



function ChangePassword() {
  const [showPassword, setShowPassword] = React.useState(true);
  const [newshowPassword, setnewShowPassword] = React.useState(true);
  const [confshowPassword, setConfShowPassword] = React.useState(true);
  const SignupSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password length should greater then 6'),
    newpassword: Yup.string().min(6, 'Password length should greater then 6'),
    confirmpassword: Yup.string().when("newpassword", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newpassword")],
        "Both password need to be the same"
      )
    })

  });

  return (
    <>
      <div><Link className="btn mx-5 mt-3 btn-outline-secondary btn-sm" to='/profile'><KeyboardBackspaceIcon /> Back</Link></div>
      <div className='d-flex justify-content-center align-items-center'>
        <img src={iimg} style={{ height: '80px', width: '80px' }} />
      </div>
      <div className='container d-flex justify-content-center align-items-center mt-2' style={{ heigth: '300px' }}>

        <Formik
          initialValues={{
            password: '',
            newpassword: ''
          }}
          enableReinitialize
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              var token = document.cookie.split('=')[1];
              const { data } = await axios.put(config.apiUrlchangepassword, values, {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': token
                }, withCredentials: true
              });
              toast.success('Your Password Change Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } catch {
              toast.error('Incorrect Current Password', {
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
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className='form ' >
              <h2 className="text-center mb-4">Change Password</h2>
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-group ">
                  <input type={!showPassword ? 'text' : 'password'} name="password"
                    id="password" className="form-control" placeholder="Enter Current password"
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

              <div className="form-group mt-2">
                <label>New Password</label>
                <div className="input-group ">
                  <input type={!newshowPassword ? 'text' : 'password'} name="newpassword"
                    id="newpassword" className="form-control" placeholder="Enter New password"
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
                {errors.newpassword && touched.newpassword ? (
                  <div className='err'>{errors.newpassword}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-group ">
                  <input type={!newshowPassword ? 'text' : 'password'} name="confirmpassword"
                    id="confirmpassword" className="form-control" placeholder="Confirm password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="input-group-text" onClick={(e) => { setnewShowPassword(!newshowPassword) }}>
                    {newshowPassword
                      ? <VisibilityOffIcon />
                      : <VisibilityIcon />
                    }

                  </span>
                </div>
                {errors.confirmpassword && touched.confirmpassword ? (
                  <div className='err'>{errors.confirmpassword}</div>
                ) : null}
              </div>

              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-dark btn-md"
                >Change Password</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default AuthHoc(ChangePassword);