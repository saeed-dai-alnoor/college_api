const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO students(student_id, name, phone, level_id) VALUES(?,?,?,?);',
            [
                data.student_id,
                data.name,
                data.phone,
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
    getStudents: callBack => {
        pool.query(
            'SELECT student_id, name, level_id FROM students',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getStudentByStudentId: (student_id, callBack) => {
        pool.query(
            'SELECT student_id, name, level_id FROM students WHERE student_id = ?',
            [student_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateStudent: (data, callBack) => {
        pool.query(
            'UPDATE students SET name=?, phone=?, level_id=? WHERE student_id = ?',
            [
                data.name,
                data.phone,
                data.level_id,
                data.student_id
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteStudent: (data, callBack) => {
        pool.query(
            'DELETE FROM students WHERE student_id = ?',
            [data.student_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
    getStudentIdForLogin: (student_id, callBack) => {
        pool.query(
            'SELECT * FROM students WHERE student_id = ?',
            [student_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },

};