const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO subjects(subject_id, name, teacher_id, semester_id) VALUES(?,?,?,?);',
            [
                data.subject_id,
                data.name,
                data.teacher_id,
                data.semester_id
            ],
            (err, result, fields) => {
                if(err) {
                    return  callBack(err);
                }
                return callBack(null, result);
            }           
        ); 
    },
    getSubjects: callBack => {
        pool.query(
            'SELECT * FROM subjects',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getSubjectBySubjectId: (subject_id, callBack) => {
        pool.query(
            'SELECT * FROM subjects WHERE subject_id = ?',
            [subject_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateSubject: (data, callBack) => {
        pool.query(
            'UPDATE subjects SET  name=?, teacher_id=?, semester_id=?  WHERE subject_id=?',
            [
                data.name,
                data.teacher_id,
                data.semester_id,
                data.subject_id
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteSubject: (data, callBack) => {
        pool.query(
            'DELETE FROM subjects WHERE subject_id = ?',
            [data.subject_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
};