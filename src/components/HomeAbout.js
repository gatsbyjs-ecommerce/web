import React from 'react';
import styled from 'styled-components';

import { HTMLContent } from './Content';
import Heading from './Heading';

const Container = styled.section`
  position: relative;
  margin-top: 5rem;
`;

const HomeAbout = ({ data }) => (
  <Container className="container">
    <Heading>Who we are</Heading>
    <HTMLContent content={data.homeIntro} />
  </Container>
);

export default HomeAbout;
