CREATE DATABASE  IF NOT EXISTS `fvstore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fvstore`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: fvstore
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
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `ID_carrito` int NOT NULL AUTO_INCREMENT,
  `FKID_Paquete` int DEFAULT NULL,
  `FKID_Ticket` int DEFAULT NULL,
  PRIMARY KEY (`ID_carrito`),
  KEY `FKID_Paquete` (`FKID_Paquete`),
  KEY `FKID_Ticket` (`FKID_Ticket`),
  CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`FKID_Paquete`) REFERENCES `paquete` (`ID_Paquete`),
  CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`FKID_Ticket`) REFERENCES `ticket` (`ID_Ticket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extrasticket`
--

DROP TABLE IF EXISTS `extrasticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `extrasticket` (
  `ID_ExtrasTicket` int NOT NULL AUTO_INCREMENT,
  `ClaseExtra` varchar(100) DEFAULT NULL,
  `CostoExtra` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_ExtrasTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extrasticket`
--

LOCK TABLES `extrasticket` WRITE;
/*!40000 ALTER TABLE `extrasticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `extrasticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechasreservadas`
--

DROP TABLE IF EXISTS `fechasreservadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechasreservadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fecha` (`fecha`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `fechasreservadas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`ID_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechasreservadas`
--

LOCK TABLES `fechasreservadas` WRITE;
/*!40000 ALTER TABLE `fechasreservadas` DISABLE KEYS */;
INSERT INTO `fechasreservadas` VALUES (1,'2025-05-29',3),(2,'2025-05-30',2),(3,'2026-09-04',2),(4,'2035-02-05',3),(5,'2035-02-21',3),(6,'2031-03-01',2),(7,'2025-05-28',7),(8,'2025-09-30',10),(9,'2025-09-29',10),(10,'2025-08-21',10),(11,'2025-08-11',10);
/*!40000 ALTER TABLE `fechasreservadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paquete`
--

DROP TABLE IF EXISTS `paquete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paquete` (
  `ID_Paquete` int NOT NULL AUTO_INCREMENT,
  `NombrePaquete` varchar(100) DEFAULT NULL,
  `DetallesPaquete` text,
  `PrecioPaquete` decimal(10,2) DEFAULT NULL,
  `TipoPaquete` enum('Foto','Video') NOT NULL,
  PRIMARY KEY (`ID_Paquete`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paquete`
--

LOCK TABLES `paquete` WRITE;
/*!40000 ALTER TABLE `paquete` DISABLE KEYS */;
INSERT INTO `paquete` VALUES (1,'Diamante 1','1 álbum de 10 panorámicas 20x10 (20 lados con diseño personalizado), 100 fotografías 4x6 con álbum incluido, 20 fotografías 5x7, 3 fotografías 11x14, 1 fotografía 16x20 con cuadro incluido, Tiempo de sesion: 1 hora',1000.00,'Foto'),(2,'Diamante 2 (Panorámico)','120 fotografías tamaño 4x6 con albúm, 20 fotografías 5x7 con 1 mini álbum, 1 albúm de 15 páginas panorámico tamaño 11x14 con diseño personalizado, 4 fotografías tamaño 11x14, 1 fotografía tamaño 20x24 montada en base rígida con cuadro, 150 archivos digitales de uso libre en usb, Tiempo de sesion: 2 horas',1500.00,'Foto'),(3,'Diamante 3 (Plus)','120 fotografías tamaño 5x7 con caja de madera artesanal personalizada, 1 albúm de 15 páginas panorámico tamaño 12x16 con diseño personalizado y portada de acrílico, 5 fotografías tamaño 11x14, 1 fotografía tamaño 16x20 con cuadro incluido (a elegir), Sesión previa al evento, 1 fotografía tamaño 20x24 impresa en formato canvas, 250 archivos digitales de uso libre en usb, Tiempo de sesion: 3 horas',2100.00,'Foto'),(4,'Paquete ensueño','01 álbum de 15 páginas panorámicas tamaño 12x36\" con diseño personalizado y portada de acrílico, 120 fotografías tamaño 5x7\" con álbum con caja de madera artesanal personalizada, 01 mini álbum incrustado, 01 fotografía tamaño 20x24\" con cuadro incluido o canvas, Sesión previa al evento, 01 fotografía tamaño 20x24 impresa en formato canvas, Video shortfilm 15-20 minutos, Todos los archivos digitales uso libre en USB, Tiempo de sesion: 3 horas',3500.00,'Foto'),(5,'Video Cinematográfico','Un USB que contienen el video original en calidad HD, 2 estilos de ediciones: Short film 15-20 min y escenas extras del evento long film 1:30 hrs, Servicio de cámaras HD de alta gama, mayor detalle y cantidad de escenas grabadas por dos videografos en estilo cinematográfico, Herramientas cinematográficas: riel estabilizador, variedad de lentes y micrófono inalámbrico, Tiempo de sesion: 1 hora 30 minutos',1800.00,'Video'),(6,'Producción Estrella','1 USB que contiene el video original en calidad HD, 2 estilos de ediciones: Short Film 15-20 min y escenas extras del evento Long Film 1:30 hrs, Video trailer 1-2 minutos, Servicio de cámaras HD de alta gama, Mayor detalle y cantidad de escenas grabadas por dos videógrafos en estilo cinematográfico, Herramientas cinematográficas: riel estabilizador, variedad de lentes y micrófono inalámbrico, Dron, Producción de foto animada, Álbum estrella (digital), Tiempo de sesion: 3 horas',3400.00,'Video'),(7,'Videos Conceptuales','Video short film 15-20 minutos, Video tradicional 60 minutos, Video teaser highligth de 3-5 minutos, Video trailer 1-2 minutos para compartir en social media',400.00,'Video');
/*!40000 ALTER TABLE `paquete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rticket_extrasticket`
--

DROP TABLE IF EXISTS `rticket_extrasticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rticket_extrasticket` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FKID_Ticket` int DEFAULT NULL,
  `FKID_ExtrasTicket` int DEFAULT NULL,
  `CantidadExtra` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKID_Ticket` (`FKID_Ticket`),
  KEY `FKID_ExtrasTicket` (`FKID_ExtrasTicket`),
  CONSTRAINT `rticket_extrasticket_ibfk_1` FOREIGN KEY (`FKID_Ticket`) REFERENCES `ticket` (`ID_Ticket`),
  CONSTRAINT `rticket_extrasticket_ibfk_2` FOREIGN KEY (`FKID_ExtrasTicket`) REFERENCES `extrasticket` (`ID_ExtrasTicket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rticket_extrasticket`
--

LOCK TABLES `rticket_extrasticket` WRITE;
/*!40000 ALTER TABLE `rticket_extrasticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `rticket_extrasticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ID_Ticket` int NOT NULL AUTO_INCREMENT,
  `CorreoTicket` varchar(100) DEFAULT NULL,
  `FechaTicket` date DEFAULT NULL,
  `HoraTicket` time DEFAULT NULL,
  `DireccionTicket` text,
  `ComentarioTicket` text,
  `FKID_Usuario` int DEFAULT NULL,
  `FKID_Paquete` int DEFAULT NULL,
  `TotalTicket` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_Ticket`),
  KEY `FKID_Usuario` (`FKID_Usuario`),
  KEY `FKID_Paquete` (`FKID_Paquete`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`FKID_Usuario`) REFERENCES `usuario` (`ID_Usuario`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`FKID_Paquete`) REFERENCES `paquete` (`ID_Paquete`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketm`
--

DROP TABLE IF EXISTS `ticketm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketm` (
  `ID_TicketM` int NOT NULL AUTO_INCREMENT,
  `CorreoTicketM` varchar(100) DEFAULT NULL,
  `FechaTicketM` date DEFAULT NULL,
  `HoraTicketM` time DEFAULT NULL,
  `DireccionTicketM` text,
  `ComentarioTicketM` text,
  `FKID_Usuario` int DEFAULT NULL,
  `Npaquetes` text,
  `TotalTicketM` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID_TicketM`),
  KEY `FKID_Usuario` (`FKID_Usuario`),
  CONSTRAINT `ticket_M_1` FOREIGN KEY (`FKID_Usuario`) REFERENCES `usuario` (`ID_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketm`
--

LOCK TABLES `ticketm` WRITE;
/*!40000 ALTER TABLE `ticketm` DISABLE KEYS */;
INSERT INTO `ticketm` VALUES (1,'christopher_21@live.com.mx','2025-08-11','13:30:00','Av. Lago mead 205','Prueba',10,'[{\"nombre\":\"Paquete ensueño\",\"detalles\":\"01 álbum de 15 páginas panorámicas tamaño 12x36\\\" con diseño personalizado y portada de acrílico, 120 fotografías tamaño 5x7\\\" con álbum con caja de madera artesanal personalizada, 01 mini álbum incrustado, 01 fotografía tamaño 20x24\\\" con cuadro incluido o canvas, Sesión previa al evento, 01 fotografía tamaño 20x24 impresa en formato canvas, Video shortfilm 15-20 minutos, Todos los archivos digitales uso libre en USB, Tiempo de sesion: 3 horas\",\"precio\":\"3500.00\",\"tipo\":\"Foto\"},{\"nombre\":\"Producción Estrella\",\"detalles\":\"1 USB que contiene el video original en calidad HD, 2 estilos de ediciones: Short Film 15-20 min y escenas extras del evento Long Film 1:30 hrs, Video trailer 1-2 minutos, Servicio de cámaras HD de alta gama, Mayor detalle y cantidad de escenas grabadas por dos videógrafos en estilo cinematográfico, Herramientas cinematográficas: riel estabilizador, variedad de lentes y micrófono inalámbrico, Dron, Producción de foto animada, Álbum estrella (digital), Tiempo de sesion: 3 horas\",\"precio\":\"3400.00\",\"tipo\":\"Video\"}]',6900.00);
/*!40000 ALTER TABLE `ticketm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `ID_Usuario` int NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(50) DEFAULT NULL,
  `ApellidoUsuario` varchar(50) DEFAULT NULL,
  `Contrasenia` varchar(100) DEFAULT NULL,
  `Gamertag` varchar(50) DEFAULT NULL,
  `RolUsuario` enum('cliente','editor','admin') NOT NULL DEFAULT 'cliente',
  PRIMARY KEY (`ID_Usuario`),
  UNIQUE KEY `Gamertag` (`Gamertag`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'usuario','normal','12345','clientecomun','cliente'),(2,'editor','causa','67890','elquelemueve','editor'),(3,'adminis','trador','elmeromero','eltodopoderoso','admin'),(4,'otro','cliente','23456','unoextra','cliente'),(5,'algun','men','legustamueve','mueveelbote','editor'),(6,'mada','gascar','maurice','reyjulien','admin'),(7,'tes','ting','54321','eldeprueba','cliente'),(8,'tes','ter','65432','eldeprueba2','editor'),(9,'Latos','Tada','negro','ral','admin'),(10,'Christopher','Jauregui','Jauregui1','JaureguiGlez','cliente');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-29 13:40:46
