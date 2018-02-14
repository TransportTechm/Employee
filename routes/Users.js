var express = require('express');
var router = express.Router();
var moment = require('moment');
var User = require('../models/Users');
var Register = require('../models/Register');

router.get('/login', function (req, res, next) {
    if(req.query.username && req.query.password){
        User.userAuthenticate(req.query.username, req.query.password, function(err, rows, fields){
            if(err) {
                console.error('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [Internal Server Error] - [Error:'+err.sqlMessage+']');
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            } else if(rows.length == 0) {
                console.error('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [Invalid User Credentials]');
                res.status(401);
                res.json({status:"fail", message: "Invalid User Credentials"});
            } else {
               // console.log('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [User logged in]');
                res.json({status:"success", data: rows});
            }
        })
    } else{
        res.status(400);
        console.error('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [Missing Parameters]');
        res.json({status:"fail", message: "Request is missing few parameters!"});
    }
});
/**
 * @swagger
 * definitions:
 *   Users:
 *     properties:
 *       emp_gid:
 *         type: integer
 *       first_name:
 *         type: string
 *       last_name:
 *         type: string
 *       email_id:
 *         type: string
 *       mobile:
 *         type: integer
 *       gender:
 *         type: string
 *       band:
 *         type: string
 *       user_name:
 *         type: string
 *       pass_word:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all Users
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Users
 *         schema:
 *           $ref: '#/definitions/Users'
 */
router.get('/', function (req, res, next) {
    User.getAllUsers(function (err, rows, fields) {
        if (err) {
            console.error('[Employee] - ['+req.path+'] - [getUserById] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500)
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            res.json({status:"success", data: rows});
        }
    });
});
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     description: Creates a new User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: Users object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Users'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/', function (req, res, next) {
    if(req.body){
        User.addUser(req.body, function (err, rows) {
            if (err) {
                console.error('[Employee] - ['+req.originalUrl+'] - [addUser] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']'
            );
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            } else {
                if(rows.affectedRows == 1){
                    res.status(200);
                    res.json({status:"success", data: {"insertId": rows.insertId}});

                }else{
                    res.status(500);
                    res.json({status:"fail", message: "Error while performing DB Query"});
                }
            }
        });
    }else{
        res.status(400);
        console.error('[Employee] - ['+req.originalUrl+'] - [addUser] - ['+req.method+'] - [Missing POST body]');
        res.json({status:"fail", message: "Request is missing POST body!"});
    }
});
router.get('/:EMP_GID', function (req, res, next) {
    if (req.params.EMP_GID) {
        User.getUserById(req.params.EMP_GID, function (err, rows, fields) {
            if (err) {
                console.error('[Employee] - ['+req.originalUrl+'] - [getUserById] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            } else {
                res.json({status:"success", data: rows});
            }
        });
    }
});
router.delete('/:EMP_GID', function (req, res, next) {
    User.deleteUser(req.params.EMP_GID, function (err, count) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [deleteUser] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            res.json({status:"success", data: "Data deleted successfully"});
        }
    });
});
router.put('/:EMP_GID', function (req, res, next) {
    User.updateUser(req.params.EMP_GID, req.body, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [updateUser] - ['+req.method+'] - [Error while performing Query]- [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            if(rows.affectedRows == 1) {
                res.status(200);
                res.json({status:"success", data: req.body});
            }else {   
                console.error('[Employee] - ['+req.originalUrl+'] - [updateUser] - ['+req.method+'] - [Error while performing Query]- [Error:'+rows.sqlMessage+']');
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            }
        }
    });
});
router.get('/:EMP_GID/permission', function (req, res, next) {
    User.getPermissionForUser(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getPermissionForUser] - ['+req.method+'] - [Error while performing Query]- [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            res.json({status:"success", data: rows});
        }
    });
});
router.post('/:EMP_GID/register/cab', function (req, res, next) {
    Register.createCabRegister(req.params.EMP_GID,req.body, function (err, count) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [createCabRegister] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            if(rows.affectedRows == 1){
                res.status(200);
                req.body["insertId"] = rows.insertId;
                res.json({status:"success", data: req.body});

            }else{
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            }
        }
    });
});
router.post('/:EMP_GID/register/bus', function (req, res, next) {
    Register.createBusRegister(req.params.EMP_GID,req.body, function (err, rows, fields) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [createBusRegister] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            if(rows.affectedRows == 1){
                res.status(200);
                req.body["insertId"] = rows.insertId;
                res.json({status:"success", data: req.body});

            }else{
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            }
        }
    });
});

router.put('/:EMP_GID/register/bus/:ID', function (req, res, next) {
    req.body.updated_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(req.body);
    Register.updateBusRegister(req.params.EMP_GID,req.params.ID,req.body, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [updateBusRegister] - ['+req.method+'] - [Error while performing Query]- [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else {
            if(rows.affectedRows == 1) {
                res.status(200);
                res.json({status:"success", data: req.body});
            }else {   
                console.error('[Employee] - ['+req.originalUrl+'] - [updateBusRegister] - ['+req.method+'] - [Error while performing Query] - [Error:'+rows.sqlMessage+']');
                res.status(500);
                res.json({status:"fail", message: "Error while performing DB Query"});
            }
        }
    });
});

router.get('/:EMP_GID/register/bus', function (req, res, next) {
    Register.getBusRegister(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegister] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        } else if(rows.length == 0) {
            res.json({status:"fail", message: "No result found"});
        } else {
            res.json({status:"success", data: rows});
        }
    });
});

router.get('/:EMP_GID/registercheckyear/:JID', function (req, res, next) {
    Register.getBusRegisterCheckyear(req.params.EMP_GID,req.params.JID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });
});
router.get('/:EMP_GID/registerchecksingle/:JID/:JDATE', function (req, res, next) {
    Register.getBusRegisterChecksingle(req.params.EMP_GID,req.params.JID,req.params.JDATE, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });
});
router.get('/:EMP_GID/journeys/year', function (req, res, next) {
    Register.getBusJourneysYear(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });
});

router.get('/:EMP_GID/journeys/single', function (req, res, next) {
    Register.getBusJourneysSingle(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });    
});

router.get('/:EMP_GID/journeys', function (req, res, next) {
    Register.getBusJourneys(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });
});
router.get('/:EMP_GID/journeys/active', function (req, res, next) {
    Register.getBusJourneys(req.params.EMP_GID, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: rows});
        }
    });
});
router.put('/:EMP_GID/journeys/cancel/:ID', function (req, res, next) {
    req.body.status=0;
    req.body.updated_date=moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    Register.canncelJourney(req.params.ID,req.body, function (err, rows) {
        if (err) {
            console.error('[Employee] - ['+req.originalUrl+'] - [getBusRegisterCheck] - ['+req.method+'] - [Error while performing Query] - [Error:'+err.sqlMessage+']');
            res.status(500);
            res.json({status:"fail", message: "Error while performing DB Query"});
        }else {
            res.json({status:"success", data: "Journey deleted successfully"});
        }
    });
});
module.exports = router;