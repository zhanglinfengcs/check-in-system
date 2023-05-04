import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";

const user = {
  avatar: "/public/profile.jpeg",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

interface AccountProfileProps {
  disabled: boolean;
}

const AccountProfile: React.FC<AccountProfileProps> = ({ disabled }) => {
  return (
    <Card>
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
              height: 150,
              mb: 2,
              width: 150,
            }}
          />
          {/* <Typography gutterBottom variant="h5">
            {user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.city} {user.country}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" disabled={disabled}>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}

export default AccountProfile;
