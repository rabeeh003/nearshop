import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`

const Title = styled.h1`
  color: #333;
`

const Description = styled.p`
  font-size: 18px;
  color: #666;
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
            <Title>Not font Page</Title>
            <Description>This is a simple front page created using styled-components in React.</Description>
            <Button>Get Started</Button>
        </PageWrapper>
    )
}

export default NotFont