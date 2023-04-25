import { faker } from '@faker-js/faker';

export type PostType = {
  id: string,
  title: string,
  description: string,
  date: string,
  publisher: string,
}

faker.locale = 'zh_CN';

function createPost(): PostType {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    date: faker.date.recent().toDateString(),
    publisher: faker.name.firstName(),
  };
}

export const postList = Array.from({ length: 20 }).map(() => createPost());
