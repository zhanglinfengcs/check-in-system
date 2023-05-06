import Page from "../../components/Page";
import { WorkerForm, WorkersTable } from "../../sections/worker";
import { workerList as initList } from "../../_mock";
import { useState } from "react";
import { UserType } from "../../types";
import IButton from "../../components/IButton";

const WorkersManage: React.FC = () => {
  const [openAddButton, setOpenAddButton] = useState<boolean>(false);
  const [workerList, setWorkerList] = useState<UserType[]>(initList);

  const toggleAddButton = () => {
    setOpenAddButton(!openAddButton);
  };
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
