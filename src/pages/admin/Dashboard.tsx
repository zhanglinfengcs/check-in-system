import { useState } from "react";
import Page from "../../components/Page";
import {
  CheckInRecordSearchBar,
  CheckInRecordTable,
} from "../../sections/dashboard";
import { checkInRecordList as initList } from "../../_mock";
import { AttendType, AttendSituation } from "../../types";
import dayjs from "dayjs";

export type AllStatus =
  | AttendSituation.Unchecked
  | AttendSituation.Checked
  | AttendSituation.Leave
  | -1;

export interface Payload {
  input: string;
  status: AllStatus;
  date?: string;
}

function filterInput(input: string, list: AttendType[]) {
  if (!input) {
    return list;
  }

  const newList = list.filter((item) => {
    return item.name.includes(input) || item.userId.includes(input);
  });
  return newList;
}

function filterStatus(status: AllStatus, list: AttendType[]) {
  // AllStatus.All = -1
  if (status === -1 || status === undefined) {
    return list;
  }

  const newList = list.filter((item) => {
    return item.status === status;
  });
  return newList;
}

function filterDate(date: string | undefined, list: AttendType[]) {
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

const Dashboard: React.FC = () => {
  const [recordList, setRecordList] = useState<AttendType[]>(() => {
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

export default Dashboard;
