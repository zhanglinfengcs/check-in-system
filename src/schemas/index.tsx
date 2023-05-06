import * as yup from 'yup';

export const loginSchema = yup.object({
  userId: yup
    .string()
    .trim()
    .required('工号不能为空'),
  password: yup
    .string()
    .min(8, '密码长度在8-16位之间')
    .max(16, '密码长度在8-16位之间')
    .required('密码不能为空'),
})

export const addWorkerSchema = yup.object({
  userId: yup
    .string()
    .trim()
    .required('工号不能为空'),
  password: yup
    .string()
    .min(8, '密码长度在8-16位之间')
    .max(16, '密码长度在8-16位之间')
    .required('密码不能为空'),
  name: yup.string().required('姓名不能为空'),
});