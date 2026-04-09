# Hướng dẫn chạy dự án VinFast AI Smart Advisor

Dự án bao gồm một hệ thống tư vấn xe điện thông minh sử dụng Python làm công cụ tính toán (Backend) và React làm giao diện người dùng (Frontend).

## 1. Yêu cầu hệ thống
- **Python**: Phiên bản 3.9 trở lên.
- **Node.js**: Phiên bản 16 trở lên.
- **npm**: Đi kèm với Node.js.

## 2. Cấu trúc thư mục quan trọng
- `server.py`: Chạy API Backend (FastAPI).
- `recommandation.py`: Logic xử lý gợi ý xe.
- `recommendation.json`: Cơ sở dữ liệu thông số xe.
- `Front_end_Login/`: Thư mục chứa mã nguồn React.

## 3. Các bước khởi chạy

### Bước 1: Cài đặt và chạy Backend (Python)
Mở một terminal tại thư mục gốc của dự án (`e:\VinUNI_thuc_chien\lab_6\lab6_nhom1_zone3`) và chạy các lệnh sau:

```bash
# Cài đặt các thư viện cần thiết
pip install -r requirements.txt

# Khởi chạy server API
python server.py
```
Server sẽ chạy tại địa chỉ: `http://localhost:8000`. Hãy giữ terminal này luôn hoạt động.

### Bước 2: Cài đặt và chạy Frontend (React)
Mở một terminal mới (không tắt terminal Python) và di chuyển vào thư mục giao diện:

```bash
cd Front_end_Login

# Cài đặt các node modules
npm install

# Khởi chạy giao diện phát triển
npm run dev
```
Sau khi lệnh chạy thành công, trình duyệt sẽ tự động mở (hoặc bạn click vào link hiển thị trong terminal, thường là `http://localhost:5173`).

## 4. Cách sử dụng
1. Đăng ký/Đăng nhập vào hệ thống.
2. Truy cập trang Chatbot.
3. Nhập nhu cầu của bạn (Ví dụ: "Tôi muốn tìm xe 5 chỗ giá 500 triệu").
4. AI sẽ dựa trên file `recommandation.py` để tính toán và trả về Top 3 xe phù hợp nhất ngay trên khung chat.