var conexion = require('../lib/connectiondb');

var controladorCompetencias = {

    buscarCompetencias: function(req, res) {
        var sql = 'SELECT * FROM competencia';
    
        conexion.query(sql, function (error, resultado) {
            if (error) {
                return res.status(500).json(error);
            }
    
            return res.json(resultado);
        });
    },

    dosPeliculasRandom: function(req, res){
        var id = req.params.id;

        var queryCompetencia = "SELECT nombre, genero_id, director_id, actor_id FROM competencia WHERE id = " + id + ";";
        console.log(queryCompetencia)
        conexion.query(queryCompetencia, function(error, competencia){
            if (error) {
                return res.status(500).json(error);
            }
            
            console.log(competencia);

            var queryPeliculas = "SELECT DISTINCT pelicula.id, poster, titulo, genero_id FROM pelicula LEFT JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id LEFT JOIN director_pelicula ON pelicula.id = director_pelicula.pelicula_id WHERE 1 = 1";

            var genero = competencia[0].genero_id;
            var actor = competencia[0].actor_id;
            var director = competencia[0].director_id;
            var queryGenero = genero ? ' AND pelicula.genero_id = '  + genero : '';
            var queryActor = actor ? ' AND actor_pelicula.actor_id = ' + actor : '';
            var queryDirector = director ? ' AND director_pelicula.director_id = ' + director : '';
            var randomOrder = ' ORDER BY RAND() LIMIT 2';

            var query = queryPeliculas + queryGenero + queryActor + queryDirector + randomOrder;
            
            console.log(query);

            conexion.query(query, function(error, peliculas){    
                if (error) {
                    return res.status(500).json(error);
                }
                
                var response = {
                    'peliculas': peliculas,
                    'competencia': competencia[0].nombre
                };

                res.send(JSON.stringify(response));
            });
        });            
    },

    insertarVoto: function(req, res){
        var voto = req.body;
        var idCompetencia = req.params.idCompetencia;
        var idPelicula = voto.idPelicula;

        var queryVoto = "INSERT INTO votacion (id_competencia, id_pelicula) VALUES (" + idCompetencia + ", " + idPelicula + ");";

        conexion.query(queryVoto, function(error, resultado){
            if (error) {
                return res.status(500).json(error);
            }

            var response = {
                'voto': resultado.insertId,
            };

            res.json(JSON.stringify(response));
        });
    },

    obtenerResultados: function(req, res){
        var idCompetencia = req.params.id;

        var queryResultados = "SELECT id_pelicula, COUNT(*) AS votos, pelicula.titulo, pelicula.poster FROM votacion JOIN competencia ON votacion.id_competencia = competencia.id JOIN pelicula ON votacion.id_pelicula = pelicula.id WHERE votacion.id_competencia = " + idCompetencia + " GROUP BY id_competencia, id_pelicula HAVING COUNT(*) >= 1 ORDER BY votos DESC LIMIT 3";

        conexion.query(queryResultados, function(error, resultado) {
            if (error) {
                console.log(error.message);
                return res.status(404).send(error);
            }
            if (resultado.length == 0) {
                console.log("No existe el id");
                return res.status(404).send("No existe el id");
            } else {
                var response = {
                    'resultados': resultado
                };

                res.send(JSON.stringify(response));
            }
        });
    },

    crearNuevaCompetencia: function(req, res){
        var nombreCompetencia = req.body.nombre;
        var generoCompetencia = req.body.genero === '0' ? null : req.body.genero;
        var directorCompetencia = req.body.director === '0' ? null : req.body.director;
        var actorCompetencia = req.body.actor === '0' ? null : req.body.actor;

        console.log(req.body);
        console.log(1);

        var queryNuevaCompetencia = "INSERT INTO competencia (nombre, genero_id, director_id, actor_id) VALUES ('" + nombreCompetencia + "', " + generoCompetencia + ", " + directorCompetencia + ", " + actorCompetencia + ");";

        console.log(2)
        console.log(queryNuevaCompetencia);

        conexion.query(queryNuevaCompetencia, function(error, resultado) {
            if (error) {
                return res.status(500).json(error);
            }

            var response = {
                'competencia': resultado
            };

            res.send(JSON.stringify(response));
        });
    },

    eliminarVotosCompetencia: function(req, res){
        var competenciaAReiniciar = req.params.id;

        var queryReiniciarCompetencia = "DELETE FROM votacion WHERE id_competencia = " + competenciaAReiniciar + ";";
            
        conexion.query(queryReiniciarCompetencia, function(error, resultado){
            if (error) {
                return res.status(500).json(error);
            }

            res.send(JSON.stringify(results));    
        });
	},
    
    nombreCompetencia: function(req, res){
        var nombreCompetencia = req.params.id;
        
        // var querySeleccionarCompetencia = "SELECT * FROM competencia WHERE id = " + nombreCompetencia + ";";

        var querySeleccionarCompetencia = "SELECT competencia.id, competencia.nombre, genero.nombre genero, director.nombre director, actor.nombre actor FROM competencia LEFT JOIN genero ON genero_id = genero.id LEFT JOIN director ON director_id= director.id LEFT JOIN actor ON actor_id= actor.id WHERE competencia.id = " + nombreCompetencia;  
        
        conexion.query(querySeleccionarCompetencia, function(error, resultado){
            if (error) {
                return res.status(500).json(error);
            }
            
            var response = {
                'id': resultado,
                'nombre': resultado[0].nombre,
                'genero_nombre': resultado[0].genero,
                'actor_nombre': resultado[0].actor,
                'director_nombre': resultado[0].director
            }

            console.log(response);

            res.send(JSON.stringify(response));    
        });
    },
    
	obtenerGeneros: function(req, res){
		var queryGenero = "SELECT nombre, id FROM genero";

		conexion.query(queryGenero, function(error, resultado){
			if (error) {
                return res.status(500).json(error);
			}

			res.send(JSON.stringify(resultado));
		});
    },
    
    obtenerDirectores: function(req, res){
        var queryDirector = "SELECT nombre, id FROM director";

        conexion.query(queryDirector, function(error, resultado){
			if (error) {
                return res.status(500).json(error);
			}

			res.send(JSON.stringify(resultado));
		});
    },

    obtenerActores: function(req, res){
        var queryActor = "SELECT nombre, id FROM actor";

        conexion.query(queryActor, function(error, resultado){
			if (error) {
                return res.status(500).json(error);
			}

            res.send(JSON.stringify(resultado));
        });
    },

    eliminarCompetencia: function(req, res) {
        var idCompetencia = req.params.id;
        
        var queryEliminarEnVotacion = 'DELETE FROM votacion WHERE id_competencia = ' + idCompetencia;

        conexion.query(queryEliminarEnVotacion, function(error, resultado){
            if (error) {
                return res.status(404).json(error);
            }

            var queryEliminarCompetencia = 'DELETE FROM competencia WHERE id = ' + idCompetencia;

            conexion.query(queryEliminarCompetencia, function(error, resultado){
                if (error) {
                    return res.status(404).json(error);
                }

                res.json('Competencia Eliminada');
            });
        });
    },

    modificarNombreCompetencia: function(req, res) {
        var idCompetencia = req.params.id;
        var nombreCompetencia = req.body.nombre;

        var queryModificarCompetencia = 'UPDATE competencia SET nombre = "' + nombreCompetencia + '" WHERE id = ' + idCompetencia;

        conexion.query(queryModificarCompetencia, function(error, resultado){
            if (error) {
                return res.status(404).json(error);
            }

            res.json('Competencia Modificada');
        });
    }
};


module.exports = controladorCompetencias;
