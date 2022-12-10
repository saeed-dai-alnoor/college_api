const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO teachers(teacher_id, name, phone, password) VALUES(?,?,?,?);',
            [
                data.teacher_id,
                data.name,
                data.phone,
                data.password
            ],
            (err, result, fields) => {
                if(err) {
                    return  callBack(err);
                }
                return callBack(null, result);
            }           
        ); 
    },
    getTeachers: callBack => {
        pool.query(
            'SELECT teacher_id, name, phone FROM teachers',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getTeacherByTeacherId: (teacher_id, callBack) => {
        pool.query(
            'SELECT teacher_id,  name, phone FROM teachers WHERE teacher_id = ?',
            [teacher_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateTeacher: (data, callBack) => {
        pool.query(
            'UPDATE teachers SET name=?, phone=?, password=? WHERE teacher_id = ?',
            [
                data.name,
                data.phone,
                data.password,
                data.teacher_id
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteTeacher: (data, callBack) => {
        pool.query(
            'DELETE FROM teachers WHERE teacher_id = ?',
            [data.teacher_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
    getTeacherByTeacherPhone: (phone, callBack) => {
        pool.query(
            'SELECT * FROM teachers WHERE phone = ?',
            [phone],
            (err, results, fields) => {
                if (err) {
                    callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    }

};