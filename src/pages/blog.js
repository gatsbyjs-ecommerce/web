import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import NewsItem from '../components/NewsItem';
import Heading from '../components/Heading';
import config from '../utils/config';

export const pageQuery = graphql`
  query blog {
    allSanityArticle(sort: { fields: _createdAt, order: DESC }) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          description
          _createdAt
        }
      }
    }
  }
`;

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Blog = ({ data }) => {
  const { edges: posts } = data.allSanityArticle;

  return (
    <Layout>
      <Seo
        title="News & Updates"
        description={`Latest news at ${config.siteName}`}
        url={`${config.siteUrl}/account`}
      />
      <section className="section">
        <Container className="container">
          <Heading>News & Updates</Heading>
          <div className="columns is-centered">
            <div className="column is-four-fifths">
              {posts.map(({ node: post }) => (
                <NewsItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Blog;
