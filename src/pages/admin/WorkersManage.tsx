import * as React from "react";
import Page from "../../components/Page";
import { WorkerForm, WorkersTable } from "../../sections/worker";
import { workerList as initList } from "../../_mock";
import { useState } from "react";
import { UserType } from "../../types";
import IButton from "../../components/IButton";

const WorkersManage: React.FC = () => {
  const [openAddButton, setOpenAddButton] = useState<boolean>(false);
  const [workerList, setWorkerList] = useState<UserType[]>([]);

  const toggleAddButton = () => {
    setOpenAddButton(!openAddButton);
  };

  React.useEffect(() => {
    async function getWorkerList() {
      const res = await fetch('http://127.0.0.1:8000/face/home/findalluser');
      const data = await res.json();
      console.log('get worker list', data);
      if (data.status === 200) {
        setWorkerList(data.data);
      } else {
        console.log('get worker list failed');
      }
    }

    getWorkerList();
  }, [])


  return (
    <Page title="人员管理">
      <IButton onClick={toggleAddButton}>
        {openAddButton ? "取消添加" : "添加人员"}
      </IButton>
      {openAddButton ? (
        <WorkerForm
          workerList={workerList}
          setWorkerList={setWorkerList}
          toggleAddButton={toggleAddButton}
        />
      ) : (
        <WorkersTable
          initList={initList}
          workerList={workerList}
          setWorkerList={setWorkerList}
        />
      )}
    </Page>
  );
};

export default WorkersManage;
