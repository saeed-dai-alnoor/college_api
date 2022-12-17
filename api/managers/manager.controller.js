const { create, getManagers, getManagerByManagerId, updateManager, deleteManager, getManagerByManagerPhone } = require('./manager.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pool = require('../../config/database');


module.exports = {
    createManager: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
    getManagerByManagerId: (req, res) => {
        const manager_id = req.params.manager_id;
        getManagerByManagerId(manager_id, (err, results) => {
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
    getManagers: (req, res) => {
        getManagers((err, result) => {
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
    updateManager: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateManager(body, (err, results) => {
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
    deleteManager: (req, res) => {
        const data = req.body;
        deleteManager(data, (err, results) => {
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
    login: (req, res) => {
        const body = req.body;
        getManagerByManagerPhone(
            body.phone, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: 'Invaild phone number or password'
                        });
                }
                const result = compareSync(body.password, results.password);
                if (result) {
                    results.password = undefined;
                    const jsonwebtoken = sign({result: results}, '123');
                    return res.json({
                        success: 1,
                        message: 'login successfuly',
                        data:results,
                        token: jsonwebtoken
                    });
                } else {
                    return res.json({
                        success: 0,
                        data: 'Invaild phone number or password'
                    });
                }
            }
        );
    }

};