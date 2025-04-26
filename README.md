![image](https://github.com/user-attachments/assets/db5e4d93-b23e-431a-add9-4a3bf6d96a8d)

![image](https://github.com/user-attachments/assets/8fd21501-ae5b-4b82-b7a6-b02e75480004)
Quản lý phòng trọ
Ứng dụng web giúp quản lý thông tin phòng trọ, bao gồm tạo mới, tìm kiếm, xóa, và chỉnh sửa thông tin thuê trọ. Giao diện thân thiện, dễ sử dụng, với các tính năng hiện đại.
🚀 Cài đặt
Yêu cầu

Node.js: Phiên bản 14.x hoặc mới hơn.
MySQL: Phiên bản 5.7 hoặc mới hơn.
Trình duyệt: Chrome, Firefox, hoặc Safari (phiên bản mới nhất).

Cài đặt Backend

Clone dự án:git clone <repository-url>
cd backend


Cài đặt thư viện:npm install


Cấu hình MySQL:
Tạo database:CREATE DATABASE room_management;


Tạo bảng rooms và payment_methods:CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(10) NOT NULL,
  start_date DATE NOT NULL,
  payment_method_id INT,
  note TEXT,
  FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

CREATE TABLE payment_methods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  method_name VARCHAR(255) NOT NULL
);

INSERT INTO payment_methods (method_name) VALUES ('Theo tháng'), ('Theo quý'), ('Theo năm');


Cập nhật thông tin kết nối MySQL trong file backend/db.js:const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'room_management'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;




Chạy backend:node server.js


Bạn sẽ thấy: Server is running on port 3001.



Cài đặt Frontend

Chuyển đến thư mục frontend:cd frontend


Cài đặt thư viện:npm install


Chạy frontend:npm run dev


Mở trình duyệt tại: http://localhost:5173.



📋 Hướng dẫn sử dụng
1. Xem danh sách phòng trọ

Truy cập http://localhost:5173, bạn sẽ thấy bảng danh sách phòng trọ với các cột: Mã phòng, Tên người thuê, Số điện thoại, Ngày bắt đầu thuê, Hình thức thanh toán, Ghi chú, Hành động.
Mã phòng hiển thị dạng PT-001, PT-002, v.v.

2. Tìm kiếm phòng trọ

Nhập mã phòng (VD: PT-001), tên người thuê (VD: ht), hoặc số điện thoại (VD: 023447474) vào ô tìm kiếm.
Kết quả sẽ tự động lọc ngay khi bạn nhập.

3. Tạo mới thông tin thuê trọ

Nhấn nút Tạo mới (màu xanh lam).
Điền thông tin:
Tên người thuê: Tối thiểu 5 ký tự, không chứa số hoặc ký tự đặc biệt.
Số điện thoại: Phải là 10 chữ số.
Ngày bắt đầu thuê: Không được là ngày trong quá khứ.
Hình thức thanh toán: Chọn 1 trong 3: Theo tháng, Theo quý, Theo năm (mặc định là Theo tháng).
Ghi chú: Tùy chọn.


Nhấn Tạo mới để lưu, hoặc Hủy để thoát.

4. Xóa thông tin thuê trọ

Xóa từng phòng: Nhấn nút Xóa (màu đỏ) ở cột Hành động, xác nhận trong popup.
Xóa nhiều phòng: Tích vào checkbox ở đầu mỗi dòng, nhấn Xóa các phòng đã chọn, sau đó xác nhận.

5. Chỉnh sửa thông tin (chưa triển khai)

Nhấn nút Sửa (màu xanh lá) ở cột Hành động. Tính năng này đang phát triển.

🎨 Giao diện

Màu sắc: Nền gradient xanh lam, bảng có bóng đổ, hiệu ứng hover.
Ô tìm kiếm: Có biểu tượng kính lúp, viền cong.
Nút: Gradient màu, hiệu ứng hover nâng lên.
Form: Viền cong, animation slide-down khi mở.

🛠️ Debug

Backend không chạy:
Kiểm tra log terminal, đảm bảo MySQL chạy và thông tin trong db.js đúng.


Frontend không hiển thị:
Mở DevTools (F12), tab Console, kiểm tra lỗi.
Đảm bảo backend chạy tại http://localhost:3001.



📞 Hỗ trợ

Nếu gặp vấn đề, liên hệ mình qua email: [your-email@example.com].

