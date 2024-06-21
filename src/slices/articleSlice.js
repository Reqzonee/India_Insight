// src/redux/articleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    selectedArticle: null,
  },
  reducers: {
    setSelectedArticleLink: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setSelectedArticleLink } = articleSlice.actions;
export default articleSlice.reducer;
