import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Paper
} from "@mui/material";
import { UserType } from "../../types";

interface WorkerDetailsProps {
  props: UserType;
}

const user = {
  avatar: "/public/profile.jpeg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

const WorkerDetails: React.FC<WorkerDetailsProps> = ({props}) => {
  return (
    <Box 
      sx={{
        width: "100%",
      }}
    >
      <Card
        sx={{
          width: "30%",
        }} 
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {user.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant="text" disabled>
            Upload picture
          </Button>
        </CardActions>
      </Card>

    </Box>
  )
}

export default WorkerDetails;