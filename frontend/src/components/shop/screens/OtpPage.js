import LogGif from '../../../assets/images/otp_gif.gif'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth';

function OtpPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handileGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log(result.user.email);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/shop_mail_check/', { mail: user.email });
        navigate('/shop/login');
      } catch (error) {
        navigate('/shop/signup', { state: { passedData: result.user.email } });
      } 
    } catch (err) {
      console.log(err);
      navigate('/', { state: { passedData: user?.email || '' } });
    }
  };

  return (
    <Page className='container-fluid'>
      <div className="row justify-content-center" style={{ height: "80vh" }}>
        <div className="col-12 col-md-6 col-lg-4">
          <Card className="card">
            <Col xs={12} className='d-flex justify-content-center align-items-center'>
              <GifImage src={LogGif} alt='image' />
            </Col>
            <CardBody className="card-body">
              <h4>Verify for register</h4>
              <Col>
                <Google className='btn btn-danger' onClick={handileGoogleSignin} > Signin with Google </Google>
              </Col>
            </CardBody>
          </Card>
        </div>
      </div>
    </Page>
  );
}

const Page = styled.div`
  max-width: 90vw;
  height: 60vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const GifImage = styled.img`
  width: 100%;
`

const Card = styled.div`
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
`;

const CardBody = styled.div`
  padding: 20px, 5px;
  text-align: center;
`;



const Google = styled.button`
  background-color: #0dcaf0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
`;
export default OtpPage