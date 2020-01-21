import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ProductsList from '../components/ProductsList';

const Container = styled.div`
  margin-top: 2rem;
  margin-bottom: 4rem;
  text-align: center;
`;

export const notFoundQuery = graphql`
  query notFoundQuery {
    allSanityProduct(
      filter: { status: { eq: "active" }, isFeatured: { eq: true } }
      sort: { fields: [listingOrder], order: ASC }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
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
                fluid(maxWidth: 350) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const NotFoundPage = ({ data }) => {
  const products = data.allSanityProduct.edges;

  return (
    <Layout>
      <Seo title="NOT FOUND" />
      <section className="section">
        <Container className="container">
          <h1 className="title">NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          <br />
          <ProductsList title="We think you'll" products={products} />
        </Container>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
