//express para el servidor
const express = require("express");
//importar mysql para la base de datos
const mysql = require("mysql2");
//body-parser para manejar datos de formulario
const bodyParser = require("body-parser");
//instanciamos express
const app = express();
//define el puerto
const PORT = 3000;

//configurar el body-parser para procesar datos enviados por el formulario
app.use(bodyParser.urlencoded({ extended: false }));

//configura la conexion con mysql
const db = mysql.createConnection({
  host: "localhost", //cambia si se tiene otra configuracion
  user: "root", // usuario de mysql
  password: "", //contraseña
  database: "notas_db", //base de datos nombre
});

//conectar la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log("Conexiona base de datos... Exitosa");
});
//configuro la carpeta public para los archivos static
app.use(express.static("public"));

app.post("/insertar", (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = "INSERT INTO notas (nombre, descripcion) VALUES (?, ?)";
  const values = [nombre, descripcion];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al insertar los datos", err);
      return res.status(500).send("error al insertar la nota");
    }
    console.log("Nota insertada con exito:", result);
    console.log("Nota guardada con exito");
    res.redirect("/");
  });
});
//apuntamos a una ruta get para consultar las notas
app.get("/notas", (req, res) => {
  //defino consulta sql
  const sql = "SELECT * FROM notas";
  //ejecuta en la base de datos
  db.query(sql, (err, results) => {
    //verificamos si hay un error
    if (err) {
      console.error("Error al consultar las notas", err);
      //envia una respuesta con estado 500 (error en el servidor) y un mensaje de error
      return res.status(500).send("error al consultar la base de datos");
    }
    // en dado caso de no errores devolvemos json
    res.json(results);
  });
});
//editar la nota
app.post("/editar", (req, res) => {
  try {
    const { id, nombre, descripcion } = req.body;
    console.log("Datos recibidos para editar:", {id, nombre, descripcion});
    const sql = "UPDATE notas SET nombre = ?, descripcion = ? WHERE id = ?";
    const values = [nombre, descripcion, id];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al editar la nota", err);
        return res.status(500).send("Error al editar la nota");
      }
      console.log("Nota editada con exito: ", result);
      //redirecciona a la pagina principal
      console.log("Datos recibidos para editar:", {id, nombre, descripcion});
      res.redirect('/');
    });
  } catch (error) {
    console.error("error al editar ...", error);
  }
});
//escuchar el servidor

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});
