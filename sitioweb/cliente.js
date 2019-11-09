const express=require('express');
const app=express();

/*-----------------------------*\
| Para que el require funcionen |
| se debe de instalar con:      |
| npm install express           |
| se corre con: node cliente.js |
\*-----------------------------*/

/*ip y puerto donde correra el cliente nodejs*/
const ip = "127.0.0.1";
const port = 8888;

/*jalamos todos los estaticos*/
app.use(express.static(__dirname + '/'));

app.listen(port,ip, () => {
    console.log('Se escucha en el puerto: %d y con la ip: %s',port,ip);
});