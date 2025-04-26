package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import model.PhuongThucThanhToan;
import util.DBConnection;

public class PhuongThucThanhToanDAO {
    public List<PhuongThucThanhToan> getAll() throws SQLException {
        List<PhuongThucThanhToan> list = new ArrayList<>();
        String sql = "SELECT * FROM phuong_thuc_thanh_toan";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                PhuongThucThanhToan pttt = new PhuongThucThanhToan();
                pttt.setMaPhuongThuc(rs.getInt("ma_phuong_thuc"));
                pttt.setTenPhuongThuc(rs.getString("ten_phuong_thuc"));
                list.add(pttt);
            }
        }
        System.out.println("PhuongThucThanhToanDAO - getAll: " + list);
        return list;
    }

    public PhuongThucThanhToan getById(int maPhuongThuc) throws SQLException {
        String sql = "SELECT * FROM phuong_thuc_thanh_toan WHERE ma_phuong_thuc = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, maPhuongThuc);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    PhuongThucThanhToan pttt = new PhuongThucThanhToan();
                    pttt.setMaPhuongThuc(rs.getInt("ma_phuong_thuc"));
                    pttt.setTenPhuongThuc(rs.getString("ten_phuong_thuc"));
                    System.out.println("PhuongThucThanhToanDAO - getById(" + maPhuongThuc + "): " + pttt);
                    return pttt;
                }
            }
        }
        System.out.println("PhuongThucThanhToanDAO - getById(" + maPhuongThuc + "): null");
        return null;
    }
}