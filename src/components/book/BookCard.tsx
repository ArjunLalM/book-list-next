/* eslint-disable @next/next/no-img-element */
"use client"; 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Books } from '@/types/BookType';
import { DeleteBookAction } from '@/store/Book';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { EditBookDrawer } from './EditBookDrawer';
// const BookCard = ({ book }: { book: Books }) => {
  const BookCard = ({ book }: { book: Books }) => {
// console.log(topBook,"book card top book")


  // console.log(book, 'book from list')
  const [role, setRole] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<null | string>(null);

  
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const handleEditClick = (id: string) => {
    setShowEditForm(true);
    setDropdownOpen(false);
    setBookToEdit(id)
  };

  const useAppDispatch =useDispatch.withTypes<AppDispatch>() 
  // const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();

  // Load token/role from localStorage on client
   useEffect(() => {
     const  storedRole= localStorage.getItem("role");
     setRole(storedRole);
   }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await dispatch(DeleteBookAction({ bookId: id }));
      setDropdownOpen(false);
      
      // console.log('Book deleted successfully');
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };
  

  return (
    <>
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      {/* Image Container */}
      <div className="relative">
      <img
  className="w-full h-64 object-cover rounded-t-lg"
  src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${book.images[0]}`}
  alt={book.title}
/>

        {/* Dropdown Button */}
        {role === "admin" && (
        <button
         onClick={toggleDropdown}
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 bg-white/70 dark:bg-gray-800/70"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        )}

       {/* Dropdown Menu */}
       
       {role === "admin" && dropdownOpen && (
          <div
            className="z-10 absolute top-10 right-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul className="py-2">
             
              <li>
                <a
                  href="#"
                  onClick={() => handleEditClick(book._id)}
                  className="block px-4 py-2 text-sm text-green-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                 Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleDelete(book._id)}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col items-center pb-10 px-4">
        <h5 className="mt-4 mb-1 text-xl font-medium text-gray-900 dark:text-white">{book.title}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{book.genres}</span>
        <div className="flex mt-4 md:mt-6">
          <Link
             href={`/books/view/${book._id}`}
             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
           View Book
          </Link>

       

        </div>
      </div>
    </div>

        {/* <Drawer
           anchor="left"
           open={showEditForm}
           onClose={() => setShowEditForm(false)}
         >
           <Box sx={{ width: 400, padding: 2 }}>
             <IconButton color="secondary" onClick={() =>setShowEditForm(false)}>
             <CloseIcon/>
             </IconButton>
             { bookToEdit && 
              <EditBookForm 
              BookId={bookToEdit}
               book={book}
               onSave={() => setShowEditForm(false)}/>
             }
           </Box>
         </Drawer> */}
         <EditBookDrawer
          open={showEditForm}
          onClose={() => setShowEditForm(false)}
          bookId={bookToEdit}
          book={book} />
    </>
  );
};

export default BookCard;
