const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO registration(first_name,last_name,gender,email,pass,num) VALUES(?,?,?,?,?,?);',
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.pass,
                data.num,
            ],
            (err, result, fields) => {
                if(err) {
                    return  callBack(err);
                }
                return callBack(null, result);
            }           
        ); 
    },
    getUsers: callBack => {
        pool.query(
            'SELECT id, first_name, last_name, gender, email, num FROM registration',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            'SELECT id, first_name, last_name, gender, email, num FROM registration WHERE id = ?',
            [id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            'UPDATE registration SET first_name=?, last_name=?, gender=?, email=?, pass=?, num=? WHERE id=?',
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.pass,
                data.num,
                data.id,
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteUser: (data, callBack) => {
        pool.query(
            'DELETE FROM registration WHERE id = ?',
            [data.id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            'SELECT * FROM registration WHERE email = ?',
            [email],
            (err, results, fields) => {
                if (err) {
                    callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    }

};