import { createStore } from 'easy-peasy';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import schema from './schema';
import config from '../utils/config';

const store = createStore(schema, {
  name: 'MyAwesomeStore',
  devTools: true,
  reducerEnhancer: reducer =>
    persistReducer(
      {
        key: config.projectKey,
        storage,
      },
      reducer,
    ),
});

const persistor = persistStore(store);

export { store, persistor };
