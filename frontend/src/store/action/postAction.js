import { createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "../../services/post.service";


export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({filterBy = null, element = null} = {}, { rejectWithValue }) => {
    try {
      const response = await postService.getPosts(filterBy, element);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
  
  export const fetchPostById = createAsyncThunk(
    "posts/fetchPostById",
    async (postId, { rejectWithValue }) => {
      try {
        const response = await postService.getPostById(postId);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const createPost = createAsyncThunk(
    "posts/createPost",
    async (postData, { rejectWithValue }) => {
      try {
        const response = await postService.createPost(postData);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ postId, postData }, { rejectWithValue }) => {
      try {
        console.log(postData,postId);
        const response = await postService.updatePost(postId,postData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId, { rejectWithValue }) => {
      try {
        await postService.deletePost(postId);
        return postId;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


  export const fetchPostsByCategory = createAsyncThunk(
    "posts/fetchPostsByCategory",
    async (category, { rejectWithValue }) => {
      try {
        const response = await postService.getPostsByCategory(category);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );