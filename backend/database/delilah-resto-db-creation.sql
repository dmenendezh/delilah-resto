-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema delilah-resto-api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delilah-resto-api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah-resto-api` DEFAULT CHARACTER SET utf8mb4 ;
USE `delilah-resto-api` ;

-- -----------------------------------------------------
-- Table `delilah-resto`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah-resto-api`.`products` (
  `prd_id_auto` INT NOT NULL AUTO_INCREMENT,
  `prd_name` VARCHAR(255) NOT NULL,
  `prd_price` INT NOT NULL,
  `prd_image` VARCHAR(45) NOT NULL,
  `prd_description` VARCHAR(1000) NULL,
  PRIMARY KEY (`prd_id_auto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah-resto`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah-resto-api`.`users` (
  `usr_id` INT NOT NULL AUTO_INCREMENT,
  `usr_full_name` VARCHAR(255) NOT NULL,
  `usr_email` VARCHAR(255) NOT NULL,
  `usr_phone` VARCHAR(100) NOT NULL,
  `usr_address` VARCHAR(500) NOT NULL,
  `usr_password` VARCHAR(100) NOT NULL,
  `usr_admin_flag` INT NOT NULL,
  PRIMARY KEY (`usr_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah-resto`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah-resto-api`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `order_user` INT NOT NULL,
  `order_total_price` INT NOT NULL,
  `order_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` VARCHAR(45) NULL,
  `order_payment_type` VARCHAR(45) NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_orders_usr_idx` (`order_user` ASC),
  CONSTRAINT `fk_orders_usr`
    FOREIGN KEY (`order_user`)
    REFERENCES `delilah-resto-api`.`users` (`usr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `delilah-resto`.`orders_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah-resto-api`.`orders_details` (
  `od_id` INT NOT NULL AUTO_INCREMENT,
  `od_order_id` INT NOT NULL,
  `od_product_id` INT NOT NULL,
  `od_quantity` INT NOT NULL,
  PRIMARY KEY (`od_id`),
  INDEX `fk_orders_details_idx` (`od_order_id` ASC),
  INDEX `fk_orders_product_idx` (`od_product_id` ASC),
  CONSTRAINT `fk_orders_details`
    FOREIGN KEY (`od_order_id`)
    REFERENCES `delilah-resto-api`.`orders` (`order_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_product`
    FOREIGN KEY (`od_product_id`)
    REFERENCES `delilah-resto-api`.`products` (`prd_id_auto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
