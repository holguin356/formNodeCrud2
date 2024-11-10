//express para el servidor
const express = require('express');
//importar mysql para la base de datos
const mysql = require('mysql2');
//body-parser para manejar datos de formulario
const bodyParser = require('body-parser');
//instanciamos express
const app = express();
//define el puerto
const PORT = 3000;

//configurar el body-parser para procesar datos enviados por el formulario
app.use(bodyParser.urlencoded({extended: false}));

//configura la conexion con mysql
const db = mysql.createConnection({
    host: 'localhost', //cambia si se tiene otra configuracion
    user: 'root', // usuario de mysql
    password: '', //contraseña
    database: 'notas_db' //base de datos nombre
});

//conectar la base de datos
db.connect((err) => {
    if(err) throw err;
    console.log('Conexiona base de datos... Exitosa');
});
//configuro la carpeta public para los archivos static
app.use(express.static('public'));

app.post('/insertar', (req,res) => {
    const {nombre, descripcion} = req.body;
    const sql = 'INSERT INTO notas (nombre, descripcion) VALUES (?, ?)';
    const values = [nombre, descripcion];

    db.query(sql, values, (err, result) => {
        if(err){
            console.error('Error al insertar los datos', err);
            return res.status(500).send("error al insertar la nota");
        }
        console.log('Nota insertada con exito:', result);
        res.send('Nota guardada con exito');
    })
})
//escuchar el servidor

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
})

