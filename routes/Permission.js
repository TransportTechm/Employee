var express = require('express');
var router = express.Router();

var User = require('../models/Users');

router.get('/:PERMISSION_ID?', function (req, res, next) {
    if (req.params.PERMISSION_ID) {
        User.getPermissionById(req.params.PERMISSION_ID, function (err, rows, fields) {
            if (err) {
                console.log('Error while performing Query.');
                res.status(500)
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    } else {
        User.getAllPermissions(function (err, rows, fields) {
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
    User.addPermission(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //or return count for 1 & 0  
        }
    });
});
router.delete('/:PERMISSION_ID', function (req, res, next) {
    User.deletePermission(req.params.PERMISSION_ID, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});
router.put('/:PERMISSION_ID', function (req, res, next) {
    User.updatePermission(req.params.PERMISSION_ID, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});


module.exports = router;