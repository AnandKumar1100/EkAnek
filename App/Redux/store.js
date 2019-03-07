import store from './index'

export function dispatch(action) {
  store.dispatch(action);
}

export function getState() {
  return store.getState();
}

export function setStore(newStore) {  
  store = newStore;
}

export function getStore() {
  return store;
}
