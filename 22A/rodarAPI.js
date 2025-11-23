const express = require('express');
const cors = require('cors');
const acessaBancoNoServidor = require('./acessaBancoNoServidor');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Criar vendas de combustível
app.post('/Programador', (req, res) => {
    const { nome_do_programador, idade, area_de_atuacao, tipo_de_programador } = req.body;

    const codigoDoMySQL = 'INSERT INTO postos_de_gasolina (nome_do_programador, idade, area_de_atuacao, tipo_de_programador) VALUES (?, ?, ?, ?)';

    acessaBancoNoServidor.query(codigoDoMySQL, [nome_do_programador, idade, area_de_atuacao, tipo_de_programador], (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao cadastrar' });
        }
        res.json({ message: 'Programador cadastrado!' });
    });
});

// Listar programadores
app.get('/Programador', (req, res) => {
    const codigoDoMySQL = 'SELECT * FROM programadores';

    acessaBancoNoServidor.query(codigoDoMySQL, (err, results) => {
        if (err) {
            return res.json({ error: 'Erro ao buscar' });
        }
        res.json(results);
    });
});

// Deletar programador
app.delete('/Programador/:id', (req, res) => {
    const id = req.params.id;
    const codigoDoMySQL = 'DELETE FROM programadores WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar programador' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Programador não encontrado' });
        }

        res.json({ message: 'Programador excluído com sucesso!' });
    });
});

// Atualizar programador
app.put('/Programador/:id', (req, res) => {
    const id = req.params.id;
    const { nome_do_programador, idade, area_de_atuacao, tipo_de_programador } = req.body;

    const codigoDoMySQL = 'UPDATE programadores SET nome_do_programador = ?, idade = ?, area_de_atuacao = ?, tipo_de_programador = ? WHERE id = ?';

    acessaBancoNoServidor.query(codigoDoMySQL, [nome_do_programador, idade, area_de_atuacao, tipo_de_programador, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar lista' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Programador não encontrado' });
        }

        res.json({ message: 'Lista atualizada com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
