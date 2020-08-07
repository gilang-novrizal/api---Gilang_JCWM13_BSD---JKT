CREATE DATABASE  IF NOT EXISTS `toko_ujian` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `toko_ujian`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: toko_ujian
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Temporary view structure for view `detail_produk`
--

DROP TABLE IF EXISTS `detail_produk`;
/*!50001 DROP VIEW IF EXISTS `detail_produk`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `detail_produk` AS SELECT 
 1 AS `id`,
 1 AS `nama_produk`,
 1 AS `deskripsi`,
 1 AS `harga`,
 1 AS `stok`,
 1 AS `GROUP_CONCAT(DISTINCT k.kategori
        SEPARATOR ',')`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kategori` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kategori` varchar(145) NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parent_idx` (`parent_id`),
  CONSTRAINT `fk_parent` FOREIGN KEY (`parent_id`) REFERENCES `kategori` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategori`
--

LOCK TABLES `kategori` WRITE;
/*!40000 ALTER TABLE `kategori` DISABLE KEYS */;
INSERT INTO `kategori` VALUES (1,'Elektronik',NULL),(2,'Pakaian',NULL),(3,'Rumah Tangga',NULL),(4,'Smartphone & Aksesoris',1),(5,'Game',1),(6,'PC & Laptop',1),(7,'Camera',1),(8,'Smartphone',4),(9,'Aksesoris',4),(10,'iOS',8),(11,'Android',8),(12,'Hape merek lain',8),(13,'PC',6),(14,'Laptop',6),(15,'Atasan',2),(16,'Bawahan',2),(17,'Kemeja',15),(18,'Kaos',15),(19,'Jaket',15),(20,'Celana Panjang',16),(21,'Celana Pendek',16),(22,'Celana Dalam',16),(23,'Furniture',3),(24,'Dekorasi',3),(25,'Elektronik Rumah Tangga',3),(26,'Kotak Penyimpanan',3);
/*!40000 ALTER TABLE `kategori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_kat`
--

DROP TABLE IF EXISTS `pro_kat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_kat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produk_id` int NOT NULL,
  `kategori_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_kat`
--

LOCK TABLES `pro_kat` WRITE;
/*!40000 ALTER TABLE `pro_kat` DISABLE KEYS */;
INSERT INTO `pro_kat` VALUES (1,1,1),(2,1,4),(3,1,8),(4,1,11),(5,2,1),(6,2,4),(7,2,8),(8,2,10),(9,3,1),(10,3,4),(11,3,9),(12,4,1),(13,4,5),(14,5,1),(15,5,7),(16,6,1),(17,6,7),(18,7,2),(19,7,15),(20,7,18),(21,8,2),(22,8,15),(23,8,19),(24,9,2),(25,9,16),(26,9,21),(27,10,3),(28,10,25),(29,11,3),(30,11,25),(31,12,3),(32,12,25),(33,13,1),(34,13,4),(35,13,9),(36,14,3),(37,14,24),(38,15,2),(39,15,15),(40,16,1),(41,16,4),(42,16,8),(43,16,11),(44,17,1),(45,17,4),(46,17,9),(53,18,1),(54,18,6),(55,18,13);
/*!40000 ALTER TABLE `pro_kat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_produk` varchar(45) NOT NULL,
  `deskripsi` varchar(45) DEFAULT NULL,
  `harga` int NOT NULL,
  `stok` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
INSERT INTO `produk` VALUES (1,'Samung Galaxy Note 10','hape android terbaik',19980000,15),(2,'iPhone 11 Pro Max','hape iPhone tercangih',25567890,19),(3,'Jelly Case OnePlus 8','ringan dan indah',197650,76),(4,'Nintendo Swicth','best pocket console',7650789,27),(5,'Canon 18 Pro','kamera terbaik untuk video',3452879,18),(6,'Sony Camera','kamera jernih dan pintar',6759532,7),(7,'Kaos Polos M Blue','bahan lembut, cotton 30',78900,89),(8,'Jaket Kulit XL Black','kulit asli',287980,47),(9,'Celana Chino Pendek M Grey','bahan lembut dan tebal',178980,56),(10,'Setrika LG','panasnya pas',254321,79),(11,'Kulkas 2 pintu Samsung','kulkas pintar dua pintu',28667000,35),(12,'Kipas Angin Dinding','kenceng anginnya',178976,29),(13,'Heaset Bluetooth Sony WX400','suara jernih dan jelas',567932,76),(14,'Karpet Turki','lembut dan bermotif',6798000,17),(15,'Topi anti-mainstream','gaya anak muda',135253,156),(16,'Xiaomi Mi A1','hape android one',3321000,154),(17,'Kable USB-C ','kabel tebal dan panjang',67890,67),(18,'Macbook Pro 2020','Laptop apple terbaru',35000000,100),(19,'Cosmos Wadesta','Kipas angin dinding, meja, lantai',500000,1000);
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profil`
--

DROP TABLE IF EXISTS `profil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profil` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `birthdate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profil`
--

LOCK TABLES `profil` WRITE;
/*!40000 ALTER TABLE `profil` DISABLE KEYS */;
INSERT INTO `profil` VALUES (1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `profil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'active'),(2,'non-active'),(3,'closed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'akira12','akira@gmail.com','akira12!','user',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `detail_produk`
--

/*!50001 DROP VIEW IF EXISTS `detail_produk`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `detail_produk` AS select `pk`.`id` AS `id`,`p`.`nama_produk` AS `nama_produk`,`p`.`deskripsi` AS `deskripsi`,`p`.`harga` AS `harga`,`p`.`stok` AS `stok`,group_concat(distinct `k`.`kategori` separator ',') AS `GROUP_CONCAT(DISTINCT k.kategori
        SEPARATOR ',')` from ((`produk` `p` left join `pro_kat` `pk` on((`p`.`id` = `pk`.`produk_id`))) join `kategori` `k` on((`k`.`id` = `pk`.`kategori_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-07 17:59:09
