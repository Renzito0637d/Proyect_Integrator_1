-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ucvincidencia
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `ucvincidencia`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ucvincidencia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `ucvincidencia`;

--
-- Table structure for table `assign_staff`
--

DROP TABLE IF EXISTS `assign_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assign_staff` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `assigned_user` varchar(255) DEFAULT NULL,
  `date_solution` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `incident_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsoay52vbqmyma3tdbo2e4bda6` (`incident_id`),
  KEY `FKnblnyenku6q1anm1n41hbfcs6` (`user_id`),
  CONSTRAINT `FKnblnyenku6q1anm1n41hbfcs6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKsoay52vbqmyma3tdbo2e4bda6` FOREIGN KEY (`incident_id`) REFERENCES `incident` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assign_staff`
--

LOCK TABLES `assign_staff` WRITE;
/*!40000 ALTER TABLE `assign_staff` DISABLE KEYS */;
INSERT INTO `assign_staff` VALUES (1,'anita1','2025-07-29','En proceso de solucion.','2025-07-17 00:36:33.000000','EN PROCESO',1,1),(2,'anita1','2025-07-30','Derivado','2025-07-17 00:37:37.000000','DERIVADO',3,2),(3,'anita1','2025-07-31','Solucionado','2025-07-17 00:38:49.000000','ATENDIDO',2,3);
/*!40000 ALTER TABLE `assign_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prioritylevel` varchar(255) DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Software','Malware en la pc','Alto',NULL,'Viruz'),(2,'Software','El sistema operativo no arranca correctamente, impidiendo el acceso al equipo del usuario.','Alto',NULL,'Fallo en el sistema operativo'),(3,'Hardware','El equipo muestra una pantalla azul al arrancar, lo que sugiere posibles problemas con la memoria RAM o el disco duro.','Medio',NULL,'Pantalla azul al iniciar'),(4,'Software','Una aplicación crítica para el trabajo se congela o cierra inesperadamente durante su uso.','Medio',NULL,'Aplicación no responde'),(5,'Hardware','El sistema no reconoce el teclado conectado, dificultando la interacción del usuario con el equipo.','Bajo',NULL,'Teclado no detectado'),(6,'Software','La última actualización del sistema o de una aplicación no se ha completado correctamente, generando errores.','Medio',NULL,'Actualización fallida'),(7,'Hardware','El equipo se sobrecalienta en poco tiempo, lo que puede causar apagados repentinos y daño al hardware.','Alto',NULL,'Sobrecalentamiento del equipo'),(8,'Hardware','El equipo pierde constantemente la conexión a la red, afectando la continuidad del trabajo remoto o en línea.','Alto',NULL,'Conexión a red inestable'),(9,'Software','Los usuarios no pueden acceder al sistema debido a errores de autenticación o bloqueo de cuentas.','Medio',NULL,'Error de inicio de sesión'),(10,'Hardware','Se escucha un ruido anormal proveniente del ventilador del equipo, lo que podría indicar suciedad o daño interno.','Bajo',NULL,'Ruido en el ventilador'),(11,'Hardware','La impresora conectada en red no responde a las solicitudes de impresión desde varios equipos.','Medio',NULL,'Problemas con impresora de red');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deparment`
--

DROP TABLE IF EXISTS `deparment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deparment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `classroom` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `registered_user` varchar(255) DEFAULT NULL,
  `tower` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deparment`
--

LOCK TABLES `deparment` WRITE;
/*!40000 ALTER TABLE `deparment` DISABLE KEYS */;
INSERT INTO `deparment` VALUES (1,'1','A1201','12','Laboratorio','2025-07-16 19:22:22.000000','anita1','A'),(2,'4','A0504','5','Laboratorio','2025-07-16 19:22:29.000000','anita1','A'),(3,'1','A0501','5','Laboratorio','2025-07-16 19:22:45.000000','anita1','A'),(4,'3','A0503','5','Laboratorio','2025-07-16 19:22:55.000000','anita1','A'),(5,'2','A0502','5','Laboratorio','2025-07-16 19:23:06.000000','anita1','A'),(6,'8','B0808','8','Laboratorio','2025-07-16 19:23:17.000000','anita1','B'),(7,'7','B0807','8','Laboratorio','2025-07-16 19:23:28.000000','anita1','B'),(8,'10','A0810','8','Salon','2025-07-16 19:23:43.000000','anita1','A'),(9,'15','B0315','3','Salon','2025-07-16 19:23:53.000000','anita1','B'),(10,'1','B0301','3','Salon','2025-07-16 19:24:00.000000','anita1','B'),(11,'5','B0405','4','Salon','2025-07-16 19:24:11.000000','anita1','B'),(12,'12','B0612','6','Salon','2025-07-16 19:24:17.000000','anita1','B');
/*!40000 ALTER TABLE `deparment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incident`
--

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incident` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `area` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `inciden_date` date DEFAULT NULL,
  `prioritylevel` varchar(255) DEFAULT NULL,
  `registered_date` datetime(6) DEFAULT NULL,
  `registered_user` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `deparment_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcsiofvrmp929qa3p851yu2k3v` (`category_id`),
  KEY `FKmbre1m7d9bf1h28q85wyo3w0n` (`deparment_id`),
  KEY `FK9o12oocjk2ge9dpt2t983hxes` (`user_id`),
  CONSTRAINT `FK9o12oocjk2ge9dpt2t983hxes` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKcsiofvrmp929qa3p851yu2k3v` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKmbre1m7d9bf1h28q85wyo3w0n` FOREIGN KEY (`deparment_id`) REFERENCES `deparment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident`
--

LOCK TABLES `incident` WRITE;
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
INSERT INTO `incident` VALUES (1,'A0501','Se congela y no abre vscode en todas las computadoras','2025-07-09','Medio','2025-07-17 00:35:03.000000','anita1',4,3,1),(2,'B0807','Salio humo de la pc de docente','2025-07-01','Alto','2025-07-17 00:35:37.000000','anita1',7,7,1),(3,'A0504','Internet lenta','2025-07-04','Alto','2025-07-17 00:36:01.000000','anita1',8,2,1);
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `actions` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `resolution_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `assign_staff_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK84k28stxy1334sii8kgomrh2i` (`assign_staff_id`),
  KEY `FKq50wsn94sc3mi90gtidk0k34a` (`user_id`),
  CONSTRAINT `FKfpxe3i3djcm37xoo6y7fb38wm` FOREIGN KEY (`assign_staff_id`) REFERENCES `assign_staff` (`id`),
  CONSTRAINT `FKq50wsn94sc3mi90gtidk0k34a` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'Actualizacion de hardware','Computadora reparado y solucion a la sobrecalentacion','2025-07-31','Terminado',3,1);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'','Admi','a@a.a','asd','as','anita1','$2a$10$GgKuRzo0Bus8OnPgs5Cq.OhTt8Ocz.erFsX9QYA8T1lDerR52p3QC','123123123','ADMIN'),(2,'','Redes','pepe.acuña','Pepe','Acuña','pepe.acuña','$2a$10$hAzXbwV409GNot1oigX1s.j0cwU0PJXLGUKc4PbGhShTxZOPK7IGi','919348194','ADMIN'),(3,'','Soporte','ñoño.lopez','Ñoño','Lopez','ñoño.lopez','$2a$10$cYjt3s2kyroZPbGWRVmL9OyygylQJrYu1l/kL6ZfjI1Bi1Ro5iXWO','978124781','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-16 19:40:03
