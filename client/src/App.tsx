import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.tsx";
import UserProvider from "./contexts/UserProvider.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </LocalizationProvider>
  );
};

export default App;
