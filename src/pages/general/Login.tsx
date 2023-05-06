import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IButton from "../../components/IButton";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";

const theme = createTheme();

const Login: React.FC = () => {
  const onSubmit = () => {
    console.log("submit");
    setErrors({ userId: "工号不存在" });
  };

  const { values, errors, setErrors, touched, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        userId: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="工号"
              id="userId"
              name="userId"
              autoComplete="userId"
              autoFocus
              value={values.userId}
              onChange={handleChange}
              error={touched.userId && Boolean(errors.userId)}
              helperText={touched.userId && errors.userId}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <IButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "100%" }}
            >
              登录
            </IButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
