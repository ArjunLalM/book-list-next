"use client"
import Banner from '@/components/home/Banner'
import ReviewBox from '@/components/home/ReviewBox'
import TopBooks from '@/components/home/TopBooks'
import { AppDispatch, RootState } from '@/store'
import { TopRatedBookAction } from '@/store/Book'
import { Books } from '@/types/BookType'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();
  const store: Books[] = useAppSelector(state => state.book.data || []);

 

// console.log(store,'stor topBooks')
  

  useEffect(()=>{

    dispatch(TopRatedBookAction({}))
  },[dispatch])
  return (
    <>
      <Banner />
    

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {store.map((item: Books, index: number) => {
          return <TopBooks key={index} books={[item]} />;
        })}
      </div>
      
      {/* <TopBooks  books={store} />; */}
    

      
      <ReviewBox/>
    </>
  )
}

export default Home