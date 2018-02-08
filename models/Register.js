var db = require('./dbconnection'); //reference of dbconnection.js  

var Register = {
    createCabRegister: function (id,Register, callback) {
        return db.query("Insert into tbl_register_employee_cab_details(service_type ,shift_type,project_type,project_id,area,pickup_point,full_address,geo_location_code,date_from,date_to,manager_id,status,tbl_user_emp_gid) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [Register.service_type ,Register.shift_type,Register.project_type,Register.project_id,Register.area,Register.pickup_point,Register.full_address,Register.geo_location_code,Register.date_from,Register.date_to,Register.manager_id,Register.status,id], callback);
    },
    createBusRegister: function (id,Register, callback) {
        return db.query("INSERT INTO tbl_register_employee_bus_details(route_no,origin,destination,departure_time,pick_up_point,journey_type,journey_date,tbl_user_emp_gid) VALUES (?,?,?,?,?,?,?,?)", [Register.route_no,Register.origin,Register.destination,Register.departure_time,Register.pick_up_point,Register.journey_type,Register.journey_date,id], callback);
    },
    getBusRegister: function (id, callback) {
        return db.query("SELECT * FROM tbl_register_employee_bus_details WHERE tbl_user_emp_gid=?", [id], callback);
    },
    updateBusRegister: function (id, Register, callback) {
        return db.query("UPDATE tbl_register_employee_bus_details SET route_no=?, origin=?, destination=?, departure_time=?, pick_up_point=?, journey_type=?, journey_date=?, status=? WHERE tbl_user_emp_gid=?", [Register.route_no,Register.origin,Register.destination,Register.departure_time,Register.pick_up_point,Register.journey_type,Register.journey_date,Register.status,id], callback);
    },
};

module.exports = Register;