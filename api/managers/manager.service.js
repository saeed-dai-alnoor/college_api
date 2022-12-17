const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO managers(manager_id, name, phone, password) VALUES(?,?,?,?);',
            [
                data.manager_id,
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
    getManagers: callBack => {
        pool.query(
            'SELECT manager_id, name, phone FROM managers',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getManagerByManagerId: (manager_id, callBack) => {
        pool.query(
            'SELECT manager_id,  name, phone FROM managers WHERE manager_id = ?',
            [manager_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateManager: (data, callBack) => {
        pool.query(
            'UPDATE managers SET name=?, phone=?, password=? WHERE manager_id = ?',
            [
                data.name,
                data.phone,
                data.password,
                data.manager_id
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteManager: (data, callBack) => {
        pool.query(
            'DELETE FROM managers WHERE manager_id = ?',
            [data.manager_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    },
    getManagerByManagerPhone: (phone, callBack) => {
        pool.query(
            'SELECT * FROM managers WHERE phone = ?',
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