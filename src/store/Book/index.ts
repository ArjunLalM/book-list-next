/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"

export interface BookState {
    data : []  , // store all books data
    params: any,
    bookData : any // store single book data
    loading : boolean,
    isRefresh: boolean
    error : string | null
    totalBooks: number;
}

const initialState: BookState = {
    data: [],
    params: {},
    bookData : {},
    loading: false,
    isRefresh: false,
    totalBooks: 0,
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


// addBook 
export const AddBookAction = createAsyncThunk(
    'book/addBook',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "content-type": "multipart/form-data"
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/addBooks`, data, headers)
    
    return response.data
  },
)

//list books
export const ListBookAction = createAsyncThunk(
    'book/lisBook',
    async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token')
        const headers = {
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        }

    const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/getAll`, data, headers)
    
    return response.data
  
  },

)
//edit book
export const EditBookAction = createAsyncThunk(
    'book/editBook',
    async ({ data }: { data: any }, { }: Redux) => {
      const storedToken = localStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "content-type": "multipart/form-data", 
        },
      };
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/updateBook`, data, headers);
      return response.data;
    }
  );
  
  //delete book

export const DeleteBookAction = createAsyncThunk(
  'book/deleteBook',
  async (data: any , { }: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "application/json", 
      },
    };

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/delete`, data, headers);
    return response.data;
  }
);


//view a book
export const viewBookAction = createAsyncThunk(
  'book/view',
  async (data: any , { }: Redux) => {
  const storedToken = localStorage.getItem('token')
      const headers = {
          headers: {
              Authorization: `Bearer ${storedToken}`,
          }
      }

  const response =await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/viewBook`, data, headers)
  
  return response.data

},

)


// top rated books
export const TopRatedBookAction = createAsyncThunk(
  'home/topBooks',
  async (data: any, {}: Redux) => {
    const storedToken = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/books/topRatedBooks`,
      data,
      headers
    );

    return response.data;
  }
);


export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder

    // Reducers for add book
    .addCase(AddBookAction.fulfilled, (state) => {
        state.loading = false
        state.error = ""
        state.isRefresh = false;
    })
    .addCase(AddBookAction.pending, (state) => {
        state.loading = true
        state.isRefresh = true;
    })
    .addCase(AddBookAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.isRefresh = false;
        state.error = action.payload
    })


    // Reducer for list top rated books
    .addCase(TopRatedBookAction.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
        state.data = action.payload.data
        state.params = action.payload.params
        // console.log("Books fetched successfully:", action.payload)
    })
    .addCase(TopRatedBookAction.pending, (state) => {
        state.loading = true
    })
    .addCase(TopRatedBookAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })

       // Reducer for list all books
       .addCase(ListBookAction.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
        state.data = action.payload.data
        state.totalBooks = action.payload.totalBooks || 0;
        state.params = action.payload.params
        // console.log("Books fetched successfully:", action.payload)
    })
    .addCase(ListBookAction.pending, (state) => {
        state.loading = true
    })
    .addCase(ListBookAction.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
    })
   
    // Reducer for edit all books
    builder
  .addCase(EditBookAction.fulfilled, (state) => {
    state.loading = false;
    state.isRefresh = false;
    state.error = "";
  })
  .addCase(EditBookAction.pending, (state) => {
    state.loading = true;
    state.isRefresh = true;
  })
  .addCase(EditBookAction.rejected, (state, action: PayloadAction<any>) => {
    state.loading = false;
    state.error = action.payload;
    state.isRefresh = true;
  });


  // Reducer for delete book
builder
.addCase(DeleteBookAction.fulfilled, (state) => {
  state.loading = false;
  state.isRefresh = false;
  state.error = "";
})
.addCase(DeleteBookAction.pending, (state) => {
  state.loading = true;
  state.isRefresh = true;
})
.addCase(DeleteBookAction.rejected, (state, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  state.isRefresh = false;
})


// Reducer for view books
.addCase(viewBookAction.fulfilled, (state, action:PayloadAction<any>) => {
      state.loading = false
      state.error = ""
      state.bookData = action.payload.data
      state.params = action.payload.params
      // console.log("Book fetched successfully:", action.payload)
})
.addCase(viewBookAction.pending, (state) => {
      state.loading = true
})
.addCase(viewBookAction.rejected, (state, action:PayloadAction<any>) => {
      state.loading = false
      state.error = action.payload
})
 

  },
})


export default bookSlice.reducer;