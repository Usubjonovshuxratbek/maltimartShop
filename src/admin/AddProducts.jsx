import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'

function AddProducts() {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDesription, setEnterDescription] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='mb-4 mt-5'>Add Product</h4>
            <Form>
              <FormGroup className='form__group'>
                <span>Product title</span>
                <input type="text" placeholder='Double sofa'
                  value={enterTitle} onClick={e => setEnterTitle(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Short Description</span>
                <input type="text" placeholder='lorem.....'
                value={enterShortDesc} onClick={e => setEnterShortDesc(e.target.value)} />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Description</span>
                <input type="text" placeholder='Description...' />
              </FormGroup>
              <div className='d-flex aligan-items-center justify-content-between gap-5'>
                <FormGroup className='form__group w-50'>
                  <span>Price</span>
                  <input type="number" placeholder='$100' />
                </FormGroup>
                <FormGroup className='form__group w-50'>
                  <span>Category</span>
                  <select className='w-100 p-2'>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="Mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className='form__group'>
                  <span>Product Image</span>
                  <input type="file" />
                </FormGroup>
              </div>
              <button className='buy__btn'>Add Product</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts