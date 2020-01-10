import React from 'react';
import styled from 'styled-components';

import { HTMLContent } from './Content';
import Heading from './Heading';

const Container = styled.section`
  position: relative;
`;

const HomeAbout = ({ data }) => (
  <Container className="container">
    <section className="section">
      <Heading>Who we are</Heading>
      <HTMLContent content={data.homeAboutUs} />
    </section>
  </Container>
);

export default HomeAbout;
