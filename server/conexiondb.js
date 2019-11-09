const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());

/*--------------------------------*\
| Para que los require funcionen   |
| se debe de instalar con:         |
| npm install express mysql cors   |
| se corre con: node conexiondb.js |
\*--------------------------------*/

/*ip y puerto donde correra el sevidor nodejs*/
const ip = "127.0.0.1";
const port = 3000;

/*conexion con la base de datos mysql*/
var conn = mysql.createConnection({
    host: "35.222.47.15",
    port: "3306",
    user: "root",
    password: "root",
    database: "p34"
});

/*#############################################-URL-################################################*/


/*#############################-VER SALDO-#############################*/
app.get('/versaldo/', function (req, res) {
    var c_act = req.query.act;
    //obtener el saldoact,nombre,apellido de la cuenta logueada
    var sql = "SELECT saldoini,nombre,apellido FROM cuenta WHERE nocuenta = "+c_act+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devuelve la informacion
    });
});


/*#############################-TRANSFERENCIA-#############################*/
//buscar cuenta a la que se transferira
app.get('/buscarcuenta/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT dpi FROM cuenta WHERE nocuenta="+ext+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

//aumentar saldo a la cuenta externa
app.get('/transferir1/', function (req, res) {
    var ext = req.query.ext;
    var monto = req.query.monto;
    var sql = "UPDATE cuenta SET saldoini = (saldoini + "+monto+") WHERE nocuenta="+ext+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Correcto");//se logro aumentar saldo de cuenta externa
    });
});

//restar el saldo a la cuenta logueada
app.get('/transferir2/', function (req, res) {
    var act = req.query.act;
    var monto = req.query.monto;
    var sql = "UPDATE cuenta SET saldoini = (saldoini - "+monto+") WHERE nocuenta="+act+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Correcto");//se logro restar el saldo de la cuenta logueada
    });
});

/*#############################-VER PERFIL-#############################*/

app.get('/verperfil/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT * FROM cuenta WHERE nocuenta="+ext+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

/*#############################-LOGIN_REGISTRO-#############################*/

app.get('/buscarcorreo/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT correo FROM cuenta WHERE correo='"+ext+"';";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

app.get('/buscardpi/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT dpi FROM cuenta WHERE dpi="+ext+";";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

app.get('/insertarnuevacuenta/', function (req, res) {
    var dpi = req.query.dpi;
    var nombre = req.query.nombre;
    var apellido = req.query.apellido;
    var correo = req.query.correo;
    var contra = req.query.contra;
    var sql = "INSERT INTO cuenta(nombre,apellido,dpi,correo,contra,saldoini) VALUES('"+nombre+"','"+apellido+"',"+dpi+",'"+correo+"','"+contra+"',0.00);";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Correcto");//se logro restar el saldo de la cuenta logueada
    });
});

app.get('/buscarcuentaporcorreo/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT nocuenta FROM cuenta WHERE correo='"+ext+"';";
    //console.log(sql)
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});


app.get('/buscarpassword/', function (req, res) {
    var ext = req.query.ext;
    var sql = "SELECT contra FROM cuenta WHERE correo='"+ext+"';";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);//devolvemos que si encontro por lo menos 1
    });
});

/*#################################################################################################*/
app.listen(port,ip, () => {
    console.log('Se escucha en el puerto: %d y con la ip: %s',port,ip);
});
