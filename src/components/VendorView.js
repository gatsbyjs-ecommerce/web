import React from 'react';
import { graphql } from 'gatsby';

import Seo from './Seo';
import Layout from './Layout';
import DevicesList from './DevicesList';

export const vendorQuery = graphql`
  query VendorByPath($slug: String!) {
    sanityVendor(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
    }
    allSanityDevice(filter: { vendor: { slug: { current: { eq: $slug } } } }) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          vendor {
            slug {
              current
            }
          }
          image {
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
`;

export default class VendorView extends React.Component {
  render() {
    const { data } = this.props;
    const vendor = data.sanityVendor;
    const devices = data.allSanityDevice.edges;
    // console.log('data', devices);

    return (
      <Layout>
        <Seo title={vendor.title} description="" />
        <div className="section">
          <div className="container">
            <DevicesList title={vendor.title} devices={devices} />
          </div>
        </div>
      </Layout>
    );
  }
}
