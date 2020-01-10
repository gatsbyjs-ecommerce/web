import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.section`
  border-top: ${props => `1px solid ${props.theme.borderColor}`};
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  padding: 1.3rem 0;
  font-size: 0.9rem;
  span.tag-title {
    color: ${props => props.theme.textColorDark};
  }
`;

const ProductSpecs = ({ product, variant }) => (
  <Container className="section">
    <div className="container">
      <div className="columns is-mobile has-text-centered">
        <div className="column is-4-mobile is-2-tablet is-offset-one-quarter-tablet">
          <span className="tag-title">SKU</span>:{' '}
          {variant.sku ? variant.sku : '-'}
        </div>
        <div className="column is-4-mobile is-2-tablet">
          <span className="tag-title">Category</span>:{' '}
          {product.categories &&
            product.categories.map(category => (
              <Link to={category.slug.current} key={category.id}>
                {category.title}{' '}
              </Link>
            ))}
        </div>
        <div className="column is-4-mobile is-2-tablet">
          <span className="tag-title">Tags</span>:{' '}
          {product.tags && product.tags.map(tag => <a key={tag}>{tag} </a>)}
        </div>
      </div>
    </div>
  </Container>
);

export default ProductSpecs;
