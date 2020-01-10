import React from 'react';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from './Seo';
import Layout from './Layout';
import ProductsList from './ProductsList';

export const deviceQuery = graphql`
  query DeviceByPath($slug: String!) {
    sanityDevice(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
    }
    allSanityProduct(
      filter: {
        status: { eq: "active" }
        device: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
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
            price
            discountPrice
            featuredImage {
              asset {
                fluid(maxWidth: 700) {
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

export default class DeviceView extends React.Component {
  render() {
    const { data } = this.props;
    const device = data.sanityDevice;
    const products = data.allSanityProduct.edges;
    // console.log('data', data);

    return (
      <Layout>
        <Seo title={device.title} description="" />
        <div className="section">
          <div className="container">
            <ProductsList title={device.title} products={products} />
          </div>
        </div>
      </Layout>
    );
  }
}
