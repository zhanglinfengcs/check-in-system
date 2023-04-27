import { CheckInRecordType, UserStatus } from "../types";
import { faker } from "@faker-js/faker";

faker.locale = "zh_CN";

function createStatus(num: number) {
  if (num === 0) return UserStatus.Unchecked;
  else if (num === 1) return UserStatus.Checked;
  else return UserStatus.Leave;
}

function createCheckInRecord(): CheckInRecordType {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    date: faker.date.recent().toDateString(),
    status: createStatus(faker.datatype.number({ min: 0, max: 2 })),
  };
}

const checkInRecordList = Array.from({ length: 20 }).map(() =>
  createCheckInRecord()
);

export default checkInRecordList;
