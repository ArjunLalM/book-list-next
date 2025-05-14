"use client"
import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BookReviewForm from './BookReviewForm';
import { Books } from '@/types/BookType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Reviews } from '@/types/ReviewType';
import { GetReviewAction } from '@/store/Review';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const BookTabs = ({ book }: { book: Books}) => {
 

  const [existingReview, setExistingReview] = React.useState<Reviews | null>(null);
  const [isExistingReview, setIsExistingReview] = React.useState(false);
  const [role, setRole] = useState<string | null>(null);

  const [value, setValue] = React.useState(0);
  const [openReviewForm, setOpenReviewForm] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpenReviewForm(true);
  };

  const handleClose = () => {
    setOpenReviewForm(false);
  };

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()
  const dispatch = useAppDispatch();
  const storeReview: Reviews[] = useAppSelector(state => state.review.data)

console.log(storeReview,'store review')
  const isLoading: boolean = useAppSelector(state => state.review.isRefresh)

  useEffect(() => {
    if (book._id) {
      dispatch(GetReviewAction({ bookId: book._id }));
    }
  }, [book._id, dispatch,isLoading]);
  
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (storeReview) {
      const foundReview = storeReview.find(review => review.user._id === userId);
      console.log(foundReview,"testing...")
      if (foundReview) {
        setExistingReview(foundReview);
        setIsExistingReview(true);
      } else {
        setExistingReview(null);
        setIsExistingReview(false);
      }
    }

  }, [storeReview]);
  
 // Load token/role from localStorage on client
 useEffect(() => {
  const  storedRole= localStorage.getItem("role");
  setRole(storedRole);
}, []);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="book tabs"
        >
          <Tab label="Book Details" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      {/* Book Details Tab */}
      <TabPanel value={value} index={0}>

<span className="book-details">
  <span className="title">{book.title}</span>
  <span className="price">₹ {book.price}</span>
  <span className="category"><strong>Category:</strong>{book.genres}</span>
  <span className="description">
  {book.description}
  </span>
  <span className="author"><strong>Author:</strong>{book.author}</span>
  <span className="review-summary">
    This is an amazing horror book that keeps you on the edge of your seat.
  </span>
</span>
</TabPanel>

      <TabPanel value={value} index={1}>
      <span className="about-tabs">
      {book.description}
        </span>
      </TabPanel>

      {/* Reviews Tab */}
      <TabPanel value={value} index={2}>

      {/* <span className="add-review-button">
    <button onClick={handleOpen}>ADD Review</button>
  </span> */}
{role === "user" && (
  <span className="add-review-button">
  <button onClick={handleOpen}>
    {isExistingReview ? "Edit Review" : "Add Review"}
  </button>
</span>
)}


<BookReviewForm
  // open={openReviewForm}
  // handleClose={handleClose}
  // bookId={book._id}
  // existingReview={existingReview}
  // reviewId={existingReview?._id}
    open={openReviewForm}
  handleClose={handleClose}
  bookId={book._id || ''} 
  existingReview={existingReview}
  reviewId={existingReview?._id || ''}  
/>

{Array.isArray(storeReview) && storeReview.map((review) => (
  <span className="description" key={review._id}>
    <span className="description" style={{ display: "block" }}>
      {review.user.firstName}
    </span>
    <span className="description" style={{ display: "block" }}>
      {"⭐".repeat(review.ratings)}
  
  
      {review.review}
    </span>
  </span>
))}


      </TabPanel>
    </Box>
  );
};

export default BookTabs;
