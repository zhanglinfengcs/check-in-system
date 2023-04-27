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
import IButton from "../../components/IButton";

const SearchBar: React.FC = () => {
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
        <SearchInput />
        <StatusSelect />
        <SearchDatePicker />
      </Stack>
    </Paper>
  );
};
const SearchInput: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="ID / Name" variant="outlined" />
    </Box>
  );
};

const StatusSelect: React.FC = () => {
  const [status, setStatus] = useState<UserStatus>(UserStatus.Unchecked);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(Number(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status.toString()}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={UserStatus.Unchecked}>Unchecked</MenuItem>
          <MenuItem value={UserStatus.Checked}>Checked</MenuItem>
          <MenuItem value={UserStatus.Leave}>Leave</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const SearchDatePicker: React.FC = () => {
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(
    dayjs("2022-04-17")
  );
  return (
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
              value={value}
              onChange={(newValue) => {
                console.log((newValue as dayjs.Dayjs).format("YYYY-MM-DD"));
                setValue(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <IButton variant="contained" onClick={() => setValue(null)}>
        清除日期
      </IButton>
    </Stack>
  );
};

export default SearchBar;
