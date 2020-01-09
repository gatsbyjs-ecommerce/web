import React from 'react';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import HomeBanner from '../components/HomeBanner';
import ProductsList from '../components/ProductsList';
import HomeAbout from '../components/HomeAbout';
import FeaturedCategories from '../components/FeaturedCategories';

export const query = graphql`
  query HomePageQuery {
    sanitySiteSettings {
      homeIntro
      homeSliderSubTitle
      description
    }
    allSanityProduct {
      edges {
        node {
          _id
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

const HomePage = ({ data }) => {
  const home = data.sanitySiteSettings;
  const products = data.allSanityProduct.edges;

  return (
    <Layout>
      <Seo title="6in" description={home.description} url={config.siteUrl} />
      <HomeBanner data={home} />
      <FeaturedCategories />
      <ProductsList products={products} />
      <HomeAbout data={home} />
    </Layout>
  );
};

export default HomePage;
