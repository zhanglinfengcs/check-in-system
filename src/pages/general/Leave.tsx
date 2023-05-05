import React from "react";
import Page from "../../components/Page.tsx";
import { LeaveForm, LeaveHistory } from "../../sections/leave";
import { leaveHistoryList } from "../../_mock";
import { Divider } from "@mui/material";

const Leave: React.FC = () => {
  return (
    <Page title="请假">
      <LeaveForm />
      <Divider sx={{ width: "100%" }} />
      <LeaveHistory props={leaveHistoryList} />
    </Page>
  );
};

export default Leave;