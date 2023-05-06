import { LeaveType } from "../../types";
import { Card, CardContent, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormatDate } from "../../lib/Format";
import LeaveApplyResultChip from "../../components/LeaveApplyResultChip";

interface LeaveHistoryProps {
  leaveList: LeaveType[];
}

const LeaveHistory: React.FC<LeaveHistoryProps> = ({ leaveList }) => {
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
      {leaveList.map((item) => {
        return (
          <Card sx={{ minWidth: 275, width: "100%" }} key={item.leaveId}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{ mt: 2 }}>
                {item.desc}
              </Typography>
              <Typography
                sx={{ mb: 1.5, mt: 1 }}
                variant="body2"
                color="text.secondary"
              >
                {FormatDate(item.date)}
              </Typography>
              <LeaveApplyResultChip result={item.result} />
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default LeaveHistory;
