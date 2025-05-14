// Assuming the ReviewType looks like this:
export interface Reviews {
//  data: {
   _id: string;
   bookId:string;
  review: string;
  ratings: number;
  user: {
    _id: string;
    firstName: string;
  };
//  }
}

// Assuming the ReviewType looks like this:
// export interface Reviews {
//  data: {
//    _id: string;
//    bookId:string;
//   review: string;
//   ratings: number;
//   user: {
//     _id: string;
//     firstName: string;
//   };
//  }
// }

