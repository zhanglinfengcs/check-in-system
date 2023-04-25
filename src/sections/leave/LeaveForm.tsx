import React from "react";
import Box from "@mui/material/Box";
import {Button, Paper, Stack, styled, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

const IButton = styled(Button)(() => ({
  width: 128,
  color: "white",
  fontSize: 18,
  backgroundColor: "#4f46e5",
  ":hover": {
    backgroundColor: "#3730a3",
  },
}));

const LeaveForm: React.FC = () => {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
  }

  return (
      <Paper
        sx={{
          width: "80%",
        }}
      >
          <Typography variant='h6' sx={{p: 3}}>
            请假申请
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { width: "70ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Stack
              direction="column"
              alignItems="self-start"
              gap={3}
              sx={{
                width: "100%",
                height: "100%",
                px: 3,
                pb: 3
              }} 
            >
              <TextField id="outlined-basic" label="Title" variant="outlined"/>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
              />
              <IButton type="submit">
                提交
              </IButton>
            </Stack>
          </Box>
      </Paper>
  )
}

export default LeaveForm;