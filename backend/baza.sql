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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `forum` */

insert  into `forum`(`id`,`id_korisnik`,`message`,`animal`,`img_pth`) values 
(1,1,'Imali smo fantastično vrijeme na ovoj turi! Ne samo da smo pronašli tartufe, već smo uživali i u prirodi i zabavi. Toplo preporučujem!','p','imgs/reviews/review4.jpg'),
(30,16,'Ovo je bilo super iskustvo i preporučamo svima!!!','s','imgs/reviews/review6.jpg');

/*Table structure for table `korisnik` */

DROP TABLE IF EXISTS `korisnik`;

CREATE TABLE `korisnik` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ime_prezime` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `korisnik` */

insert  into `korisnik`(`Id`,`username`,`password`,`ime_prezime`,`email`) values 
(1,'admin','admin','admin','dario.boc37@gmail.com'),
(2,'test','test','test','test@test'),
(3,'a','16a36e86f6fed5d465ff332511a0ce1a863b55d364b25a7cdaa25db19abf9648','a a','a@a'),
(4,'aa','16a36e86f6fed5d465ff332511a0ce1a863b55d364b25a7cdaa25db19abf9648','a a','a1@a'),
(8,'marko12','b46ea4ca5b6cb70b2965d8483a1ba85b92644fe9f9e04a860c891d92589a1cf4','Darko marko','abramovi.marko@gmail.com'),
(9,'dario123','36d086f3102b2e9d04877d2dd05b49322dd701b8cbed7f0374be64fe1d220a01','d d','d@d'),
(10,'dario234','36d086f3102b2e9d04877d2dd05b49322dd701b8cbed7f0374be64fe1d220a01','dario234 d','sadas@asdasd'),
(11,'test1','8a863b145dc6e4ed7ac41c08f7536c476ebac7509e028ed2b49f8bd5a3562b9f','t t','t1@t'),
(12,'test2','32e6e1e134f9cc8f14b05925667c118d19244aebce442d6fecd2ac38cdc97649','t t','t2@t'),
(13,'test3','68235f4551b9c6423df2af7ead63c90cdd4201ac08525bc3a41cd4755c6c86cb','t t','t3@t'),
(14,'test4','b9cca56a720f2beee61f2e744ab3d20a95772a4315d18c5eee251a465f078012','t t','t4@t'),
(15,'marko123','b46ea4ca5b6cb70b2965d8483a1ba85b92644fe9f9e04a860c891d92589a1cf4','Marko Rajić','rajic.marko@gmail.com'),
(16,'mmmmarko123','b46ea4ca5b6cb70b2965d8483a1ba85b92644fe9f9e04a860c891d92589a1cf4','Darko Abrahimović','abramovicc@gmail.com');

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `tura` */

insert  into `tura`(`Id`,`Id_duljine`,`Ime`,`Opis`) values 
(9,1,'Brza Oaza','Ova tura traje samo jedan sat i idealna je za sve koji žele uživati u prirodi bez dugih šetnji. Uživajte u ljepotama prirode u kratkom vremenskom periodu, s vodičem koji će vam otkriti sve tajne okolnih predjela.'),
(10,1,'Zeleni Pobjeg','Pogodna za one koji žele brzo obići najvažnije znamenitosti u okolici. Tura traje samo 1,5 sata, ali ćete imati priliku upoznati lokalnu povijest i kulturu uz zanimljive priče vodiča.'),
(11,1,'Brzi Vodič','Brza tura koja traje do sat vremena i pruža vam najbitnije informacije o prirodnim ljepotama našeg kraja. Savršeno za one koji nemaju puno vremena, ali žele osjetiti duh mjesta.'),
(12,1,'Tajna Prirode','Ova tura traje samo 45 minuta i uključuje šetnju kroz najljepše dijelove parka. Uživajte u jednostavnoj, ali informativnoj vožnji kroz prirodu s vodičem koji će vas upoznati s florom i faunom.'),
(13,1,'Zlatna Šetnja','Savršen izbor za one koji žele brzo upoznati najpoznatije lokalne znamenitosti. Tura traje samo jedan sat, a vodič će vas uputiti na najvažnije točke koje morate vidjeti u ovom području.'),
(14,2,'Kultura i Priroda','Tura koja traje oko 2 sata i vodi vas kroz povijesne i kulturne znamenitosti grada. Upoznat ćete se s lokalnom tradicijom, arhitekturom i uživati u prirodnim ljepotama koje okružuju grad.'),
(15,2,'Tajanstveni Grad','Ova tura traje oko 2 sata i vodi vas kroz najpoznatije parkove i muzeje grada. Kroz interaktivne aktivnosti s vodičem, imat ćete priliku naučiti puno o povijesti i kulturi regije.'),
(16,2,'Putovanje Kroz Vrijeme','Za sve ljubitelje prirode, ova tura traje 2 sata i uključuje laganu šetnju kroz šumu s vodičem. Saznat ćete više o biljkama, životinjama i povijesti ovog prostora.'),
(17,2,'Lokalni Šarm','Pružite sebi uživanje u 2 sata istraživanja grada i njegovih tajni. Na ovoj turi dobit ćete detaljan pregled povijesti, kulture i znamenitosti s stručnim vodičem.'),
(18,2,'Tajne Galerija','Tura koja traje 2 sata, uključuje posjet lokalnim muzeju i umjetničkoj galeriji. Upoznajte se s poviješću i kulturom ovog grada kroz impresivne kolekcije umjetničkih djela i izložbi.'),
(19,3,'Cjelodnevni Raj','Ova tura traje 3 sata i vodi vas kroz najveće atrakcije regije, uključujući povijesna mjesta, muzeje i prekrasne prirodne lokacije. Uživajte u opuštajućem danu s vodičem koji će vas educirati o svemu što posjećujete.'),
(20,3,'Vrhunski Doživljaj','Za sve koji žele potpuno istražiti grad i okolna područja, ova tura traje 3 sata i uključuje posjet svim važnim znamenitostima, povijesnim spomenicima i kulturnim točkama.'),
(21,3,'Izgubljeni Svjetovi','Ova tura traje 3 sata i pruža detaljan obilazak parka prirode s vodičem. Uz opuštajuću šetnju, naučit ćete sve o ekosustavima i specifičnostima ove jedinstvene prirodne sredine.'),
(22,3,'Tajna Gradskih Ulica','Savršen način za upoznavanje lokalne povijesti kroz obilazak znamenitosti koje datiraju iz srednjeg vijeka. Tura traje 3 sata i uključuje stručnu pratnju kroz stare ulice i gradsku jezgru.'),
(23,3,'Povijest i Priroda','Za ljubitelje prirode i povijesti, ova 3-satna tura vodi vas kroz najljepše prirodne krajolike i arheološke lokalitete. Otkrijte skrivene ljepote našeg kraja i uživajte u svakom trenutku ove ture.');

/*Table structure for table `vodic` */

DROP TABLE IF EXISTS `vodic`;

CREATE TABLE `vodic` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime_prezime` varchar(255) DEFAULT NULL,
  `Broj_tura` int(255) DEFAULT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `Broj_telefona` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `vodic` */

