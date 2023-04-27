import { Button, styled } from "@mui/material";

const IButton = styled(Button)(() => ({
  width: 128,
  color: "white",
  fontSize: 18,
  backgroundColor: "#4f46e5",
  ":hover": {
    backgroundColor: "#3730a3",
  },
}));

export default IButton;
