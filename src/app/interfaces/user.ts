import { Course } from "./course";

export interface IUser {
  uid: string,
  token: string,
  email: string,
  displayName: string,
  isAdmin?: boolean,
  pendingCourses?: string[]
  enrolledCourses?: string[]
}
export interface ILogin {
  email: string,
  password: string
}
export interface IRegister{
  email: string,
  password: string,
  isAdmin: boolean,
  displayName: string,
  uid?: string,
  token?: string,
}
