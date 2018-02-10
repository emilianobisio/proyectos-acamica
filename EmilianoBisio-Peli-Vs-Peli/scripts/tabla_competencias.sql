DROP TABLE IF EXISTS `competencia`;

CREATE TABLE `competencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO competencia (nombre) VALUES ('¿Cuál es la mejor película?'), ('¿Qué drama te hizo llorar más?'), ('¿Cuál es la peli más bizarra?'), ('¿Con qué comedia te reíste más?'), ('¿Cuál peli es mejor para un día de lluvia?'), ('¿Qué peli de terror te asustó más?'), ('¿Cuál es la mejor película con Nicolas Cage?'), ('¿Cuál es el mejor thriller?');

ALTER TABLE competencia ADD borradas DATETIME;



DROP TABLE IF EXISTS `votacion`;

CREATE TABLE `votacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_competencia` INT(11) NOT NULL,
  `id_pelicula` int(11) unsigned NOT NULL
 );
 
ALTER TABLE votacion ADD FOREIGN KEY (id_competencia) REFERENCES competencia (id);

ALTER TABLE votacion ADD FOREIGN KEY (id_pelicula) REFERENCES pelicula (id);



ALTER TABLE competencia ADD COLUMN genero_id INT (11) UNSIGNED, ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

ALTER TABLE competencia ADD COLUMN director_id INT (11) UNSIGNED, ADD FOREIGN KEY (director_id) REFERENCES director(id);

ALTER TABLE competencia ADD COLUMN actor_id INT (11) UNSIGNED, ADD FOREIGN KEY (actor_id) REFERENCES actor(id);