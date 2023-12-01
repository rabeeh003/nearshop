import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';

function EditProdect() {
  const [currentData, setCurrentData] = useState()
  const [shopId, setShopId] = useState()
  const [product, setProduct] = useState(null);

  const [FormData, setFormData] = useState({
    "price": null,
    "product_status": null
  })

  const setEditData = (id) => {
    const selectedProduct = product.find((prod, index) => index === id);

    if (selectedProduct) {
      setCurrentData(selectedProduct);
    }
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      product_status: value
    }));
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      price: value 
    }));
  };

  const handleSubmit = async () => {
    try {
      const dataToUpdate = {};
      if (FormData.product_status !== null && FormData.product_status !== currentData.product_status) {
        dataToUpdate.product_status = FormData.product_status;
      }
      if (FormData.price !== null && FormData.price !== currentData.price) {
        dataToUpdate.price = FormData.price;
      }
      
      console.log("Data to update : ", dataToUpdate);
      if (Object.keys(dataToUpdate).length > 0) {
        const url = `http://127.0.0.1:8000/api/s/editproduct/${currentData.id}/update/`;
        await axios.patch(url, dataToUpdate);
        console.log('Product updated successfully');
      } else {
        console.log('No changes to submit');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    const fetchShopId = () => {
      const adminKeyString = localStorage.getItem('adminKey');
      if (adminKeyString) {
        const adminKey = JSON.parse(adminKeyString);
        setShopId(adminKey.id);
        console.log('shopid : ', shopId);
      } else {
        console.log('adminKey not found in localStorage');
      }
    };

    fetchShopId();

  }, [shopId]);

  useEffect(() => {
    const fetchShopProducts = async () => {
      try {
        if (shopId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/s/shopproducts?shop_id=${shopId}`);
          setProduct(response.data.filter(product => product.shop_id === shopId));
          console.log('product : ', product);
        }
      } catch (error) {
        console.error('Error fetching shop products:', error);
      }
    };

    fetchShopProducts();
  }, [shopId]);
  return (
    <Page>
      <Container fluid>
        {currentData ? (
          <Row className='bg-gray p-2 ' style={{ borderRadius: "10px", backgroundColor: 'whitesmoke' }}>
            <Col xs={12} sm={4} md={3} className='d-flex align-items-center justify-content-center'>
              <ImageFeald>
                <Image
                  variant="top"
                  style={{ objectFit: 'cover', width: "90%", borderRadius: "10px", maxHeight: '90%' }}
                  src={currentData.gpro.prodect_image}
                />
              </ImageFeald>
            </Col>
            <Col xs={12} sm={8} md={9} style={{}}>
              <Col className='my-1'>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Product Name"
                >
                  <Form.Control type="text" disabled value={currentData.gpro.product_name} />
                </FloatingLabel>
              </Col>
              <Col xs={12} className='d-flex my-1'>
                <Col xs={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Category"
                  >
                    <Form.Control type="text" value={currentData.cat.category_name} disabled />
                  </FloatingLabel>
                </Col>
                <Col xs={6}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Price"
                  >
                    <Form.Control type="text" value={currentData.price} disabled />
                  </FloatingLabel>
                </Col>
              </Col>
            </Col >
            <Col xs={12} sm={9} className='d-flex my-1'>
              <Col xs={6}>
                <FloatingLabel controlId="floatingInput" label="Status">
                  <Form.Select aria-label="Default select example" value={FormData.product_status} onChange={handleStatusChange}>
                    {currentData.product_status === 'avb' ? (
                      <>
                        <option value='avb'>Available</option>
                        <option value='out'>Out of Stock</option>
                      </>
                    ) : (
                      <>
                        <option value='out'>Out of Stock</option>
                        <option value='avb'>Available</option>
                      </>
                    )}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col xs={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="New Price"
                >
                  <Form.Control type="number" onChange={handlePriceChange} />
                </FloatingLabel>
              </Col>
            </Col>
            <Col className='my-2'>
              <Button onClick={handleSubmit} variant='info' style={{ height: '55px', width: '100%' }}>Update</Button>
            </Col>
          </Row>
        ) : ('')}
        <ScrollableRow className='mt-3 p-3 pt-0' style={{position:'relative', borderRadius: '10px', height: '60vh', backgroundColor: 'whitesmoke' }}>
                    <Col xs={12} className='d-flex pb-2 pt-3' style={{ position:'sticky', top:0, backgroundColor: 'whitesmoke', alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
            <HeadTest>No</HeadTest>
            <HeadTest>Prodect Name</HeadTest>
            <HeadTest>Price</HeadTest>
            <HeadTest>Status</HeadTest>
            <HeadTest>Edit</HeadTest>
          </Col>
          {product ? (
            product.map((product, index) => (
              <Col xs={12} className='d-flex pt-2 py-3' style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <HeadTest>{index + 1}</HeadTest>
                <HeadTest>{product.gpro.product_name}</HeadTest>
                <HeadTest>{product.price}</HeadTest>
                <HeadTest>{product.product_status}</HeadTest>
                <HeadTest onClick={() => setEditData(index)}><i class="fa-solid fa-pen-to-square me-1 text-info"></i></HeadTest>
              </Col>
            ))
          ) : (
            <Col xs={12} className='d-flex pt-2' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <p>No products available</p>
            </Col>
          )}
        </ScrollableRow>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const ImageFeald = styled.div`
    width: 150px;
    height: 130px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin: 10px;
    @media screen and (max-width: 578px){
        width: 100px;
        height: 100px;
    }
`
const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
`
const ScrollableRow = styled.div`
    overflow-y: auto;
    cursor: pointer;
    white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    transition: scrollbar-color .3s;
    -ms-overflow-style: none;
    &:hover {
        scrollbar-color: black transparent;
    }
    &:not(:hover)::-webkit-scrollbar-thumb {
        background: transparent;
    }
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb{
	    border-radius: 10px;
    	background-color: light;
    }
`
export default EditProdect