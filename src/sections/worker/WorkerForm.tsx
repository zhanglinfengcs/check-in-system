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
import { AttendSituation, Gender, IsStaff } from "../../types";
import IButton from "../../components/IButton";
import { useFormik } from "formik";
import { addWorkerSchema } from "../../schemas";

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

const WorkerForm: React.FC = () => {
  const reader = new FileReader();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    // const imageObj = URL.createObjectURL(files[0]);
    // setFieldValue('image', imageObj)
    reader.readAsDataURL(files[0]);
  };

  reader.onloadend = () => {
    setFieldValue('image', reader.result as string)
  }

  const onSubmit = () => {
    console.log(values)
  }

  const { values, setFieldValue, errors, touched, handleSubmit, handleChange } = useFormik({
    initialValues: {
      userId: "",
      name: "",
      password: "",
      phoneNum: "",
      gender: Gender.Male,
      isStaff: IsStaff.Yes,
      status: AttendSituation.Checked,
      // "/public/profile.jpeg"
      image: "",
    },
    validationSchema: addWorkerSchema,
    onSubmit,
  })

  return (
    <>
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
                onSubmit={handleSubmit}
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
                            label="工号"
                            name="userId"
                            onChange={handleChange}
                            value={values.userId}
                            error={touched.userId && Boolean(errors.userId)}
                            helperText={touched.userId && errors.userId}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="密码"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            error={touched.userId && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="姓名"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="电话号码"
                            name="phoneNum"
                            onChange={handleChange}
                            value={values.phoneNum}
                            error={touched.phoneNum && Boolean(errors.phoneNum)}
                            helperText={touched.phoneNum && errors.phoneNum}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="性别"
                            name="gender"
                            required
                            select
                            SelectProps={{ native: true }}
                            onChange={handleChange}
                            value={values.gender}
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
                            required
                            select
                            SelectProps={{ native: true }}
                            onChange={handleChange}
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
                    <IButton variant="contained" type="submit">
                      提交
                    </IButton>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default WorkerForm;