-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:4306
-- Generation Time: Apr 26, 2025 at 07:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phong_tro`
--

-- --------------------------------------------------------

--
-- Table structure for table `phuong_thuc_thanh_toan`
--

CREATE TABLE `phuong_thuc_thanh_toan` (
  `ma_phuong_thuc` int(11) NOT NULL,
  `ten_phuong_thuc` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phuong_thuc_thanh_toan`
--

INSERT INTO `phuong_thuc_thanh_toan` (`ma_phuong_thuc`, `ten_phuong_thuc`) VALUES
(1, 'Theo tháng'),
(2, 'Theo quý'),
(3, 'Theo năm');

-- --------------------------------------------------------

--
-- Table structure for table `thue_tro`
--

CREATE TABLE `thue_tro` (
  `ma_phong_tro` varchar(10) NOT NULL,
  `ten_nguoi_thue` varchar(50) NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `ngay_bat_dau` date NOT NULL,
  `ma_phuong_thuc` int(11) NOT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thue_tro`
--

INSERT INTO `thue_tro` (`ma_phong_tro`, `ten_nguoi_thue`, `sdt`, `ngay_bat_dau`, `ma_phuong_thuc`, `ghi_chu`) VALUES
('PT-002', 'bbbbbbb', '1236785642', '2025-05-25', 3, 'bbbbbb'),
('PT-003', 'uiuiauiua', '1236785642', '2025-05-25', 1, 'uuuuuuuuuuuu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phuong_thuc_thanh_toan`
--
ALTER TABLE `phuong_thuc_thanh_toan`
  ADD PRIMARY KEY (`ma_phuong_thuc`);

--
-- Indexes for table `thue_tro`
--
ALTER TABLE `thue_tro`
  ADD PRIMARY KEY (`ma_phong_tro`),
  ADD KEY `ma_phuong_thuc` (`ma_phuong_thuc`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phuong_thuc_thanh_toan`
--
ALTER TABLE `phuong_thuc_thanh_toan`
  MODIFY `ma_phuong_thuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `thue_tro`
--
ALTER TABLE `thue_tro`
  ADD CONSTRAINT `thue_tro_ibfk_1` FOREIGN KEY (`ma_phuong_thuc`) REFERENCES `phuong_thuc_thanh_toan` (`ma_phuong_thuc`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
