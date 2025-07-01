CREATE DATABASE  IF NOT EXISTS `organic_marketplace` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `organic_marketplace`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: organic_marketplace
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `producers_info`
--

DROP TABLE IF EXISTS `producers_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producers_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bio` text COLLATE utf8mb4_general_ci,
  `location` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `producers_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producers_info`
--

LOCK TABLES `producers_info` WRITE;
/*!40000 ALTER TABLE `producers_info` DISABLE KEYS */;
INSERT INTO `producers_info` VALUES (2,2,'Productora de alimentos orgánicos en Cusco.','Cusco, Perú','+51 987654321'),(3,3,'Productor de productos orgánicos en Cusco.','Cusco, Perú','+51987654322'),(4,3,'Productor de productos orgánicos en Cusco.','Cusco, Perú','+51987654322'),(5,3,'Productor de productos orgánicos en Cusco.','Cusco, Perú','+51987654322'),(6,10,'Productor de alimentos orgánicos','Los perales','+51 987654325'),(7,8,'Productor de alimentos orgánicos.','Los perales','+51 987654360'),(8,7,'Productor de alimentos orgánicos','Los perales','+51 987654360'),(9,12,'Soy un productor desde hace 20 años en Cusco.','Cusco','+51 987654320'),(11,15,'Soy productor','Lima','+51 987654321');
/*!40000 ALTER TABLE `producers_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `venture_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `image_url` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `venture_id` (`venture_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`venture_id`) REFERENCES `ventures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,2,'Shampoo sólido natural','Libre de químicos y con ingredientes orgánicos.',25.99,100,'https://madda.pe/wp-content/uploads/2020/09/Phyto-Shampoo.jpg','2025-06-17 18:17:19'),(3,2,'Barra de chocolate','Chocolate para consumo directo hecho con 95% de cacao y 5% de leche y especias.',10.99,50,'https://inkaoperu.com/wp-content/uploads/2023/11/Tableta-Chocolate-55-Mani-2-500x500-1.png','2025-06-21 18:52:59'),(4,4,'Barra de chocolate','Chocolate para consumo directo hecho con 95% de cacao y 5% de leche y especias.',11.99,50,'https://plazavea.vteximg.com.br/arquivos/ids/3134898-418-418/image-094f3932b3934adabdfbc3e737dc88a7.jpg','2025-06-29 22:41:20'),(6,4,'Salsa Roja ','Salsa Roja Peruana CASA VERDE Frasco 200g',660.00,100,'https://plazavea.vteximg.com.br/arquivos/ids/561535-450-450/20178247.jpg?v=637427434815970000','2025-06-29 23:06:37'),(7,4,'Pasta ','Pasta de Aji Panca Orgánica Chalet Gourmet 225 g',12.22,12,'https://florayfauna.vtexassets.com/arquivos/ids/161894/PASTA-D-AJI-PANCA-ORG-225GR-CHALET-GOURM-1-8076.jpg?v=637843557674070000','2025-06-30 00:04:25');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,2,2,5,'Excelente calidad y presentación. ¡Recomendado!','2025-06-18 17:50:42'),(5,3,12,5,'Excelente calidad y presentación. ¡100% Recomendado!','2025-06-29 11:12:01'),(9,2,12,3,'Bueno pero puede mejorar','2025-06-30 23:59:37'),(11,2,15,4,'Buen producto!!!','2025-07-01 10:56:17'),(12,3,15,3,'Buen producto!!!','2025-07-01 10:56:28');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `is_producer` tinyint(1) DEFAULT '0',
  `avatar_url` text COLLATE utf8mb4_general_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Ana López','ana@example.com','12345678',1,'https://example.com/avatar.jpg','2025-06-17 18:04:00','2025-06-17 18:04:00'),(3,'John Doe','john@example.com','$2b$10$fA3kjwTEKwy9QbkixQgl5O6hHi00d8iMjRSy4TWmAHVKfBopuiNr2',1,NULL,'2025-06-17 18:52:39','2025-06-22 13:06:19'),(4,'Martin','martin@gmail.com','$2b$10$zEWrE3RSg7CGQDaJXw6BoenEUHlp1r9mP/zswHsbOc0UsHeMUdE92',0,NULL,'2025-06-21 16:38:46','2025-06-21 16:38:46'),(5,'Persi','persi@gmail.com','$2b$10$d2Lutp8Tk4soLLIDXlZnyO9xW/4rE1ufJfT9Lbl5Air7aRYm9fLPq',0,NULL,'2025-06-21 16:39:36','2025-06-21 16:39:36'),(6,'Mirage','mirage@gmail.com','$2b$10$f9NBiGChacmtgXVWbWoFfe8w5R2PsTmkRb1FHriMGur6qw/NVYGWS',0,NULL,'2025-06-21 17:11:38','2025-06-21 17:11:38'),(7,'Mirage6','mirage6@gmail.com','$2b$10$ob1pLQkX6Jkxrl0wDpfj1OIzWo.ymKon4NJWss4OhN7MROcNE/i8C',1,'https://www.infodefensa.com/images/showid2/4573261?w=900&mh=700','2025-06-21 17:15:58','2025-06-24 16:43:57'),(8,'Mirage2','mirage2@gmail.com','$2b$10$s1xTTcGJdj41b99IAXDMpurdwC6D7JqefPFfzp7IksWm0nsR8ZT7O',1,NULL,'2025-06-21 17:24:38','2025-06-22 22:24:18'),(10,'Mirage4','mirage4@gmail.com','$2b$10$WRxKqTY4FS9J9NyKrpRcI...VQg1achtbKo45ftfog9M5c.89Z2Ta',1,NULL,'2025-06-21 17:30:21','2025-06-22 18:43:50'),(11,'Mirage10','mirage10@example.com','$2b$10$qriNWq71gbNe8.N0WT.jsew0Ie5ka9I.ojk04hYQP3Y.OfwurMyru',0,'https://www.expreso.com.pe/wp-content/uploads/2024/12/PERU-COMPRA-24-AVIONES-DE-GUERRA.jpg','2025-06-24 16:47:58','2025-06-24 17:38:03'),(12,'Mirage20','mirage20@example.com','$2b$10$vPc3uCZRnsDOZeGteKjHy.jBYwNKu6cZypZfhpFGryc6p8WhyT4Ae',1,'https://www.expreso.com.pe/wp-content/uploads/2024/12/PERU-COMPRA-24-AVIONES-DE-GUERRA.jpg','2025-06-24 17:39:16','2025-06-24 17:40:51'),(14,'Gero','gero@gmail.com','$2b$10$jbmjgR/RvxG3yFonA3OFq.y9./S6NMn/vh/GDINvwQJD0gBnjCYAm',0,NULL,'2025-07-01 10:53:48','2025-07-01 10:53:48'),(15,'magnus','magnus@gmail.com','$2b$10$oc6v4drApnYvE7vaGGncauXxrllMQPhVibEBhKAYLhSckNU6.jUDK',1,NULL,'2025-07-01 10:54:48','2025-07-01 10:55:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventures`
--

DROP TABLE IF EXISTS `ventures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `image_url` text COLLATE utf8mb4_general_ci,
  `producer_id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producer_id` (`producer_id`),
  CONSTRAINT `ventures_ibfk_1` FOREIGN KEY (`producer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventures`
--

LOCK TABLES `ventures` WRITE;
/*!40000 ALTER TABLE `ventures` DISABLE KEYS */;
INSERT INTO `ventures` VALUES (2,'EcoVerde','Emprendimiento de productos ecológicos y sustentables.','https://www.minam.gob.pe/wp-content/uploads/2013/06/94bb07c1e50900940c8b3bb4503fed67_2.jpeg',2,'2025-06-17 18:15:17'),(4,'EcoVerde','Emprendimiento de productos ecológicos y sustentables.','https://www.minam.gob.pe/wp-content/uploads/2013/06/94bb07c1e50900940c8b3bb4503fed67_2.jpeg',12,'2025-06-29 01:11:43'),(6,'CacaoMax','Emprendimiento de todas las variedades de cacao','https://cdn.www.gob.pe/uploads/document/file/4859850/WhatsApp%20Image%202023-07-15%20at%2020.59.13%20%281%29.jpeg',12,'2025-07-01 01:17:27'),(9,'Mi emprendimiento de jugos','Emprendimiento de jugos saludables.','https://mercafreshperu.com/wp-content/uploads/2024/02/Papa-Huayro.webp',15,'2025-07-01 10:55:59');
/*!40000 ALTER TABLE `ventures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'organic_marketplace'
--

--
-- Dumping routines for database 'organic_marketplace'
--
/*!50003 DROP FUNCTION IF EXISTS `get_average_rating` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `get_average_rating`(p_product_id INT) RETURNS decimal(3,2)
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE avg_rating DECIMAL(3,2);

    SELECT AVG(rating)
    INTO avg_rating
    FROM reviews
    WHERE product_id = p_product_id;

    RETURN IFNULL(avg_rating, 0); -- Retorna 0 si no hay reseñas

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-01 11:10:11
