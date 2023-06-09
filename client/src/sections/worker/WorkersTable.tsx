import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { UserType } from "../../types";
import IButton from "../../components/IButton";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Column {
  id: "userId" | "name" | "gender" | "phoneNum" | "operate";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "userId", label: "工号", minWidth: 170 },
  { id: "name", label: "姓名", minWidth: 100 },
  {
    id: "gender",
    label: "性别",
    minWidth: 170,
    align: "center",
  },
  {
    id: "phoneNum",
    label: "电话号码",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "operate",
    label: "操作",
    minWidth: 170,
    align: "center",
  },
];

interface WorkersTableProps {
  initList: UserType[];
  workerList: UserType[];
  setWorkerList: React.Dispatch<React.SetStateAction<UserType[]>>;
}

const WorkersTable: React.FC<WorkersTableProps> = ({
  initList,
  workerList,
  setWorkerList,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newList = initList.filter(
      (worker) =>
        worker.userId.includes(e.target.value) ||
        worker.name.includes(e.target.value)
    );
    setWorkerList(newList);
  };

  const navigate = useNavigate();
  const handleClickDetails = (worker: UserType) => {
    console.log('go details')
    navigate(`/admin/worker/details/${worker.userId}`, 
      { 
        state: {
          worker: worker,
        } 
      }
    ); 
  };

  const handleClickDelete = (workerId: string) => {
    const formData = new FormData();
    formData.append("userId", workerId);

    async function deleteWorker() {
      const res = await fetch('http://127.0.0.1:8000/face/home/deluser', {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await res.json();
      console.log('delete worker', data)
      if (data.status === 200) {
        console.log("delete worker success");
        const newList = workerList.filter((item) => item.userId !== workerId);
        setWorkerList(newList);
      } else {
        console.log("delete worker failed");
      }
    }

    deleteWorker();
  };

  return (
    <>
      
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
            placeholder="工号 / 姓名"
            className="inline-block w-full h-9 outline-none"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {workerList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((worker) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={worker.userId}
                    >
                      {columns.map((column) => {
                        if (column.id === "operate") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{
                                cursor: "pointer",
                              }}
                            >
                              <Stack
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-end",
                                  alignItems: "end",
                                  gap: 1,
                                }}
                              >
                                <IButton
                                  sx={{
                                    width: "10%",
                                    height: "100%",
                                  }}
                                  onClick={() => handleClickDetails(worker)}
                                >
                                  详情
                                </IButton>
                                <IButton
                                  sx={{
                                    width: "10%",
                                    height: "100%",
                                  }}
                                  onClick={() =>
                                    handleClickDelete(worker.userId)
                                  }
                                >
                                  删除
                                </IButton>
                              </Stack>
                            </TableCell>
                          );
                        }
                        const value = worker[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={workerList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default WorkersTable;
