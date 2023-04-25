export type PostType = {
  id: string;
  title: string;
  content: string;
  date: string;
  publisher: string;
};

export type LeaveType = {
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