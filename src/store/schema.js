/* eslint no-param-reassign: 0 */

import { action } from 'easy-peasy';

const schema = {
  isLoggedIn: {
    value: false,
    toggle: action((state, payload) => {
      state.value = payload;
    }),
  },
  user: {
    data: {},
    update: action((state, payload) => {
      state.data = payload;
    }),
  },
  cart: {
    items: [],
    add: action((state, payload) => {
      state.items.push(payload);
    }),
    update: action((state, payload) => {
      let item = state.items[payload.index];
      item = payload.data;
      state.items[payload.index] = item;
    }),
    remove: action((state, payload) => {
      state.items.splice(payload, 1);
    }),
    // getById: selector([state => state.items], (stateResolvers, runtimeArgs) => {
    //   const [items] = stateResolvers;
    //   const [id] = runtimeArgs;
    //   return items.find(todo => todo.id === id);
    // }),
  },
};

export default schema;
