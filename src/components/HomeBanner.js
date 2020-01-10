import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import config from '../utils/config';

const Container = styled.div`
  margin-left: 10rem !important;
  margin-right: 10rem !important;
  max-height: 600px;
  overflow: hidden;
`;

const ContainerImage = styled.div`
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
`;

const StripMobile = styled.div`
  padding: 0.3rem 0;
  background-color: #100b0b;
  width: 100%;
  opacity: 0.9;
`;

const HomeBanner = ({ data }) => {
  if (!data.homeHeroImage) {
    return null;
  }

  return (
    <Container className="container is-fluid">
      <ContainerImage className="is-hidden-mobile">
        <Img fluid={data.homeHeroImage.asset.fluid} />
      </ContainerImage>
      <StripMobile className="is-hidden-tablet">
        <p className="is-size-6	is-uppercase has-text-white has-text-centered has-text-weight-semibold">
          {data.homeHeroTitle}
        </p>
      </StripMobile>
    </Container>
  );
};

export default HomeBanner;
