import { useState } from "react";
import Page from "../components/Page";
import {
  CheckInRecordSearchBar,
  CheckInRecordTable,
} from "../sections/dashboard";
import { checkInRecordList as initList } from "../_mock";
import { CheckInRecordType, UserStatus } from "../types";
import dayjs from "dayjs";

export type AllStatus =
  | UserStatus.Unchecked
  | UserStatus.Checked
  | UserStatus.Leave
  | -1;

export interface Payload {
  input: string;
  status: AllStatus;
  date?: string;
}

function filterInput(input: string, list: CheckInRecordType[]) {
  if (!input) {
    return list;
  }

  const newList = list.filter((item) => {
    return item.name.includes(input) || item.userId.includes(input);
  });
  return newList;
}

function filterStatus(status: AllStatus, list: CheckInRecordType[]) {
  // AllStatus.All = -1
  if (status === -1 || status === undefined) {
    return list;
  }

  const newList = list.filter((item) => {
    return item.status === status;
  });
  return newList;
}

function filterDate(date: string | undefined, list: CheckInRecordType[]) {
  if (!date) {
    return list;
  }

  const newList = list.filter((item) => {
    return isSameDay(item.date, date);
  });
  return newList;
}

function isSameDay(date1: string | number, date2: string | number): boolean {
  return (
    dayjs(Number(date1)).format("YYYY-MM-DD") ===
    dayjs(Number(date2)).format("YYYY-MM-DD")
  );
}

const AdminDashboard: React.FC = () => {
  const [recordList, setRecordList] = useState<CheckInRecordType[]>(() => {
    const newList = initList.filter((item) => {
      return isSameDay(item.date, dayjs().valueOf());
    });
    return newList;
  });

  function handleFilterStatusChange(payload: Payload) {
    let newRecordList = filterInput(payload.input, initList);
    newRecordList = filterStatus(payload.status, newRecordList);
    newRecordList = filterDate(payload.date, newRecordList);
    setRecordList(newRecordList);
  }
  return (
    <Page title="Dashboard">
      <CheckInRecordSearchBar handleChange={handleFilterStatusChange} />
      <CheckInRecordTable rows={recordList} />
    </Page>
  );
};

export default AdminDashboard;
