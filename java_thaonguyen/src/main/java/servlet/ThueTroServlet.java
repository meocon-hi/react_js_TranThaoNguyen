package servlet;

import dao.ThueTroDAO;
import dao.PhuongThucThanhToanDAO;
import model.ThueTro;
import model.PhuongThucThanhToan;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/ThueTroServlet")
public class ThueTroServlet extends HttpServlet {
    private ThueTroDAO thueTroDAO;
    private PhuongThucThanhToanDAO phuongThucThanhToanDAO;

    @Override
    public void init() throws ServletException {
        thueTroDAO = new ThueTroDAO();
        phuongThucThanhToanDAO = new PhuongThucThanhToanDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        try {
            List<PhuongThucThanhToan> hinhThucList = phuongThucThanhToanDAO.getAll();
            System.out.println("ThueTroServlet - doGet - hinhThucList: " + hinhThucList);
            request.setAttribute("hinhThucList", hinhThucList);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("error", "Lỗi khi tải danh sách phương thức thanh toán: " + e.getMessage());
        }

        if (action == null || action.equals("list")) {
            try {
                List<ThueTro> thueTroList = thueTroDAO.getAll();
                request.setAttribute("thueTroList", thueTroList);
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("error", "Lỗi khi tải danh sách: " + e.getMessage());
            }
        } else if (action.equals("search")) {
            try {
                String keyword = request.getParameter("keyword");
                List<ThueTro> thueTroList = thueTroDAO.search(keyword);
                request.setAttribute("thueTroList", thueTroList);
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("error", "Lỗi khi tìm kiếm: " + e.getMessage());
            }
        }
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        System.out.println("doPost called with action: " + action);

        try {
            List<PhuongThucThanhToan> hinhThucList = phuongThucThanhToanDAO.getAll();
            System.out.println("ThueTroServlet - doPost - hinhThucList: " + hinhThucList);
            request.setAttribute("hinhThucList", hinhThucList);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("error", "Lỗi khi tải danh sách phương thức thanh toán: " + e.getMessage());
        }

        if ("add".equals(action)) {
            try {
                String tenNguoiThue = request.getParameter("tenNguoiThue");
                String sdt = request.getParameter("sdt");
                String ngayBatDauStr = request.getParameter("ngayBatDau");
                int maPhuongThuc = Integer.parseInt(request.getParameter("hinhThucThanhToan"));
                String ghiChu = request.getParameter("ghiChu");

                System.out.println("Received data - Ten: " + tenNguoiThue + ", SDT: " + sdt + 
                    ", Ngay: " + ngayBatDauStr + ", Ma phuong thuc: " + maPhuongThuc + ", Ghi chu: " + ghiChu);

                ThueTro thueTro = new ThueTro();
                thueTro.setTenNguoiThue(tenNguoiThue);
                thueTro.setSdt(sdt);
                SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
                Date ngayBatDau = sdf.parse(ngayBatDauStr);
                thueTro.setNgayBatDau(ngayBatDau);
                PhuongThucThanhToan pttt = phuongThucThanhToanDAO.getById(maPhuongThuc);
                thueTro.setPhuongThucThanhToan(pttt);
                thueTro.setGhiChu(ghiChu);

                thueTroDAO.add(thueTro);
                response.sendRedirect("ThueTroServlet");
                return;
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("error", "Lỗi khi thêm mới: " + e.getMessage());
            }
        } else if ("delete".equals(action)) {
            try {
                String[] ids = request.getParameterValues("selectedIds");
                List<String> idList = new ArrayList<>();
                for (String id : ids) {
                    idList.add(id);
                }
                thueTroDAO.delete(idList);
                response.sendRedirect("ThueTroServlet");
                return;
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("error", "Lỗi khi xóa: " + e.getMessage());
            }
        }

        try {
            List<ThueTro> thueTroList = thueTroDAO.getAll();
            request.setAttribute("thueTroList", thueTroList);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("error", "Lỗi khi tải danh sách: " + e.getMessage());
        }
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}