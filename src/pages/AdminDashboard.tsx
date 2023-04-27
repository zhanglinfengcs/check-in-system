import Page from "../components/Page";
import { SearchBar, CheckInRecordTable } from "../sections/dashboard";

const AdminDashboard = () => {
  return (
    <Page title="Dashboard">
      <SearchBar />
      <CheckInRecordTable />
    </Page>
  );
};

export default AdminDashboard;
