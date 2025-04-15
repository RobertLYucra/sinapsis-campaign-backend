/*
 Navicat Premium Dump SQL

 Source Server         : Cpanel
 Source Server Type    : MySQL
 Source Server Version : 100621 (10.6.21-MariaDB-cll-lve)
 Source Host           : 208.109.20.5:3306
 Source Schema         : BD_DynamoSupport_PROD

 Target Server Type    : MySQL
 Target Server Version : 100621 (10.6.21-MariaDB-cll-lve)
 File Encoding         : 65001

 Date: 15/04/2025 04:23:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;



-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES (1, 'Claro', 1);
INSERT INTO `customers` VALUES (2, 'Indra', 1);
INSERT INTO `customers` VALUES (3, 'Movistar', 1);


-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d72eb2a5bbff4f2533a5d4caff9`(`customer_id` ASC) USING BTREE,
  CONSTRAINT `FK_d72eb2a5bbff4f2533a5d4caff9` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (2, 1, 'Carlos sanchez', 1);
INSERT INTO `user` VALUES (3, 2, 'Susana Durán', 1);
INSERT INTO `user` VALUES (4, 1, 'Robert Lujan Yucra', 1);

SET FOREIGN_KEY_CHECKS = 1;



-- ----------------------------
-- Table structure for campaigns
-- ----------------------------
DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE `campaigns`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `process_date` date NOT NULL,
  `process_hour` time NOT NULL,
  `process_status` int NOT NULL DEFAULT 1,
  `phone_list` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `message_text` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_45455b21195721407322ddce007`(`user_id` ASC) USING BTREE,
  CONSTRAINT `FK_45455b21195721407322ddce007` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of campaigns
-- ----------------------------
INSERT INTO `campaigns` VALUES (30, 3, 'Campaña de Verano', '2025-04-15', '08:11:29', 3, '1234567890,0987654321', '¡Hola! Esta es una promoción exclusiva para ti.');
INSERT INTO `campaigns` VALUES (31, 4, '¡Campañas de Ciber Wow!', '2025-04-15', '08:11:43', 3, '9774661,1478523,12365478,147852,14587', '¡Campañas de Ciber Wow!');
INSERT INTO `campaigns` VALUES (32, 3, 'Cambio de Número', '2025-04-15', '03:23:38', 3, '987456,147852,1236547,7412587,147852', 'Cambio de Número');
INSERT INTO `campaigns` VALUES (33, 4, 'Cambios Generales', '2025-04-15', '03:27:22', 3, '987456,14785,12654,12664,14785,1485,', 'Cambios Generales');
INSERT INTO `campaigns` VALUES (34, 2, 'Cambios generales - 13', '2025-04-15', '03:34:25', 3, '14852,147852,123654,125874,148521', 'Cambios generales - 12');
INSERT INTO `campaigns` VALUES (35, 4, 'Semana Santa ayacuchana', '2025-04-15', '03:34:39', 3, '98745631,147852,12563,25871', 'Semana Santa ayacuchana');
INSERT INTO `campaigns` VALUES (36, 3, 'Cambios generales de Verano', '2025-04-15', '09:11:26', 3, '17852,1478523,36741,17852,1478523,36741,17852,1478523,36741,', 'Cambios generales de Verano');
INSERT INTO `campaigns` VALUES (37, 2, 'Señales de Vida', '2025-04-15', '09:14:14', 3, '17852,1478523,36741,17852,1478523,36741,17852,1478523,36741,', 'Señales de Vida');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `campaign_id` int NOT NULL,
  `phone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `text` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `shipping_status` int NOT NULL DEFAULT 1,
  `process_date` date NOT NULL,
  `process_hour` time NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_7ee9933e7f3d3f6c5a4cfeb154b`(`campaign_id` ASC) USING BTREE,
  CONSTRAINT `FK_7ee9933e7f3d3f6c5a4cfeb154b` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 168 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES (123, 30, '1234567890', '¡Hola! Esta es una promoción exclusiva para ti.', 2, '2025-04-15', '08:11:29');
INSERT INTO `messages` VALUES (124, 30, '0987654321', '¡Hola! Esta es una promoción exclusiva para ti.', 2, '2025-04-15', '08:11:29');
INSERT INTO `messages` VALUES (125, 31, '9774661', '¡Campañas de Ciber Wow!', 2, '2025-04-15', '08:11:43');
INSERT INTO `messages` VALUES (126, 31, '1478523', '¡Campañas de Ciber Wow!', 2, '2025-04-15', '08:11:43');
INSERT INTO `messages` VALUES (127, 31, '12365478', '¡Campañas de Ciber Wow!', 2, '2025-04-15', '08:11:43');
INSERT INTO `messages` VALUES (128, 31, '147852', '¡Campañas de Ciber Wow!', 1, '2025-04-15', '08:11:43');
INSERT INTO `messages` VALUES (129, 31, '14587', '¡Campañas de Ciber Wow!', 1, '2025-04-15', '08:11:43');
INSERT INTO `messages` VALUES (130, 32, '987456', 'Cambio de Número', 2, '2025-04-15', '03:23:38');
INSERT INTO `messages` VALUES (131, 32, '147852', 'Cambio de Número', 2, '2025-04-15', '03:23:38');
INSERT INTO `messages` VALUES (132, 32, '1236547', 'Cambio de Número', 2, '2025-04-15', '03:23:38');
INSERT INTO `messages` VALUES (133, 32, '7412587', 'Cambio de Número', 2, '2025-04-15', '03:23:38');
INSERT INTO `messages` VALUES (134, 32, '147852', 'Cambio de Número', 2, '2025-04-15', '03:23:38');
INSERT INTO `messages` VALUES (135, 33, '987456', 'Cambios Generales', 2, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (136, 33, '14785', 'Cambios Generales', 3, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (137, 33, '12654', 'Cambios Generales', 2, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (138, 33, '12664', 'Cambios Generales', 2, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (139, 33, '14785', 'Cambios Generales', 2, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (140, 33, '1485', 'Cambios Generales', 2, '2025-04-15', '03:27:22');
INSERT INTO `messages` VALUES (141, 34, '14852', 'Cambios generales - 12', 2, '2025-04-15', '03:34:25');
INSERT INTO `messages` VALUES (142, 34, '147852', 'Cambios generales - 12', 2, '2025-04-15', '03:34:25');
INSERT INTO `messages` VALUES (143, 34, '123654', 'Cambios generales - 12', 2, '2025-04-15', '03:34:25');
INSERT INTO `messages` VALUES (144, 34, '125874', 'Cambios generales - 12', 2, '2025-04-15', '03:34:25');
INSERT INTO `messages` VALUES (145, 34, '148521', 'Cambios generales - 12', 3, '2025-04-15', '03:34:25');
INSERT INTO `messages` VALUES (146, 35, '98745631', 'Semana Santa ayacuchana', 2, '2025-04-15', '03:34:39');
INSERT INTO `messages` VALUES (147, 35, '147852', 'Semana Santa ayacuchana', 2, '2025-04-15', '03:34:39');
INSERT INTO `messages` VALUES (148, 35, '12563', 'Semana Santa ayacuchana', 2, '2025-04-15', '03:34:39');
INSERT INTO `messages` VALUES (149, 35, '25871', 'Semana Santa ayacuchana', 2, '2025-04-15', '03:34:39');
INSERT INTO `messages` VALUES (150, 36, '17852', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (151, 36, '1478523', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (152, 36, '36741', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (153, 36, '17852', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (154, 36, '1478523', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (155, 36, '36741', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (156, 36, '17852', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (157, 36, '1478523', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (158, 36, '36741', 'Cambios generales de Verano', 2, '2025-04-15', '09:11:26');
INSERT INTO `messages` VALUES (159, 37, '17852', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (160, 37, '1478523', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (161, 37, '36741', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (162, 37, '17852', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (163, 37, '1478523', 'Señales de Vida', 3, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (164, 37, '36741', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (165, 37, '17852', 'Señales de Vida', 3, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (166, 37, '1478523', 'Señales de Vida', 2, '2025-04-15', '09:14:14');
INSERT INTO `messages` VALUES (167, 37, '36741', 'Señales de Vida', 2, '2025-04-15', '09:14:14');

