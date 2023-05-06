import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Page from "../../components/Page";
import { useLocation } from "react-router-dom";
import { AttendSituation, Gender, IsStaff, UserType } from "../../types";
import IButton from "../../components/IButton";

const states = [
  {
    value: "staff",
    label: "员工",
  },
  {
    value: "admin",
    label: "管理员",
  },
];

const gender = [
  {
    value: Gender.Male,
    label: "男",
  },
  {
    value: Gender.Female,
    label: "女",
  },
];

export default function Account() {
  const location = useLocation();
  const disabled = getDisabled();

  function getDisabled() {
    if (location.pathname.includes("admin")) {
      return false;
    }
    return true;
  }

  const reader = new FileReader();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    // const imageObj = URL.createObjectURL(files[0]);
    // setValues((prevState) => ({
    //   ...prevState,
    //   image: imageObj,
    // }));

    reader.readAsDataURL(files[0]);
  };

  reader.onloadend = () => {
    setValues((prevState) => ({
      ...prevState,
      image: reader.result as string,
    }));
  };

  const [values, setValues] = useState<UserType>({
    userId: "00001",
    name: "Visser",
    password: "demo@devias.io",
    phoneNum: "123456789",
    gender: Gender.Male,
    isStaff: IsStaff.Yes,
    status: AttendSituation.Checked,
    // "/public/profile.jpeg"
    image: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <Page title="账户">
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
                      src={values.image}
                      sx={{
                        height: 150,
                        mb: 2,
                        width: 150,
                      }}
                    />
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "100%",
                      color: "white",
                      fontSize: 18,
                      backgroundColor: "#4f46e5",
                      ":hover": {
                        backgroundColor: "#3730a3",
                      },
                    }}
                    disabled={disabled}
                  >
                    上传照片
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(e) => handleUploadImage(e)}
                    />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={8} ml={8}>
              <form
                autoComplete="off"
                noValidate
                onSubmit={(e) => handleSubmit(e)}
              >
                <Card
                  sx={{
                    p: 2,
                  }}
                >
                  <CardHeader title="个人资料" />
                  <CardContent sx={{ pt: 2 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            helperText="工号不可更改"
                            label="工号"
                            name="userId"
                            onChange={(e) => handleChange(e)}
                            required
                            value={values.userId}
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="密码"
                            name="password"
                            onChange={handleChange}
                            required
                            type="password"
                            value={values.password}
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="姓名"
                            name="name"
                            onChange={handleChange}
                            required
                            value={values.name}
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="电话号码"
                            name="phoneNum"
                            onChange={handleChange}
                            value={values.phoneNum}
                            disabled={disabled}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="性别"
                            name="gender"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.gender}
                            disabled={disabled}
                          >
                            {gender.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="职位"
                            name="isStaff"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={values.isStaff}
                            disabled
                          >
                            {states.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IButton
                      variant="contained"
                      disabled={disabled}
                      type="submit"
                    >
                      提交
                    </IButton>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
