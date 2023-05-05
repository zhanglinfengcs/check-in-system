import { Chip } from "@mui/material";
import { LeaveApplyResult } from "../types";

function getLabel(result: LeaveApplyResult) {
  switch (result) {
    case LeaveApplyResult.Pending:
      return "待审核";
    case LeaveApplyResult.Approved:
      return "已通过";
    default:
      return "未通过";
  }
}

function getColor(result: LeaveApplyResult) {
  switch (result) {
    case LeaveApplyResult.Rejected:
      return "error";
    case LeaveApplyResult.Approved:
      return "success";
    default:
      return "info";
  }
}

const LeaveApplyResultChip: React.FC<{ result: LeaveApplyResult }> = ({
  result,
}) => {
  const label = getLabel(result);
  const color = getColor(result);

  return <Chip label={label} color={color} size="small" />;
};

export default LeaveApplyResultChip;
