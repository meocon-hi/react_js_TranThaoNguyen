package model;

import java.util.Date;

public class ThueTro {
    private String maPhongTro;
    private String tenNguoiThue;
    private String sdt;
    private Date ngayBatDau;
    private PhuongThucThanhToan phuongThucThanhToan;
    private String ghiChu;

    public String getMaPhongTro() { return maPhongTro; }
    public void setMaPhongTro(String maPhongTro) { this.maPhongTro = maPhongTro; }
    public String getTenNguoiThue() { return tenNguoiThue; }
    public void setTenNguoiThue(String tenNguoiThue) { this.tenNguoiThue = tenNguoiThue; }
    public String getSdt() { return sdt; }
    public void setSdt(String sdt) { this.sdt = sdt; }
    public Date getNgayBatDau() { return ngayBatDau; }
    public void setNgayBatDau(Date ngayBatDau) { this.ngayBatDau = ngayBatDau; }
    public PhuongThucThanhToan getPhuongThucThanhToan() { return phuongThucThanhToan; }
    public void setPhuongThucThanhToan(PhuongThucThanhToan phuongThucThanhToan) { this.phuongThucThanhToan = phuongThucThanhToan; }
    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
}