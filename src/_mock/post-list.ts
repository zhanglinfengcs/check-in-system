import { faker } from "@faker-js/faker";
import { NoticeType } from "../types";

faker.locale = "zh_CN";

function createNotice(): NoticeType {
  return {
    noticeId: faker.datatype.uuid(),
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    createdTime: faker.date.recent().getTime().toString(),
    editTime: faker.date.recent().getTime().toString(),
  };
}

const noticeList = Array.from({ length: 20 }).map(() => createNotice());

export default noticeList;
