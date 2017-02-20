-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 17 Février 2017 à 11:39
-- Version du serveur :  10.1.16-MariaDB
-- Version de PHP :  5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `qcm-nodejs`
--

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `intitule` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `question`
--

INSERT INTO `question` (`id`, `intitule`) VALUES
(2, 'Qu''est ce qui est petit et Marron ?'),
(3, 'Cheval blanc'),
(4, 'A cours de question ?');

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

CREATE TABLE `reponse` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `intitule` text NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `reponse`
--

INSERT INTO `reponse` (`id`, `intitule`, `question_id`) VALUES
(7, 'Un arbre', 2),
(8, 'Un marron ', 2),
(9, 'Un petit marron', 2),
(10, 'Blanc', 3),
(11, 'Bleu', 3),
(12, 'Oui', 4),
(13, 'Non', 4);

-- --------------------------------------------------------

--
-- Structure de la table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `rooms`
--

INSERT INTO `rooms` (`id`, `name`) VALUES
(1, 'dev'),
(2, 'test');

-- --------------------------------------------------------

--
-- Structure de la table `room_questions`
--

CREATE TABLE `room_questions` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `qOrder` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `room_questions`
--

INSERT INTO `room_questions` (`id`, `room_id`, `question_id`, `qOrder`) VALUES
(8, 1, 1, 2),
(7, 1, 1, 1),
(6, 1, 1, 0),
(36, 2, 3, 1),
(35, 2, 4, 0);

--
-- Index pour les tables exportées
--

-- --
-- -- Index pour la table `question`
-- --
-- ALTER TABLE `question`
--   ADD PRIMARY KEY (`id`);
--
-- --
-- -- Index pour la table `reponse`
-- --
-- ALTER TABLE `reponse`
--   ADD PRIMARY KEY (`id`);
--
-- --
-- -- Index pour la table `rooms`
-- --
-- ALTER TABLE `rooms`
--   ADD PRIMARY KEY (`id`);
--
-- --
-- -- Index pour la table `room_questions`
-- --
-- ALTER TABLE `room_questions`
--   ADD PRIMARY KEY (`id`);
--
-- --
-- -- AUTO_INCREMENT pour les tables exportées
-- --
--
-- --
-- -- AUTO_INCREMENT pour la table `question`
-- --
-- ALTER TABLE `question`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
-- --
-- -- AUTO_INCREMENT pour la table `reponse`
-- --
-- ALTER TABLE `reponse`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
-- --
-- -- AUTO_INCREMENT pour la table `rooms`
-- --
-- ALTER TABLE `rooms`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
-- --
-- -- AUTO_INCREMENT pour la table `room_questions`
-- --
-- ALTER TABLE `room_questions`
--   MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
