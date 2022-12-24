const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO semesters(semester_id, name, level_id) VALUES(?,?,?);',
            [
                data.semester_id,
                data.name,
                data.level_id
            ],
            (err, result, fields) => {
                if(err) {
                    return  callBack(err);
                }
                return callBack(null, result);
            }           
        ); 
    },
    getSemesters: callBack => {
        pool.query(
            'SELECT *  FROM semesters',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getSemesterBySemesterId: (data, callBack) => {
        pool.query(
            'SELECT subjects.name AS subject_name, teachers.name AS teacher_name, semesters.semester_id, level_id FROM subjects JOIN semesters ON semesters.semester_id = subjects.semester_id JOIN teachers ON teachers.teacher_id = subjects.teacher_id WHERE semesters.semester_id = ?',
            [data.semester_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }

        );
    },
    updateSemester: (data, callBack) => {
        pool.query(
            'UPDATE semesters SET  name=?, level_id=?  WHERE semester_id=?',
            [
                data.name,
                data.level_id,
                data.semester_id
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteSemester: (data, callBack) => {
        pool.query(
            'DELETE FROM semesters WHERE semester_id = ?',
            [data.semester_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
};