insert  into `vodic`(`Id`,`Ime_prezime`,`Broj_tura`,`opis`,`Broj_telefona`) values 
(2,'Marko Marković',40,'Marko Marković je iskusan vodič sa više od 10 godina iskustva u organiziranju tura širom Hrvatske. Posjeduje široko znanje o kulturnoj baštini, povijesti i prirodnim ljepotama zemlje. Kroz svoj rad, Marko se ističe svojim pristupom koji je uvijek personal','0912345678'),
(3,'Ana Anić',42,'Ana Anić je certificirani vodič s dubokim razumijevanjem hrvatske povijesti i tradicije. Osim što vodi obilazak kulturnih znamenitosti, Ana se specijalizirala za turističke ture po nacionalnim parkovima. Njezina strast prema prirodi i povijesti čini svaki','0987654321'),
(4,'Ivan Ivanić',45,'Ivan Ivanić je vodič koji se specijalizirao za povijesne ture po Dubrovniku i okolici. Sa velikim iskustvom i stručnošću u povijesti, Ivan vodi turiste kroz uske ulice starog grada, objašnjavajući najvažnije trenutke iz prošlosti. Njegova ljubav prema ovo','0911122334'),
(5,'Petra Petrović',48,'Petra Petrović je vodič koji vodi ture širom Hrvatske, od Zagreba do Istre. S posebnim naglaskom na kulturnu baštinu, Petra je specijalizirana za vodičke ture po muzeju, galerijama, te kulturnim i povijesnim znamenitostima. Njena ljubav prema umjetnosti i','0922334455'),
(6,'Jure Jurić',50,'Jure Jurić je iskusni vodič s fokusom na avanturističke ture, posebno one vezane uz planinarenje i biciklizam. S više od 15 godina iskustva, Jure je najbolji izbor za one koji žele istražiti netaknutu prirodu Hrvatske. Bilo da se radi o planiranim izletim','0953345566');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zakazane_ture` */

insert  into `zakazane_ture`(`Id`,`Id_tura`,`Id_korisnik`,`Id_vodic`,`Id_zivotinja`,`datum`,`vrijeme_ture`,`velicina_grupe`,`cijena_ture`) values 
(7,16,8,3,4,'2024-11-22',15,'Za parove',170),
(8,16,8,4,4,'2024-11-21',9,'Za parove',170),
(9,16,8,5,9,'2024-11-28',9,'Grupa 3-5',200),
(10,16,16,6,7,'2024-11-22',11,'Teambuilding',250);

/*Table structure for table `zivotinja` */

DROP TABLE IF EXISTS `zivotinja`;

CREATE TABLE `zivotinja` (
  `Id` int(255) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(255) DEFAULT NULL,
  `Vrsta` varchar(255) DEFAULT NULL,
  `Opis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

/*Data for the table `zivotinja` */

insert  into `zivotinja`(`Id`,`Ime`,`Vrsta`,`Opis`) values 
(2,'Maks','Pas','Maks je veseli pas koji voli igrati lopticu i trčati po parku.'),
(3,'Nina','Pas','Nina je inteligentna i odana, uvijek uz svoju obitelj.'),
(4,'Reks','Pas','Reks je snažan pas čuvar, poznat po svojoj hrabrosti i zaštitničkoj prirodi.'),
(5,'Luna','Pas','Luna je mala i razigrana, obožava duge šetnje i pseće poslastice.'),
(6,'Karlo','Pas','Karlo je prijateljski raspoložen pas koji se dobro slaže s djecom.'),
(7,'Rudolf','Svinja','Rudolf je neobična svinja koja voli društvo i obožava jesti jabuke.'),
(8,'Pepica','Svinja','Pepica je znatiželjna svinja koja uživa kopati po zemlji u potrazi za poslasticama.'),
(9,'Dunja','Svinja','Dunja je ljubazna svinja koja voli sunčanje i spavanje u sjenama.'),
(10,'Oskar','Svinja','Oskar je mladunče svinje koje je uvijek u pokretu i istražuje svoju okolinu.'),
(11,'Lijana','Svinja','Lijana je mala svinja koja uživa u blatu i igri s ostalim svinjama.');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
