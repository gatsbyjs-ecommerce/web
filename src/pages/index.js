import React from 'react';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import HomeBanner from '../components/HomeBanner';
import HomeSignup from '../components/HomeSignup';
import ProductsList from '../components/ProductsList';
import HomeAbout from '../components/HomeAbout';
import FeaturedCategories from '../components/FeaturedCategories';

export const query = graphql`
  query HomePageQuery {
    sanitySiteSettings {
      title
      description
      homeAboutUs
      homeHeroTitle
      homeHeroSubTitle
      homeHeroTextColor {
        hex
      }
      homeHeroLink
      homeHeroImage {
        asset {
          fluid(maxWidth: 1600) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
    allSanityProduct(
      filter: { status: { eq: "active" }, isFeatured: { eq: true } }
      sort: { fields: [listingOrder], order: ASC }
      limit: 8
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
    allSanityCategory(
      filter: { slug: { current: { in: ["straps", "cases", "accessories"] } } }
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          image {
            asset {
              fluid(maxWidth: 500) {
                ...GatsbySanityImageFluid
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
  const categories = data.allSanityCategory.edges;

  return (
    <Layout>
      <Seo
        title={home.title}
        description={home.description}
        url={config.siteUrl}
      />
      <HomeBanner data={home} />
      <FeaturedCategories categories={categories} />
      <ProductsList products={products} />
      <HomeSignup />
      <HomeAbout data={home} />
    </Layout>
  );
};

export default HomePage;
