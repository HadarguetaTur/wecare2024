import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import postReducer from "./reducers/postSlice.js";


const store = configureStore({
    reducer: {
      user: userReducer,
      posts: postReducer,
    },
  });
  
  export default store;