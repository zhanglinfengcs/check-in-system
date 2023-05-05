import Page from "../../components/Page";
import { WorkersTable } from "../../sections/worker";
import { workerList as initList } from "../../_mock";
import { useState } from "react";
import { UserType } from "../../types";

const WorkersManage: React.FC = () => {
  const [workerList, setWorkerList] = useState<UserType[]>(initList);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = initList.filter((worker) => worker.userId.includes(e.target.value) || worker.name.includes(e.target.value))
    setWorkerList(newList)
  }
  return (
    <Page title="Workers Manage">
        <div
        id="search-bar-card"
        className="w-full h-20 bg-white relative rounded-lg shadow"
      >
        <div
          id="search-input"
          className="absolute top-1/2 -translate-y-1/2 pl-3 w-1/2 ml-3 h-12 border rounded-lg bg-white flex flex-row gap-2 justify-start items-center focus-within:border-purple-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="ID / Name"
            className="inline-block w-full h-9 outline-none"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <WorkersTable 
        rows={workerList} 
      />
    </Page>
  );
};

export default WorkersManage;
