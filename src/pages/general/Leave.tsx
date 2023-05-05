import React, { useState } from "react";
import Page from "../../components/Page.tsx";
import { LeaveForm, LeaveHistory } from "../../sections/leave";
import { leaveHistoryList as initList} from "../../_mock";
import IButton from "../../components/IButton.tsx";
import { LeaveType } from "../../types/index.tsx";

const Leave: React.FC = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const toggleAddButton = () => {
    setOpenAddForm(!openAddForm);
  }

  const [leaveList, setLeaveList] = useState<LeaveType[]>(initList);

  return (
    <Page title="请假">
      <IButton onClick={toggleAddButton}>
        {openAddForm === false ? "请假" : "取消请假"}
      </IButton>
      {
        openAddForm === false
        ? (
          <LeaveHistory 
            leaveList={leaveList}
          />
        )
        : (
          <LeaveForm 
            leaveList={leaveList}
            setLeaveList={setLeaveList}
            toggleAddButton={toggleAddButton}
          />
        )
      }
    </Page>
  );
};

export default Leave;
