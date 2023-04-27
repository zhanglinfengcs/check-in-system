import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.tsx";
import UserProvider from "./contexts/UserProvider.tsx";

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
