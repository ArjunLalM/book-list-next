/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reviews } from "@/types/ReviewType"
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface ReviewState {
    data : Reviews[]  , // store all books data
    params: any,
    bookData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
}

const initialState:ReviewState = {
    data: [],
    params: {},
    bookData : {},
    loading: false,
    isRefresh: false,
    error: ""
}

interface Redux {
    getState : any,
    dispatch : Dispatch<any>
}

// interface DataParams {
//     q : string,
//     price : number | string,
//     star_rating : number | string
// }

// interface Id {
//     _id : string
// }


// add review action
export const AddReviewAction = createAsyncThunk(
  'book/addReview',
  async (data: any , { }: Redux) => {
  const storedToken = localStorage.getItem('token')
      const headers = {
          headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
          }
      }

  const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/addReview`, data, headers)
  
  return response.data
},
)

// get review action
export const GetReviewAction = createAsyncThunk(
  'book/getReview',
  async (data: any , { }: Redux) => {

  const storedToken = localStorage.getItem('token')
      const headers = {
          headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
          }
      }

  const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/getReview`, data, headers)
  
  return response.data
},
)

// Edit review action
export const EditReviewAction = createAsyncThunk(
  'book/editReview',
  async (data: any , { }: Redux) => {
  const storedToken = localStorage.getItem('token')
      const headers = {
          headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
          }
      }

  const response =await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/updateReview`, data, headers)
  
  return response.data
},
)

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder


 // Reducers for add review
 .addCase(AddReviewAction.fulfilled, (state) => {
  state.loading = false
  state.error = ""
  state.isRefresh = false;
})
.addCase(AddReviewAction.pending, (state) => {
  state.loading = true
  state.isRefresh = true;
})
.addCase(AddReviewAction.rejected, (state, action:PayloadAction<any>) => {
  state.loading = false
  state.isRefresh = false;
  state.error = action.payload
})

.addCase(EditReviewAction.fulfilled, (state) => {
  state.loading = false
  state.error = ""
  state.isRefresh = false;
})
.addCase(EditReviewAction.pending, (state) => {
  state.loading = true
  state.isRefresh = true;
})
.addCase(EditReviewAction.rejected, (state, action:PayloadAction<any>) => {
  state.loading = false
  state.isRefresh = false;
  state.error = action.payload
})

//Reducer for getReviews
.addCase(GetReviewAction.fulfilled, (state, action:PayloadAction<any>) => {
  state.loading = false
  state.error = ""
  state.data = action.payload.data
  state.params = action.payload.params
  // console.log("Book fetched successfully:", action.payload)
})
.addCase(GetReviewAction.pending, (state) => {
  state.loading = true
})
.addCase(GetReviewAction.rejected, (state, action:PayloadAction<any>) => {
  state.loading = false
  state.error = action.payload
})

  },
})


export default reviewSlice.reducer;