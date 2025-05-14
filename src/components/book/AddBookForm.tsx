import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch} from "react-redux"
import { AddBookAction } from "@/store/Book";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";
import Image from "next/image";
type AddBookFormProps = {
  onSave: () => void;
};


// Validation Schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  price: yup.string().required("Price is required"),
  description: yup.string().required("Description is required"),
  genres: yup.string().required("Genres is required"),
  image: yup.mixed(),
});

export interface BookType {
    title: string;
    author: string;
    price: string;
    description: string;
    genres: string;
    images?: string[];

  }

const AddBookForm = ( { onSave }: AddBookFormProps ) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
const {
  register,
  handleSubmit,
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
  
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  // const useAppSelector = useSelector.withTypes<RootState>()
  const dispatch = useAppDispatch();

  const onSubmit = async (data:BookType) => {
    try{
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("genres", data.genres);
    images.forEach((file) => {
      formData.append("cover_image", file); // or use "cover_images[]" depending on backend
    });
    
    dispatch(AddBookAction(formData));
      toast.success("Book added successfully!");
    onSave();
     
  }catch{
    toast.error("Failed to add book. Please try again.");
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
          Add Book
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Title"
            {...register("title")}
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            label="Author"
            {...register("author")}
            margin="normal"
            error={!!errors.author}
            helperText={errors.author?.message}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register("price")}
            margin="normal"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            multiline
            rows={3}
            margin="normal"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            fullWidth
            label="Genres"
            {...register("genres")}
            margin="normal"
            error={!!errors.genres}
            helperText={errors.genres?.message}
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

export default AddBookForm;
