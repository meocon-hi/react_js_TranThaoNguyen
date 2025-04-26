package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.ThueTro;
import model.PhuongThucThanhToan;
import util.DBConnection;

public class ThueTroDAO {
    private PhuongThucThanhToanDAO phuongThucThanhToanDAO;

    public ThueTroDAO() {
        this.phuongThucThanhToanDAO = new PhuongThucThanhToanDAO();
    }

    public List<ThueTro> getAll() throws SQLException {
        List<ThueTro> list = new ArrayList<>();
        String sql = "SELECT * FROM thue_tro";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                ThueTro thueTro = new ThueTro();
                thueTro.setMaPhongTro(rs.getString("ma_phong_tro"));
                thueTro.setTenNguoiThue(rs.getString("ten_nguoi_thue"));
                thueTro.setSdt(rs.getString("sdt"));
                thueTro.setNgayBatDau(rs.getDate("ngay_bat_dau"));
                int maPhuongThuc = rs.getInt("ma_phuong_thuc");
                PhuongThucThanhToan pttt = phuongThucThanhToanDAO.getById(maPhuongThuc);
                thueTro.setPhuongThucThanhToan(pttt);
                thueTro.setGhiChu(rs.getString("ghi_chu"));
                list.add(thueTro);
            }
        }
        return list;
    }

    public void add(ThueTro thueTro) throws SQLException {
        String newMaPhongTro = generateMaPhongTro();
        thueTro.setMaPhongTro(newMaPhongTro);

        String sql = "INSERT INTO thue_tro (ma_phong_tro, ten_nguoi_thue, sdt, ngay_bat_dau, ma_phuong_thuc, ghi_chu) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, thueTro.getMaPhongTro());
            stmt.setString(2, thueTro.getTenNguoiThue());
            stmt.setString(3, thueTro.getSdt());
            stmt.setDate(4, new java.sql.Date(thueTro.getNgayBatDau().getTime()));
            stmt.setInt(5, thueTro.getPhuongThucThanhToan().getMaPhuongThuc());
            stmt.setString(6, thueTro.getGhiChu());
            stmt.executeUpdate();
        }
    }

    public void delete(List<String> ids) throws SQLException {
        String sql = "DELETE FROM thue_tro WHERE ma_phong_tro = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (String id : ids) {
                stmt.setString(1, id);
                stmt.executeUpdate();
            }
        }
    }

    public List<ThueTro> search(String keyword) throws SQLException {
        List<ThueTro> list = new ArrayList<>();
        String sql = "SELECT * FROM thue_tro WHERE ma_phong_tro LIKE ? OR ten_nguoi_thue LIKE ? OR sdt LIKE ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            String searchPattern = "%" + keyword + "%";
            stmt.setString(1, searchPattern);
            stmt.setString(2, searchPattern);
            stmt.setString(3, searchPattern);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    ThueTro thueTro = new ThueTro();
                    thueTro.setMaPhongTro(rs.getString("ma_phong_tro"));
                    thueTro.setTenNguoiThue(rs.getString("ten_nguoi_thue"));
                    thueTro.setSdt(rs.getString("sdt"));
                    thueTro.setNgayBatDau(rs.getDate("ngay_bat_dau"));
                    int maPhuongThuc = rs.getInt("ma_phuong_thuc");
                    PhuongThucThanhToan pttt = phuongThucThanhToanDAO.getById(maPhuongThuc);
                    thueTro.setPhuongThucThanhToan(pttt);
                    thueTro.setGhiChu(rs.getString("ghi_chu"));
                    list.add(thueTro);
                }
            }
        }
        return list;
    }

    private String generateMaPhongTro() throws SQLException {
        String prefix = "PT-";
        int maxNumber = 0;

        String sql = "SELECT ma_phong_tro FROM thue_tro ORDER BY ma_phong_tro DESC LIMIT 1";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                String lastMaPhongTro = rs.getString("ma_phong_tro");
                String numberPart = lastMaPhongTro.substring(prefix.length());
                maxNumber = Integer.parseInt(numberPart);
            }
        }

        maxNumber++;
        return prefix + String.format("%03d", maxNumber);
    }
}