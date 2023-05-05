import React from "react";
import Box from "@mui/material/Box";
import { Paper, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import IButton from "../../components/IButton";
import { LeaveApplyResult, LeaveType } from "../../types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

interface LeaveFormProps {
  leaveList: LeaveType[];
  setLeaveList: React.Dispatch<React.SetStateAction<LeaveType[]>>
  toggleAddButton: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ leaveList, setLeaveList, toggleAddButton}) => {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  function handleDateChange(newDate: dayjs.Dayjs | null) {
    if (newDate === null) {
      return;
    }
    setDate(newDate);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const willAddDate = date === null ? dayjs(Date.now()).valueOf().toString() : date.valueOf().toString();
    setLeaveList(
      [      {
        leaveId: faker.datatype.uuid(), 
        title: formData.get('title') as string,
        desc: formData.get('content') as string,
        date: willAddDate,
        result: LeaveApplyResult.Pending
      }, ...leaveList]
    )
    toggleAddButton();
  }

  return (
    <Paper
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ p: 3, textAlign: 'center' }}>
        请假申请
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Stack
          direction="column"
          alignItems="self-start"
          gap={1}
          sx={{
            width: "100%",
            height: "100%",
            px: 3,
            pb: 3,
          }}
        >
          <p className="text-lg text-left">标题</p> 
          <TextField
            id="outlined-multiline-static"
            label="标题"
            name="title"
            required
          />
          <p className="text-lg text-left mt-2">内容</p> 
          <TextField
            id="outlined-multiline-static"
            label="内容"
            multiline
            rows={4}
            name='content'
            required
          />
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Controlled picker"
              value={date}
              onChange={(newDate) => {
                handleDateChange(newDate);
              }}
            />
          </DemoContainer>
          <IButton type="submit" sx={{mt: 2}}>提交</IButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default LeaveForm;
