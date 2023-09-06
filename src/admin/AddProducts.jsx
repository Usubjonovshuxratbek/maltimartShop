import React, { useState } from 'react'
import { Row, Col, Form, FormGroup } from 'reactstrap'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function AddProducts() {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDesription, setEnterDescription] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProducts = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   description: enterDesription,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl: enterProductImg
    // };

    try {

      const docRef = collection(db, 'products')

      const storageRef = ref(storage, `productImages/${Date.now() +
        enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(() => {
        toast.error('images not uploaded!')
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDesription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL
          })
        })
      }
      )

      setLoading(false)
      toast.success("product successfully added!")
      navigate('/dashboard/all-products')

    } catch (err) {

      setLoading(false)
      toast.error("product not added!")
    }
    // console.log(product);
  }

  return (
    <section>
      <div className='container'>
        <Row>
          <Col lg='12'>
            {
              loading ? <h4>Loading.......</h4> : <>

                <h4 className='mb-4 mt-5'>Add Product</h4>
                <Form onSubmit={addProducts}>
                  <FormGroup className='form__group'>
                    <span>Product title</span>
                    <input type="text" placeholder='Double sofa' value={enterTitle}
                      onChange={e => setEnterTitle(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Short Description</span>
                    <input type="text" placeholder='lorem.....' value={enterShortDesc}
                      onChange={e => setEnterShortDesc(e.target.value)} required />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <span>Description</span>
                    <input type="text" placeholder='Description...' value={enterDesription}
                      onChange={e => setEnterDescription(e.target.value)} required />
                  </FormGroup>
                  <div className='d-flex aligan-items-center justify-content-between gap-5'>
                    <FormGroup className='form__group w-50'>
                      <span>Price</span>
                      <input type="number" placeholder='$100' value={enterPrice}
                        onChange={e => setEnterPrice(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form__group w-50'>
                      <span>Category</span>
                      <select className='w-100 p-2' value={enterCategory}
                        onChange={e => setEnterCategory(e.target.value)} required>
                        <option>Select category</option>
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
                      <input type="file" required
                        onChange={e => setEnterProductImg(e.target.files[0])} />
                    </FormGroup>
                  </div>
                  <button
                    className='buy__btn'
                    onClick={addProducts}
                    type='submit'>
                    Add Product
                  </button>
                </Form>
              </>
            }
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default AddProducts