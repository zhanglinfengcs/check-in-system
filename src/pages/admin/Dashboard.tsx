import * as React from "react";
import Page from "../../components/Page";
import {
  CheckInRecordSearchBar,
  CheckInRecordTable,
} from "../../sections/dashboard";
import { checkInRecordList } from "../../_mock";
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
  const [recordList, setRecordList] = React.useState<AttendType[]>([]);
  const initListRef = React.useRef<AttendType[]>([]);

  React.useEffect(() => {
    async function fetchRecordList() {
      await fetch('http://127.0.0.1:8000/face/attend/findattend')
        .then((res) => res.json())
        .then((data) => {
          console.log('fetch attend history list', data)
          if (data.status === 200) {
            // initListRef.current = [...checkInRecordList]
            initListRef.current = [...data.data]
            setRecordList(() => {
              const newList = initListRef.current.filter((item) => {
                return isSameDay(item.date, dayjs().valueOf());
              });
              return newList;
            })
          } else {
            console.log('failed')
          }
        })
    }
    fetchRecordList()
  }, [])

  function handleFilterStatusChange(payload: Payload) {
    let newRecordList = filterInput(payload.input, initListRef.current);
    newRecordList = filterStatus(payload.status, newRecordList);
    newRecordList = filterDate(payload.date, newRecordList);
    setRecordList(newRecordList);
  }
  return (
    <Page title="考勤情况">
      <CheckInRecordSearchBar handleChange={handleFilterStatusChange} />
      <CheckInRecordTable rows={recordList} />
    </Page>
  );
};

export default Dashboard;
