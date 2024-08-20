import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../action/postAction';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    filteredPosts: [],
    status: 'idle',
    error: null,
    selectedCategory: 'all',
  },
  reducers: {
    setSelectedPostCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredPosts = state.selectedCategory === 'all'
        ? state.posts
        : state.posts.filter(post => post.category === state.selectedCategory);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.data;
        state.filteredPosts = state.selectedCategory === 'all'
          ? state.posts
          : state.posts.filter(post => post.category === state.selectedCategory);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setSelectedPostCategory } = postsSlice.actions;

export const selectPostBySlug = (state, slug) => {
  return state.posts.posts.find(post => post.slug === slug);
}
export const selectPostById = (state, id) => {
  return state.posts.posts.filter(post => post.id === id);
}

export const selectPostsByCategory = (state) => {
  return state.posts.filteredPosts;
}

export default postsSlice.reducer;
