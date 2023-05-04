import { faker } from "@faker-js/faker";
import { UserType, IsStaff, Gender, AttendSituation } from "../types";

faker.locale = "zh_CN";

function createUser(): UserType {
  return {
    userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    password: faker.phone.number().toString(),
    phoneNum: faker.phone.number().toString(),
    gender: Gender.Male,
    isStaff: IsStaff.Yes,
    status: AttendSituation.Checked,
  };
}

const workerList = Array.from({ length: 20 }).map(() => createUser());

export default workerList;
