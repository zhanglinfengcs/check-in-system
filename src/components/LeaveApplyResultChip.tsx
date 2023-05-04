import { Chip } from "@mui/material";
import { LeaveResult } from "../types";

function getLabel(result: LeaveResult) {
  switch (result) {
    case LeaveResult.Pending:
      return "待审核";
    case LeaveResult.Approved:
      return "已通过";
    default:
      return "未通过";
  }
}

function getColor(result: LeaveResult) {
  switch (result) {
    case LeaveResult.Rejected:
      return "error";
    case LeaveResult.Approved:
      return "success";
    default:
      return "info";
  }
}

const LeaveApplyResultChip: React.FC<{ result: LeaveResult }> = ({
  result,
}) => {
  const label = getLabel(result);
  const color = getColor(result);

  return <Chip label={label} color={color} size="small" />;
};

export default LeaveApplyResultChip;
