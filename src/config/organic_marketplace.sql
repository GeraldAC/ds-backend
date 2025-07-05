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
('Ana Torres', 'ana@bioandes.pe', 'hashed_pass1', TRUE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png'),
('Luis Mendoza', 'luis@organik.pe', 'hashed_pass2', TRUE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/chen.png'),
('Carmen Díaz', 'carmen@tierraviva.pe', 'hashed_pass3', TRUE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png'),
('Pedro Salas', 'pedro@correo.com', 'hashed_pass4', FALSE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/kunkka.png'),
('Lucía Gamarra', 'lucia@correo.com', 'hashed_pass5', FALSE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/luna.png'),
('Jorge Villanueva', 'jorge@correo.com', 'hashed_pass6', FALSE, 'https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png');

INSERT INTO producers_info (user_id, bio, location, phone)
VALUES
(1, 'Agricultora de Cusco dedicada a productos orgánicos andinos.', 'Cusco, Perú', '+51999999901'),
(2, 'Fundador de Organik, una iniciativa agroecológica de la costa peruana.', 'Lima, Perú', '+51999999902'),
(3, 'Emprendedora rural especializada en frutas tropicales.', 'Tarapoto, Perú', '+51999999903');


INSERT INTO ventures (name, description, image_url, producer_id)
VALUES
('EcoAndino', 'Productos orgánicos de los Andes peruanos.', 'https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/289996671_488711243059186_3181301956516631774_n.png?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=kXonSpP-ZV8Q7kNvwHnA5Ig&_nc_oc=AdlKMHsVs0_fquMNMKDqnNBjBGj6etwA0fw1ssfEZ9WvqDUd5VatWLlEoIy3aWyJCYYtMBGU7g0rFyJx6RG29slv&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=54IUb0rH3WWv3CPZzDPYMg&oh=00_AfQK5dvtVFFZtR3TwnMXY4dPUxj_yjhklXgZChHeZO0hYw&oe=686E19BD', 1),
('Wiraccocha', 'Alimentos saludables y agroecológicos.', 'https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/486940515_1078685267610936_4186589355967150479_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHaHcA44gESyf_6fYU71AfFn89hnkyWhU-fz2GeTJaFT2u-oqD15kZK1Dtt6Wx2JEnuci06nKQQIHe4EFkoPIVI&_nc_ohc=CN-GJr_Kfa0Q7kNvwHXEDWX&_nc_oc=AdmXqVZ4xKdM5qQNpRkY1J7CXQ7Ws7ZH1mHeoUSiKGn_1Uh0BkfGcUKvN1hrivx5qjWhjXAs6H-CeourBWX4C2e8&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=6OA9DXo1f-6MZ2Epamqkow&oh=00_AfT2Y2BXE-Fq-NB8rzQi5UhJl4IKyax4dbiczikEvUJyYg&oe=686E237E', 2),
('De la Selva', 'Sabores tropicales directamente del productor.', 'https://scontent.fcuz2-1.fna.fbcdn.net/v/t39.30808-6/405306000_845363904264243_130979765248851425_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHHIHMWXV7TzjEm0GGvGghbDKgi1x2qIlgMqCLXHaoiWAdU7QoF8Y3UcseTbrDjV5K2Lbb2Ney49iYOtxj26EMR&_nc_ohc=WvzxAwSO6vQQ7kNvwHoWx_v&_nc_oc=AdnDA5AYV0fJ6q3aH2IxkDv_2Z-OA9iIhjjmO8tt-skcyuW_hWO7lj1Q5GQUm8aQKLSNySCJmCnH6k9VwTnpxThF&_nc_zt=23&_nc_ht=scontent.fcuz2-1.fna&_nc_gid=Ntix6v9JQAm-AjYaYGawzA&oh=00_AfSpYD7js2ufbKI2fncLKwN2-cpA1UL6k5ti1F9rkwhgNQ&oe=686E37E9', 3);

-- Supongamos que los IDs de los ventures son 1, 2 y 3
INSERT INTO products (venture_id, name, description, price, stock, image_url)
VALUES
(1, 'Quinua Roja', 'Rica en proteínas, ideal para dietas saludables.', 12.50, 100, 'https://perubiodiverso.com/wp-content/uploads/2015/12/800x800IMG_20200813_145443.jpg'),
(1, 'Papa Nativa', 'Variedad ancestral cultivada en altura.', 7.90, 150, 'https://www.agroperu.pe/wp-content/uploads/agroperu-informa_produccion-papas-nativas-peru-1.jpg'),
(2, 'Aceite de Coco', 'Prensado en frío, ideal para cocinar y cosmética.', 25.00, 80, 'https://plazavea.vteximg.com.br/arquivos/ids/7168149-1000-1000/imageUrl_1.jpg'),
(2, 'Miel de Abeja', 'Miel pura cosechada en la sierra central.', 18.50, 60, 'https://apimas.com/wp-content/uploads/2023/11/Miel-La-Reyna-de-Oxapampa-300-gr.jpg'),
(3, 'Camu Camu', 'Fuente natural de vitamina C.', 15.00, 40, 'https://tumercadoperu.com/wp-content/uploads/2020/07/camu-camu.png'),
(3, 'Plátano Deshidratado', 'Snack saludable sin azúcar añadida.', 10.00, 120, 'https://vitallanosperu.com/wp-content/uploads/2020/02/platano-deshidratado-1.jpg');

INSERT INTO reviews (product_id, user_id, rating, comment)
VALUES
(1, 4, 5, 'Excelente quinua, se cocina rápido y tiene buen sabor.'),
(2, 5, 4, 'Las papas llegaron frescas, aunque algo pequeñas.'),
(3, 6, 5, 'El aceite de coco tiene un aroma delicioso.'),
(4, 4, 3, 'Buena miel, pero llegó con el frasco dañado.'),
(5, 5, 5, '¡El camu camu es potente! Ideal para jugos.'),
(6, 6, 4, 'Buen snack, aunque algo caro.');
