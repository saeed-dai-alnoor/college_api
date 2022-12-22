const { create, getSemesters, getSemesterBySemesterId, updateSemester, deleteSemester  } = require('./semester.service');
const pool = require('../../config/database');


module.exports = {
    createSemester: (req, res) => {
        const body = req.body;
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
    getSemesterBySemesterId: (req, res) => {
        const data = req.body;
        getSemesterBySemesterId(data, (err, results) => {
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
    getSemesters: (req, res) => {
        getSemesters((err, result) => {
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
    updateSemester: (req, res) => {
        const body = req.body;
        updateSemester(body, (err, results) => {
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
    deleteSemester: (req, res) => {
        const data = req.body;
        deleteSemester(data, (err, results) => {
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
};