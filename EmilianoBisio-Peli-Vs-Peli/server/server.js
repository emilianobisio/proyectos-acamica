require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var competenciasController = require('./controllers/competenciasController');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Pedidos a la base de datos.
app.post('/competencias/:idCompetencia/voto', competenciasController.insertarVoto);
app.get('/competencias/:id/peliculas', competenciasController.dosPeliculasRandom);
app.get('/competencias/:id/resultados', competenciasController.obtenerResultados);
app.get('/competencias', competenciasController.buscarCompetencias);
app.post('/competencias', competenciasController.crearNuevaCompetencia);
app.delete('/competencias/:id/votos', competenciasController.eliminarVotosCompetencia);
app.get('/generos', competenciasController.obtenerGeneros);
app.get('/directores', competenciasController.obtenerDirectores);
app.get('/actores', competenciasController.obtenerActores);
app.get('/competencias/:id', competenciasController.nombreCompetencia);
app.put('/competencias/:id', competenciasController.modificarNombreCompetencia);
app.delete('/competencias/:id', competenciasController.eliminarCompetencia);


app.get('/', function (req, res) {
  res.json({
      message: 'Servidor funcionando 😎'
  });
});

app.listen(process.env.EXPRESS_PORT, function () {
  console.log('Listening on ' +`http://localhost:${process.env.EXPRESS_PORT}/`);
});

// var puerto = '8080';

// app.listen(puerto, function () {
//   console.log( "Escuchando en el puerto " + puerto );
// });