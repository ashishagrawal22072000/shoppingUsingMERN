import axios from 'axios'
import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Rating from '../components/Rating'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { Store } from '../Store'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { toast } from 'react-toastify'
import { FaRupeeSign } from 'react-icons/fa'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true }
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false }
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false }
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function ProductScreen() {
  let reviewsRef = useRef()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const [
    { loading, error, product, loadingCreateReview },
    dispatch,
  ] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  })
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/product/${id}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [id])

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart, userInfo } = state
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/product/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    })
    navigate('/cart')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!comment || !rating) {
      toast.error('Please enter comment and rating')
      return
    }
    try {
      const { data } = await axios.post(
        `/product/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      )

      dispatch({
        type: 'CREATE_SUCCESS',
      })
      toast.success('Review submitted successfully')

      product.reviews.unshift(data.review)
      product.numReviews = data.numReviews
      product.rating = data.rating
      dispatch({ type: 'REFRESH_PRODUCT', payload: product })
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      })
    } catch (error) {
      toast.error(getError(error))
      dispatch({ type: 'CREATE_FAIL' })
    }
  }
  return loading ? (
    // return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      {/* <div>
        <Row>
          <Col md={1}>
            <ListGroup.Item>
              <Row xs={1} md={1} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card>
                      <Button
                        className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                        // onHover={() => setSelectedImage(x)}
                      >
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
          </Col>
          <Col md={4}>
            <img
              className="img-large"
              src={selectedImage || product.image}
              alt={product.name}
            ></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price : {product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description:
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="primary">
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="my-3">
          <h2 ref={reviewsRef}>Reviews</h2>
          <div className="mb-3">
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
          </div>
          <ListGroup>
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" "></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="my-3">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                <Form.Group className="mb-3" controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                  </Form.Select>
                </Form.Group>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Comments"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>

                <div className="mb-3">
                  <Button disabled={loadingCreateReview} type="submit">
                    Submit
                  </Button>
                  {loadingCreateReview && <LoadingBox></LoadingBox>}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please{' '}
                <Link to={`/signin?redirect=/product/${product._id}`}>
                  Sign In
                </Link>{' '}
                to write a review
              </MessageBox>
            )}
          </div>
        </div>
      </div> */}

      <div class="axil-single-product-area bg-color-white">
        <div class="single-product-thumb axil-section-gap pb--20 pb_sm--0 bg-vista-white">
          <div class="container">
            <div class="row row--25">
              <div class="col-lg-6 mb--40">
                <div class="h-100">
                  <div class="position-sticky sticky-top">
                    <div class="row row--10">
                      {[product.image, ...product.images].map((x) => {
                        return (
                          <>
                            <div class="col-6 mb--20">
                              <div class="single-product-thumbnail axil-product thumbnail-grid">
                                <div class="thumbnail">
                                  <img
                                    class="img-fluid "
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    src={x}
                                    alt="Product Images"
                                    onClick={() => setSelectedImage(x)}
                                    style={{ cursor: 'pointer' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 mb--40">
                <div class="h-100">
                  <div class="position-sticky sticky-top">
                    <div class="single-product-content">
                      <div class="inner">
                        <h2 class="product-title">Ella Everyday Tote</h2>
                        <span class="price-amount">
                          <FaRupeeSign />
                          {product.price}
                        </span>
                        <div className="mb-5">
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </div>

                        <div class="product-rating">
                          <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}
                          ></Rating>
                        </div>

                        <p class="description">{product.description}</p>
                        <div class="product-action-wrapper d-flex-center">
                          <ul class="product-action d-flex-center mb--0">
                            <li className="add-to-cart">
                              <button
                                onClick={addToCartHandler}
                                class="axil-btn btn-bg-primary"
                                disabled={
                                  product.countInStock > 0 ? false : true
                                }
                                style={
                                  product.countInStock > 0
                                    ? { opacity: 1 }
                                    : { opacity: 0.5 }
                                }
                              >
                                Add to Cart
                              </button>
                            </li>
                            <li class="wishlist">
                              <a
                                href="wishlist.html"
                                class="axil-btn wishlist-btn"
                              >
                                <i class="far fa-heart"></i>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div class="product-desc-wrapper pt--80 pt_sm--60">
                          <h4 class="primary-color mb--40 desc-heading">
                            Description
                          </h4>
                          <div class="single-desc mb--30">
                            <h5 class="title">Specifications:</h5>
                            <p>
                              We’ve created a full-stack structure for our
                              working workflow processes, were from the funny
                              the century initial all the made, have spare to
                              negatives. But the structure was from the funny
                              the century rather, initial all the made, have
                              spare to negatives.
                            </p>
                          </div>
                          <div class="single-desc mb--5">
                            <h5 class="title">Care & Maintenance:</h5>
                            <p>
                              Use warm water to describe us as a product team
                              that creates amazing UI/UX experiences, by
                              crafting top-notch user experience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>

        {product.reviews.map((review) => {
          return (
            <>
              <div className="container d-flex justify-content-between">
                <div
                  style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'black',
                    fontWeight: 'bold',
                  }}
                  className="text-center"
                >
                  <h2 className="text-light">
                    {review.name.slice(0, 1).toUpperCase()}
                  </h2>
                </div>
                <div className="container">
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p className="mb-1">{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              </div>
            </>
          )
        })}

        <div className="my-5">
          {userInfo ? (
            <>
              <form>
                <h2>Write a customer review</h2>
                <div className="container d-flex justify-content-between align-items-center w-100">
                  <div className="container w-100">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{
                        borderBottom: '2px solid black',
                        borderRadius: '0px',
                      }}
                    />
                  </div>
                  <div>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very good</option>
                      <option value="5">5- Excelent</option>
                    </select>
                  </div>
                </div>
                <div className=" container-fluid mt-3  d-flex justify-content-end">
                  <button
                    disabled={loadingCreateReview}
                    type="submit"
                    className=" btn btn-primary"
                    style={{ height: '50px', width: '150px', fontSize: '15px' }}
                  >
                    Submit
                  </button>
                  {loadingCreateReview && <LoadingBox></LoadingBox>}
                </div>
              </form>
            </>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product._id}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <img src={selectedImage} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProductScreen
