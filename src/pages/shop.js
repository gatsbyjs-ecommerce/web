import React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import ProductsList from '../components/ProductsList';
import config from '../utils/config';

export const query = graphql`
  query ShopPageQuery {
    allSanityProduct(
      filter: { status: { eq: "active" } }
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

const ShopPage = ({ data }) => {
  const products = data.allSanityProduct.edges;

  return (
    <Layout>
      <Seo
        title="Shop"
        description={`All Products at ${config.siteName}`}
        url={`${config.siteUrl}/shop`}
      />
      <ProductsList products={products} />
    </Layout>
  );
};

export default ShopPage;
