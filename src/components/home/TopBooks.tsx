import React from 'react';
import BookCard from '../book/BookCard';
import { Books } from '@/types/BookType';


const TopBooks = ({ books }: { books: Books[] }) => {
  // console.log(books, 'Top Books');

  return (
<div className="py-8" style={{ minWidth: "371px" }}>
<div className=" h-max max-w-4xl flex flex-col  items-center">
        
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default TopBooks;
