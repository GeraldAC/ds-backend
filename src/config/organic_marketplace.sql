-- Crear base de datos
CREATE DATABASE IF NOT EXISTS organic_marketplace CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE organic_marketplace;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_producer BOOLEAN DEFAULT FALSE,
    avatar_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Información adicional de productores
CREATE TABLE producers_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bio TEXT,
    location VARCHAR(150),
    phone VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Emprendimientos (ventures)
CREATE TABLE ventures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    producer_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venture_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venture_id) REFERENCES ventures(id) ON DELETE CASCADE
);

-- Reseñas
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

DELIMITER $$

CREATE FUNCTION get_average_rating(p_product_id INT)
RETURNS DECIMAL(3,2)
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE avg_rating DECIMAL(3,2);

    SELECT AVG(rating)
    INTO avg_rating
    FROM reviews
    WHERE product_id = p_product_id;

    RETURN IFNULL(avg_rating, 0); -- Retorna 0 si no hay reseñas

END$$

DELIMITER ;

-- Deshabilitar temporalmente las restricciones de clave externa
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar los registros de las tablas hijas primero
TRUNCATE TABLE reviews;
TRUNCATE TABLE products;
TRUNCATE TABLE ventures;
TRUNCATE TABLE producers_info;
TRUNCATE TABLE users;

-- Habilitar nuevamente las restricciones de clave externa
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO users (name, email, password_hash, is_producer, avatar_url)
VALUES 
('Ana Torres', 'ana@bioandes.pe', 'hashed_pass1', TRUE, 'https://example.com/avatar1.png'),
('Luis Mendoza', 'luis@organik.pe', 'hashed_pass2', TRUE, 'https://example.com/avatar2.png'),
('Carmen Díaz', 'carmen@tierraviva.pe', 'hashed_pass3', TRUE, 'https://example.com/avatar3.png'),
('Pedro Salas', 'pedro@correo.com', 'hashed_pass4', FALSE, 'https://example.com/avatar4.png'),
('Lucía Gamarra', 'lucia@correo.com', 'hashed_pass5', FALSE, 'https://example.com/avatar5.png'),
('Jorge Villanueva', 'jorge@correo.com', 'hashed_pass6', FALSE, 'https://example.com/avatar6.png');

INSERT INTO producers_info (user_id, bio, location, phone)
VALUES
(1, 'Agricultora de Cusco dedicada a productos orgánicos andinos.', 'Cusco, Perú', '+51999999901'),
(2, 'Fundador de Organik, una iniciativa agroecológica de la costa peruana.', 'Lima, Perú', '+51999999902'),
(3, 'Emprendedora rural especializada en frutas tropicales.', 'Tarapoto, Perú', '+51999999903');


INSERT INTO ventures (name, description, image_url, producer_id)
VALUES
('BioAndes', 'Productos orgánicos de los Andes peruanos.', 'https://example.com/bioandes.jpg', 1),
('Organik', 'Alimentos saludables y agroecológicos.', 'https://example.com/organik.jpg', 2),
('Frutos de la Selva', 'Sabores tropicales directamente del productor.', 'https://example.com/selva.jpg', 3);

-- Supongamos que los IDs de los ventures son 1, 2 y 3
INSERT INTO products (venture_id, name, description, price, stock, image_url)
VALUES
(1, 'Quinua Roja', 'Rica en proteínas, ideal para dietas saludables.', 12.50, 100, 'https://example.com/quinua.jpg'),
(1, 'Papa Nativa', 'Variedad ancestral cultivada en altura.', 7.90, 150, 'https://example.com/papa.jpg'),
(2, 'Aceite de Coco', 'Prensado en frío, ideal para cocinar y cosmética.', 25.00, 80, 'https://example.com/coco.jpg'),
(2, 'Miel de Abeja', 'Miel pura cosechada en la sierra central.', 18.50, 60, 'https://example.com/miel.jpg'),
(3, 'Camu Camu', 'Fuente natural de vitamina C.', 15.00, 40, 'https://example.com/camu.jpg'),
(3, 'Plátano Deshidratado', 'Snack saludable sin azúcar añadida.', 10.00, 120, 'https://example.com/platano.jpg');

INSERT INTO reviews (product_id, user_id, rating, comment)
VALUES
(1, 4, 5, 'Excelente quinua, se cocina rápido y tiene buen sabor.'),
(2, 5, 4, 'Las papas llegaron frescas, aunque algo pequeñas.'),
(3, 6, 5, 'El aceite de coco tiene un aroma delicioso.'),
(4, 4, 3, 'Buena miel, pero llegó con el frasco dañado.'),
(5, 5, 5, '¡El camu camu es potente! Ideal para jugos.'),
(6, 6, 4, 'Buen snack, aunque algo caro.');
