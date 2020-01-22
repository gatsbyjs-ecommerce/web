import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

const Container = styled.div`
  position: relative;
  margin-top: -1px;
  margin-left: 10rem !important;
  margin-right: 10rem !important;
  max-height: 600px;
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`;

const ContainerImage = styled.div`
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
  a,
  p,
  h4 {
    color: ${props => props.textColor} !important;
  }
  p {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .button {
    background-color: transparent;
    box-shadow: none;
    border: 1px solid ${props => props.textColor};
    color: #fff;
    font-weight: 600;
  }
  @media only screen and (max-width: 1024px) {
    h4 {
      font-size: 1.25rem !important;
      line-height: 1.28rem !important;
      margin-bottom: 8px;
    }
  }
`;

const HomeBanner = ({ data }) => {
  if (!data.homeHeroImage) {
    return null;
  }

  const textColor = data.homeHeroTextColor.hex;

  return (
    <Container className="container is-fluid">
      <ContainerImage>
        <Img fluid={data.homeHeroImage.asset.fluid} />
      </ContainerImage>
      <TextContainer textColor={textColor}>
        <h4 className="is-size-2 is-uppercase has-text-white has-text-weight-bold">
          {data.homeHeroTitle}
        </h4>
        <p className="is-size-3 has-text-white is-hidden-mobile">
          {data.homeHeroSubTitle}
        </p>
        <Link
          to={data.homeHeroLink}
          className="button is-small-mobile is-medium-tablet"
        >
          Shop Now
        </Link>
      </TextContainer>
    </Container>
  );
};

export default HomeBanner;
