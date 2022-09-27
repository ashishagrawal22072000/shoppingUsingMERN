import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import Navbar from 'react-bootstrap/Navbar'
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { Store } from './Store'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SigninScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import SignupScreen from './screens/SignupScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import Button from 'react-bootstrap/Button'
import { getError } from './utils'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import SearchScreen from './screens/SearchScreen'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardScreen from './screens/DashboardScreen'
import AdminRoute from './components/AdminRoute'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import MapScreen from './screens/MapScreen'
import '../src/App.css'
// import "../src/style.css"
import { FaBars } from 'react-icons/fa'
import { ImCart } from 'react-icons/im'
import './css/vendor/bootstrap.min.css'
import './css/vendor/font-awesome.css'
import './css/vendor/flaticon/flaticon.css'
import './css/style.min.css'
import './css/vendor/slick.css'
// import ".css/vendor/slick-theme.css";
import './css/vendor/jquery-ui.min.css'
import './css/vendor/sal.css'
import './css/vendor/magnific-popup.css'
// import ".css/vendor/base.css"
import Navbars from './screens/Navbars'
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { fullBox, cart, userInfo } = state

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/product/categories`)
        setCategories(data)
      } catch (err) {
        toast.error(getError(err))
      }
    }
    fetchCategories()
  }, [])
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        {/* <header>
          <Navbar expand="lg" className="navbar">
            <div className="container-fluid">
              <div className="container d-flex align-items-center">
                <FaBars
                  size={30}
                  color="white"
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                />
                <Link
                  className="navbar-brand fw-bold mx-3 text-light"
                  to="/"
                  style={{ fontSize: "30px" }}
                >
                  E-Shop.com
                </Link>

                <SearchBox className="mx-5" />
              </div>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-50  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    <ImCart size={30} className="text-light" />
                    {cart.cartItems.length > 0 && (
                      <Badge pill>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>

                  {userInfo ? (
                    <>
                    <NavDropdown
                      title={userInfo.name}
                      className="fw-bold "
                      id="basic-nav-dropdown"
                    >
                      <Link to="/profile" className="text-decoration-none">
                        <NavDropdown.Item className="dropItem" >User Profile</NavDropdown.Item>
                      </Link>
                      <Link to="/orderhistory" className="text-decoration-none">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </Link>
                      <NavDropdown.Divider />
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-dark">
                          <Link
                            className="dropdown-item text-light fw-bold"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </button>
                      </div>
                    </NavDropdown>
                    </>
                  ) : (
                    <button className="btn btn-light fw-bold">
                      <Link className="nav-link" to="/signin">
                        Sign In
                      </Link>
                    </button>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <Link className="text-decoration-none" to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </Link>
                      <Link className="text-decoration-none" to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </Link>
                      <Link className="text-decoration-none" to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </Link>
                      <Link className="text-decoration-none" to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </header> */}
        <header class="header axil-header header-style-1">
          <div id="axil-sticky-placeholder"></div>
          <div class="axil-mainmenu">
            <div class="container">
              <div class="header-navbar">
                <div class="header-brand">
                  <Link className="logo logo-dark" to="/">
                    <h3 className="my-3">E-Shop.com</h3>
                  </Link>
                </div>
                <div class="header-main-nav">
                  <nav class="mainmenu-nav">
                    <button class="mobile-close-btn mobile-nav-toggler">
                      <i class="fas fa-times"></i>
                    </button>
                    <div class="mobile-nav-brand"></div>

                    <ul class="mainmenu">
                      <li>
                        <Link to="/">Home</Link>
                      </li>

                      <li>
                        <Link to="/search">Shop</Link>
                      </li>

                      <li>
                        <Link to="/about">About</Link>
                      </li>

                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="header-action">
                  <ul class="action-list">
                    <li class="axil-search">
                      <SearchBox />
                    </li>

                    <li class="shopping-cart">
                      <Link to="/cart" className="cart-dropdown-btn">
                        <span class="cart-count">
                          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                        <i class="flaticon-shopping-cart"></i>
                      </Link>
                    </li>
                    <li class="my-account">
                      {userInfo ? (
                        <>
                          <div class="dropdown">
                            <button
                              class="dropdown-toggle"
                              style={{
                                background: 'transparent',
                                fontSize: '25px',
                              }}
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="flaticon-person"></i>
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li className="mx-4 border-bottom text-center">
                                <Link to="/profile">My Account</Link>
                              </li>

                              <li className="mx-4 border-bottom-2 text-center">
                                <Link to="/orderhistory">Order History</Link>
                              </li>

                              <div class="login-btn">
                                <button
                                  to="#signout"
                                  class="axil-btn 
                                       btn-bg-primary"
                                  onClick={signoutHandler}
                                >
                                  SignOut
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div class="login-btn">
                            <Link to="/signin" class="axil-btn btn-bg-primary">
                              Login
                            </Link>
                          </div>
                        </>
                      )}
                      {userInfo && userInfo.isAdmin && (
                        <>
                          <div class="dropdown">
                            <button
                              class="dropdown-toggle"
                              style={{
                                background: 'transparent',
                                fontSize: '25px',
                              }}
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="flaticon-person"></i>
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li className="mx-4 border-bottom text-center">
                                <Link to="/admin/dashboard">Dashboard</Link>
                              </li>

                              <li className="mx-4 border-bottom-2 text-center">
                                <Link to="/admin/products">Products</Link>
                              </li>
                              <li className="mx-4 border-bottom-2 text-center">
                                <Link to="/admin/orders">Orders</Link>
                              </li>
                              <li className="mx-4 border-bottom-2 text-center">
                                <Link to="/admin/users">Users</Link>
                              </li>
                              <div class="login-btn">
                                <button
                                  to="#signout"
                                  class="axil-btn 
                                       btn-bg-primary"
                                  onClick={signoutHandler}
                                >
                                  SignOut
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* <div class="axil-main-slider-area main-slider-style-1">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-5 col-sm-6">
                <div class="main-slider-content">
                  <div class="slider-content-activation-one">
                    <div
                      class="single-slide slick-slide"
                      data-sal="slide-up"
                      data-sal-delay="400"
                      data-sal-duration="800"
                    >
                      <span class="subtitle">
                        <i class="fas fa-fire"></i> Hot Deal In This Week
                      </span>
                      <h1 class="title">Roco Wireless Headphone</h1>
                      <div class="slide-action">
                        <div class="shop-btn">
                          <a href="shop.html" class="axil-btn btn-bg-white">
                            <i class="fal fa-shopping-cart"></i>Shop Now
                          </a>
                        </div>
                        <div class="item-rating">
                          <div class="thumb">
                            <ul>
                              <li>
                                <img
                                  src="/images/others/author1.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="/images/others/author2.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="/images/others/author3.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="/images/others/author4.png"
                                  alt="Author"
                                />
                              </li>
                            </ul>
                          </div>
                          <div class="content">
                            <span class="rating-icon">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fal fa-star"></i>
                            </span>
                            <span class="review-text">
                              <span>100+</span> Reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide slick-slide">
                      <span class="subtitle">
                        <i class="fas fa-fire"></i> Hot Deal In This Week
                      </span>
                      <h1 class="title">Smart Digital Watch</h1>
                      <div class="slide-action">
                        <div class="shop-btn">
                          <a href="shop.html" class="axil-btn btn-bg-white">
                            <i class="fal fa-shopping-cart"></i>Shop Now
                          </a>
                        </div>
                        <div class="item-rating">
                          <div class="thumb">
                            <ul>
                              <li>
                                <img
                                  src="assets/images/others/author1.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author2.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author3.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author4.png"
                                  alt="Author"
                                />
                              </li>
                            </ul>
                          </div>
                          <div class="content">
                            <span class="rating-icon">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fal fa-star"></i>
                            </span>
                            <span class="review-text">
                              <span>100+</span> Reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide slick-slide">
                      <span class="subtitle">
                        <i class="fas fa-fire"></i> Hot Deal In This Week
                      </span>
                      <h1 class="title">Roco Wireless Headphone</h1>
                      <div class="slide-action">
                        <div class="shop-btn">
                          <a href="shop.html" class="axil-btn btn-bg-white">
                            <i class="fal fa-shopping-cart"></i>Shop Now
                          </a>
                        </div>
                        <div class="item-rating">
                          <div class="thumb">
                            <ul>
                              <li>
                                <img
                                  src="assets/images/others/author1.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author2.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author3.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author4.png"
                                  alt="Author"
                                />
                              </li>
                            </ul>
                          </div>
                          <div class="content">
                            <span class="rating-icon">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fal fa-star"></i>
                            </span>
                            <span class="review-text">
                              <span>100+</span> Reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="single-slide slick-slide">
                      <span class="subtitle">
                        <i class="fas fa-fire"></i> Hot Deal In This Week
                      </span>
                      <h1 class="title">Smart Digital Watch</h1>
                      <div class="slide-action">
                        <div class="shop-btn">
                          <a href="shop.html" class="axil-btn btn-bg-white">
                            <i class="fal fa-shopping-cart"></i>Shop Now
                          </a>
                        </div>
                        <div class="item-rating">
                          <div class="thumb">
                            <ul>
                              <li>
                                <img
                                  src="assets/images/others/author1.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author2.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author3.png"
                                  alt="Author"
                                />
                              </li>
                              <li>
                                <img
                                  src="assets/images/others/author4.png"
                                  alt="Author"
                                />
                              </li>
                            </ul>
                          </div>
                          <div class="content">
                            <span class="rating-icon">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fal fa-star"></i>
                            </span>
                            <span class="review-text">
                              <span>100+</span> Reviews
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-7 col-sm-6">
                <div class="main-slider-large-thumb">
                  <div class="slider-thumb-activation-one axil-slick-dots">
                    <div
                      class="single-slide slick-slide"
                      data-sal="slide-up"
                      data-sal-delay="600"
                      data-sal-duration="1500"
                    >
                      <img
                        src="assets/images/product/product-38.png"
                        alt="Product"
                      />
                      <div class="product-price">
                        <span class="text">From</span>
                        <span class="price-amount">$49.00</span>
                      </div>
                    </div>
                    <div
                      class="single-slide slick-slide"
                      data-sal="slide-up"
                      data-sal-delay="600"
                      data-sal-duration="1500"
                    >
                      <img
                        src="assets/images/product/product-39.png"
                        alt="Product"
                      />
                      <div class="product-price">
                        <span class="text">From</span>
                        <span class="price-amount">$49.00</span>
                      </div>
                    </div>
                    <div class="single-slide slick-slide">
                      <img
                        src="assets/images/product/product-38.png"
                        alt="Product"
                      />
                      <div class="product-price">
                        <span class="text">From</span>
                        <span class="price-amount">$49.00</span>
                      </div>
                    </div>
                    <div class="single-slide slick-slide">
                      <img
                        src="assets/images/product/product-39.png"
                        alt="Product"
                      />
                      <div class="product-price">
                        <span class="text">From</span>
                        <span class="price-amount">$49.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul class="shape-group">
            <li class="shape-1">
              <img src="assets/images/others/shape-1.png" alt="Shape" />
            </li>
            <li class="shape-2">
              <img src="assets/images/others/shape-2.png" alt="Shape" />
            </li>
          </ul>
        </div> */}

        {/* <nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

			<div class="container">
				<a class="navbar-brand" href="index.html">E-shop</a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarsFurni">
					<ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
						<li class="nav-item active">
							<a class="nav-link" href="index.html">Home</a>
						</li>
						<li><a class="nav-link" href="shop.html">Shop</a></li>
						<li><a class="nav-link" href="about.html">About us</a></li>
						<li><a class="nav-link" href="services.html">Services</a></li>
						<li><a class="nav-link" href="blog.html">Blog</a></li>
						<li><a class="nav-link" href="contact.html">Contact us</a></li>
					</ul>

					<ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
						<li>{userInfo ? (
                    <NavDropdown
                      title={userInfo.name}
                      className="fw-bold"
                      id="basic-nav-dropdown"
                    
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-dark">
                          <Link
                            className="dropdown-item text-light fw-bold"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </button>
                      </div>
                    </NavDropdown>
                  ) : (
                    <button className="btn btn-light fw-bold">
                      <Link className="nav-link" to="/signin">
                        Sign In
                      </Link>
                    </button>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}</li>
						<li><Link to="/cart" className="nav-link">
                    <ImCart size={30} />
                    {cart.cartItems.length > 0 && (
                      <Badge pill>
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link></li>
					</ul>
				</div>
			</div>
				
		</nav> */}

        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <h3>
                <strong>Categories</strong>
              </h3>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <Link
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                  className="text-decoration-none"
                >
                  <Nav.Link className="text-light mt-5 hover fw-bold">
                    {category.slice(0, 1).toUpperCase() + category.slice(1)}
                  </Nav.Link>
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer class="axil-footer-area footer-style-2">
          <div class="footer-top separator-top">
            <div class="container">
              <div class="row">
                <div class="col-lg-3 col-sm-6">
                  <div class="axil-footer-widget">
                    <h5 class="widget-title">Support</h5>
                    <div class="logo mb--30">
                      <a href="index.html">
                        <h2>E-Shop.com</h2>
                      </a>
                    </div>
                    <div class="inner">
                      <p>
                        685 Market Street, <br />
                        Las Vegas, LA 95820, <br />
                        United States.
                      </p>
                      <ul class="support-list-item">
                        <li>
                          <a href="mailto:example@domain.com">
                            <i class="fal fa-envelope-open"></i>{' '}
                            example@domain.com
                          </a>
                        </li>
                        <li>
                          <a href="tel:(+01)850-315-5862">
                            <i class="fal fa-phone-alt"></i> (+01) 850-315-5862
                          </a>
                        </li>
                        <li>
                          <i class="fal fa-map-marker-alt"></i> 685 Market
                          Street, <br /> Las Vegas, LA 95820, <br /> United
                          States.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                  <div class="axil-footer-widget">
                    <h5 class="widget-title">Account</h5>
                    <div class="inner">
                      <ul>
                        <li>
                          <a href="my-account.html">My Account</a>
                        </li>
                        <li>
                          <a href="sign-up.html">Login / Register</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="wishlist.html">Wishlist</a>
                        </li>
                        <li>
                          <a href="shop.html">Shop</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                  <div class="axil-footer-widget">
                    <h5 class="widget-title">Quick Link</h5>
                    <div class="inner">
                      <ul>
                        <li>
                          <a href="privacy-policy.html">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="terms-of-service.html">Terms Of Use</a>
                        </li>
                        <li>
                          <a href="#">FAQ</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="copyright-area copyright-default separator-top">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xl-4">
                  <div class="social-share">
                    <a href="#">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#">
                      <i class="fab fa-discord"></i>
                    </a>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-12">
                  <div class="copyright-left d-flex flex-wrap justify-content-center">
                    <ul class="quick-link">
                      <li>
                        © 2022. All rights reserved by{' '}
                        <a target="_blank" href="https://axilthemes.com/">
                          Axilthemes
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
