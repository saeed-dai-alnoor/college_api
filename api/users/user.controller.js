const { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pool = require('../../config/database');


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.pass = hashSync(body.pass, salt);
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
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
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
    getUsers: (req, res) => {
        getUsers((err, result) => {
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
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.pass = hashSync(body.pass, salt);
        updateUser(body, (err, results) => {
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
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
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
        getUserByUserEmail(
            body.email, (err, results) => {
                if (err) {
                    console.log(err);
                }
                if (!results) {
                    return res.json({
                        success: 0,
                        data: 'Invaild email or password'
                        });
                }
                const result = compareSync(body.pass, results.pass);
                if (result) {
                    results.pass = undefined;
                    const jsonwebtoken = sign({result: results}, '123', {expiresIn: '1h'});
                    return res.json({
                        success: 1,
                        message: 'login successfuly',
                        token: jsonwebtoken
                    });
                } else {
                    return res.json({
                        success: 0,
                        data: 'Invaild email or password'
                    });
                }
            }
        );
    }

};