import React, { useEffect, useState } from "react";
import Page from "../../components/Page.tsx";
import { LeaveForm, LeaveHistory } from "../../sections/leave";
import { leaveHistoryList as initList } from "../../_mock";
import IButton from "../../components/IButton.tsx";
import { LeaveType, UserType } from "../../types/index.tsx";
import useUser from "../../hooks/useUser.tsx";

const Leave: React.FC = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const toggleAddButton = () => {
    setOpenAddForm(!openAddForm);
  };
  const { user } = useUser()

  const [leaveList, setLeaveList] = useState<LeaveType[]>([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append("userId", (user as UserType).userId);
    async function fetchLeaveList() {
      const res = await fetch("http://127.0.0.1:8000/face/leave/finduserleave", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await res.json();
      if (data.status === 200) {
        setLeaveList(data.data);
      } else {
        console.log("fetch leaveList failed");
      }
    }

    fetchLeaveList();
  }, [user])

  return (
    <Page title="请假">
      <IButton onClick={toggleAddButton}>
        {openAddForm === false ? "请假" : "取消请假"}
      </IButton>
      {openAddForm === false ? (
        <LeaveHistory leaveList={leaveList} />
      ) : (
        <LeaveForm
          leaveList={leaveList}
          setLeaveList={setLeaveList}
          toggleAddButton={toggleAddButton}
        />
      )}
    </Page>
  );
};

export default Leave;
