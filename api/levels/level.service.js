const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            'INSERT INTO levels(level_id, name) VALUES(?,?);',
            [
                data.level_id,
                data.name
            ],
            (err, result, fields) => {
                if(err) {
                    return  callBack(err);
                }
                return callBack(null, result);
            }           
        );
    },
    getLevels: callBack => {
        pool.query(
            'SELECT level_id, name FROM levels',
            [],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    getLevelByLevelId: (level_id, callBack) => {
        pool.query(
            'SELECT level_id, name FROM registration WHERE level_id = ?',
            [level_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }

        );
    },
    updateLevel: (data, callBack) => {
        pool.query(
            'UPDATE levels SET level_id=?, name=? WHERE level_id = ?',
            [
                data.level_id,
                data.name
            ],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                return callBack(null, results);
            },

        );
    },
    deleteLevel: (data, callBack) => {
        pool.query(
            'DELETE FROM levels WHERE level_id = ?',
            [data.level_id],
            (err, results, fields) => {
                if(err) {
                    return callBack(err);
                }
                
                return callBack(null, results);
            }
        );
    }
};