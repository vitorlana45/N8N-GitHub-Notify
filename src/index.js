const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json()); 

const client = new Client({
  user: 'myuser',        
  host: 'localhost',    
  database: 'mydatabase', 
  password: 'mypassword',  
  port: 5432,            
});

client.connect()
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  });

app.post('/commit', (req, res) => {
  const data = req.body;

  const query = `
    INSERT INTO commit_details (committer_username, committer_email, modified_files, real_ip, event_type, pushed_at, commit_id, developed_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;

  client.query(query, [
    data.committer_username,
    data.committer_email,
    JSON.stringify(data.modified_files),
    data.real_ip,
    data.event_type,
    data.pushed_at,
    data.commit_id,
    data.developed_by
  ])
    .then(() => {
      res.status(200).send('Dados inseridos com sucesso');
    })
    .catch(err => {
      console.error('Erro ao inserir dados:', err.stack);
      res.status(500).send('Erro ao inserir dados');
    });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});