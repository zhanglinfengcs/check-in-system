import { NoticesTable, SearchBar } from "../../sections/notices";
import Page from "../../components/Page";
import { useEffect, useState } from "react";
import { postList as initList } from "../../_mock";
import { NoticeType } from "../../types";

const Notices: React.FC = () => {
  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);
  
  useEffect(() => {
    async function fetchNoticeList() {
      const res = await fetch('http://127.0.0.1:8000/notice')
      const data = await res.json()
      console.log('fetch notice list data', data)
      if (data.status === 200) {
        setNoticeList(data.data)
      } else {
        console.log('fetch notice list failed')
      }
    }

    fetchNoticeList()
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
