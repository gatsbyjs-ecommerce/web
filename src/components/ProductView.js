import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { first } from 'lodash';

import config from '../utils/config';
import Seo from './Seo';
import Layout from './Layout';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductsList from './ProductsList';
import ProductSpecs from './ProductSpecs';
import ProductReviews from './ProductReviews';

const Container = styled.div``;

const ViewAllBtn = styled(Link)`
  padding-right: 2rem;
  padding-left: 2rem;
`;

export const query = graphql`
  query ProductViewQuery($slug: String!) {
    sanitySiteSettings {
      productDeliveryInfo
      productShippingReturns
    }
    sanityProduct(slug: { current: { eq: $slug } }) {
      _id
      id
      title
      slug {
        current
      }
      tags
      shippingCost {
        price
        country
      }
      _rawBody
      tags
      categories {
        title
        slug {
          current
        }
        id
      }
      otherVariants {
        color {
          hex
        }
        pricing {
          country
          discountPrice
          price
        }
        featuredImage {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
          }
        }
        images {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
          }
        }
        sku
        title
      }
    }
    allSanityProduct(
      filter: { status: { eq: "active" }, slug: { current: { ne: $slug } } }
      limit: 8
      sort: { fields: [_createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          otherVariants {
            _key
            title
            color {
              hex
            }
            pricing {
              country
              discountPrice
              price
            }
            sku
            featuredImage {
              asset {
                fluid(maxWidth: 350) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
    allSanityReview(sort: { fields: [_createdAt], order: DESC }) {
      edges {
        node {
          id
          comment
          personName
        }
      }
    }
  }
`;

const ProductView = ({ data }) => {
  const product = data.sanityProduct;
  const products = data.allSanityProduct.edges;
  const home = data.sanitySiteSettings;
  const reviews = data.allSanityReview.edges;
  const [variant, setVariant] = useState({});
  // console.log('variant', variant);

  useEffect(() => {
    const firstItem = first(product.otherVariants);
    if (firstItem) {
      setVariant(firstItem);
    }
  }, [product.otherVariants]);

  const metaImage = variant.featuredImage
    ? variant.featuredImage.asset.fluid.src
    : `${config.logo}`;

  return (
    <Layout>
      <Seo
        title={product.title}
        description={`Buy by ${product.title} at ${config.siteName}`}
        url={`${config.siteUrl}/product/${product.slug.title}`}
        image={metaImage}
        isProduct
      />
      <div className="container">
        <section className="section">
          <Container className="columns">
            <div className="column">
              <ProductGallery variant={variant} />
            </div>
            <div className="column section">
              <ProductInfo
                home={home}
                product={product}
                reviews={reviews}
                variant={variant}
                setVariant={setVariant}
              />
            </div>
          </Container>
        </section>
      </div>
      <ProductSpecs product={product} variant={variant} />
      <ProductReviews reviews={reviews} />
      <div className="container">
        <ProductsList title="We think you'll" products={products} />
        <div className="has-text-centered	">
          <ViewAllBtn to="/shop" className="button is-outlined is-medium">
            View all
          </ViewAllBtn>
        </div>
      </div>
    </Layout>
  );
};

export default ProductView;
