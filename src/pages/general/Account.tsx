import { Box, Container, Grid } from "@mui/material";
import Page from "../../components/Page";
import { AccountProfile, AccountProfileDetails } from "../../sections/account";

export default function Account() {
  return (
    <Page title="Account">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <AccountProfile />
            </Grid>
            <Grid item xs={12} md={6} lg={8} ml={8}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
