require('dotenv').config();
const express = require('express');
const app = express();

const userRouter = require('./api/users/user.router');
const levelRouter = require('./api/levels/level.router');
const semesterRouter = require('./api/semesters/semester.router');
const teacherRouter = require('./api/teachers/teacher.router');
const subjectRouter = require('./api/subjects/subject.router');
const studentRouter = require('./api/students/student.router');

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/levels', levelRouter);
app.use('/api/semesters', semesterRouter);
app.use('/api/teachers', teacherRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/students', studentRouter);
// run server 
app.listen(process.env.APP_PORT, () => console.log('Sever running on port', process.env.APP_PORT));