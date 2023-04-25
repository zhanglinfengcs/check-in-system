import { faker } from "@faker-js/faker";
import { PostType } from "../types";

faker.locale = "zh_CN";

function createPost(): PostType {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    publisher: faker.name.firstName(),
  };
}

export const postList = Array.from({ length: 20 }).map(() => createPost());
