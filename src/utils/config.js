module.exports = {
  debug: process.env.NODE_ENV === 'development',

  siteName: '6in.co',
  author: 'Parminder Klair',
  description:
    'A ecommerce system using ReactJs, bundled with awesome GatsbyJs.',
  siteUrl: 'http://6in.co/',
  graphQlUri: 'https://6in-api.now.sh/api',
  graphQlUriDev: 'http://localhost:4000/api',
  projectKey: '6in-co12',

  type: 'website',
  googleAnalytics: 'UA-1390187-43',
  backgroundColor: '#e0e0e0',
  themeColor: '#c62828',

  currency: '₹',
  stripePublishableKey:
    process.env.NODE_ENV === 'development'
      ? 'pk_test_P0DEB2otulfya51U9lIkLXAn'
      : 'pk_live_eMN5tHGymDNn3DOZH8MX5ziD',
};
