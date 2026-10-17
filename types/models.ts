export interface IProduct {
  name: string;
  brand: string;
  category: "men" | "women";
  price: number;
  description: string;
  images: string[];
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
