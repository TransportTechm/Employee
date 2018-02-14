var mysql = require('mysql');

//start mysql connection
if (process.env.VCAP_SERVICES) {
    var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
    var url = vcap_services.cleardb[0].credentials.uri;
    mysqlSchema=vcap_services.cleardb[0].credentials.name;

    // mysql db Connection
    connection = mysql.createPool({
        host: vcap_services.cleardb[0].credentials.hostname,
        user: vcap_services.cleardb[0].credentials.username,
        password: vcap_services.cleardb[0].credentials.password,
        database: vcap_services.cleardb[0].credentials.name,
        connectionLimit: 4,
        queueLimit: 30,
        acquireTimeout: 10000
    });
}
else {
    // mysql db Connection
    connection = mysql.createPool({
        host: 'localhost',
		user: 'root',
        password: 'root',
        database: 'employee',
        connectionLimit: 4,
        rqueueLimit: 30,
        acquireTimeout: 10000
    });
}
//end mysql connection

module.exports=connection;