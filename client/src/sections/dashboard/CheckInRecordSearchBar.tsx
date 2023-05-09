import React, { useState } from "react";
import {
  Paper,
  Stack,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UserStatus } from "../../types";
import dayjs from "dayjs";
import { Payload, AllStatus } from "../../pages/AdminDashboard";

const CheckInRecordSearchBar: React.FC<{
  handleChange: (payload: Payload) => void;
}> = ({ handleChange }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [status, setStatus] = useState<AllStatus>(-1);
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputValue(event.target.value);
    handleChange({
      input: event.target.value,
      status,
      date: date?.valueOf(),
    } as Payload);
  }

  function handleStatusChange(event: SelectChangeEvent) {
    const newStatus = Number(event.target.value);
    setStatus(newStatus);
    handleChange({
      input: inputValue,
      status: newStatus,
      date: date?.valueOf(),
    } as Payload);
  }

  function handleDateChange(newDate: dayjs.Dayjs | null) {
    if (newDate === null) {
      return;
    }
    handleChange({
      input: inputValue,
      status,
      date: newDate.valueOf().toString(),
    });
    setDate(newDate);
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: "white",
        p: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={3}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="ID / Name"
            variant="outlined"
            value={inputValue}
            onChange={(event) => handleInputChange(event)}
          />
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status.toString()}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={-1}>All</MenuItem>
              <MenuItem value={UserStatus.Unchecked}>Unchecked</MenuItem>
              <MenuItem value={UserStatus.Checked}>Checked</MenuItem>
              <MenuItem value={UserStatus.Leave}>Leave</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            component="div"
            sx={{
              mb: 1,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Controlled picker"
                  value={date}
                  onChange={(newDate) => {
                    handleDateChange(newDate);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CheckInRecordSearchBar;
