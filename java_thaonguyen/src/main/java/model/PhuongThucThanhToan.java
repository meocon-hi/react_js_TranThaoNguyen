package model;

public class PhuongThucThanhToan {
    private int maPhuongThuc;
    private String tenPhuongThuc;

    public int getMaPhuongThuc() { return maPhuongThuc; }
    public void setMaPhuongThuc(int maPhuongThuc) { this.maPhuongThuc = maPhuongThuc; }
    public String getTenPhuongThuc() { return tenPhuongThuc; }
    public void setTenPhuongThuc(String tenPhuongThuc) { this.tenPhuongThuc = tenPhuongThuc; }

    @Override
    public String toString() {
        return "PhuongThucThanhToan{maPhuongThuc=" + maPhuongThuc + ", tenPhuongThuc='" + tenPhuongThuc + "'}";
    }
}