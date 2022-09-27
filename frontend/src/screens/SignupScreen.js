import Axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import * as Yup from 'yup'
import signup from '../Images/signup.jpg'

import { useFormik } from 'formik'

export default function SignupScreen() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  console.log(redirectInUrl)
  const redirect = redirectInUrl ? redirectInUrl : '/signin'

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
  }

  const schema = Yup.object({
    name: Yup.string()
      .min(5, 'Username have atleast 5 charactors')
      .max(25, 'Username have atmost 25 charactors')
      .trim()
      .required('Username is Required'),
    email: Yup.string()
      .email('Please Enter a valid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'UserName accepts 8 to 15 characters.\n UserName should be any lower case or upper case character.\n UserName must contain digit or special symbol “_-”',
      )
      .min(8)
      .required('Password is Required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone containes only 10 digits')
      .required('Please Enater a valid Phone No.'),
    gender: Yup.string().required('Please Select an Option'),
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const data = await Axios.post('/user/register', {
          name: values.name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          password: values.password,
        })
        console.log(data)
        if (data && data.status == 200) {
          navigate('/signin')
        }
        // ctxDispatch({ type: "USER_SIGNIN", payload: data });
        // localStorage.setItem("userInfo", JSON.stringify(data));
        // navigate(redirect || "/");
      } catch (err) {
        toast.error(getError(err))
      }
    },
  })

  return (
    <>
      <div className="container d-flex justify-content-center ">
        <div className="container  d-flex justify-content-center ">
          <div className="container border border-5">
            <img src={signup} alt="Signup" height="100%" width="100%" />
          </div>
          <div className="container p-3 border bg-warning">
            <h1 className="text-center mt-3 ">Register YourSelf</h1>
            <form className="p-5" method="POST" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="username" className="form-label fw-bold ">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control border-bottom border-3 rounded-0"
                  id="username"
                  aria-describedby="emailHelp"
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 0,
                  }}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                />
                {errors.name && touched.name ? (
                  <p className="text-danger fw-bold">{errors.name}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="form-label fw-bold ">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control border-bottom border-3 rounded-0"
                  id="email"
                  aria-describedby="emailHelp"
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 0,
                  }}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-danger fw-bold">{errors.email}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="form-label fw-bold ">
                  Phone
                </label>
                <input
                  type="text"
                  minLength={0}
                  maxLength={10}
                  className="form-control border-bottom border-3 rounded-0"
                  id="email"
                  aria-describedby="emailHelp"
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 0,
                  }}
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? (
                  <p className="text-danger fw-bold">{errors.phone}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="form-label fw-bold ">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-bottom border-3 rounded-0"
                  id="password"
                  style={{
                    backgroundColor: 'transparent',
                    outline: 'none',
                    border: 0,
                  }}
                  name="password"
                  minLength={8}
                  maxLength={15}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="text-danger fw-bold">{errors.password}</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="mb-5">
                <label htmlFor="gender" className="form-label fw-bold ">
                  Select Gender
                </label>
                <div className="container d-flex justify-content-between">
                  <div class="container btn-group d-flex justify-content-between">
                    <div>
                      <input
                        type="radio"
                        class="btn-check"
                        name="gender"
                        id="option1"
                        autocomplete="off"
                        value="male"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label
                        class="btn"
                        for="option1"
                        // style={{ backgroundColor: "transparent" }}
                      >
                        Male
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        class="btn-check"
                        name="gender"
                        id="option2"
                        autocomplete="off"
                        value="female"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label class="btn" for="option2">
                        Female
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        class="btn-check"
                        name="gender"
                        id="option3"
                        autocomplete="off"
                        value="other"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <label class="btn" for="option3">
                        Other
                      </label>
                    </div>
                    {errors.gender && touched.gender ? (
                      <p className="text-danger fw-bold">{errors.gender}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="container">
                <button
                  className="btn btn-dark fw-bold w-100 h-100"
                  type="submit"
                >
                  Register
                </button>
              </div>

              <div>
                <p className="fw-bold mt-3 text-center ">
                  Already Have An Account ?{' '}
                  <Link
                    to={`/signin?redirect=${redirect}`}
                    className=" text-decoration-none"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
