/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - tartufi
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tartufi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `tartufi`;

/*Table structure for table `duljina` */

DROP TABLE IF EXISTS `duljina`;

CREATE TABLE `duljina` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Cijena` float DEFAULT NULL,
  `Duljina` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `duljina` */

insert  into `duljina`(`Id`,`Cijena`,`Duljina`) values 
(1,100,'Kratka'),
(2,150,'Srednja'),
(3,200,'Duga');

/*Table structure for table `forum` */

DROP TABLE IF EXISTS `forum`;

CREATE TABLE `forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_korisnik` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `animal` char(1) DEFAULT NULL,
  `img_pth` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_korisnik` (`id_korisnik`),
  CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`id_korisnik`) REFERENCES `korisnik` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `forum` */

insert  into `forum`(`id`,`id_korisnik`,`message`,`animal`,`img_pth`) values 
(1,1,'a','a','a');

/*Table structure for table `korisnik` */

DROP TABLE IF EXISTS `korisnik`;

CREATE TABLE `korisnik` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ime_prezime` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `korisnik` */

insert  into `korisnik`(`Id`,`username`,`password`,`ime_prezime`,`email`) values 
(1,'admin','admin','admin','dario.boc37@gmail.com'),
(2,'test','test','test','test@test'),
(3,'a','16a36e86f6fed5d465ff332511a0ce1a863b55d364b25a7cdaa25db19abf9648','a a','a@a'),
(4,'aa','16a36e86f6fed5d465ff332511a0ce1a863b55d364b25a7cdaa25db19abf9648','a a','a1@a'),
(8,'marko123','b46ea4ca5b6cb70b2965d8483a1ba85b92644fe9f9e04a860c891d92589a1cf4','marko marko','abramovi.marko@gmail.com');

/*Table structure for table `merch` */

DROP TABLE IF EXISTS `merch`;

CREATE TABLE `merch` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Tip` varchar(255) DEFAULT NULL,
  `Cijena` float DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `merch` */

insert  into `merch`(`Id`,`Tip`,`Cijena`,`Opis`) values 
(1,'T-shirt',20,'High quality cotton t-shirt');

/*Table structure for table `tura` */

DROP TABLE IF EXISTS `tura`;

CREATE TABLE `tura` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Id_duljine` int(255) NOT NULL,
  `Ime` varchar(255) DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_tura_duljina` (`Id_duljine`),
  CONSTRAINT `fk_tura_duljina` FOREIGN KEY (`Id_duljine`) REFERENCES `duljina` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `tura` */

insert  into `tura`(`Id`,`Id_duljine`,`Ime`,`Opis`) values 
(1,1,'Truffle Hunt Adventure','A fun truffle hunting tour'),
(3,1,'Safari Adventure','An exciting safari tour through the national park.'),
(5,1,'Safari Adventure','An exciting safari tour through the national park.'),
(6,1,'updated tura name','updated tura opis'),
(7,1,'New Tura','Opis'),
(8,2,'test','test opis');

/*Table structure for table `vodic` */

DROP TABLE IF EXISTS `vodic`;

CREATE TABLE `vodic` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime_prezime` varchar(255) DEFAULT NULL,
  `Broj_tura` int(255) DEFAULT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `Broj_telefona` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `vodic` */

insert  into `vodic`(`Id`,`Ime_prezime`,`Broj_tura`,`opis`,`Broj_telefona`) values 
(1,'Marko Kovac',5,'Experienced truffle hunting guide','123-456-789');

/*Table structure for table `zakazane_ture` */

DROP TABLE IF EXISTS `zakazane_ture`;

CREATE TABLE `zakazane_ture` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Id_tura` int(255) NOT NULL,
  `Id_korisnik` int(255) NOT NULL,
  `Id_vodic` int(255) NOT NULL,
  `Id_zivotinja` int(255) NOT NULL,
  `datum` date DEFAULT NULL,
  `vrijeme_ture` int(11) DEFAULT NULL,
  `velicina_grupe` varchar(255) DEFAULT NULL,
  `cijena_ture` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_zakazane_ture_tura` (`Id_tura`),
  KEY `fk_zakazane_ture_korisnik` (`Id_korisnik`),
  KEY `fk_zakazane_ture_vodic` (`Id_vodic`),
  KEY `fk_zakazane_ture_zivotinja` (`Id_zivotinja`),
  CONSTRAINT `fk_zakazane_ture_korisnik` FOREIGN KEY (`Id_korisnik`) REFERENCES `korisnik` (`Id`),
  CONSTRAINT `fk_zakazane_ture_tura` FOREIGN KEY (`Id_tura`) REFERENCES `tura` (`Id`),
  CONSTRAINT `fk_zakazane_ture_vodic` FOREIGN KEY (`Id_vodic`) REFERENCES `vodic` (`Id`),
  CONSTRAINT `fk_zakazane_ture_zivotinja` FOREIGN KEY (`Id_zivotinja`) REFERENCES `zivotinja` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zakazane_ture` */

insert  into `zakazane_ture`(`Id`,`Id_tura`,`Id_korisnik`,`Id_vodic`,`Id_zivotinja`,`datum`,`vrijeme_ture`,`velicina_grupe`,`cijena_ture`) values 
(2,1,1,1,1,'2024-10-25',9,'2',NULL),
(3,3,1,1,1,NULL,9,'Za parove',120),
(4,1,8,1,1,'2024-11-21',10,'Za parove',120);

/*Table structure for table `zivotinja` */

DROP TABLE IF EXISTS `zivotinja`;

CREATE TABLE `zivotinja` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(255) DEFAULT NULL,
  `Vrsta` varchar(255) DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zivotinja` */

insert  into `zivotinja`(`Id`,`Ime`,`Vrsta`,`Opis`) values 
(1,'Rex','Pas','Truffle hunting dog');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
