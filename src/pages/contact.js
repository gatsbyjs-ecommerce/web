import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import config from '../utils/config';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import SocialIcons from '../components/SocialIcons';
import Heading from '../components/Heading';
import ContactAddress from '../components/ContactAddress';

export const query = graphql`
  query ContactQuery {
    sanitySiteSettings {
      telephone
      email
      address
      facebook
      twitter
      instagram
      pinterest
    }
  }
`;

const Section = styled.section`
  p {
    margin-bottom: 1rem;
  }
  .image {
    width: 500px;
    height: auto;
    margin: 0 auto;
    object-position: center;
  }
  .button {
    margin-top: 2rem;
  }
`;

const Contact = ({ data }) => {
  const home = data.sanitySiteSettings;

  return (
    <Layout>
      <Seo
        title="Contact Us"
        description={`Get in touch with us at ${config.siteName}`}
        url={`${config.siteUrl}/cart`}
      />
      <Section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-fifths">
              <Heading>Contact Us</Heading>
              <p>
                We’re as accessible as your good neighbour. Feel free
                <br />
                to give us a shout.
              </p>
              <p className="is-4">
                <span role="img" aria-label="e-mail">
                  📧
                </span>{' '}
                <a href={`mailto:${home.email}`}>{home.email}</a>
              </p>
              <p>
                <span role="img" aria-label="telephone">
                  ☎️
                </span>{' '}
                <a href={`tel:${home.telephone}`}>{home.telephone}</a>
              </p>
              <p>
                <span role="img" aria-label="Round Pushpin">
                  📍
                </span>{' '}
                <ContactAddress />
              </p>
              <p className="control">
                <a
                  type="submit"
                  className="button is-secondary is-medium"
                  href={`mailto:${home.email}`}
                >
                  Get in touch
                </a>
              </p>
              <p>Social Media:</p>
              <SocialIcons data={home} />
            </div>
            <div className="column is-two-fifths">
              <img
                className="image"
                src="/images/contact.svg"
                alt="contact us"
              />
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
