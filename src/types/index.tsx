export interface NoticeType {
  noticeId: string;
  title: string;
  content: string;
  createdTime: string;
  editTime: string,
}

export interface LeaveType {
  leaveId: string;
  title: string;
  desc: string;
  date: string;
  result: LeaveApplyResult;
}

export enum LeaveApplyResult {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface UserType {
  userId: string;
  name: string;
  password: string;
  phoneNum: string;
  gender: Gender;
  isStaff: IsStaff;
  status: AttendSituation;
  image?: string;
}

export enum Gender {
  Male = 0,
  Female = 1
}

export enum IsStaff {
  Yes = 0,
  No = 1,
}

export enum AttendSituation {
  Unchecked = 0,
  Checked = 1,
  Leave = 2,
}

export interface AttendType {
  attendId: string;
  userId: string;
  name: string;
  date: string;
  status: AttendSituation;
}

export interface LeaveApplyType {
  leaveId: string;
  userId: string;
  title: string;
  content: string;
  name: string;
  result: LeaveApplyResult;
  date: string;
}
