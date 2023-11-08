import React from 'react';
import styled from 'styled-components';
import not from "../../../assets/images/404.gif"
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`

const Title = styled.h1`
  color: #333;
`

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

function NotFont() {
  return (
    <PageWrapper>
      <img src={not} style={{width:'95vw'}} alt='not-font'></img>
      <Title>Not font Page</Title>
      <Link to={'/'}>
        <Button>Go to Home page</Button>
      </Link>
    </PageWrapper>
  )
}

export default NotFont