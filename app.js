require('dotenv').config();
const express = require('express');
const app = express();

const userRouter = require('./api/users/user.router');
const levelRouter = require('./api/levels/level.router');
const semesterRouter = require('./api/semesters/semester.router');
const teacherRouter = require('./api/teachers/teacher.router');
const subjectRouter = require('./api/subjects/subject.router');
const studentRouter = require('./api/students/student.router');
const managerRouter = require('./api/managers/manager.router');

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/levels', levelRouter);
app.use('/api/semesters', semesterRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/students', studentRouter);
app.use('/api/managers', managerRouter);
// run server 
app.listen(process.env.APP_PORT, () => console.log('Server running on port', process.env.APP_PORT));