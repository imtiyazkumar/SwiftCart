-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User';
