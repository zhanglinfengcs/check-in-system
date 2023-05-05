import { Box, Container, Grid } from "@mui/material";
import Page from "../../components/Page";
import { AccountProfile, AccountProfileDetails } from "../../sections/account";
import { useLocation } from "react-router-dom";



export default function Account() {
  const location = useLocation();
  const disabled = getDisabled();

  function getDisabled() {
    if (location.pathname.includes("admin")) {
      return false;
    }
    return true
  }

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
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <AccountProfile disabled={disabled}/>
            </Grid>
            <Grid item xs={12} md={6} lg={8} ml={8}>
              <AccountProfileDetails disabled={disabled}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
