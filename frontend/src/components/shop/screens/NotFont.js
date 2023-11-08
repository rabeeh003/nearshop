import React from 'react';
import styled from 'styled-components';
import not from "../../../assets/images/404.gif"
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`

const Gif = styled.img`
  width: 400px;
  @media screen and (max-width: 578px) {
    width: 90%;
  }
`

const Title = styled.h1`
  color: #333;
`

const Button = styled.button`
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

function NotFont() {
  return (
    <Container>
    <PageWrapper>
      <Gif src={not} alt='not-font'></Gif>
      <Title>Not font Page</Title>
      <Link to={'/shop'}>
        <Button className='bg-admin'>Go to Home page</Button>
      </Link>
    </PageWrapper>
    </Container>
  )
}

export default NotFont