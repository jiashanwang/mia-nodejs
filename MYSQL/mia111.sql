/*
Navicat MySQL Data Transfer

Source Server         : 47.97.5.38
Source Server Version : 50725
Source Host           : 47.97.5.38:33065
Source Database       : mia

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-05-30 14:25:12
*/

SET FOREIGN_KEY_CHECKS=0;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('57', '法蔓兰护肤品', '2', '152.00', '2019-05-21 17:51:38', '3040.00', '6', '小雅', null);
INSERT INTO `userinfo` VALUES ('58', '秃头妈妈甄选S', '1', '563.00', '2019-05-18 17:47:36', '563.00', '5', '何琪琳', null);
INSERT INTO `userinfo` VALUES ('59', '婴儿口湿纸巾', '2', '135.00', '2019-05-08 17:48:01', '270.00', '5', '何琪琳', null);
INSERT INTO `userinfo` VALUES ('60', '鼻子纸', '2', '56.00', '2019-05-23 17:48:14', '112.00', '6', '小雅', null);
INSERT INTO `userinfo` VALUES ('61', '秃头妈妈甄选XL', '2', '69.00', '2019-05-23 17:44:25', '138.00', '7', '婷婷', null);
INSERT INTO `userinfo` VALUES ('62', '防止手足口病口喷', '2', '69.00', '2019-05-03 17:48:34', '138.00', '7', '婷婷', null);
INSERT INTO `userinfo` VALUES ('63', '兔头妈妈铂金NB', '5', '69.00', '2019-05-11 17:49:44', '345.00', '8', '黄菲', null);
INSERT INTO `userinfo` VALUES ('64', '菲力牛排', '10', '89.00', '2019-05-08 17:50:31', '890.00', '8', '黄菲', null);
INSERT INTO `userinfo` VALUES ('65', '雅培奶粉', '2', '325.00', '2019-05-14 17:50:56', '650.00', '8', '黄菲', null);
INSERT INTO `userinfo` VALUES ('66', '儿童玩具', '2', '45.00', '2019-05-23 17:53:03', '90.00', '9', '娜娜', null);
INSERT INTO `userinfo` VALUES ('67', '蜜芽牙膏', '2', '28.00', '2019-05-23 17:53:17', '56.00', '9', '娜娜', null);
INSERT INTO `userinfo` VALUES ('68', '兔头妈妈XL纸尿裤', '5', '69.00', '2019-05-23 17:53:57', '345.00', '10', '开大车', null);
INSERT INTO `userinfo` VALUES ('69', '婴儿口湿纸巾', '20', '2.00', '2019-05-23 17:54:12', '40.00', '10', '开大车', null);
INSERT INTO `userinfo` VALUES ('70', '鼻子纸', '2', '25.00', '2019-05-27 15:16:06', '50.00', '11', '美的电器', null);
INSERT INTO `userinfo` VALUES ('71', '牙刷', '2', '25.00', '2019-05-21 09:58:50', '50.00', '13', '小张', '4.20');
INSERT INTO `userinfo` VALUES ('72', '保健品', '2', '256.00', '2019-05-28 16:36:57', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('73', '保健品', '2', '256.00', '2019-05-28 16:37:01', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('74', '保健品', '2', '256.00', '2019-05-28 16:37:02', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('75', '保健品', '2', '256.00', '2019-05-28 16:37:02', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('76', '保健品', '2', '256.00', '2019-05-28 16:37:02', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('77', '保健品', '2', '256.00', '2019-05-28 16:37:03', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('78', '保健品', '2', '256.00', '2019-05-28 17:39:37', '512.00', '17', 'zhang', '26.00');
INSERT INTO `userinfo` VALUES ('79', '保健品', '2', '256.00', '2019-05-28 17:39:40', '512.00', '18', 'wang', '26.00');
INSERT INTO `userinfo` VALUES ('80', '保健品', '2', '256.00', '2019-05-28 17:39:45', '512.00', '19', 'li', '26.00');
INSERT INTO `userinfo` VALUES ('81', '保健品', '2', '256.00', '2019-05-28 17:39:51', '512.00', '20', 'zhao', '26.00');
INSERT INTO `userinfo` VALUES ('82', '保健品', '2', '256.00', '2019-05-28 16:37:03', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('83', '保健品', '2', '256.00', '2019-05-28 16:37:03', '512.00', '16', 'jarry', '26.00');
INSERT INTO `userinfo` VALUES ('84', '鼻子纸', '23', '2.90', '2019-05-28 17:50:33', '66.70', '17', 'wangjiashan', '13.80');
INSERT INTO `userinfo` VALUES ('85', '鼻子纸', '2', '26.00', '2019-05-29 09:45:42', '52.00', '18', '张三', '4.60');
INSERT INTO `userinfo` VALUES ('86', '比资质', '2', '15.00', '2019-05-29 06:09:24', '30.00', '19', 'aksdfja', '4.00');
INSERT INTO `userinfo` VALUES ('87', '比资质', '2', '15.00', '2019-05-29 07:52:53', '30.00', '19', 'aksdfja', '4.00');
INSERT INTO `userinfo` VALUES ('88', '比资质', '2', '15.00', '2019-05-30 03:02:17', '30.00', '19', 'aksdfja', '4.00');
INSERT INTO `userinfo` VALUES ('89', 'adfs', '2', '12.00', '2019-05-30 03:10:52', '24.00', '20', 'adf', '4.00');
INSERT INTO `userinfo` VALUES ('90', 'adfs', '2', '12.00', '2019-05-30 03:10:55', '24.00', '20', 'adf', '4.00');
INSERT INTO `userinfo` VALUES ('91', 'adfs', '2', '12.00', '2019-05-30 03:10:55', '24.00', '20', 'adf', '4.00');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('5', '何琪琳', '18171283286');
INSERT INTO `users` VALUES ('6', '小雅', '18271283286');
INSERT INTO `users` VALUES ('7', '婷婷', '18152463524');
INSERT INTO `users` VALUES ('8', '黄菲', '18152463574');
INSERT INTO `users` VALUES ('9', '娜娜', '13845126525');
INSERT INTO `users` VALUES ('10', '开大车', '13845126225');
INSERT INTO `users` VALUES ('11', '美的电器', '18752136549');
INSERT INTO `users` VALUES ('12', '小张', '18695463021');
INSERT INTO `users` VALUES ('13', '小张', '18756423156');
INSERT INTO `users` VALUES ('14', 'zhangan ', '15123654235');
INSERT INTO `users` VALUES ('15', 'zhagnsan', '15123659874');
INSERT INTO `users` VALUES ('16', 'jarry', '18174523100');
INSERT INTO `users` VALUES ('17', 'wangjiashan', '18174532658');
INSERT INTO `users` VALUES ('18', '张三', '18175422223');
INSERT INTO `users` VALUES ('19', 'aksdfja', '15898989898');
INSERT INTO `users` VALUES ('20', 'adf', '15142424242');
INSERT INTO `users` VALUES ('21', '', '');
