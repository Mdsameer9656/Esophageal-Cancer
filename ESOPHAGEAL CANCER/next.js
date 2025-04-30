
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'dbms_project',
    user: 'root',
    password: '',
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting:' + err.stack);
        return;
    }

    console.log('Connected as id' + connection.threadId);
});
