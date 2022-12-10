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
            'SELECT semester_id, name, level_id FROM semesters',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getSemesterBySemesterId: (semester_id, callBack) => {
        pool.query(
            'SELECT semester_id, name, level_id FROM semesters WHERE semester_id = ?',
            [semester_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
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