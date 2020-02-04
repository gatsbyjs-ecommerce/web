import React from 'react';
import { graphql } from 'gatsby';

import Seo from './Seo';
import Layout from './Layout';
import DevicesList from './DevicesList';
import config from '../utils/config';

export const vendorQuery = graphql`
  query VendorByPath($slug: String!) {
    sanityVendor(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
    }
    allSanityDevice(
      filter: { vendor: { slug: { current: { eq: $slug } } } }
      sort: { fields: [listingOrder], order: ASC }
    ) {
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
        <Seo
          title={vendor.title}
          description={`Find accessories for devices by ${vendor.title} at ${config.siteName}`}
          url={`${config.siteUrl}/${vendor.slug.current}`}
        />
        <DevicesList title={vendor.title} devices={devices} />
      </Layout>
    );
  }
}
