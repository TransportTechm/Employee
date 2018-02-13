var db = require('./dbconnection'); //reference of dbconnection.js  

var User = {  
    getAllUsers: function(callback) {  
        return db.query("select emp_gid,first_name,last_name,email_id,mobile_id as mobile,gender,band,user_name from tbl_user", callback);  
    },  
    getUserById: function(id, callback) {  
        return db.query("select emp_gid,first_name,last_name,email_id,mobile_id as mobile,gender,band,user_name from tbl_user where emp_gid=?", [id], callback);  
    },  
    addUser: function(User, callback) {  
        return db.query("Insert into tbl_user values(?,?,?,?,?,?,?,?,?)", [User.emp_gid,User.first_name,User.last_name,User.email_id,User.mobile_id,User.gender,User.band,User.user_name,User.pass_word], callback);  
    },  
    updateUser: function(id, User, callback) {  
        return db.query("UPDATE tbl_user SET first_name = ?,last_name = ?, email_id = ?, mobile_id = ?, gender = ?, band = ? where emp_gid = ?", [User.first_name,User.last_name,User.email_id,User.mobile_id,User.gender,User.band,id], callback);  
    },
    deleteUser: function(id, callback) {  
        return db.query("delete from tbl_user where emp_gid=?", [id], callback);  
    }, 
    getAllPermissions: function(callback) {  
        return db.query("SELECT permission.id, permission.tbl_user_emp_gid,Role.role_name FROM tbl_user_role permission INNER JOIN tbl_role Role on permission.tbl_role_id=Role.id", callback);  
    },  
    getPermissionById: function(id, callback) {  
        return db.query("SELECT permission.id, permission.tbl_user_emp_gid,Role.role_name FROM tbl_user_role permission INNER JOIN tbl_role Role on permission.tbl_role_id=Role.id where permission.id=?", [id], callback);  
    },  
    addPermission: function(Permission, callback) {  
        return db.query("Insert into tbl_user_role (tbl_user_emp_gid,tbl_role_id) values(?,?)", [Permission.tbl_user_emp_gid,Permission.tbl_role_id], callback);  
    },  
    updatePermission: function(id, Permission, callback) {  
        return db.query("UPDATE tbl_user_role SET tbl_user_emp_gid = ?,tbl_role_id = ? where id = ?", [Permission.tbl_user_emp_gid,Permission.tbl_role_id,id], callback);  
    },
    deletePermission: function(id, callback) {  
        return db.query("delete from tbl_user_role where id=?", [id], callback);  
    }, 
    getPermissionForUser: function(id, callback) {  
        return db.query("SELECT permission.id, permission.tbl_user_emp_gid,Role.role_name FROM tbl_user_role permission INNER JOIN tbl_role Role on permission.tbl_role_id=Role.id where permission.tbl_user_emp_gid=?", [id], callback);  
    },
    userAuthenticate: function(username, password, callback) {  
        return db.query("select user.emp_gid,user.gender,user.mobile_id,user.first_name, user.last_name, role.role_name from tbl_user user INNER JOIN tbl_user_role permission ON user.emp_gid=permission.tbl_user_emp_gid INNER JOIN tbl_role role ON role.id=permission.tbl_role_id WHERE user.user_name=? AND user.pass_word=?", [username, password], callback);  
    }, 
};  

module.exports = User;