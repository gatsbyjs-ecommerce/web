import React from 'react';
import { graphql } from 'gatsby';

import Seo from './Seo';
import Layout from './Layout';
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
  }
`;

export default class VendorView extends React.Component {
  render() {
    const { data } = this.props;
    const vendor = data.sanityVendor;

    return (
      <Layout>
        <Seo
          title={vendor.title}
          description={`Find accessories for by ${vendor.title} at ${config.siteName}`}
          url={`${config.siteUrl}/${vendor.slug.current}`}
        />
        <h1 className="title size-1">{vendor.title}</h1>
      </Layout>
    );
  }
}
