/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { EditBookAction } from "@/store/Book"; 
import { AppDispatch } from '@/store';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Books } from '@/types/BookType';
import { toast } from "react-toastify";
import { BookType } from './AddBookForm';
import Image from 'next/image';

// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
  genres: yup.string().required("Genres is required"),
  image: yup.mixed(),
});

const EditBookForm = ({onSave, BookId, book }: { BookId: string, book: Books ,  onSave: () => void;}) => {
  console.log("Editing Book with ID:", BookId);
 const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
          const fileArray = Array.from(files);
          setImages(fileArray);
          setImagePreviews(fileArray.map(file => URL.createObjectURL(file)));
        }
      };
    useEffect(() => {
      if (book) {
        console.log(book, 'book')
        reset(book)
      }
    
    }, [book])
    
 
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  // const useAppSelector = useSelector.withTypes<RootState>()

  const dispatch = useAppDispatch();
  const onSubmit = (formData: BookType) => {
    try{
    const updatedData = new FormData();
    updatedData.append("bookId", BookId);
    updatedData.append("title", formData.title);
    updatedData.append("author", formData.author);
    updatedData.append("price", formData.price);
    updatedData.append("description", formData.description);
    updatedData.append("genres", formData.genres);

    // if (formData.images && formData.images[0]) {
    //   updatedData.append("cover_image", formData.images[0]);
    // }

     images.forEach((file) => {
      updatedData.append("cover_image", file); // or use "cover_images[]" depending on backend
    });
    dispatch(EditBookAction({ data: updatedData }));
      toast.success("Book Edited successfully!");
    onSave()
  }catch{
 toast.error("Failed to Edit book. Please try again.");
  }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
         {imagePreviews && imagePreviews.length > 0 && (
                  // <img src={imagePreviews} alt="Preview" width={250} style={{ display: "block", margin: "10px auto" }} />
                  <Image
                  src={imagePreviews[0]}
                  alt="Preview"
                  width={250}
                  height={200}
                  style={{ objectFit: 'contain', display: "block", margin: "10px auto"  }}
                />
                )}
        <Typography variant="h5" align="center" gutterBottom>
          Edit Book
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <TextField
            fullWidth
            label="Title"
            {...register("title", { required: "Title is required" })}
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            label="Author"
            {...register("author", { required: "Author is required" })}
            margin="normal"
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register("price", { required: "Price is required" })}
            margin="normal"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            {...register("description")}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Genres"
            {...register("genres")}
            margin="normal"
          />
           <TextField
                     fullWidth
                     type="file"
                     margin="normal"
                     // accept="image/jpeg,image/png"
                     inputProps={{
                       accept: "image/*", 
                       multiple: true,
                       style: { padding: "10px" }
                     }}
                     onChange={handleFile}
                     // inputProps={{ style: { padding: "10px 10px" } }}
                     error={!!errors.image}
                     // helperText={errors.image?.message}
                   />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBookForm;

