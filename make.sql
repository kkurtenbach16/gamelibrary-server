DROP DATABASE IF EXISTS gamelibrary;
DROP USER IF EXISTS game_user@localhost;

CREATE DATABASE gamelibrary CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER game_user@localhost IDENTIFIED BY 'GamePr0j!';
GRANT ALL PRIVILEGES ON gamelibrary.* TO game_user@localhost;
