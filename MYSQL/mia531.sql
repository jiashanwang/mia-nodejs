/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50644
Source Host           : localhost:3306
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50644
File Encoding         : 65001

Date: 2019-05-31 15:29:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for domain
-- ----------------------------
DROP TABLE IF EXISTS `domain`;
CREATE TABLE `domain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of domain
-- ----------------------------
INSERT INTO `domain` VALUES ('17', '阳光森林');
INSERT INTO `domain` VALUES ('19', '蓝天');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `product` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `price` double(10,2) NOT NULL,
  `datetimes` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `totalPrice` double(11,2) NOT NULL,
  `userid` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `rebate` double(10,2) DEFAULT NULL,
  `domain_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('95', '法缇兰', '1', '399.00', '2019-05-31 14:05:29', '399.00', '32', '王家山 ', '21.00', '17');
INSERT INTO `userinfo` VALUES ('96', '鼻子纸', '100', '2.90', '2019-05-31 14:05:48', '290.00', '32', '王家山 ', '50.00', '17');
INSERT INTO `userinfo` VALUES ('98', '童装', '3', '99.00', '2019-05-31 14:06:54', '297.00', '33', '黄慧', '15.90', '17');
INSERT INTO `userinfo` VALUES ('99', '手机', '1', '5683.00', '2019-05-31 14:13:47', '5683.00', '33', '黄慧', '221.00', '17');
INSERT INTO `userinfo` VALUES ('100', '黄慧手表', '1', '5683.00', '2019-05-31 14:14:43', '5683.00', '33', '黄慧', '221.00', '17');
INSERT INTO `userinfo` VALUES ('101', '洗衣液', '2', '15.00', '2019-05-31 14:31:55', '30.00', '33', '黄慧', '2.40', '17');
INSERT INTO `userinfo` VALUES ('102', '飞鹤奶粉', '2', '398.00', '2019-05-31 14:32:47', '796.00', '33', '黄慧', '70.00', '17');
INSERT INTO `userinfo` VALUES ('104', '纸尿裤', '10', '69.00', '2019-05-31 14:49:14', '690.00', '35', '小熊宝', '13.30', '19');
INSERT INTO `userinfo` VALUES ('105', '日用品', '12', '18.00', '2019-05-31 15:24:03', '216.00', '36', 'adfaf', '2.10', '17');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `domain_id` int(11) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('32', '王家山 ', '18171283286', '17');
INSERT INTO `users` VALUES ('33', '黄慧', '18986188868', '17');
INSERT INTO `users` VALUES ('35', '小熊宝', '18986188868', '19');
INSERT INTO `users` VALUES ('36', 'adfaf', '18546523254', '17');
