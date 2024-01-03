import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import SearchSuggestions from '../includes/add offer/SearchSuggestions';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function OfferPage() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const productId = location.state?.product || null;
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const [currentData, setCurrentData] = useState();
  const [shopId, setShopId] = useState();
  const [product, setProducts] = useState(null);
  const [getNeed, setGetNeed] = useState(0)

  // Get the next day
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  const [FormData, setFormData] = useState({
    "offer_price": null,
    "offer_start": today.toISOString().split('T')[0],
    "offer_end": nextDay.toISOString().split('T')[0],
  });

  const setEditData = (id) => {
    const selectedProduct = product.find((prod, index) => index === id);
    if (selectedProduct) {
      setCurrentData(selectedProduct);
      setFormData(prevFormData => ({
        ...prevFormData,
        offer_price: selectedProduct.offer_price,
        offer_start: selectedProduct.offer_start,
        offer_end: selectedProduct.offer_end
      }));
      console.log('current data ', currentData);
      console.log('Form data ', FormData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (FormData.offer_price !== null && FormData.offer_start !== FormData.offer_end) {

      try {
        console.log("subitting data : ", FormData);
        const url = `http://127.0.0.1:8000/api/s/editproduct/${currentData.id}/update/`;
        await axios.patch(url, FormData);
        console.log('Product updated successfully');
        setFormData({
          "offer_price": null,
          "offer_start": today.toISOString().split('T')[0],
          "offer_end": nextDay.toISOString().split('T')[0],
        });
        setCurrentData(null)
        setGetNeed(1)
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };
  const removeOffer = async (data) => {
    try {
      const removeee = {
        "offer_price": null,
        "offer_start": null,
        "offer_end": null,
      };
      console.log("removeee data : ", removeee);
      const url = `http://127.0.0.1:8000/api/s/editproduct/${data.id}/update/`;
      await axios.patch(url, removeee);
      setGetNeed(2)
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };


  useEffect(() => {
    const setPro = () => {
      if (productId) {
        console.log("Passed data from search: ", productId);
        setCurrentData(productId);
      }
    };

    setPro();
  }, [productId]);

  useEffect(() => {
    const fetchShopId = async () => {
      const adminKeyString = localStorage.getItem('adminKey');
      if (adminKeyString) {
        const adminKey = JSON.parse(adminKeyString);
        setShopId(adminKey.id);
      } else {
        console.log('adminKey not found in localStorage');
      }
    };

    const fetchShopProducts = async () => {
      try {
        if (shopId) {
          const response = await axios.get(`http://127.0.0.1:8000/api/s/shopproducts?shop_id=${shopId}`);
          console.log("====================");
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          // Format yesterday as a string for comparison
          const formattedYesterday = yesterday.toISOString().slice(0, 10);
          console.log("yesterday = ", formattedYesterday);
          const filteredProducts = response.data.filter(product => {
            return (
              product.shop_id === shopId &&
              product.offer_price > 0 &&
              (formattedYesterday < product.offer_end)
            );
          });
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching shop products:', error);
      }
    };

    fetchShopId();
    fetchShopProducts();
  }, [shopId, getNeed]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const maxStartDate = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000));
  const getMaxEndDate = () => {
    if (FormData.offer_start) {
      const start = new Date(FormData.offer_start);
      const maxEndDate = new Date(start.getTime() + (35 * 24 * 60 * 60 * 1000)); // 35 days = 5 weeks
      const today = new Date();

      // If the calculated end date exceeds today + 5 weeks, set it to today + 5 weeks
      if (maxEndDate > today) {
        return maxEndDate.toISOString().split('T')[0];
      } else {
        const maxDate = new Date(today.getTime() + (35 * 24 * 60 * 60 * 1000));
        return maxDate.toISOString().split('T')[0];
      }
    }
    return null;
  };

  return (
    <Page>
      <Container fluid>
        <Row className='p-2 ' style={{ borderRadius: "10px", backgroundColor: 'whitesmoke' }}>
          <Col xs={12} sm={4} md={3} className='d-flex align-items-center justify-content-center'>
            <ImageFeald>
              <Image
                variant="top"
                style={{ objectFit: 'cover', width: "90%", borderRadius: "10px", maxHeight: '90%' }}
                src={currentData ? currentData.gpro.prodect_image : ''}
              />
            </ImageFeald>
          </Col>
          <Col xs={12} sm={8} md={9} style={{}}>
            <Col className='my-1'>
              <FloatingLabel
                controlId="floatingInput"
                label="Product Name"
              >
                <Form.Control onClick={handleModalOpen} value={currentData ? currentData.gpro.product_name : ''} type="text" />
                <SearchSuggestions show={showModal} onHide={handleModalClose} />
              </FloatingLabel>
            </Col>
            <Col xs={12} className='d-flex my-1'>
              <Col xs={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Category"
                >
                  <Form.Control type="text" value={currentData ? currentData.cat.category_name : ''} disabled />
                </FloatingLabel>
              </Col>
              <Col xs={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Price"
                >
                  <Form.Control type="text" value={currentData ? currentData.price : ''} disabled />
                </FloatingLabel>
              </Col>
            </Col>
          </Col >
          <Col xs={12} sm={10} className='d-flex my-1'>
            <Col xs={3}>
              <Form.Group>
                <FloatingLabel controlId="startDate" label="Start Date">
                  <Form.Control
                    type="date"
                    name='offer_start'
                    value={FormData.offer_start}
                    min={today.toISOString().split('T')[0]}
                    max={maxStartDate.toISOString().split('T')[0]}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs={3}>
              <Form.Group>
                <FloatingLabel controlId="endDate" label="End Date">
                  <Form.Control
                    type="date"
                    name='offer_end'
                    value={FormData.offer_end}
                    min={FormData.start_date}
                    max={getMaxEndDate()}
                    onChange={handleInputChange}
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Offer Price"
              >
                <Form.Control type="number" name='offer_price' value={FormData.offer_price} onChange={handleInputChange} />
              </FloatingLabel>
            </Col>
          </Col>
          <Col className='my-2'>
            <Button onClick={handleSubmit} variant='info' style={{ height: '55px', width: '100%', color:"white" }}>Add</Button>
          </Col>
        </Row>
        {/* <Row className=' mt-3 p-3' style={{ borderRadius: '10px', height: '60vh', backgroundColor: 'whitesmoke' }}>
          <Col xs={12} className='d-flex pb-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
            <HeadTest>No</HeadTest>
            <HeadTest>Prodect Name</HeadTest>
            <HeadTest>Count / KG</HeadTest>
            <HeadTest>Price</HeadTest>
            <HeadTest>Offer Price</HeadTest>
            <HeadTest>Remove</HeadTest>
          </Col>
          <Col xs={12} className='d-flex pt-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }}>
            <HeadTest>1</HeadTest>
            <HeadTest>Prodect Name</HeadTest>
            <HeadTest>1 </HeadTest>
            <HeadTest>300</HeadTest>
            <HeadTest>200</HeadTest>
            <HeadTest><i class="fa-regular fa-circle-xmark me-3"></i></HeadTest>
          </Col>
        </Row> */}
        <ScrollableRow className='mt-3 p-3 pt-0' style={{ position: 'relative', borderRadius: '10px', maxHeight: '75vh', backgroundColor: 'whitesmoke' }}>
          <Col xs={12} className='d-flex pb-2 pt-3' style={{ position: 'sticky', top: 0, backgroundColor: 'whitesmoke', alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
            <HeadTest>No</HeadTest>
            <HeadTest>Prodect Name</HeadTest>
            <HeadTest>Price</HeadTest>
            <HeadTest>Offer Price</HeadTest>
            <HeadTest>Start</HeadTest>
            <HeadTest>End</HeadTest>
            <HeadTest>Action</HeadTest>
          </Col>
          {product ? (
            product.map((product, index) => (
              <Col xs={12} key={index} className='d-flex pt-2 py-3' style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <HeadTest>{index + 1}</HeadTest>
                <HeadTest>{product.gpro.product_name}</HeadTest>
                <HeadTest>{product.price}</HeadTest>
                <HeadTest>{product.offer_price}</HeadTest>
                <HeadTest>{formatDate(product.offer_start)}</HeadTest>
                <HeadTest>{formatDate(product.offer_end)}</HeadTest>
                <HeadTest >
                  <i onClick={() => setEditData(index)} class="fa-solid fa-pen-to-square me-1 text-info"></i>
                  <i onClick={() => {
                    removeOffer(product)
                  }} class="fa-regular fa-circle-xmark me-3"></i>
                </HeadTest>
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
    max-height: 100%;
    margin-bottom: 90px;
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
export default OfferPage