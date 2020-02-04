import React from 'react';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from './Seo';
import Layout from './Layout';
import ProductsList from './ProductsList';

export const categoryQuery = graphql`
  query CategoryByPath($slug: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
    }
    allSanityProduct(
      filter: {
        status: { eq: "active" }
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
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
          }
        }
      }
    }
  }
`;

export default class CategoryView extends React.Component {
  render() {
    const { data } = this.props;
    const category = data.sanityCategory;
    const products = data.allSanityProduct.edges;
    // console.log('data', data);

    return (
      <Layout>
        <Seo
          title={category.title}
          description={`Get all ${category.title} products at ${config.siteName}`}
          url={`${config.siteUrl}/${category.slug.current}`}
        />
        <div className="container">
          <section className="section">
            <ProductsList title={category.title} products={products} />
          </section>
        </div>
      </Layout>
    );
  }
}
