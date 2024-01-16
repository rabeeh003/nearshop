import LogGif from '../../../assets/images/otp_gif.gif'
import google from '../../../assets/images/google.png'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth, provider } from '../../../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser);

      console.log(loggedInUser.email);
      try {
        console.log("mail :", loggedInUser.email);
        await axios.post('http://www.nearbazar.shop/api/shop_mail_check/', { "mail": loggedInUser.email });
        navigate('/owner/login');
      } catch (error) {
        navigate('/owner/signup', { state: { passedData: loggedInUser.email } });
      }

    } catch (err) {
      console.error('Error signing in:', err);
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
                <Google className='btn btn-danger' onClick={handleGoogleSignin} >
                  <GoogleImg src={google} />
                  Signin with Google
                </Google>
              </Col>
            </CardBody>
            <p className='mt-4 text-center w-100'>Have an account?<Link to={'/owner/login'} className='ms-2'>Signin</Link></p>
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



const Google = styled.div`
  background-color: blue;
  color: #fff;
  border: none;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
`;

const GoogleImg = styled.img`
  width: 30px;
  height: 30px;
  background: #fff;
  margin-right: 10px;
`
export default GoogleAuth