'use client'
import { configureStore } from '@reduxjs/toolkit'
import  { bookSlice } from '../store/Book'
import {reviewSlice} from '../store/Review'
export const store = configureStore({
  reducer: {
    book : bookSlice.reducer,
    review : reviewSlice.reducer
  },
})

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch