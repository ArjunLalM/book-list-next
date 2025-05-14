/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from 'next/navigation';
import BookTabs from '@/components/book/bookTabs';

import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { viewBookAction } from '@/store/Book';
import { Books } from '@/types/BookType';

const ViewBook = () => {
  const {id} = useParams();
  const [selectedImage, setSelectedImage] = useState<string>(
    "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg"
  );

  // const images = [
  //   "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  //   "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  //   "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  //   "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
  //   "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
  // ];


  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();
  const store: Books= useAppSelector(state => state.book.bookData)

  console.log(store.images?.[0], "First image of the book");

useEffect(() => {
  if (store.images?.length > 0) {
    setSelectedImage(`${process.env.NEXT_PUBLIC_SERVER_URL}/${store.images[0]}`);
  }
  
}, [store]);

  useEffect(()=>{
    dispatch(viewBookAction({bookId:id}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch])



// console.log(id,"BookId Passing ")
  const handleImageClick = (image: string) => {
    setSelectedImage(`${process.env.NEXT_PUBLIC_SERVER_URL}/${image}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
      <div className="w-full md:w-1/2">
        <div className="p-2 md:p-4">
          <img
            className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[450px]"
            src={selectedImage}
            alt="Selected Image"
          />
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-4 px-2">
        {store.images && store.images.length > 0 &&
  store.images.map((image, index) => (
    <div key={index} className="p-1">
      <img
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image}`}
        className="object-cover object-center h-20 w-full rounded-lg cursor-pointer"
        alt={`gallery-image-${index}`}
        onClick={() => handleImageClick(image)}
      />
    </div>
  ))
}

        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="p-2 md:p-4">
          <BookTabs book={store} />

        </div>
      </div>
    </div>
  );
};

export default ViewBook;
