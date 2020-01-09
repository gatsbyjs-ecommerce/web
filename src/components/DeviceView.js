import React from 'react';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from './Seo';
import Layout from './Layout';
import Heading from './Heading';

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
      filter: { device: { elemMatch: { slug: { current: { eq: $slug } } } } }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
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
    console.log('data', data);

    return (
      <Layout>
        <Seo
          title=""
          description=""
          // url={`${config.siteUrl}/page/${page.slug}`}
        />
        <div className="section">
          <div className="container">
            <Heading>Device: {device.title}</Heading>
            <ul>
              {products.map(({ node: product }) => (
                <li key={product.id}>{product.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}
