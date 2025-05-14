'use client';
import React from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import { Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  {
    userName: 'Arjunlal',
    userImage: '/images/user1.jpg',
    bookName: 'The Alchemist',
    review: 'A deeply philosophical story that inspired me to follow my dreams.',
  },
  {
    userName: 'Sneha',
    userImage: '/images/user2.jpg',
    bookName: 'Atomic Habits',
    review: 'Incredible insights into habit-building. A must-read for everyone.',
  },
  {
    userName: 'Rahul',
    userImage: '/images/user3.jpg',
    bookName: 'Deep Work',
    review: 'Changed how I approach focus and productivity.',
  },
];

// Custom black arrow components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} className="!absolute !right-2 !top-1/2 !-translate-y-1/2 z-10 text-black bg-white shadow-md hover:bg-gray-100">
      <ArrowForwardIos />
    </IconButton>
  );
};

const PrevArrow = (props: CustomArrowProps) => {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} className="!absolute !left-2 !top-1/2 !-translate-y-1/2 z-10 text-black bg-white shadow-md hover:bg-gray-100">
      <ArrowBackIos />
    </IconButton>
  );
};

const ReviewBox = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4 relative">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index}>
            <Card className="p-4">
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar src={review.userImage} alt={review.userName} sx={{ width: 56, height: 56 }} />
                  <div>
                    <Typography variant="h6">{review.userName}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {review.bookName}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body1" className="text-gray-700">
                  {review.review}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewBox;
