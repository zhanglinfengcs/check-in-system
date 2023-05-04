import { faker } from "@faker-js/faker";
import { LeaveType, LeaveApplyResult } from "../types";

faker.locale = "zh_CN";

function createResult(num: number) {
  if (num === 0) return LeaveApplyResult.Pending;
  else if (num === 1) return LeaveApplyResult.Approved;
  else return LeaveApplyResult.Rejected;
}

function createLeave(): LeaveType {
  return {
    leaveId: faker.datatype.uuid(),
    desc: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    result: createResult(faker.datatype.number({ min: 0, max: 2 })),
  };
}

const leaveHistoryList = Array.from({ length: 20 }).map(() => createLeave());

export default leaveHistoryList;
