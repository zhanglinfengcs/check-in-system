import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NoticeType } from "../../types";
import { FormatDate } from "../../lib/Format";
import IButton from "../../components/IButton";
import { useNavigate } from "react-router-dom";

interface Column {
  id: "title" | "createdTime" | "editTime" | "details";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "title", label: "Title", minWidth: 170 },
  {
    id: "createdTime",
    label: "Created Time",
    minWidth: 100,
    format: (value: string) => FormatDate(value),
  },
  {
    id: "editTime",
    label: "Edit Time",
    minWidth: 170,
    align: "right",
    format: (value: string) => FormatDate(value),
  },
  {
    id: "details",
    label: "Details",
    minWidth: 170,
    align: "right",
  },
];

interface NoticesPanelProps {
  props: NoticeType[];
}

const NoticesPanel: React.FC<NoticesPanelProps> = ({ props }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const handleClickDetails = (notice: NoticeType) => {
    navigate(`/notice/${notice.noticeId}`, {
      state: {
        notice,
      },
    });
  };

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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.noticeId}
                  >
                    {columns.map((column) => {
                      if (column.id === "details") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IButton
                              sx={{
                                width: "30%",
                                height: "50%",
                                fontSize: "1rem",
                              }}
                              onClick={() => handleClickDetails(row)}
                            >
                              详情
                            </IButton>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default NoticesPanel;
