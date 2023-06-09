import { faker } from "@faker-js/faker";
import { LeaveApplyType, LeaveApplyResult } from "../types";

faker.locale = "zh_CN";

function createResult(num: number) {
  if (num === 0) return LeaveApplyResult.Pending;
  else if (num === 1) return LeaveApplyResult.Approved;
  else return LeaveApplyResult.Rejected;
}

function createApply(): LeaveApplyType {
  return {
    leaveId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    date: faker.date.recent().getTime().toString(),
    result: createResult(faker.datatype.number({ min: 0, max: 2 })),
  };
}

const leaveApplyList = Array.from({ length: 20 }).map(() => createApply());

export default leaveApplyList;
