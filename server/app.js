const express = require('express')
const app = express()
const port = 8000

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: {
      name: 'Test express',
    }
  })
})

const { faker } = require('@faker-js/faker');
app.use(express.json())
app.post('/face/login/', (req, res) => {
  const admin = {
    userId: "1",
    name: "张三",
    password: "123456789",
    phoneNum: "123456789",
    gender: 0,
    isStaff: 1,
    status: 1,
  };
  
  const generalUser = {
    userId: "2",
    name: "张三",
    password: "123456789",
    phoneNum: "123456789",
    gender: 1,
    isStaff: 0,
    status: 0,
  }
  res.send({
    status: 200,
    msg: 'succeed',
    data: admin 
  })
  // const userId = req.body.userId;
  // console.log(userId)
  // if (userId === '1') {
  //   res.send({
  //     status: 200,
  //     msg: 'succeed',
  //     data: admin
  //   })
  // }
  // else if (userId === '2') {
  //   res.send({
  //     status: 200,
  //     msg: 'succeed',
  //     data: generalUser
  //   })
  // } else {
  //   res.send({
  //     status: 400,
  //     msg: 'failed',
  //     data: ""
  //   })
  // }
})

// Admin
// 考勤情况
app.get('/face/attend/findattend', (req, res) => {
  faker.locale = "zh_CN";

  function createCheckInRecord() {
    return {
      attendId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      name: faker.name.fullName(),
      date: faker.date.recent().getTime().toString(),
      status: faker.datatype.number({ min: 0, max: 2 }),
    };
  }

  const checkInRecordList = Array.from({ length: 200 }).map(() =>
    createCheckInRecord()
  );

  res.send({
    status: 200,
    msg: 'succeed',
    data: checkInRecordList
  })
})

app.get('/face/leave/findleave', (req, res) => {
  faker.locale = "zh_CN";

  function createApply() {
    return {
      leaveId: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      name: faker.name.fullName(),
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      date: faker.date.recent().getTime().toString(),
      result: faker.datatype.number({ min: 0, max: 2 }),
    };
}

  const leaveApplyList = Array.from({ length: 20 }).map(() => createApply());
  res.send({
    status: 200,
    msg: 'succeed',
    data: leaveApplyList
  })
})

const multer = require('multer');
var bodyParser = require('body-parser');
var upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// post: 修改请假申请(批准或拒绝)
app.post('/face/leave/editleave', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: req.body
  })
})

app.post('/face/leave/finduserleave', (req, res) => {
  function createLeave() {
    return {
      leaveId: faker.datatype.uuid(),
      title: faker.lorem.words(),
      desc: faker.lorem.paragraph(),
      date: faker.date.recent().getTime().toString(),
      result: faker.datatype.number({ min: 0, max: 2 }),
    };
  }
  
  const leaveHistoryList = Array.from({ length: 20 }).map(() => createLeave());
  res.send({
    status: 200,
    msg: 'succeed',
    data: leaveHistoryList
  })
})

app.post('/face/leave/addleave', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: "",
  })
})

app.post('/face/leave/editleave', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: "",
  })
})


app.get('/notice', (req, res) => {
  faker.locale = "zh_CN";

  function createNotice() {
    return {
      noticeId: faker.datatype.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.paragraph(),
      createdTime: faker.date.recent().getTime().toString(),
      editTime: faker.date.recent().getTime().toString(),
    };
  }

  const noticeList = Array.from({ length: 20 }).map(() => createNotice());
  res.send({
    status: 200,
    msg: 'succeed',
    data: noticeList 
  })
})

app.post('/notice', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

app.put('/notice', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

app.delete('/notice', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

// User Check in

// get today check in record 
app.get('/face/home', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})
// check in
app.post('/face/home', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

// Worker Management
app.get('/face/home/findalluser', (req, res) => {
  faker.locale = "zh_CN";

  function createUser() {
    return {
      userId: faker.datatype.uuid(),
      name: faker.name.fullName(),
      password: faker.phone.number().toString(),
      phoneNum: faker.phone.number().toString(),
      gender: faker.datatype.number({ min: 0, max: 1 }),
      isStaff: faker.datatype.number({ min: 0, max: 1 }),
      status: faker.datatype.number({ min: 0, max: 2 }),
    };
  }

  const workerList = Array.from({ length: 20 }).map(() => createUser());
  res.send({
    status: 200,
    msg: 'succeed',
    data: workerList
  })
})


app.post('/face/home/adduser', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

app.post('/face/home/edituser', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

app.post('/face/home/deluser', (req, res) => {
  res.send({
    status: 200,
    msg: 'succeed',
    data: ""
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})