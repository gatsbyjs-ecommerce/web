import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';
import { useStoreActions } from 'easy-peasy';
import axios from 'axios';
import { find } from 'lodash';

import GlobalStyle, { theme } from '../utils/theme';
import config from '../utils/config';
import currency from '../utils/currency';
import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';

const Container = styled.div`
  min-height: 70vh;
`;

const query = graphql`
  query LayoutQuery {
    sanitySiteSettings {
      facebook
      twitter
      instagram
      pinterest
    }
  }
`;

const IndexLayout = ({ children, hideHeader }) => {
  const updateLocation = useStoreActions(
    actions => actions.user.updateLocation,
  );
  useEffect(() => {
    // get geo location
    axios
      .get('https://extreme-ip-lookup.com/json/')
      .then(response => {
        // handle success
        const { data } = response;
        if (data) {
          const currentCurrency = find(currency, { code: data.countryCode });
          updateLocation({
            city: data.city,
            country: data.country,
            countryCode: data.countryCode,
            region: data.region,
            currency: currentCurrency ? currentCurrency.currency : '$',
            currencyCode: currentCurrency
              ? currentCurrency.currencyCode
              : 'usd',
          });
        }
      })
      .catch(error => {
        // handle error
        console.log('unable to fetch ip data', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>{config.siteName}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta description={config.description} />
        </Helmet>
        <GlobalStyle />
        <StaticQuery
          query={query}
          render={data => {
            const home = data.sanitySiteSettings;
            return (
              <>
                <TopBar />
                {!hideHeader && <Header />}
                <Container>{children}</Container>
                <Footer home={home} />
              </>
            );
          }}
        />
      </>
    </ThemeProvider>
  );
};

export default IndexLayout;
