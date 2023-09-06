import React, { useState, useEffect } from 'react'
import Helment from '../components/Helment/Helment'
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Services from '../Services/Services';
import ProductsList from '../components/Ul/ProductsList';
import products from '../assets/data/products';
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/Ul/Clock';
import useGetData from '../customHoks/useGetData';

const Home = () => {

  const { data: products, loading } = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    )

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    )

    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    )

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    )

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    )

    setTrendingProducts(filteredTrendingProducts)
    setBestSalesProducts(filteredBestSalesProducts)
    setMobileProducts(filteredMobileProducts)
    setWirelessProducts(filteredWirelessProducts)
    setPopularProducts(filteredPopularProducts)
  }, [products])
  return (
    <Helment title={"Home"}>
      <section className='hero__section'>
        <Container>
          <Row className='hero__wrapper'>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className='hero__subtitle'>Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic Moder</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, veniam! Autem odio nemo vero enim vel libero itaque accusamus dolores.</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'><Link to='/shop'>SHOP NOW</Link></motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <div className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Trending Products</h2>
            </Col>

            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
                <ProductsList data={trendingProducts} />
            }
          </Row>
        </Container>
      </div>
      <section className='best__sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Best Sales</h2>
            </Col>

            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
                <ProductsList data={bestSalesProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className='time__count'>
        <Container>
          <Row className='pt-5'>
            <Col lg='6' md='12' className='count__down-col'>
              <div className="clock__top-content pt-4">
                <h4 className='text-white fs-6'>Limited offers</h4>
                <h3 className='text-white fs-5 mt-3'>Quality  Armchair</h3>
              </div>
              <Clock />
              <motion.button
                className='buy__btn store__btn'
                whileTap={{ scale: '1.2' }}
              >
                <Link to='/shop'>Visit Store</Link>
              </motion.button>
            </Col>

            <Col lg='6' md='12' className='text-end counter__img pt-5'>
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className='new__arrivals'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>New Arrivals</h2>
            </Col>

            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
                <ProductsList data={mobileProducts} />
            }

            {
              loading ? <h5 className='fw-bold'>Loading.....</h5> :
              <ProductsList data={wirelessProducts} />
            }
          </Row>
        </Container>
      </section>

      <section className='popular__category'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Popular in Category</h2>
            </Col>
            <ProductsList data={popularProducts} />
          </Row>
        </Container>
      </section>
    </Helment>
  )
}

export default Home
