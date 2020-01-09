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
        categories: { elemMatch: { slug: { current: { eq: $slug } } } }
      }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          otherVariants {
            color
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

export default class CategoryView extends React.Component {
  render() {
    const { data } = this.props;
    const category = data.sanityCategory;
    const products = data.allSanityProduct.edges;
    // console.log('data', data);

    return (
      <Layout>
        <Seo title={category.title} description="" />
        <div className="section">
          <div className="container">
            <ProductsList title={category.title} products={products} />
          </div>
        </div>
      </Layout>
    );
  }
}
