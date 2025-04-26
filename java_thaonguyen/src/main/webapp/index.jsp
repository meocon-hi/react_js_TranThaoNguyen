<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Quản Lý Thuê Trọ</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1 class="text-center mb-4">Quản Lý Thuê Trọ</h1>

        <!-- Hiển thị thông báo lỗi nếu có -->
        <% 
            String error = (String) request.getAttribute("error");
            if (error != null) {
        %>
            <div class="alert alert-danger" role="alert">
                <%= error %>
            </div>
        <% 
            }
        %>

        <!-- Tìm kiếm -->
        <div class="mb-3">
            <form action="ThueTroServlet" method="get" class="d-flex">
                <input type="hidden" name="action" value="search">
                <input type="text" name="keyword" class="form-control me-2" placeholder="Tìm kiếm theo mã, tên hoặc số điện thoại">
                <button type="submit" class="btn btn-primary">Tìm Kiếm</button>
            </form>
        </div>

        <!-- Nút tạo mới -->
        <div class="mb-3">
            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addModal">Tạo Mới</button>
            <button class="btn btn-danger" onclick="showDeleteConfirmModal()">Xóa Đã Chọn</button>
        </div>

        <!-- Danh sách thuê trọ -->
        <form id="deleteForm" action="ThueTroServlet" method="post">
            <input type="hidden" name="action" value="delete">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th><input type="checkbox" id="selectAll" onclick="toggleSelectAll()"></th>
                        <th>Mã Phòng Trọ</th>
                        <th>Tên Người Thuê</th>
                        <th>Số Điện Thoại</th>
                        <th>Ngày Bắt Đầu</th>
                        <th>Hình Thức Thanh Toán</th>
                        <th>Ghi Chú</th>
                    </tr>
                </thead>
                <tbody>
                    <% 
                        java.util.List<model.ThueTro> thueTroList = (java.util.List<model.ThueTro>) request.getAttribute("thueTroList");
                        if (thueTroList != null) {
                            for (model.ThueTro thueTro : thueTroList) {
                    %>
                        <tr>
                            <td><input type="checkbox" name="selectedIds" value="<%= thueTro.getMaPhongTro() %>"></td>
                            <td><%= thueTro.getMaPhongTro() %></td>
                            <td><%= thueTro.getTenNguoiThue() %></td>
                            <td><%= thueTro.getSdt() %></td>
                            <td><%= new java.text.SimpleDateFormat("dd-MM-yyyy").format(thueTro.getNgayBatDau()) %></td>
                            <td><%= thueTro.getPhuongThucThanhToan() != null ? thueTro.getPhuongThucThanhToan().getTenPhuongThuc() : "N/A" %></td>
                            <td><%= thueTro.getGhiChu() %></td>
                        </tr>
                    <% 
                            }
                        }
                    %>
                </tbody>
            </table>
        </form>

        <!-- Modal tạo mới -->
        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addModalLabel">Tạo Mới Thông Tin Thuê Trọ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addForm" action="ThueTroServlet" method="post" onsubmit="console.log('Form submitted'); return validateForm();">
                            <input type="hidden" name="action" value="add">
                            <div class="mb-3">
                                <label class="form-label">Tên Người Thuê</label>
                                <input type="text" name="tenNguoiThue" id="tenNguoiThue" class="form-control" required>
                                <div id="tenError" class="error"></div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Số Điện Thoại</label>
                                <input type="text" name="sdt" id="sdt" class="form-control" required>
                                <div id="sdtError" class="error"></div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ngày Bắt Đầu</label>
                                <input type="text" name="ngayBatDau" id="ngayBatDau" class="form-control" placeholder="dd-MM-yyyy" required>
                                <div id="ngayError" class="error"></div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Hình Thức Thanh Toán</label>
                                <select name="hinhThucThanhToan" class="form-select" required>
                                    <% 
                                        java.util.List<model.PhuongThucThanhToan> hinhThucList = (java.util.List<model.PhuongThucThanhToan>) request.getAttribute("hinhThucList");
                                        System.out.println("index.jsp - hinhThucList: " + hinhThucList);
                                        if (hinhThucList != null && !hinhThucList.isEmpty()) {
                                            for (model.PhuongThucThanhToan hinhThuc : hinhThucList) {
                                    %>
                                        <option value="<%= hinhThuc.getMaPhuongThuc() %>"><%= hinhThuc.getTenPhuongThuc() %></option>
                                    <% 
                                            }
                                        } else {
                                    %>
                                        <option value="">Không có hình thức thanh toán</option>
                                    <% 
                                        }
                                    %>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ghi Chú</label>
                                <textarea name="ghiChu" class="form-control"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Tạo Mới</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal xác nhận xóa -->
        <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteConfirmModalLabel">Xác Nhận Xóa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Bạn có muốn xóa phòng trọ sau không?</p>
                        <ul id="deleteItemsList"></ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" onclick="deleteSelected()">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js"></script>
</body>
</html>