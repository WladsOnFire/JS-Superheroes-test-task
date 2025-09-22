CREATE DATABASE  IF NOT EXISTS `superheroes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `superheroes`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: superheroes
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `hero`
--

DROP TABLE IF EXISTS `hero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(45) NOT NULL,
  `real_name` varchar(30) NOT NULL,
  `origin_description` varchar(150) DEFAULT NULL,
  `catch_phrase` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `real_name_UNIQUE` (`real_name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero`
--

LOCK TABLES `hero` WRITE;
/*!40000 ALTER TABLE `hero` DISABLE KEYS */;
INSERT INTO `hero` VALUES (1,'Iron Man','Tony Stark','Genius billionaire who built a powered armor suit after being captured.','I am Iron Man.'),(2,'Captain America','Steve Rogers','Super soldier created during World War II with the Super-Soldier Serum.','I can do this all day.'),(3,'Thor','Thor Odinson','Asgardian God of Thunder, son of Odin, wielder of Mjolnir.','Bring me Thanos!'),(4,'Hulk','Bruce Banner','Scientist transformed into a green rage monster by gamma radiation.','Hulk smash!'),(5,'Black Widow','Natasha Romanoff','Former Russian spy trained in the Red Room, later joined the Avengers.','I’ve got red in my ledger.'),(23,'Spider-Man','Peter Parker','A high school student bitten by a radioactive spider, gaining superhuman agility, strength, and the ability to cling to walls.','With great power comes great responsibility.'),(24,'Doctor Strange','Stephen Strange','Once an arrogant neurosurgeon, he sought mystical healing after an accident and became the Sorcerer Supreme.','Dormammu, I’ve come to bargain!'),(25,'Black Panther','T’Challa','King of Wakanda, empowered by the Heart-Shaped Herb and armed with a vibranium suit.','Wakanda forever!'),(26,'Scarlet Witch','Wanda Maximoff','A powerful mutant/witch with reality-warping abilities, shaped by trauma and experimentation.','You took everything from me.'),(27,'Ant-Man','Scott Lang','A former thief who took up Hank Pym’s mantle, using a suit that lets him shrink or grow in size.','Do you just put ‘quantum’ in front of everything?'),(28,'Deadpool','Wade Wilson','A mercenary who underwent an experimental procedure that gave him a healing factor but left him scarred and unstable.','Maximum effort!');
/*!40000 ALTER TABLE `hero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_heropic`
--

DROP TABLE IF EXISTS `hero_heropic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_heropic` (
  `heroId` int NOT NULL,
  `picId` int NOT NULL,
  KEY `heroId_idx` (`heroId`),
  KEY `picId_idx` (`picId`),
  CONSTRAINT `hero_pic_heroId_fk` FOREIGN KEY (`heroId`) REFERENCES `hero` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hero_pic_picId_fk` FOREIGN KEY (`picId`) REFERENCES `heropic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_heropic`
--

LOCK TABLES `hero_heropic` WRITE;
/*!40000 ALTER TABLE `hero_heropic` DISABLE KEYS */;
INSERT INTO `hero_heropic` VALUES (1,1),(1,3),(1,5),(2,7),(2,8),(2,9),(2,10),(2,11),(3,12),(3,16),(1,17),(1,19),(4,20),(5,22),(23,24),(24,26),(25,27),(26,29),(28,31),(28,35),(28,36),(27,37),(1,39);
/*!40000 ALTER TABLE `hero_heropic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_superpowers`
--

DROP TABLE IF EXISTS `hero_superpowers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_superpowers` (
  `heroId` int NOT NULL,
  `powerId` int NOT NULL,
  PRIMARY KEY (`heroId`,`powerId`),
  KEY `powerId_idx` (`powerId`),
  KEY `heroId_idx` (`heroId`),
  CONSTRAINT `hero_superpowers_heroId_fk` FOREIGN KEY (`heroId`) REFERENCES `hero` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `hero_superpowers_powerId_fk` FOREIGN KEY (`powerId`) REFERENCES `superpower` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_superpowers`
--

LOCK TABLES `hero_superpowers` WRITE;
/*!40000 ALTER TABLE `hero_superpowers` DISABLE KEYS */;
INSERT INTO `hero_superpowers` VALUES (1,1),(1,2),(4,2),(1,3),(3,3),(4,4),(2,5),(3,5),(2,6),(3,6),(28,6),(1,7),(3,7),(1,8),(4,8),(4,9),(5,10),(28,10),(5,11),(28,11),(4,12),(5,12),(1,13),(1,14);
/*!40000 ALTER TABLE `hero_superpowers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heropic`
--

DROP TABLE IF EXISTS `heropic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `heropic` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heropic`
--

LOCK TABLES `heropic` WRITE;
/*!40000 ALTER TABLE `heropic` DISABLE KEYS */;
INSERT INTO `heropic` VALUES (1,'https://i0.wp.com/images2.wikia.nocookie.net/__cb20130611164806/ironman/images/5/59/Robert-Downey-Jr-Tony-Stark-Iron-Man-3-Marvel-Disney.jpg'),(3,'https://playcontestofchampions.com/wp-content/uploads/2023/04/champion-iron-man.webp'),(5,'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/a707480b-6d14-45d4-bca3-b4ffc87e8487/compose?aspectRatio=1.78&format=webp&width=1200'),(7,'https://cdn.britannica.com/30/182830-050-96F2ED76/Chris-Evans-title-character-Joe-Johnston-Captain.jpg'),(8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfWU26VEhWjGL5R79vNt9Emvbl8MwOq9EJw&s'),(9,'https://static.thcdn.com/images/large/original/productimg/1600/1600/12180877-9084677419496537.jpg'),(10,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48QcOrSQarKjjg3V811dHA9VgzUstngUoYA&s'),(11,'https://www.hollywoodreporter.com/wp-content/uploads/2014/04/captain_america_winter_soldier_6.jpg?w=2000&h=1126&crop=1'),(12,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2-yc6AdOrFvqSNWiWNIpxDGLxDdtAa5boJw&s'),(16,'https://www.strangearts.ru/sites/default/files/u1528/607361-thor_odinson_52.jpg'),(17,'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F04%2Flos-angeles-billboard-asks-marvel-bring-tony-stark-back-to-life-001.jpg?q=75&w=800&cbr=1&fit=max'),(19,'https://i.guim.co.uk/img/media/f76e2c99e1d0683752be0bc8708f37a09cb4c124/0_205_3072_1843/master/3072.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ed43e7e895c6008bf35ecfef497e7654'),(20,'https://readrate.com/img/pictures/basic/239/239828/2398288/w816-ce7c3f95.jpg'),(22,'https://queenstudios.shop/cdn/shop/products/black-widow_quarter-statue_620x.jpg?v=1637228837'),(24,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgqF0eAMIJ6MaQHLvYuGkmVXUGehSwZ4yew&s'),(26,'https://variety.com/wp-content/uploads/2021/12/doctor-strange.jpg?w=1000&h=667&crop=1'),(27,'https://media.newyorker.com/photos/5a875e3f33aebd0cab9bab12/master/pass/Brody-Passionate-Politics-Black-Panther.jpg'),(29,'https://preview.redd.it/do-yall-think-well-see-more-of-scarlet-witch-after-secret-v0-dvvfoevgmyxc1.jpeg?width=640&crop=smart&auto=webp&s=460f7561eefd51f81a759f2bc1d29141b8e8cec6'),(31,'https://m.media-amazon.com/images/I/71w2-pEyu5L.jpg'),(35,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOeZNBM_hlR_egcV2eLjzlvP1osrw_WWjCSg&s'),(36,'https://static.independent.co.uk/2024/11/10/13/MixCollage-10-Nov-2024-01-50-PM-7693.jpg?width=1200&height=1200&fit=crop'),(37,'https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/903697/ant-man_marvel_gallery_5c4c1ae87941d.jpg'),(39,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVMOQZxC6a5kbMO08aYcVBIqeaExRiSNazQ&s');
/*!40000 ALTER TABLE `heropic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superpower`
--

DROP TABLE IF EXISTS `superpower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superpower` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superpower`
--

LOCK TABLES `superpower` WRITE;
/*!40000 ALTER TABLE `superpower` DISABLE KEYS */;
INSERT INTO `superpower` VALUES (10,'Enhanced agility'),(6,'Expert martial artist'),(3,'Flight'),(5,'Gamma transformation'),(1,'Genius-level intellect'),(14,'Handsome beard'),(11,'Healing factor'),(15,'Huge velocity'),(4,'Lightning manipulation'),(7,'Master archer'),(13,'Night vision'),(8,'Spider-sense'),(2,'Super strength'),(12,'Teleportation'),(9,'Wall-crawling');
/*!40000 ALTER TABLE `superpower` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-22 15:34:16
