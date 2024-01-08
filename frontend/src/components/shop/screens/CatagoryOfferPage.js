import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

function CategoryOfferPage() {
  const location = useLocation();
  const [shopId, setShopId] = useState();
  const [product, setProducts] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [catagory, setCatagory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [filterType, setFilterType] = useState(true);
  const [offerCount, setOfferCount] = useState(0);
  const [getNeed, setGetNeed] = useState(100)

  // Get the next day
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);

  const [FormData, setFormData] = useState({
    "offer_price": null,
    "offer_start": today.toISOString().split('T')[0],
    "offer_end": nextDay.toISOString().split('T')[0],
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // fetch shop id
  const fetchShopId = async () => {
    const adminKeyString = localStorage.getItem('adminKey');
    if (adminKeyString) {
      const adminKey = JSON.parse(adminKeyString);
      setShopId(adminKey.id);
    } else {
      console.log('adminKey not found in localStorage');
    }
  };

  // fetch shop products

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
            product.product_status === 'avb'
          );
        });
        setAllProducts(filteredProducts);
        console.log("filteredProducts", filteredProducts);
        // catagory filter
        const getUniqueCategories = () => {
          const categories = new Set();
          if (filteredProducts && filteredProducts.length > 0) {
            filteredProducts.forEach(item => {
              if (item.cat && item.cat.category_name && item.cat.category_image) {
                const category = item.cat.category_name;
                categories.add(category);
              } else {
                console.warn("Missing category data for item:", item); // Log a warning if data is missing
              }
            });
          } else {
            console.warn("filteredProducts array is empty or undefined."); // Log a warning if array is empty
          }

          return Array.from(categories);
        };

        const uniqueCategories = getUniqueCategories();
        console.log("uniqueCategories", uniqueCategories);
        setCatagory(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching shop products:', error);
    }
  };

  useEffect(() => {
    fetchShopId();
    fetchShopProducts();
  }, [shopId, offerCount]);

  useEffect(() => {
    if (allProducts) {
      const selectedProduct = allProducts.filter(product => selectedCategory === product.cat.category_name);
      if (selectedProduct && filterType == true) {
        const aff = selectedProduct.filter(product => product.offer_price === null);
        setProducts(aff);
        console.log("________________________________________________________________");
        console.log("-----------------Non offer products-------------------");
        console.log("products 2", aff);
      } else if (selectedProduct && filterType === false) {
        setProducts(selectedProduct)
        console.log("________________________________________________________________");
        console.log("--------------------- Offer products ----------------------");
        console.log("products 2", selectedProduct);
      }
    }
  }, [selectedCategory, filterType, getNeed])

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

  const handleSubmit = async () => {
    if (product !== null && offerCount !== 0 && FormData.offer_start !== FormData.offer_end) {
      console.log(getNeed);
      console.log("============== apply offer =================");
      try {
        const promises = product.map(async (prod) => {
          const discountedPrice = prod.price - (prod.price * (offerCount / 100));
          const updateData = {
            "offer_price": discountedPrice,
            "offer_start": FormData.offer_start,
            "offer_end": FormData.offer_end
          };
          console.log("updateData", updateData);
          const url = `http://127.0.0.1:8000/api/s/editproduct/${prod.id}/update/`;
  
          try {
            const updatedProduct = await axios.patch(url, updateData);
            console.log('Product updated successfully:', updatedProduct.data);
            return updatedProduct;
          } catch (error) {
            console.error('Error updating product:', error);
            throw error; // Propagate the error to the outer catch block
          }
        });
  
        await Promise.all(promises);
  
        setOfferCount(0);
        setGetNeed(getNeed + 1);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const removeOffer = async (data) => {
    console.log("=========== removeOffer =================");
      const removeee = {
        "offer_price": null,
        "offer_start": null,
        "offer_end": null,
      };
      if (product !== null) {
        try {
          product.forEach(async(prod) => {
            const url = `http://127.0.0.1:8000/api/s/editproduct/${prod.id}/update/`;
            await axios.patch(url, removeee);
            console.log('Remove product successfully');
          })
          setGetNeed(getNeed + 1)
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
  };

  return (
    <Page>
      <Container fluid>
        <Row className='p-2 ' style={{ borderRadius: "10px", backgroundColor: 'whitesmoke' }}>
          <Col>
            <Col className='my-1'>
              <FloatingLabel
                controlId="floatingInput"
                label="Category Name"
              >
                <Form.Select onClick={e => (setSelectedCategory(e.target.value), console.log("selected cat", selectedCategory))} aria-label="Default select example">
                  <option>select category</option>
                  {catagory !== null ? (
                    catagory.map((item, index) => (
                      <option value={item.img} key={index}>{item}</option>
                    )))
                    : (
                      <option>Loading...</option>
                    )}
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Col >
          <Col xs={12} sm={6} className='d-flex align-items-center my-1'>
            <Col xs={6}>
              <Form.Check
                type="radio"
                label="Apply for offer less products"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                defaultChecked
                onClick={e => setFilterType(true)}
              />
            </Col>
            <Col xs={6}>
              <Form.Check
                type="radio"
                label="Apply for all products"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                onClick={e => setFilterType(false)}
              />
            </Col>
          </Col>
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
                label="Offer ( % )"
              >
                <Form.Control type="number" name='offer_count' value={offerCount} onChange={e => setOfferCount(e.target.value)} />
              </FloatingLabel>
            </Col>
          </Col>
          {filterType === false ? (
          <Col className='my-2'>
            <Button onClick={removeOffer} variant='danger' style={{ height: '55px', width: '100%', color: "white" }}>Remove all</Button>
          </Col>
          ):null}
          <Col className='my-2'>
            <Button onClick={handleSubmit} variant='info' style={{ height: '55px', width: '100%', color: "white" }}>Add</Button>
          </Col>
        </Row>
        <ScrollableRow className='mt-3 p-3 pt-0' style={{ position: 'relative', borderRadius: '10px', maxHeight: '75vh', backgroundColor: 'whitesmoke' }}>
          <Col xs={12} className='d-flex pb-2 pt-3' style={{ position: 'sticky', top: 0, backgroundColor: 'whitesmoke', alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
            <HeadTest className='col-1' >No</HeadTest>
            <HeadTest className='col' >Prodect Name</HeadTest>
            <HeadTest className='col-2' >Price</HeadTest>
            {filterType === false ? (
              <>
                <HeadTest className='col' >Offer Price</HeadTest>
                <HeadTest className='col' >Start</HeadTest>
                <HeadTest className='col' >End</HeadTest>
              </>
            ) : ''}
          </Col>
          {product ? (
            product.map((product, index) => (
              <Col xs={12} key={index} className='d-flex pt-2 py-3' style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <HeadTest className='col-1 '>{index + 1}</HeadTest>
                <HeadTest className='col'>{product.gpro.product_name}</HeadTest>
                <HeadTest className='col-2'>{product.price}</HeadTest>
                {filterType === false ? (
                  <>
                    <HeadTest className='col'>{product.offer_price}</HeadTest>
                    <HeadTest className='col'>{product.offer_price !== null ? formatDate(product.offer_start) : ""}</HeadTest>
                    <HeadTest className='col'>{product.offer_price !== null ? formatDate(product.offer_end) : ""}</HeadTest>
                  </>
                ) : ''}
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
export default CategoryOfferPage