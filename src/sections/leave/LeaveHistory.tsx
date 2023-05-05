import { LeaveType } from "../../types";
import { Card, CardContent, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormatDate } from "../../lib/Format";
import LeaveApplyResultChip from "../../components/LeaveApplyResultChip";

function LeaveHistoryItem(props: LeaveType) {
  return (
    <Card sx={{ minWidth: 275, width: "100%" }}>
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {props.desc}
        </Typography>
        <Typography sx={{ mb: 1.5, mt: 1 }} variant="body2" color="text.secondary">
          {FormatDate(props.date)}
        </Typography>
        <LeaveApplyResultChip result={ props.result }/>
      </CardContent>
    </Card>
  );
}

function LeaveHistory({ props }: { props: LeaveType[] }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: "100%",
        gap: 3,
        mb: 3,
      }}
    >
      {props.map((item, index) => {
        return <LeaveHistoryItem {...item} key={index} />;
      })}
    </Stack>
  );
}

export default LeaveHistory;
