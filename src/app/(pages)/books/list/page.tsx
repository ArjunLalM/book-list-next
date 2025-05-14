"use client"
import BookCard from '@/components/book/BookCard';
import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { ListBookAction } from '@/store/Book';
import { Books } from '@/types/BookType';
import AddBookDrawer from '@/components/book/AddBookDrawer';
import { Box, Button, Pagination } from '@mui/material';

const BookList = () => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [page, setPage] = useState(1); 
  const pageSize = 8;

  const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  const useAppSelector = useSelector.withTypes<RootState>();

  const dispatch = useAppDispatch();
  const store: Books[] = useAppSelector(state => state.book.data);
  const totalBooks: number = useAppSelector(state => state.book.totalBooks || 0);
  const isLoading: boolean = useAppSelector(state => state.book.isRefresh);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    dispatch(ListBookAction({ page: page - 1, pageSize }));
  }, [dispatch, page,isLoading,totalBooks]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="px-4 py-8">
      <div>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          {role === "admin" && (
            <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
              Add Book
            </Button>
          )}
        </Box>
        {/* <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
        <Box sx={{ width: 400, padding: 2 }}>
        <IconButton color="secondary" onClick={() => setShowForm(false)}>
            <CloseIcon />
        </IconButton>
        <AddBookForm onSave={() => setShowForm(false)} />
        </Box>
    </Drawer> */}
        
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        {Array.isArray(store) &&
          store.map((item: Books, index: number) => (
            <BookCard key={index} book={item} />
          ))}
      </div>

      <Box display="flex" justifyContent="center" mt={6}>
        <Pagination
          count={Math.ceil(totalBooks / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <AddBookDrawer showForm={showForm} setShowForm={setShowForm} />
    </div>
  );
};

export default BookList;
