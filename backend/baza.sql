/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.27-MariaDB : Database - tartufi
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tartufi` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_croatian_ci */;

USE `tartufi`;

/*Table structure for table `duljina` */

DROP TABLE IF EXISTS `duljina`;

CREATE TABLE `duljina` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Cijena` float DEFAULT NULL,
  `Duljina` varchar(255) DEFAULT NULL,
  `Velicina_grupe` int(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `duljina` */

/*Table structure for table `korisnik` */

DROP TABLE IF EXISTS `korisnik`;

CREATE TABLE `korisnik` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ime_prezime` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `korisnik` */

insert  into `korisnik`(`Id`,`username`,`password`,`ime_prezime`,`email`) values 
(1,'admin','admin','admin','dario.boc37@gmail.com');

/*Table structure for table `merch` */

DROP TABLE IF EXISTS `merch`;

CREATE TABLE `merch` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Tip` varchar(255) DEFAULT NULL,
  `Cijena` float DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `merch` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `tura` */

/*Table structure for table `vodic` */

DROP TABLE IF EXISTS `vodic`;

CREATE TABLE `vodic` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime_prezime` varchar(255) DEFAULT NULL,
  `Broj_tura` int(255) DEFAULT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `Broj_telefona` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `vodic` */

/*Table structure for table `zakazane_ture` */

DROP TABLE IF EXISTS `zakazane_ture`;

CREATE TABLE `zakazane_ture` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Id_tura` int(255) NOT NULL,
  `Id_korisnik` int(255) NOT NULL,
  `Id_vodic` int(255) NOT NULL,
  `Id_zivotinja` int(255) NOT NULL,
  `DateTime_od` datetime NOT NULL,
  `DateTime_do` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_zakazane_ture_tura` (`Id_tura`),
  KEY `fk_zakazane_ture_korisnik` (`Id_korisnik`),
  KEY `fk_zakazane_ture_vodic` (`Id_vodic`),
  KEY `fk_zakazane_ture_zivotinja` (`Id_zivotinja`),
  CONSTRAINT `fk_zakazane_ture_korisnik` FOREIGN KEY (`Id_korisnik`) REFERENCES `korisnik` (`Id`),
  CONSTRAINT `fk_zakazane_ture_tura` FOREIGN KEY (`Id_tura`) REFERENCES `tura` (`Id`),
  CONSTRAINT `fk_zakazane_ture_vodic` FOREIGN KEY (`Id_vodic`) REFERENCES `vodic` (`Id`),
  CONSTRAINT `fk_zakazane_ture_zivotinja` FOREIGN KEY (`Id_zivotinja`) REFERENCES `zivotinja` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zakazane_ture` */

/*Table structure for table `zivotinja` */

DROP TABLE IF EXISTS `zivotinja`;

CREATE TABLE `zivotinja` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(255) DEFAULT NULL,
  `Vrsta` varchar(255) DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zivotinja` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;