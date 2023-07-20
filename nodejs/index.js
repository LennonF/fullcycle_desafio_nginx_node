const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

const dbConfig = {
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'desafio_db',
};

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NULL
    )
  `;

    await connection.execute(createTableQuery)
    const insertQuery = 'INSERT INTO people (name) VALUES ("John Doe")';
    await connection.execute(insertQuery)
    const [rows, fields] = await connection.execute('SELECT * FROM people');
    connection.end();

    const names = rows.map((row) => row.name).join(', ');
    res.send('<h1>Full Cycle Rocks!</h1><p>Lista de nomes cadastrada no banco de dados:</p></br>' + names + '</p>');

  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('App running on port 3000'));
