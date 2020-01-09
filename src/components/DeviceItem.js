import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

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
`;

const Image = styled(Img)`
  object-fit: cover;
`;

const DeviceItem = ({ item, styles }) => {
  return (
    <Container className="column is-one-quarter" style={styles}>
      <div className="card">
        <Link to={`/${item.vendor.slug.current}/${item.slug.current}`}>
          <div className="card-image">
            {item.image ? (
              <Image fluid={item.image.asset.fluid} />
            ) : (
              <DummyImage />
            )}
          </div>
        </Link>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle is-6 has-text-centered">
                <Link to={`/product/${item.slug.current}`}>{item.title}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

DeviceItem.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default DeviceItem;
