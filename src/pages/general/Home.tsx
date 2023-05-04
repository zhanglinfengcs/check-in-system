import { Camera } from "../../sections/home";
import Page from "../../components/Page";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import UnpublishedOutlinedIcon from "@mui/icons-material/UnpublishedOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { AttendSituation, UserType } from "../../types";
import useUser from "../../hooks/useUser";

const CheckedIcon = () => (
  <TaskAltOutlinedIcon sx={{ fill: "#15803d", width: 30, height: 30 }} />
);

const UncheckedIcon = () => (
  <UnpublishedOutlinedIcon sx={{ fill: "#b91c1c", width: 30, height: 30 }} />
);

const PauseIcon = () => (
  <PauseCircleOutlineOutlinedIcon
    sx={{ fill: "#374151", width: 30, height: 30 }}
  />
);

const Icon = (status: AttendSituation) => {
  switch (status) {
    case AttendSituation.Checked:
      return <CheckedIcon />;
    case AttendSituation.Unchecked:
      return <UncheckedIcon />
    default:
      return <PauseIcon />;
  }
}

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <Page title="Home">
      <div className="flex flex-row justify-start items-center gap-2">
        <h1 className="text-xl font-bold">今日状态: {user?.status === AttendSituation.Checked ? "已签到" : user?.status === AttendSituation.Unchecked ? "未签到" : "请假"}</h1>
        {Icon((user as UserType).status)}
      </div>
      <Camera />
    </Page>
  );
};

export default Home;
