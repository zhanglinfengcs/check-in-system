import { NoticesPanel, SearchBar } from "../../sections/notices";
import Page from "../../components/Page";
import { useState } from "react";
import { postList as initList } from "../../_mock";
import { NoticeType } from "../../types";

const Notices: React.FC = () => {
  const [noticeList, setNoticeList] = useState<NoticeType[]>(initList);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPostList = [...initList];
    const filteredPostList = newPostList.filter((post) => {
      return post.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setNoticeList(filteredPostList);
  }

  return (
    <Page title="公告">
      <SearchBar handleInputChange={handleInputChange} />
      <NoticesPanel props={noticeList} />
    </Page>
  );
};

export default Notices;
