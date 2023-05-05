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
  }

  const [noticeList, setNoticeList] = useState<NoticeType[]>(initList);
  const [selectedId, setSelectedId] = useState<string>(noticeList[0].noticeId);
 

  return (
    <Page title="Notices Manage">
      <IButton onClick={toggleAddButton}>
        {openAddForm === false ? "添加公告" : "取消添加"}
      </IButton>
      {
        openAddForm === false ? 
        (
          <NoticesManagePanel 
            noticeList={noticeList}
            setNoticeList={setNoticeList}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          /> 
        )
        : (  
          <NoticeForm 
            noticeList={noticeList}
            setNoticeList={setNoticeList}
            toggleAddButton={toggleAddButton}
          />
        )
      }
    </Page>
  );
};

export default NoticesManage;
