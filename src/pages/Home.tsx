import {  Camera } from "../sections/home";
import Page from "../components/Page";
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';

const CheckedIcon = () => (
  <TaskAltOutlinedIcon sx={{ fill: '#15803d', width: 30, height: 30 }}/>
)

const UncheckedIcon = () => ( 
  < UnpublishedOutlinedIcon sx={{ fill: '#b91c1c', width: 30, height: 30 }} />
)

const PauseIcon = () => ( 
  < PauseCircleOutlineOutlinedIcon sx={{ fill: '#374151', width: 30, height: 30 }} />
)

const Home: React.FC = () => {
  return (
    <Page title="Home">
      <div className="flex flex-row justify-start items-center gap-2">
        <h1 className="text-xl font-bold">
          今日状态: {"已签到"}
        </h1>
        {
          <CheckedIcon />
        } 
      </div>
      <Camera /> 
    </Page>
  )
};

export default Home;
