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
  setLeaveList: React.Dispatch<React.SetStateAction<LeaveType[]>>;
  toggleAddButton: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({
  leaveList,
  setLeaveList,
  toggleAddButton,
}) => {
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(dayjs());

  function handleDateChange(newDate: dayjs.Dayjs | null) {
    if (newDate === null) {
      return;
    }
    setDate(newDate);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const willAddDate =
      date === null
        ? dayjs(Date.now()).valueOf().toString()
        : date.valueOf().toString();

    formData.append("date", willAddDate);
    //TODO: add leave apply request
    async function addLeaveApply() {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        console.log("add leave apply success");
        setLeaveList([
          {
            leaveId: faker.datatype.uuid(),
            title: formData.get("title") as string,
            desc: formData.get("content") as string,
            date: formData.get("date") as string,
            result: LeaveApplyResult.Pending,
          },
          ...leaveList,
        ]);
        toggleAddButton();
      } else {
        console.log(data.msg);
      }
    }
    
    addLeaveApply();
  }

  return (
    <Paper
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ p: 3, textAlign: "center" }}>
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
            gap: 2
          }}
        >
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="选择日期"
              value={date}
              onChange={(newDate) => {
                handleDateChange(newDate);
              }}
            />
          </DemoContainer>
          <TextField
            id="outlined-multiline-static"
            label="标题"
            name="title"
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="内容"
            multiline
            rows={4}
            name="content"
            required
          /> 
          <IButton type="submit" sx={{ mt: 1 }}>
            提交
          </IButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default LeaveForm;
