export interface PostType {
  id: string;
  title: string;
  content: string;
  date: string;
  publisher: string;
}

export interface LeaveType {
  id: string,
	title: string,
	desc: string,
	date: string,
  result: LeaveResult,
}

export enum LeaveResult {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface UserType {
  id: string,
  name: string,
  email: string,
  phone: string,
  level: UserLevel,
}

export enum UserLevel {
  Admin = 0,
  Simple = 1,
}