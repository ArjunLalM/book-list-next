import { Box, Drawer, IconButton } from '@mui/material'
import { CloseIcon } from 'flowbite-react'
import React from 'react'
import AddBookForm from './AddBookForm'
type AddBookDrawerProps = {
    showForm: boolean;
    setShowForm: (value: boolean) => void;
  };
const AddBookDrawer = ({ showForm, setShowForm }: AddBookDrawerProps) => {
  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
        <Box sx={{ width: 400, padding: 2 }}>
        <IconButton color="secondary" onClick={() => setShowForm(false)}>
            <CloseIcon />
        </IconButton>
        <AddBookForm onSave={() => setShowForm(false)} />
        </Box>
    </Drawer>
  )
}

export default AddBookDrawer