import { NoticesPanel } from "../../sections/notices";
import Page from "../../components/Page";
import { useState } from "react";
import { postList as initialPostList } from "../../_mock";
import { PostType } from "../../types";

const Notices: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>(initialPostList);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPostList = [...initialPostList];
    const filteredPostList = newPostList.filter((post) => {
      return post.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setPostList(filteredPostList);
  }

  return (
    <Page title="Posts">
      <div
        id="search-bar-card"
        className="w-full h-20 bg-white relative rounded-lg shadow"
      >
        <div
          id="search-input"
          className="absolute top-1/2 -translate-y-1/2 pl-3 w-1/2 ml-3 h-12 border rounded-lg bg-white flex flex-row gap-2 justify-start items-center focus-within:border-purple-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Post"
            className="inline-block w-full h-9 outline-none"
            onChange={(e) => onInputChange(e)}
          />
        </div>
      </div>
      <NoticesPanel props={postList} />
    </Page>
  );
};

export default Notices;
