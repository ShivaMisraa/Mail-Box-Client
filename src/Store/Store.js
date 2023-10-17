import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';

const store = configureStore({
  reducer: {
    emails: emailReducer,
  },
});

export default store;
