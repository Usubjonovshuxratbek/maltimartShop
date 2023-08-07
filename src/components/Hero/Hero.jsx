import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../../assets/images/hero-img.png'

const Hero = () => {

    const year = new Date().getFullYear();
    return (
        <section className='hero__section'>
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className="hero__content">
                            <p className='hero__subtitle'>Trending product in {year}</p>
                            <h2>Make Your Interior More Minimalistic Moder</h2>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, veniam! Autem odio nemo vero enim vel libero itaque accusamus dolores.</p>
                            <button className='buy__btn'>SHOP NOW</button>
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
    )
}

export default Hero
