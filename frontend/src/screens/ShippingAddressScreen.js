import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state
  const [firstName, setFirstName] = useState(shippingAddress.firstName || '')
  const [lastName, setLastName] = useState(shippingAddress.lastName || '')
  const [email, setEmail] = useState(shippingAddress.email || '')
  const [phone, setPhone] = useState(shippingAddress.phone || '')
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo, navigate])
  const [country, setCountry] = useState(shippingAddress.country || '')
  const submitHandler = (e) => {
    e.preventDefault()
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    })
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      }),
    )
    navigate('/payment')
  }

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' })
  }, [ctxDispatch, fullBox])

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      {/* <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button
              id="chooseOnMap"
              type="button"
              variant="light"
              onClick={() => navigate('/map')}
            >
              Choose Location On Map
            </Button>
            {shippingAddress.location && shippingAddress.location.lat ? (
              <div>
                LAT: {shippingAddress.location.lat}
                LNG:{shippingAddress.location.lng}
              </div>
            ) : (
              <div>No location</div>
            )}
          </div>

          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div> */}

      <div class="axil-checkout-billing">
        <h4 class="title mb--40">Shipping Details</h4>
        <form onSubmit={submitHandler}>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="John"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label>
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div class="form-group">
          <label>Company Name</label>
          <input type="text" id="company-name" />
        </div>
        <div class="form-group">
          <label>
            Country/ Region <span>*</span>
          </label>
          <select id="Region">
            <option value="3">Australia</option>
            <option value="4">England</option>
            <option value="6">New Zealand</option>
            <option value="5">Switzerland</option>
            <option value="1">United Kindom (UK)</option>
            <option value="2">United States (USA)</option>
          </select>
        </div> */}
          <div class="form-group">
            <label>
              Street Address <span>*</span>
            </label>
            <input
              type="text"
              id="address1"
              class="mb--15"
              placeholder="House number and street name"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>
              Town/ City <span>*</span>
            </label>
            <input
              type="text"
              id="town"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  Postal Code <span>*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Adam"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  Mobile No.<span>*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="John"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button class="axil-btn btn-bg-primary checkout-btn" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
