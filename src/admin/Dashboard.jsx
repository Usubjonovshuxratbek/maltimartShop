import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/dashboard.css'
import useGetData from '../customHoks/useGetData'

function Dashboard() {

  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <div className="revenue__box">
                <h4>Total Sales</h4>
                <span>$7890</span>
              </div>
            </Col>
            <Col lg='3'>
            <div className="order__box">
                <h4>Orders</h4>
                <span>789</span>
              </div>
            </Col>
            <Col lg='3'>
            <div className="products__box">
                <h4>Total Products</h4>
                <span>{products.length}</span>
              </div>
            </Col>
            <Col lg='3'>
            <div className="users__box">
                <h4>Total Users</h4>
                <span>{users.length}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Dashboard