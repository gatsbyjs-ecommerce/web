const config = require('./src/utils/config.js');

module.exports = {
  siteMetadata: {
    title: config.siteName,
    author: config.author,
    description: config.description,
    siteUrl: config.siteUrl,
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-mailchimp',
    //   options: {
    //     endpoint: config.mailchimp,
    //   },
    // },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#E38D60`,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: config.sanityId,
        dataset: 'production',
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteName,
        short_name: config.siteName,
        start_url: config.siteUrl,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `./static/images/logo.png`,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
};
