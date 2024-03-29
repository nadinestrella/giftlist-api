require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const server = express();
server.use(cors());
server.use(express.json({ limit: '25mb' }));
const port = process.env.APP_PORT || 5001

server.listen(port, () => {
  console.log(
    `el servidor se esta ejecutando en el puerto http://localhost:${port}`
  );
});

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.connect();

  if (connection) {
    console.log('conexion ejecutandose');
  } else {
    console.log('hay un error');
  }

  return connection;
}

// endpoints

server.get('/toys', async (req, res) => {
  const conex = await getConnection();
  const selectCategory = 'SELECT * FROM toys';
  const [results] = await conex.query(selectCategory);

  conex.end();
  res.json({ success: true, data: results });
});

