import { useCallback, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import IButton from "../../components/IButton";
import { AttendSituation, Gender, IsStaff, UserType } from "../../types";

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

interface AccountProfileDetailsProps {
  disabled: boolean;
}

const AccountProfileDetails: React.FC<AccountProfileDetailsProps> = ({ disabled }) => {
  const [values, setValues] = useState<UserType>({
    userId: '00001',
    name: "Visser",
    password: "demo@devias.io",
    phoneNum: "123456789",
    gender: Gender.Male,
    isStaff: IsStaff.Yes,
    status: AttendSituation.Checked,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)}>
      <Card
        sx={{
          p: 2,
        }}
      >
        <CardHeader title="个人资料" />
        <CardContent sx={{ pt: 2 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
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
              <Grid xs={12} md={6}>
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
              <Grid xs={12} md={6}>
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
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="电话号码"
                  name="phoneNum"
                  onChange={handleChange}
                  value={values.phoneNum}
                  disabled={disabled}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="性别"
                  name="gender"
                  onChange={handleChange}
                  required
                  value={values.gender}
                  disabled={disabled}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="是否为员工"
                  name="isStaff"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.isStaff}
                  disabled={disabled}
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
          <IButton variant="contained" disabled={disabled}>
            提交
          </IButton>
        </CardActions>
      </Card>
    </form>
  );
}

export default AccountProfileDetails;
