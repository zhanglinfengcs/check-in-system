import { faker } from "@faker-js/faker";
import { LeaveApplyType, LeaveResult } from "../types";

faker.locale = "zh_CN";

function createResult(num: number) {
  if (num === 0) return LeaveResult.Pending;
  else if (num === 1) return LeaveResult.Approved;
  else return LeaveResult.Rejected;
}

function createApply(): LeaveApplyType {
  return {
    applyId: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
    title: faker.lorem.words(),
    name: faker.name.fullName(),
    content: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    result: createResult(faker.datatype.number({ min: 0, max: 2 })),
  };
}

const leaveApplyList = Array.from({ length: 20 }).map(() => createApply());

export default leaveApplyList;
