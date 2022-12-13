const { create, getStudentByStudentId, getStudents, updateStudent, deleteStudent,getStudentIdForLogin } = require('./student.service');
const { sign } = require('jsonwebtoken');
const pool = require('../../config/database');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

module.exports = {
    createStudent: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.phone = hashSync(body.phone, salt);
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
    getStudentByStudentId: (req, res) => {
        const student_id = req.params.student_id;
        getStudentByStudentId(student_id, (err, results) => {
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
    getStudents: (req, res) => {
        getStudents((err, result) => {
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
    updateStudent: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.phone = hashSync(body.phone, salt);
        updateStudent(body, (err, results) => {
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
    deleteStudent: (req, res) => {
        const data = req.body;
        deleteStudent(data, (err, results) => {
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
        getStudentIdForLogin(
            body.student_id, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: 'Invaild id or phone number'
                        });
                }     
                const result = compareSync(body.phone, results.phone);
                if (result) {
                    results.phone = undefined;
                    const jsonwebtoken = sign({result: results}, '123');
                    return res.json({
                        success: 1,
                        message: 'login successfuly',
                        token: jsonwebtoken
                    });
                } else {
                    return res.json({
                        success: 0,
                        data: 'Invaild id or  phone number'
                    });
                }
            }
        );
    }

};