/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `order`;

-- CreateTable
CREATE TABLE `Shipment` (
    `company` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `senderAddress` VARCHAR(191) NOT NULL,
    `recipientName` VARCHAR(191) NOT NULL,
    `recipientAddress` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`company`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
