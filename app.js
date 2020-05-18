const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
 return {
  game_name: row.game_name,
  platform: row.platform,
  hours_played: row.hours_played,
  release_year: row.release_year,
  release_month: row.release_month,
  release_day: row.release_day,
  description: row.description,
  is_beat: row.is_beat,
  game_id: row.game_id,
 };
}

app.get('/gamelibrary', (request, response) => {
 const query = 'SELECT game_name, platform, hours_played, release_year, release_month, release_day, description, is_beat, game_id FROM games WHERE is_deleted = 0 ORDER BY release_year DESC';
 const params = [];
 connection.query(query, params, (error, rows) => {
  response.send({
   ok: true,
   games: rows.map(rowToObject),
  });
 });
});

app.post('/gamelibrary', (request, response) => {
 const query = 'INSERT INTO games(game_name, platform, hours_played, release_year, release_month, release_day, description, is_beat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
 const params = [request.body.game_name, request.body.platform, request.body.hours_played, request.body.release_year, request.body.release_month, request.body.release_day, request.body.description, request.body.is_beat];
 connection.query(query, params, (error, result) => {
  response.send({
   ok: true,
   game_id: result.insertId,
  });
 });
});

app.patch('/gamelibrary/:game_id', (request, response) => {
 const query = 'UPDATE games SET game_name = ?, platform = ?, hours_played = ?, release_year = ?, release_month = ?, release_day = ?, description = ?, is_beat = ? WHERE game_id = ?';
 const params = [request.body.game_name, request.body.platform, request.body.hours_played, request.body.release_year, request.body.release_month, request.body.release_day, request.body.description, request.body.is_beat, request.params.game_id];
 connection.query(query, params, (error, result) => {
  response.send({
   ok: true,
  });
 });
});

app.delete('/gamelibrary/:game_id', (request, response) => {
 const query = 'UPDATE games SET is_deleted = 1 WHERE game_id = ?';
 const params = [request.params.game_id];
 connection.query(query, params, (error, result) => {
  response.send({
   ok: true,
  });
 });
});

const port = 3443;
app.listen(port, () => {
 console.log("We're live on port ${port}!");
});

 
