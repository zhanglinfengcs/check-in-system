import { Chip } from "@mui/material";
import { UserStatus } from "../types";

function getLabel(status: UserStatus) {
  switch (status) {
    case UserStatus.Unchecked:
      return "未签到";
    case UserStatus.Checked:
      return "已签到";
    default:
      return "请假";
  }
}

function getColor(status: UserStatus) {
  switch (status) {
    case UserStatus.Unchecked:
      return "error";
    case UserStatus.Checked:
      return "success";
    default:
      return "info";
  }
}

const StatusChip: React.FC<{ status: UserStatus }> = ({ status }) => {
  const label = getLabel(status);
  const color = getColor(status);

  return <Chip label={label} color={color} size="small" />;
};

export default StatusChip;
