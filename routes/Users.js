var express = require('express');
var router = express.Router();

var User = require('../models/Users');
var Register = require('../models/Register');

router.get('/:EMP_GID?', function (req, res, next) {
    if (req.params.EMP_GID) {
        User.getUserById(req.params.EMP_GID, function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.');
                res.status(500)
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        User.getAllUsers(function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.');
                res.status(500)
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }
});
router.post('/', function (req, res, next) {
    User.addUser(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0  
        }
    });
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
module.exports = router;