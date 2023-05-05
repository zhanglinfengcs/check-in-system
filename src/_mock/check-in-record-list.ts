import { AttendSituation, AttendType } from "../types";
import { faker } from "@faker-js/faker";

faker.locale = "zh_CN";

function createStatus(num: number) {
  if (num === 0) return AttendSituation.Unchecked;
  else if (num === 1) return AttendSituation.Checked;
  else return AttendSituation.Leave;
}

function createCheckInRecord(): AttendType {
  return {
    attendId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    date: faker.date.recent().getTime().toString(),
    status: createStatus(faker.datatype.number({ min: 0, max: 2 })),
  };
}

const checkInRecordList = Array.from({ length: 200 }).map(() =>
  createCheckInRecord()
);

export default checkInRecordList;
