import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for blog operations
export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/post/lists/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/post/detail/${slug}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'blog/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/post/category/list/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  'blog/likePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/post/like-post/', { post_id: postId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        if (state.currentPost?.id === updatedPost.id) {
          state.currentPost = updatedPost;
        }
        state.posts = state.posts.map(post =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });
  },
});

export const { clearCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;