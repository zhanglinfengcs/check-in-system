import { faker } from '@faker-js/faker';
type PostType = {
  id: string,
  title: string,
  description: string,
  time: Date,
}

faker.locale = 'zh_CN';

export function createPost(): PostType {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    time: faker.date.recent(),
  };
}

const postList = Array.from({ length: 10 }).map(() => createPost());

export default postList;