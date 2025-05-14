import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { AddReviewAction, EditReviewAction } from "@/store/Review";

import { AppDispatch } from "@/store";
import { Reviews } from "@/types/ReviewType";

interface BookReviewFormProps {
  open: boolean;
  handleClose: () => void;
  bookId: string;
  reviewId:string;
  existingReview:Reviews | null
}
// Validation Schema
const schema = yup.object().shape({
  review: yup.string().required("Review is required"),
  ratings: yup
    .number()
    .typeError("Rating must be a number")
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Rating is required"),
});

const BookReviewForm = ({ open, handleClose ,bookId,reviewId,existingReview}: BookReviewFormProps) => {
console.log(reviewId,"review id getting")
console.log(existingReview,"existingReview")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  // const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();

  // const onSubmit = (data:Reviews) => {

  //   dispatch(AddReviewAction({ratings: data.ratings, review: data.review, bookId  }));
  //   dispatch(EditReviewAction({reviewId}));
  //   handleClose(); // Close dialog
  // };

  
const onSubmit = (data: { review: string; ratings: number }) => {

  if (existingReview) {
    dispatch(EditReviewAction({
      reviewId: existingReview._id,
      ratings: data.ratings,
      review: data.review,
      bookId
    }));
  } else {
    dispatch(AddReviewAction({
      ratings: data.ratings,
      review: data.review,
      bookId
    }));
  }

  handleClose();

};
// console.log(bookId,"bookId coming")
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Add Review</DialogTitle>
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <TextField
          fullWidth
          label="Rating *"
          variant="standard"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          sx={{ mb: 2 }}
          {...register("ratings")}
          error={!!errors.ratings}
          helperText={errors.ratings?.message}
        />
        <TextField
          fullWidth
          label="Review *"
          variant="standard"
          multiline
          {...register("review")}
          error={!!errors.review}
          helperText={errors.review?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          CANCEL
        </Button>
        <Button type="submit" color="success">
          SUBMIT
        </Button>
      </DialogActions>
    </form>
  </Dialog>
  );
};

export default BookReviewForm;
