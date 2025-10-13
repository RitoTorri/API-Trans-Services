/*
  Warnings:

  - You are about to drop the column `active` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `id_employee` on the `payrolls` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `providers` table. All the data in the column will be lost.
  - You are about to drop the column `id_employee` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id_driver` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the column `id_vehicle_types` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `contacts_employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `details_invoice_provider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices_providers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoices_purchase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `types_expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicles_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `payrolls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_type_id` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contacts_employees` DROP FOREIGN KEY `contacts_employees_id_employee_fkey`;

-- DropForeignKey
ALTER TABLE `contacts_providers` DROP FOREIGN KEY `contacts_providers_id_provider_fkey`;

-- DropForeignKey
ALTER TABLE `details_invoice_provider` DROP FOREIGN KEY `details_invoice_provider_id_invoice_provider_fkey`;

-- DropForeignKey
ALTER TABLE `employees` DROP FOREIGN KEY `employees_role_fkey`;

-- DropForeignKey
ALTER TABLE `invoices_providers` DROP FOREIGN KEY `invoices_providers_id_provider_fkey`;

-- DropForeignKey
ALTER TABLE `invoices_purchase` DROP FOREIGN KEY `invoices_purchase_id_invoice_provider_fkey`;

-- DropForeignKey
ALTER TABLE `invoices_purchase` DROP FOREIGN KEY `invoices_purchase_id_type_expense_fkey`;

-- DropForeignKey
ALTER TABLE `payrolls` DROP FOREIGN KEY `payrolls_id_employee_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_id_employee_fkey`;

-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_id_driver_fkey`;

-- DropForeignKey
ALTER TABLE `vehicles` DROP FOREIGN KEY `vehicles_id_vehicle_types_fkey`;

-- DropIndex
DROP INDEX `employees_role_fkey` ON `employees`;

-- DropIndex
DROP INDEX `payrolls_id_employee_fkey` ON `payrolls`;

-- DropIndex
DROP INDEX `users_id_employee_fkey` ON `users`;

-- DropIndex
DROP INDEX `vehicles_id_driver_fkey` ON `vehicles`;

-- DropIndex
DROP INDEX `vehicles_id_vehicle_types_fkey` ON `vehicles`;

-- AlterTable
ALTER TABLE `clients` DROP COLUMN `active`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `active`,
    DROP COLUMN `role`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `role_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `payrolls` DROP COLUMN `active`,
    DROP COLUMN `id_employee`,
    ADD COLUMN `employee_id` INTEGER NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `providers` DROP COLUMN `active`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `id_employee`,
    DROP COLUMN `user_name`,
    ADD COLUMN `employee_id` INTEGER NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `role_id` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `vehicles` DROP COLUMN `id_driver`,
    DROP COLUMN `id_vehicle_types`,
    ADD COLUMN `driver_id` INTEGER NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `vehicle_type_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `contacts_employees`;

-- DropTable
DROP TABLE `contacts_providers`;

-- DropTable
DROP TABLE `details_invoice_provider`;

-- DropTable
DROP TABLE `invoices_providers`;

-- DropTable
DROP TABLE `invoices_purchase`;

-- DropTable
DROP TABLE `roles`;

-- DropTable
DROP TABLE `types_expenses`;

-- DropTable
DROP TABLE `vehicles_types`;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `role_permissions_role_id_permission_id_key`(`role_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `contact_type_id` INTEGER NOT NULL,
    `contact_info` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(20) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_id` INTEGER NOT NULL,
    `contact_type_id` INTEGER NOT NULL,
    `contact_info` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_id` INTEGER NOT NULL,
    `control_number` VARCHAR(30) NOT NULL,
    `invoice_number` VARCHAR(30) NOT NULL,
    `invoice_date` DATETIME(3) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expense_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider_invoice_id` INTEGER NOT NULL,
    `expense_type_id` INTEGER NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,
    `description` TEXT NOT NULL,
    `exempt_amount` DECIMAL(10, 2) NOT NULL,
    `total_amount` DECIMAL(10, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicle_id` INTEGER NOT NULL,
    `client_id` INTEGER NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `pickup_location` VARCHAR(100) NOT NULL,
    `dropoff_location` VARCHAR(100) NOT NULL,
    `number_of_people` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `services_vehicle_id_idx`(`vehicle_id`),
    INDEX `services_client_id_idx`(`client_id`),
    INDEX `services_start_time_idx`(`start_time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `user_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employees` ADD CONSTRAINT `employees_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `employee_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_contacts` ADD CONSTRAINT `employee_contacts_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payrolls` ADD CONSTRAINT `payrolls_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_contacts` ADD CONSTRAINT `provider_contacts_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_invoices` ADD CONSTRAINT `provider_invoices_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `providers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_invoices` ADD CONSTRAINT `purchase_invoices_provider_invoice_id_fkey` FOREIGN KEY (`provider_invoice_id`) REFERENCES `provider_invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_invoices` ADD CONSTRAINT `purchase_invoices_expense_type_id_fkey` FOREIGN KEY (`expense_type_id`) REFERENCES `expense_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
