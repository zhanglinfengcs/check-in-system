import { NoticesTable, SearchBar } from "../../sections/notices";
import Page from "../../components/Page";
import { useEffect, useState } from "react";
import { postList as initList } from "../../_mock";
import { NoticeType } from "../../types";

const Notices: React.FC = () => {
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);
  
  useEffect(() => {
    //TODO: fetch noticeList
    
    setNoticeList(initList);
  }, [])

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
      <NoticesTable props={noticeList} />
    </Page>
  );
};

export default Notices;
