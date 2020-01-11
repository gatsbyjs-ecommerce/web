import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px 0;
  background-color: #2f2f2f;
  text-align: center;
  color: #e4e1e1;
  font-size: 0.9rem;
`;

const TopBar = () => {
  return <Container>Free Standard Shipping | 30 day returns</Container>;
};

export default TopBar;
