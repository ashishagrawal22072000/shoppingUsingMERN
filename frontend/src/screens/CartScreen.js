import { useContext } from 'react'
import { Store } from '../Store'
import { Helmet } from 'react-helmet-async'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MessageBox from '../components/MessageBox'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'
import emptyCart from '../Images/emptyCart.jpg'
export default function CartScreen() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/product/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }

  return (
    <div>
      {/* <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <AiOutlineMinus />
                      </button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <button
                        className="btn btn-dark"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <AiOutlinePlus />
                      </button>
                    </Col>
                    <Col md={3}>
                      <FaRupeeSign />
                      {item.price}
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        Del
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <button
                      class="axil-btn btn-bg-primary checkout-btn"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      <main class="main-wrapper ">
        <div class="axil-product-cart-area axil-section-gap ">
          <div class="container">
            {cartItems.length === 0 ? (
              <>
                <div class="container-fluid d-flex justify-content-center align-items-center">
                  <div className="container d-flex justify-content-center align-items-center">
                    <img src={emptyCart} height="500" width="500" />
                  </div>
                </div>
                <div className="container d-flex justify-content-center align-items-center w-50">
                  <Link to="/" className="axil-btn btn-bg-primary checkout-btn">
                    Go To Shopping
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div class="axil-product-cart-wrap d-flex justify-content-between ">
                  <div class="table-responsive">
                    <div class="product-table-heading">
                      <h4 class="title">Your Cart</h4>
                      <a href="#" class="cart-clear">
                        Clear Shoping Cart
                      </a>
                    </div>
                    <table class="table axil-product-table axil-cart-table mb--40">
                      <thead>
                        <tr>
                          <th scope="col" class="product-remove"></th>
                          <th scope="col" class="product-thumbnail">
                            Product
                          </th>
                          <th scope="col" class="product-title"></th>
                          <th scope="col" class="product-price">
                            Price
                          </th>
                          <th scope="col" class="product-quantity">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => {
                          return (
                            <>
                              <tr>
                                <td class="product-remove">
                                  <button>
                                    <i
                                      class="fal fa-times"
                                      onClick={() => removeItemHandler(item)}
                                    ></i>
                                  </button>
                                </td>
                                <td class="product-thumbnail">
                                  <Link to={`/product/${item._id}`}>
                                    <img src={item.image} alt={item.name} />
                                  </Link>
                                </td>
                                <td class="product-title">
                                  <Link to={`/product/${item._id}`}>
                                    {item.name}
                                  </Link>
                                </td>
                                <td class="product-price" data-title="Price">
                                  <span class="currency-symbol">
                                    <FaRupeeSign />
                                  </span>
                                  {item.price}
                                </td>
                                <td class="product-quantity" data-title="Qty">
                                  <div class="pro-qty d-flex justify-content-around">
                                    <button
                                      class="dec qty-btn"
                                      onClick={() =>
                                        updateCartHandler(
                                          item,
                                          item.quantity - 1,
                                        )
                                      }
                                      disabled={item.quantity === 1}
                                    >
                                      -
                                    </button>
                                    <input
                                      type="number"
                                      class="quantity-input"
                                      value={item.quantity}
                                    />
                                    <button
                                      class="inc qty-btn"
                                      onClick={() =>
                                        updateCartHandler(
                                          item,
                                          item.quantity + 1,
                                        )
                                      }
                                      disabled={
                                        item.quantity === item.countInStock
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </tbody>
                    </table>
                    <div class="cart-update-btn-area">
                      <div class="input-group product-cupon">
                        <input placeholder="Enter coupon code" type="text" />
                        <div class="product-cupon-btn">
                          <button type="submit" class="axil-btn btn-outline">
                            Apply
                          </button>
                        </div>
                      </div>
                      <div class="update-btn">
                        <h4>
                          <span class="text-secondary">SubTotal : </span>
                          <FaRupeeSign />
                          {cartItems.reduce(
                            (a, c) => a + c.price * c.quantity,
                            0,
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xl-5 col-lg-7 offset-xl-7 offset-lg-5 d-flex jusify-content-center">
                      <div class="axil-order-summery mt-80">
                        <h5 class="title mb-20 text-center">Order Summary</h5>
                        <div class="summery-table-wrap">
                          <table class="table summery-table mb--30">
                            <tbody class="text-center">
                              <tr class="order-subtotal">
                                <td>Subtotal</td>
                                <td>
                                  <FaRupeeSign />
                                  {cartItems.reduce(
                                    (a, c) => a + c.price * c.quantity,
                                    0,
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <button
                            class="axil-btn btn-bg-primary checkout-btn"
                            onClick={checkoutHandler}
                            disabled={cartItems.length === 0}
                          >
                            Proceed to Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
