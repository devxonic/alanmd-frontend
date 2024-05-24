import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './reducers';

const Store = configureStore({
  reducer: {
    user : UserReducer
  },
});

export default Store;