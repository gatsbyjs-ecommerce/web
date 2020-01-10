import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingOverlay from 'react-loading-overlay';

import apolloClient from './apolloClient';
import { store, persistor } from '../store';

export default ({ element }) => (
  <ApolloProvider client={apolloClient}>
    <PersistGate
      loading={<LoadingOverlay active spinner />}
      persistor={persistor}
    >
      <StoreProvider store={store}>{element}</StoreProvider>
    </PersistGate>
  </ApolloProvider>
);
