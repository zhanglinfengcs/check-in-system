import { faker } from "@faker-js/faker";
import { PostType } from "../types";

faker.locale = "zh_CN";

function createPost(): PostType {
  return {
    postId: faker.datatype.uuid(),
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    publisher: faker.name.firstName(),
  };
}

const postList = Array.from({ length: 20 }).map(() => createPost());

export default postList;
