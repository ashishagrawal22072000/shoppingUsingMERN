import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

import "bootstrap/dist/css/bootstrap.css";
import login from "../Images/login.jpg";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/user/login", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [logins, setlogins] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);

  const loginuser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/user/login", {
        email: logins.email,
        password: logins.password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    // <Container className="small-container">
    //   <Helmet>
    //     <title>Sign In</title>
    //   </Helmet>
    //   <h1 className="my-3">Sign In</h1>
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group className="mb-3" controlId="email">
    //       <Form.Label>Email</Form.Label>
    //       <Form.Control
    //         type="email"
    //         required
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         required
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>
    //     <div className="mb-3">
    //       <Button type="submit">Sign In</Button>
    //     </div>
    //     <div className="mb-3">
    //       New customer?{' '}
    //       <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
    //     </div>
    //   </Form>
    // </Container>
    <>
      <div className="container p-5 mt-5 d-flex justify-content-center ">
        <div
          className="container p-3 border"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <h1 className="text-center mt-3 ">Login YourSelf</h1>
          <form className="p-5 mt-5" method="POST">
            <div className="mb-5">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label fw-bold"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control border-dark border-bottom border-3 rounded-0"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: 0,
                }}
                value={logins.email}
                onChange={(e) =>
                  setlogins({ ...logins, email: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold"
              >
                Password
              </label>
              <span className="d-flex">
                <input
                  type={`${show ? "text" : "password"}`}
                  className="form-control border-dark border-bottom border-3 rounded-0"
                  id="exampleInputPassword1"
                  style={{
                    backgroundColor: "transparent",
                    outline: "none",
                    border: 0,
                  }}
                  value={logins.password}
                  onChange={(e) =>
                    setlogins({ ...logins, password: e.target.value })
                  }
                />
                {show ? (
                  <>
                    <BsFillEyeFill
                      onClick={() => setShow(false)}
                      style={{ height: "25px", width: "25px" }}
                    />
                  </>
                ) : (
                  <>
                    <BsFillEyeSlashFill
                      onClick={() => {
                        setShow(true);
                      }}
                      style={{ height: "25px", width: "25px" }}
                    />
                  </>
                )}
              </span>
            </div>
            <div className="mb-5">
              <Link to="/forget">Forgot Password</Link>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100"
              onClick={loginuser}
            >
              Login
            </button>
            <div>
              <p className="fw-bold mt-3 text-center ">
                Don't Have An Account ?{" "}
                <Link
                  to={`/signup?redirect=${redirect}`}
                  className="text-danger text-decoration-none"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="container">
          <img src={login} alt="login" height="100%" width="100%" />
        </div>
      </div>
    </>
  );
}
