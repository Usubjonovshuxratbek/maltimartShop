import React, { useState, useRef, useEffect } from 'react'

import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import Helment from '../components/Helment/Helment'
import CommonSection from '../components/Ul/CommonSection'
import '../styles/productDetails.css'
import ProductList from '../components/Ul/ProductsList'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlices'
import { toast } from 'react-toastify'

import {db} from '../firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import useGetData from '../customHoks/useGetData'

const ProductDetails = () => {

  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [tab, setTab] = useState('desc')
  const reviewUser = useRef('')
  const reviewMsg = useRef('')
  const [rating, setRating] = useState(null)

  const {data: products} = useGetData('products')
  const docRef = doc(db, 'products', id)

  useEffect(()=>{
    const getProducts = async()=>{
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()) {
        setProduct(docSnap.data())
      } else {
        console.log('no product');
      }
    }
    
    getProducts()
  },[])
  const dispatch = useDispatch()

  const produst = products.find(item => item.id === id)

  const { 
    imgUrl, 
    productName, 
    price, 
    // avgRating, 
    // reviews, 
    description, 
    shortDesc, 
    category 
  } = produst
  const relatedProdducts = products.filter(item => item.category === category)

  const submitHandler = (e) => {
    e.preventDefault()

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating
    }


    toast.success("Review submitted")
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      image: imgUrl,
      productName,
      price
    }))

    toast.success('Product added succesfully')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [produst])

  return (
    <Helment title={productName}>
      <CommonSection title={productName} />

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img className='product__img' src={imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex aligin-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    <span>
                      <i className='ri-star-s-fill'></i>
                    </span>
                    <span>
                      <i className='ri-star-half-s-line'></i>
                    </span>
                  </div>

                  {/* <p>(<span>{avgRating}</span>ratings)</p> */}
                </div>

                <div className='d-flex aligin-items-center gap-5'>
                  <span className='product__price'>${price}</span>
                  <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className='mt-3'>{shortDesc}</p>
                <motion.button whileTap={{ scale: 1.2 }}
                  className='buy__btn' onClick={addToCart}>Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex aligin-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'activer__tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'activer__tab' : ''}`} onClick={() => setTab('rev')}>Reviews</h6>
              </div>

              {
                tab === 'desc' ? (
                  <div className="tab__content mt-5">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className='product__review mt-5'>
                    <div className="review__wrapper">
                      {/* <ul>
                        {
                          reviews?.map((item, index) => (
                            <li key={index} className='mb-4'>
                              <h6>Jhone Doe</h6>
                              <span>{item.rating} (rating)</span>
                              <p>{item.text}</p>
                            </li>
                          ))
                        }
                      </ul> */}

                      <div className="review__form">
                        <h4>Leave your experience</h4>
                        <form action="" onSubmit={submitHandler}>
                          <div className="form__group">
                            <input
                              type="text"
                              placeholder='Enter name'
                              ref={reviewUser}
                              required
                            />
                          </div>

                          <div className="form__group d-flex aligin-items-center gap-5 rating__group">
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                              1<i className='ri-star-s-fill'></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}
                            >2<i className='ri-star-s-fill'></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                              3<i className='ri-star-s-fill'></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                              4<i className='ri-star-s-fill'></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                              5<i className='ri-star-s-fill'></i>
                            </motion.span>
                          </div>

                          <div className="form__group">
                            <textarea
                              ref={reviewMsg}
                              rows={4}
                              type="text"
                              placeholder='Review Message ...'
                              required
                            />
                          </div>

                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            type='submit'
                            className='buy__btn'>
                            Submit
                          </motion.button>
                        </form>
                      </div>
                    </div>
                  </div>
                )
              }
            </Col>

            <Col lg='12'>
              <h2 className='related__title'>You might also like</h2>
            </Col>

            <ProductList data={relatedProdducts} />
          </Row>
        </Container>
      </section>
    </Helment>
  )
}

export default ProductDetails
