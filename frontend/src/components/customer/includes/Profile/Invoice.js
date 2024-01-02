import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
  const invoicePageRef = useRef(null);
  const location = useLocation();
  const orderData = location.state?.orderData || null;
  const products = location.state?.products || null;

  console.log("--------------------------------");
  console.log("order data : ", orderData, products);
  console.log("--------------------------------");
  const invoiceData = {
    companyLogo: 'url_to_your_company_logo',
    shopLogo: 'url_to_shop_logo',
    shopDetails: {
      name: 'Shop Name',
      address: 'Shop Address',
      // other shop details
    },
    user: {
      name: 'User Name',
      address: 'User Address',
      // other user details
    },
    products: [
      {
        name: 'Product 1',
        price: 10,
        quantity: 2,
      },
      {
        name: 'Product 2',
        price: 15,
        quantity: 1,
      },
      // Add other products
    ],
  };
  function printInvoicePage() {
    const printContents = invoicePageRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  const total = invoiceData.products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const [totelpr, setTotal] = useState(0)
  useEffect(() => {
    const newTotal = products.reduce((acc, product) => {
      return acc + (product.product_price * product.product_count);
    }, 0);
    setTotal(newTotal);
  }, [products]);
  return (
    <div className="invoice container mt-5">
      <div id='invoicePage' ref={invoicePageRef}>
        <div className="row">
          <div className="col text-center">
            <div className="shop-details">
              <img src={orderData.seller.profile_image} width={"100px"} alt="Shop Logo" className="img-fluid mb-3" />
              <p className='h3 mb-0'>{orderData.seller.shop_name}</p>
              <p>{orderData.seller.shop_label}</p>
              {/* Other shop details */}
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col mt-4">
            <label>Date : {orderData.updated_date}</label>
            <p>Invoice Id :{orderData.id}</p>
          </div>
          <div className="col-auto">
            <div className='customer-details mt-4'>
              <h5>To:</h5>
              <label> Name : {orderData.userData.full_name}</label>
              <p> Phone : {orderData.userData.phone_number}</p>
            </div>
          </div>
        </div>
        <div className="product-list mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const totalPrice = product.product_price * product.product_count;
                return (
                  <tr key={index}>
                    <td>{product.pro.gpro.product_name}</td>
                    <td>₹{product.product_price}</td>
                    <td>{product.product_count}</td>
                    <td>₹{totalPrice}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="total mt-4">
          <h2>Total: ₹{totelpr}</h2>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={printInvoicePage}>Download Invoice</button>
      </div>
    </div>
  );
};

export default Invoice;
