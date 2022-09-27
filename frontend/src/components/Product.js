import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import axios from 'axios'
import { useContext } from 'react'
import { Store } from '../Store'
import { FaRupeeSign, FaStar } from 'react-icons/fa'
function Product(props) {
  const { product } = props
  console.log(product.numReviews)

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
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
  console.log(product)
  return (
    <>
      {/* <Card>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            height={300}
          /> */}
      {/* </Link> */}
      {/* <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link> */}
      {/* <Rating rating={product.rating} numReviews={product.numReviews} /> */}
      {/* <Card.Text>${product.price}</Card.Text> */}
      {/* {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button onClick={() => addToCartHandler(product)}>
              Add to cart
            </Button>
          )} */}
      {/* </Card.Body> */}
      {/* </Card> */}

      <div className="card-content">
        <Card.Header className="p-5">
          <Link to={`/product/${product._id}`}>
            <img
              src={product.image}
              alt={product.name}
              style={{ height: '200px', width: '250px' }}
            />
          </Link>
        </Card.Header>
        <Card.Body>
          <Rating
            rating={product.rating}
            numReviews={
              product.numReviews === undefined ? 0 : product.numReviews
            }
          />
          <Link
            to={`/product/${product._id}`}
            className="fw-bold h5 text-secondary"
          >
            {product.name.slice(0, 15)}
          </Link>
          <h4>
            <FaRupeeSign />
            {product.price}
          </h4>
        </Card.Body>
      </div>
    </>

    // </>
  )
}

export default Product
