const { create, getTeachers, getTeacherByTeacherId, updateTeacher, deleteTeacher, getTeacherByTeacherPhone } = require('./teacher.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pool = require('../../config/database');


module.exports = {
    createTeacher: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: result
            });
        });
    },
    getTeacherByTeacherId: (req, res) => {
        const teacher_id = req.params.teacher_id;
        getTeacherByTeacherId(teacher_id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found' 
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        });
    },
    getTeachers: (req, res) => {
        getTeachers((err, result) => {
            if(err) {
                console.log(err);
                return err;
            }
            return res.json({
                success: 1,
                data: result
            });
        });
    },
    updateTeacher: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateTeacher(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Failed to update user'
                });
            }
            return res.json({
                success: 1,
                data: 'Updated successfully'
            });
        });

    },
    deleteTeacher: (req, res) => {
        const data = req.body;
        deleteTeacher(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                message: 'User deleted successfully'
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getTeacherByTeacherPhone(
            body.phone, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: 'Invaild phone number or password'
                        });
                }
                const result = compareSync(body.password, results.password);
                if (result) {
                    results.password = undefined;
                    const jsonwebtoken = sign({result: results}, '123');
                    return res.json({
                        success: 1,
                        message: 'login successfuly',
                        data:results,
                        token: jsonwebtoken
                    });
                } else {
                    return res.json({
                        success: 0,
                        data: 'Invaild phone number or password'
                    });
                }
            }
        );
    }

};