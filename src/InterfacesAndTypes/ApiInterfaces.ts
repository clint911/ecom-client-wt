export interface cartItems {
  productIds: number[];
}
export enum userRole {
  admin,
  buyer,
  seller
}

export interface userData extends cartItems {
  userId: number;
  email: string;
  userName: string;
  password: string;
  address: string;
  city: string;
  country: string;
  role: userRole
}
export enum ProductRating {
  one,
  two,
  three,
  four,
  five
}
export interface Reviews {
  reviewId: number;
  productId: number;
  userId: number;
  productRating: ProductRating;
  textContent: string;
  dateOfReview: string;//TODO: refactor to use Date
}

export interface Products {
  productId: number;
  price: number;
  productName: string;
  description: string;
  imageUrl: string;
}
export enum OrderStatus {
  pending,
  approved,
  shipped,
  completed,
  failed
}
export interface Orders {
  orderId: number;
  noOfProducts: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  date: string;//TODO: refactor implementation to use Date
  productsOrdered: string;//TODO: refactor implementation to use array
}
export enum helpType {
  return,
  accountError,
  other
}
export interface Support {
  userId: number;
  date: string;
  help: helpType;
  reason: string;
}
