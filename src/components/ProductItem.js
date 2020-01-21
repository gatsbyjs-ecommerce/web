import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import CurrencyFormat from './CurrencyFormat';
import DummyImage from './DummyImage';

const Container = styled(animated.div)`
  .card {
    border: none;
    box-shadow: none;
  }
  .card-content {
    padding: 1rem 0;
  }
  .card-image {
    min-height: 241px;
  }
  .image.is-4by5 {
    padding-top: 0;
  }
`;

const Image = styled(Img)`
  object-fit: cover;
`;

const ProductItem = ({ item, styles }) => {
  const variant = item.otherVariants[0];

  return (
    <Container className="column is-one-quarter" style={styles}>
      <div className="card">
        <Link to={`/product/${item.slug.current}`}>
          <div className="card-image">
            {variant && variant.featuredImage ? (
              <Image fluid={variant.featuredImage.asset.fluid} />
            ) : (
              <DummyImage />
            )}
          </div>
        </Link>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-6">
                <Link to={`/product/${item.slug.current}`}>{item.title}</Link>
              </p>
              <p className="title is-6">
                <CurrencyFormat pricing={variant.pricing} isDiscount />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

ProductItem.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default ProductItem;
