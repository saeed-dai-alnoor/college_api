const { create, getSubjectBySubjectId, getSubjects, updateSubject, deleteSubject } = require('./subject.service');
const pool = require('../../config/database');


module.exports = {
    createSubject: (req, res) => {
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
        getSubjectBySubjectId: (req, res) => {
        const subject_id = req.params.subject_id;
            getSubjectBySubjectId(subject_id, (err, results) => {
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
    getSubjects: (req, res) => {
        getSubjects((err, result) => {
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
    updateSubject: (req, res) => {
        const body = req.body;
        updateSubject(body, (err, results) => {
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
    deleteSubject: (req, res) => {
        const data = req.body;
        deleteSubject(data, (err, results) => {
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