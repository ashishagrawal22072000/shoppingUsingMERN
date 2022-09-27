// import "bootstrap/dist/css/bootstrap.css";
// import "../css/index.css";
// import { FaSearch, FaShoppingCart } from "react-icons/fa";
// import { BsPhoneFill, BsLaptopFill, BsCupFill } from "react-icons/bs";
// import { GiDelicatePerfume, GiPowder } from "react-icons/gi";
// import { MdKingBed } from "react-icons/md";
// import { GrLocation } from "react-icons/gr";
// import { geoApiKey } from "../config";
// import { getCart } from "../Action/product";
// import { useDispatch, useSelector } from "react-redux";


// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import HomeScreen from "./screens/HomeScreen";
// import ProductScreen from "./screens/ProductScreen";
// import Navbar from "react-bootstrap/Navbar";
// import Badge from "react-bootstrap/Badge";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Container from "react-bootstrap/Container";
// import { LinkContainer } from "react-router-bootstrap";
// import { useContext, useEffect, useState } from "react";
// import { Store } from "./Store";
// import CartScreen from "./screens/CartScreen";
// import SigninScreen from "./screens/SigninScreen";
// import ShippingAddressScreen from "./screens/ShippingAddressScreen";
// import SignupScreen from "./screens/SignupScreen";
// import PaymentMethodScreen from "./screens/PaymentMethodScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import OrderScreen from "./screens/OrderScreen";
// import OrderHistoryScreen from "./screens/OrderHistoryScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import Button from "react-bootstrap/Button";
// import { getError } from "./utils";
// import axios from "axios";
// import SearchBox from "./components/SearchBox";
// import SearchScreen from "./screens/SearchScreen";
// import ProtectedRoute from "./components/ProtectedRoute";
// import DashboardScreen from "./screens/DashboardScreen";
// import AdminRoute from "./components/AdminRoute";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import MapScreen from "./screens/MapScreen";
// import "../src/App.css";
// export default function Navbars() {


//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { fullBox, cart, userInfo } = state;
  
//     const signoutHandler = () => {
//       ctxDispatch({ type: 'USER_SIGNOUT' });
//       localStorage.removeItem('userInfo');
//       localStorage.removeItem('shippingAddress');
//       localStorage.removeItem('paymentMethod');
//       window.location.href = '/signin';
//     };
//     const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
//     const [categories, setCategories] = useState([]);
  
//     useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const { data } = await axios.get(`/product/categories`);
//           setCategories(data);
//         } catch (err) {
//           toast.error(getError(err));
//         }
//       };
//       fetchCategories();
//     }, []);

// //   const navigate = useNavigate();

// //   const logout = () => {
// //     fetch("/user/logout", {
// //       method: "GET",
// //       headers: {
// //         Accept: "appllication/json",
// //         "Content-Type": "application/json",
// //       },
// //       credentials: "include",
// //     })
// //       .then((res) => {
// //         navigate("/login", { replace: true });
// //         if (!res.status === 200) {
// //           const err = new Error(res.error);
// //           throw err;
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };

// //   const dispatch = useDispatch();
// //   const itemInCart = useSelector((state) =>
// //     state.cart.cart.map((ele) => {
// //       return ele.items;
// //     })
// //   );
// //   console.log(itemInCart);
// //   const [show, setShow] = useState(true);
// //   const [location, setLocation] = useState();
// //   // console.log(location?.name);
// //   const [latitude, setLatitude] = useState("");
// //   const [longitude, setLongitude] = useState("");
// //   // console.log(longitude, latitude);
// //   useEffect(() => {
// //     navigator.geolocation.getCurrentPosition((position) => {
// //       setLatitude(position.coords.latitude);
// //       setLongitude(position.coords.longitude);
// //     });
// //     dispatch(getCart());
// //   }, []);

// //   const currPosition = async () => {
// //     axios
// //       .get(
// //         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${geoApiKey}`
// //       )
// //       .then((res) => {
// //         // console.log(res.data);
// //         setLocation(res.data);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };

// //   useEffect(() => {
// //     currPosition();
// //   }, [latitude, longitude]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light p-3 nav d-flex">
//         <div>
//           <Link className="navbar-brand fw-bold" to="/">
//             e-Shop.com
//           </Link>
//         </div>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarText"
//           aria-controls="navbarText"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse d-flex justify-content-between align-item-center mx-5">
//           <div className="mx-5 d-flex flex-column align-items-center">
//             <GrLocation size="20" />
//             <span className="fw-bold">
//               {location ? <>{location?.name.slice(0, 10)}</> : <>Location</>}
//             </span>
//           </div>
//           <div className="container-fluid mx-5 d-flex justify-content-between align-items-center">
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/smartphone"
//               >
//                 SmartPhones
//               </Link>
//               <BsPhoneFill size={25} />
//             </div>
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/laptop"
//               >
//                 Laptops
//               </Link>
//               <BsLaptopFill size={25} />
//             </div>
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/fragrances"
//               >
//                 Fragrances
//               </Link>
//               <GiDelicatePerfume size={25} />
//             </div>
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/skincare"
//               >
//                 SkinCare
//               </Link>
//               <GiPowder size={25} />
//             </div>
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/groceries"
//               >
//                 Groceries
//               </Link>
//               <BsCupFill size={25} />
//             </div>
//             <div className="d-flex mx-3">
//               <Link
//                 className="text-dark fw-bold text-decoration-none"
//                 to="/home_decor"
//               >
//                 HomeDecor
//               </Link>
//               <MdKingBed size={25} />
//             </div>
//           </div>

//           <div className="container d-flex justify-content-end align-items-center">
//             <div className="dropdown">
//               <img
//                 src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
//                 className="rounded-circle btn  dropdown-toggle rounded-circle accountBtn"
//                 id="dropdownMenuButton"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               />

//               <div
//                 className="dropdown-menu p-3"
//                 aria-labelledby="dropdownMenuButton"
//               >
//                 <p className="fw-bold">Hello undefind</p>
//                 {show ? (
//                   <>
//                     <Link className="btn btn-dark w-100" to="/account">
//                       Account
//                     </Link>
//                     <button
//                       className="btn btn-dark w-100 my-2"
//                       onClick={logout}
//                     >
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link className="btn btn-warning w-100" to="/login">
//                       SignIn
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="mx-5">
//               <Link
//                 to="/cart"
//                 className="text-dark"
//                 style={{ textDecoration: "none" }}
//               >
//                 <FaShoppingCart size="30" />
//                 <span className="bg-danger p-1 fw-bold rounded-circle text-light">
//                   {itemInCart[0]?.length}
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }