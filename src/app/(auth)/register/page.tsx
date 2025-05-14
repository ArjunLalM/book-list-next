"use client"
import { FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';
import type { Register } from '@/types/RegisterType';

// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  gender: yup
    .string()
    .oneOf(["Male", "Female"], "Select a valid gender")
    .required("Gender is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/[0-9]/, "Must contain one number")
    .matches(
      /[@$!%*?&]/,
      "Must contain one special character (@, $, !, %, *, ?, &)"
    )
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:Register) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/signup`,
        data
      );
      toast.success("SignUp successful! Redirecting...", { autoClose: 2000 });
      localStorage.setItem("token", response.data.access_token);
      // console.log("*******register",response.data.data)
      setTimeout(() => {
        router.push("/login"); 
      }, 2000);

    } catch {
      // console.error("Sign-up error:", err.response?.data || err.message);
      toast.error("SignUp failed. Please check your details and try again.");
    }
  };

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <div>
            <Typography 
            variant="body2" 
            className="block text-sm font-medium text-gray-900">
              First Name
            </Typography>
            <div className="mt-2">
              <TextField
                id="firstName"
                type="text"
                
                fullWidth
                variant="outlined"
                label="First Name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Last Name
            </Typography>
            <div className="mt-2">
              <TextField
                id="lastName"
                type="text"
                
                fullWidth
                variant="outlined"
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
          <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  {...register("gender")}
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  {...register("gender")}
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
              {errors.gender && (
                <Typography color="error">{errors.gender.message}</Typography>
              )}
            </FormControl>
          </div>

          {/* Date of Birth */}
          <div>
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Date of Birth
            </Typography>
            <div className="mt-2">
              <TextField
                id="dateOfBirth"
                type="date"
                
                fullWidth
                variant="outlined"
             
                {...register("dateOfBirth")}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Phone Number
            </Typography>
            <div className="mt-2">
              <TextField
                id="phoneNumber"
                type="tel"
              
                fullWidth
                label="phoneNumber"
                variant="outlined"
                {...register("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Email address
            </Typography>
            <div className="mt-2">
              <TextField
                id="email"
                type="email"
           
                fullWidth
                variant="outlined"
                autoComplete="email"
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Password
            </Typography>
            <div className="mt-2">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            </div>
          </div>

          {/* Confirm Password */}
      
            <Typography variant="body2" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </Typography>
            <div className="mt-2">
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              {...register("passwordConfirm")}
              error={!!errors?.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
   
  </>
  
  )
}

export default Register