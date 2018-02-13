var express = require('express');
var router = express.Router();

var User = require('../models/Users');
var Register = require('../models/Register');

router.get('/login', function (req, res, next) {
    if(req.query.username && req.query.password){
        User.userAuthenticate(req.query.username, req.query.password, function(err, rows, fields){
            if(err) {
                console.error('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [Internal Server Error]');
                res.status(500);
                res.render('error', { error: err });
            } else if(rows.length == 0) {
                console.error('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [Invalid User Credentials]');
                res.status(401);
                res.json({status:"fail", message: "Invalid User Credentials"});
            } else {
                console.log('[Employee] - ['+req.path+'] - [userAuthenticate] - ['+req.method+'] - [User logged in]');
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
            console.error('[Employee] - ['+req.path+'] - [getUserById] - ['+req.method+'] - [Error while performing Query]');
            res.status(500)
            res.render('error', { error: err });
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
        User.addUser(req.body, function (err, count) {
            if (err) {
                console.log("Inside");
                console.error('[Employee] - ['+req.path+'] - [addUser] - ['+req.method+'] - [Error while performing Query]');
                res.status(500);
                //res.render('error', { error: err });
            } else {
                res.json(req.body); //or return count for 1 & 0  
            }
        });
    }else{
        res.status(400);
        console.error('[Employee] - ['+req.path+'] - [addUser] - ['+req.method+'] - [Missing POST body]');
        res.json({status:"fail", message: "Request is missing POST body!"});
    }
});
router.get('/:EMP_GID', function (req, res, next) {
    if (req.params.EMP_GID) {
        User.getUserById(req.params.EMP_GID, function (err, rows, fields) {
            if (err) {
                console.error('[Employee] - ['+req.path+'] - [getUserById] - ['+req.method+'] - [Error while performing Query]');
                res.status(500);
                res.render('error', { error: err });
            } else {
                res.json({status:"success", data: rows});
            }
        });
    }
});
router.delete('/:EMP_GID', function (req, res, next) {
    User.deleteUser(req.params.EMP_GID, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.put('/:EMP_GID', function (req, res, next) {
    User.updateUser(req.params.EMP_GID, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});
router.get('/:EMP_GID/permission', function (req, res, next) {
    User.getPermissionForUser(req.params.EMP_GID, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.post('/:EMP_GID/register/cab', function (req, res, next) {
    Register.createCabRegister(req.params.EMP_GID,req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.post('/:EMP_GID/register/bus', function (req, res, next) {
    Register.createBusRegister(req.params.EMP_GID,req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.put('/:EMP_GID/register/bus/:ID', function (req, res, next) {
    Register.updateBusRegister(req.params.EMP_GID,req.params.ID,req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else if(rows.length == 0) {
            res.json("No Update Done");
        } else {
            res.json(rows);
        }
    });
});
router.get('/:EMP_GID/register/bus', function (req, res, next) {
    Register.getBusRegister(req.params.EMP_GID, function (err, rows) {
        if (err) {
            res.json(err);
        } else if(rows.length == 0) {
            res.json("No result found");
        } else {
            res.json(rows);
        }
    });
});
router.get('/:EMP_GID/registercheck', function (req, res, next) {
    Register.getBusRegisterCheck(req.params.EMP_GID, function (err, rows) {
        if (err) {
            res.json(err);
        } else if(rows.length == 0) {
            res.json("No result found");
        } else {
            res.json(rows);
        }
    });
});
module.exports = router;