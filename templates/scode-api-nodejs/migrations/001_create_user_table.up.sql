
CREATE TABLE IF NOT EXISTS `user` ( 
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,   
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `pswhash` TEXT NOT NULL,
  `realm` ENUM('super','admin','editor','user') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT NOW()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;