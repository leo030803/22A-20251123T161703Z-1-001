USE api_crud;

CREATE TABLE programadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_do_programador VARCHAR(50),
    idade INT,
    area_de_atuacao VARCHAR(50),
    tipo_de_programador VARCHAR(50)
);

SELECT * FROM programadores;