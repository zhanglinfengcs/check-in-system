import * as React from "react";
import Page from "../../components/Page";
import { postList as initList } from "../../_mock";
import { NoticeForm, NoticesManagePanel } from "../../sections/notices";
import { useState } from "react";
import IButton from "../../components/IButton";
import { NoticeType } from "../../types";

const NoticesManage: React.FC = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const toggleAddButton = () => {
    setOpenAddForm(!openAddForm);
  };

  const [noticeList, setNoticeList] = useState<NoticeType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  React.useEffect(() => {
    //TODO: fetch data from server
    async function getNoticeList() {
      const res = await fetch("http://127.0.0.1:8000/notice/manage");
      const data = await res.json();
      if (data.status === 200) {
        setNoticeList(data.data);
        if (data.data.length > 0) 
          setSelectedId(data.data[0].noticeId);
      } else {
        console.log(data.msg);
      }
    }

    getNoticeList();
  }, [])

  let selectedItem = null
  if (selectedId !== null && noticeList.length > 0) {
    const findRes = noticeList.find((item) => item.noticeId === selectedId)
    if (findRes !== undefined)
      selectedItem = findRes;
    else
      selectedItem = null
  }

  return (
    <Page title="公告管理">
      <IButton onClick={toggleAddButton}>
        {openAddForm === false ? "添加公告" : "取消添加"}
      </IButton>
      {openAddForm === false ? (
        <NoticesManagePanel
          noticeList={noticeList}
          setNoticeList={setNoticeList}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          selectedItem={selectedItem}
        />
      ) : (
        <NoticeForm
          noticeList={noticeList}
          setNoticeList={setNoticeList}
          setSelectedId={setSelectedId}
          toggleAddButton={toggleAddButton}
        />
      )}
    </Page>
  );
};

export default NoticesManage;
