import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';

import config from '../utils/config';
import Seo from './Seo';
import Layout from './Layout';
import Heading from './Heading';

export const articleQuery = graphql`
  query ArticleByPath($slug: String!) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      id
      title
      slug {
        current
      }
      description
    }
  }
`;

export default class ArticleView extends React.Component {
  render() {
    const { data } = this.props;
    const page = data.sanityArticle;

    return (
      <Layout>
        <Seo
          title={page.title}
          description={`Read blog post about ${page.title}`}
          url={`${config.siteUrl}/article/${page.slug}`}
        />
        <section className="section">
          <div className="container">
            <Heading>{page.title}</Heading>
            <div className="markdown-container">
              <ReactMarkdown source={page.description} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
