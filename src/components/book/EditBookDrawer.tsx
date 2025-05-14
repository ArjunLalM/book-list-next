import React from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // ✅ Use MUI's CloseIcon, not Flowbite
import EditBookForm from './EditBookForm';
import { Books } from '@/types/BookType';

interface EditBookDrawerProps {
  open: boolean;
  onClose: () => void;
  bookId: string | null;
  book: Books;
}

export const EditBookDrawer = ({
  open,
  onClose,
  bookId,
  book,
}:EditBookDrawerProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 400, padding: 2 }}>
        <IconButton color="secondary" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {bookId && (
          <EditBookForm
            BookId={bookId}
            book={book}
            onSave={onClose}
          />
        )}
      </Box>
    </Drawer>
  );
};
