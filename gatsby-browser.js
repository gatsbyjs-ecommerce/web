import ReactGA from 'react-ga';

import config from './src/utils/config';
import wrapRoot from './src/utils/wrapRootElement';

export const onClientEntry = () => {
  ReactGA.initialize(config.googleAnalytics, { debug: false });
  ReactGA.plugin.require('ecommerce');
};

export const onRouteUpdate = ({ location }) => {
  ReactGA.pageview(location.pathname + location.search);
};

export const wrapRootElement = wrapRoot;
