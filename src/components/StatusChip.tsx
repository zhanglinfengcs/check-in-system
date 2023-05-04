import { Chip } from "@mui/material";
import { AttendSituation } from "../types";

function getLabel(status: AttendSituation) {
  switch (status) {
    case AttendSituation.Unchecked:
      return "未签到";
    case AttendSituation.Checked:
      return "已签到";
    default:
      return "请假";
  }
}

function getColor(status: AttendSituation) {
  switch (status) {
    case AttendSituation.Unchecked:
      return "error";
    case AttendSituation.Checked:
      return "success";
    default:
      return "info";
  }
}

const StatusChip: React.FC<{ status: AttendSituation }> = ({ status }) => {
  const label = getLabel(status);
  const color = getColor(status);

  return <Chip label={label} color={color} size="small" />;
};

export default StatusChip;
