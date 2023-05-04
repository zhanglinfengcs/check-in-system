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
import { Box, TextField } from "@mui/material";
import { generalCSS, selectedCSS } from "../../styles";

interface Column {
  id: "worker";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  { id: "worker", label: "Workers", minWidth: 170 },
];

interface WorkersTableProps {
  rows: UserType[];
  onClickItem: (id: string) => void;
  selectedId: string;
}

const WorkersTable: React.FC<WorkersTableProps> = (
  {rows, onClickItem, selectedId}
) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleClick(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) {
    event.preventDefault();
    console.log("click");
  }

  return (
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
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" label="ID / Name" variant="outlined" />
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows && (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.userId}
                      onClick={(e) => handleClick(e)}
                      sx={row.userId === selectedId ? selectedCSS : generalCSS}
                    >
                      <TableCell align='left'
                        onClick={() => onClickItem(row.userId)} 
                      >
                        <div className="flex flex-col gap-2">
                          <div className="font-medium text-gray-900">
                            {row.name} 
                          </div>
                          <div className="font-medium text-gray-900">
                            {row.userId} 
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default WorkersTable;
