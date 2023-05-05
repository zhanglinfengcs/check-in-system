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
      {
        openAddForm === false ? 
        (
          <>
            <IButton onClick={toggleAddButton}>
              添加公告
            </IButton>
            <NoticesManagePanel 
              noticeList={noticeList}
              setNoticeList={setNoticeList}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            /> 
          </>
        )
        : (
          <>
            <IButton onClick={toggleAddButton}>
              取消添加
            </IButton>
            <NoticeForm 
              noticeList={noticeList}
              setNoticeList={setNoticeList}
              toggleAddButton={toggleAddButton}
            />
          </>
        )
      }
    </Page>
  );
};

export default NoticesManage;
