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
  const [selectedId, setSelectedId] = useState<string>("");

  React.useEffect(() => {
    //TODO: fetch data from server
    setNoticeList(initList);
  }, [])

  React.useEffect(() => {
    setSelectedId(noticeList[0]?.noticeId);
  }, [noticeList])

  const selectedItem = noticeList.find((item) => item.noticeId === selectedId);

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
          toggleAddButton={toggleAddButton}
        />
      )}
    </Page>
  );
};

export default NoticesManage;
