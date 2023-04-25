import { faker } from "@faker-js/faker";
import { LeaveType, LeaveResult } from "../types";

faker.locale = "zh_CN";

function createResult(num: number) {
  if (num === 0) return LeaveResult.Pending;
  else if (num === 1) return LeaveResult.Approved;
  else return LeaveResult.Rejected;
}

function createLeave(): LeaveType {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    desc: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    result: createResult(faker.datatype.number({ min: 0, max: 2 }))
  }
}

const leaveHistoryList = Array.from({ length: 20 }).map(() => createLeave());

export default leaveHistoryList