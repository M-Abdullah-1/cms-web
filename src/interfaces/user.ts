export interface User {
  __v: number;
  _id: string;
  about: string;
  article: string[]; // Assuming article is an array of strings (ObjectIds)
  email: string;
  facebook: string;
  insta: string;
  name: string;
  role: string;
  twitter: string;
}
