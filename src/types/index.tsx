export interface PostType {
  postId: string;
  title: string;
  content: string;
  date: string;
  publisher: string;
}

export interface LeaveType {
  id: string;
  title: string;
  desc: string;
  date: string;
  result: LeaveResult;
}

export enum LeaveResult {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: UserLevel;
  status: UserStatus;
}

export enum UserLevel {
  Admin = 0,
  Simple = 1,
}

export enum UserStatus {
  Unchecked = 0,
  Checked = 1,
  Leave = 2,
}

export interface CheckInRecordType {
  recordId: string;
  userId: string;
  name: string;
  date: string;
  status: UserStatus;
}

export interface LeaveApplyType {
  applyId: string;
  userId: string;
  title: string;
  content: string;
  name: string;
  result: LeaveResult;
  date: string;
}
