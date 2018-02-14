var db = require('./dbconnection'); //reference of dbconnection.js  

var Register = {
    createCabRegister: function (id, Register, callback) {
        return db.query("Insert into tbl_register_employee_cab_details(service_type ,shift_type,project_type,project_id,area,pickup_point,full_address,geo_location_code,date_from,date_to,manager_id,status,tbl_user_emp_gid) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [Register.service_type, Register.shift_type, Register.project_type, Register.project_id, Register.area, Register.pickup_point, Register.full_address, Register.geo_location_code, Register.date_from, Register.date_to, Register.manager_id, Register.status, id], callback);
    },
    createBusRegister: function (id, Register, callback) {
        return db.query("INSERT INTO tbl_register_employee_bus_details(route_no,origin,destination,departure_time,pick_up_point,journey_type,journey_date,tbl_user_emp_gid) VALUES (?,?,?,?,?,?,?,?)", [Register.route_no, Register.origin, Register.destination, Register.departure_time, Register.pick_up_point, Register.journey_type, Register.journey_date, id], callback);
    },
    getBusRegister: function (id, callback) {
        return db.query("SELECT * FROM tbl_register_employee_bus_details WHERE tbl_user_emp_gid=?", [id], callback);
    },
    getBusRegisterCheckyear: function (id,jid, callback) {
        return db.query("SELECT id FROM tbl_register_employee_bus_details WHERE tbl_user_emp_gid=? AND status=1", [id],callback);
    },
    getBusRegisterChecksingle: function (id,jid,jdate, callback) {
        return db.query("SELECT id FROM tbl_register_employee_bus_details WHERE tbl_user_emp_gid=? AND journey_date=?", [id,jdate],callback);
    },
    updateBusRegister: function ( gid, id ,Register,callback) {
        return db.query("UPDATE tbl_register_employee_bus_details SET route_no=?, origin=?, destination=?, departure_time=?, pick_up_point=?, journey_type=?, journey_date=?,updated_date=? WHERE tbl_user_emp_gid=? and id=?", [Register.route_no, Register.origin, Register.destination, Register.departure_time, Register.pick_up_point, Register.journey_type, Register.journey_date,Register.updated_date, gid, id], callback);
    },
    getBusJourneysYear: function (id, callback) {
        return db.query("SELECT user.emp_gid as gid, concat(user.first_name,' ',user.last_name) AS name, \
                         empbus.route_no, empbus.origin, empbus.destination,empbus.pick_up_point, \
                         empbus.created_date, empbus.updated_date, empbus.journey_type, \
                         empbus.status FROM employee.tbl_register_employee_bus_details AS empbus \
                         INNER JOIN employee.tbl_user AS user ON empbus.tbl_user_emp_gid = user.emp_gid \
                         WHERE empbus.journey_type='Year' AND user.emp_gid=?", [id], callback);
    },
    getBusJourneysSingle: function (id, callback) {
        return db.query("SELECT user.emp_gid as gid, concat(user.first_name,' ',user.last_name) AS name, \
                         empbus.route_no, empbus.origin, empbus.destination,empbus.pick_up_point, \
                         empbus.created_date, empbus.journey_date, empbus.journey_type, \
                         empbus.status FROM employee.tbl_register_employee_bus_details AS empbus \
                         INNER JOIN employee.tbl_user AS user ON empbus.tbl_user_emp_gid = user.emp_gid \
                         WHERE empbus.journey_type='Single' AND user.emp_gid=?", [id], callback);
    },
    getBusJourneys: function (id, callback) {
        return db.query("SELECT user.emp_gid as gid, concat(user.first_name,' ',user.last_name) AS name, \
                         empbus.route_no, empbus.origin, empbus.destination,empbus.pick_up_point, empbus.id, \
                         empbus.created_date, empbus.journey_type, \
                         empbus.status FROM employee.tbl_register_employee_bus_details AS empbus \
                         INNER JOIN employee.tbl_user AS user ON empbus.tbl_user_emp_gid = user.emp_gid \
                         WHERE empbus.status=1 AND user.emp_gid=?", [id], callback);
    },
    canncelJourney: function (gid, id,Register, callback) {
        return db.query("UPDATE employee.tbl_register_employee_bus_details AS empbus SET empbus.status=?,empbus.updated_date=? WHERE empbus.tbl_user_emp_gid=? and empbus.id=?;", [Register.status,Register.updated_date,gid,id], callback);
    },
};

module.exports = Register;