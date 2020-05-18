DROP TABLE IF EXISTS games;

CREATE TABLE games (
 game_id SERIAL PRIMARY KEY,
 game_name VARCHAR(255),
 platform VARCHAR(255),
 hours_played INT,
 release_year INT,
 release_month INT,
 release_day INT,
 description TEXT,
 is_deleted INT DEFAULT 0,
 is_beat INT DEFAULT 0
);
