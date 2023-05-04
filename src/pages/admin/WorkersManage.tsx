import Page from "../../components/Page";
import { WorkersTable, WorkerDetails } from "../../sections/worker";
import { workerList as initList } from "../../_mock";
import { useState } from "react";
import { UserType } from "../../types";

const WorkersManage: React.FC = () => {
  const [workerList, setWorkerList] = useState<UserType[]>(initList);
  const [selectedId, setSelectedId] = useState<string>(workerList[0].userId);
  const selectedItem = workerList.find((item) => item.userId === selectedId) as UserType;
  const handleClickItem = (workId: string) => {
    console.log(workId)
    setSelectedId(workId)
  }
  return (
    <Page title="Workers Manage">
      <div className="flex flex-row justify-start items-start gap-3">
        <div className="w-1/2">
          <WorkersTable 
            rows={workerList} 
            onClickItem={handleClickItem}
            selectedId={selectedId}
          />
        </div>
        <div className="w-full">
          <WorkerDetails props={selectedItem}/>
        </div>
      </div>
    </Page>
  );
};

export default WorkersManage;
