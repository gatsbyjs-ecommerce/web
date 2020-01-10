import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from 'redux-persist/integration/react';

import apolloClient from './apolloClient';
import { store, persistor } from '../store';

export default ({ element }) => (
  <ApolloProvider client={apolloClient}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <StoreProvider store={store}>{element}</StoreProvider>
    </PersistGate>
  </ApolloProvider>
);
