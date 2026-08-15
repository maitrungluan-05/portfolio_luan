# 📘 Hướng Dẫn Quản Trị Hệ Thống Fullstack (FE + BE + DB) — `trungluanmmo`

Hệ thống được thiết kế theo đúng chuẩn kiến trúc 3 lớp (**3-Tier Architecture**) chuyên nghiệp:
- **Frontend (FE):** React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion.
- **Backend (BE):** Node.js + Express + TypeScript + JWT Auth + Multer Image Upload.
- **Database (DB):** Prisma ORM + SQLite (hoặc PostgreSQL / MySQL) có sẵn dữ liệu và migration.

---

## 1. 🚀 Khởi Chạy Ứng Dụng

Chỉ cần chạy **1 lệnh duy nhất** từ thư mục gốc để khởi động đồng thời cả Frontend và Backend:

```bash
npm run dev
```

- **Frontend Website:** [http://localhost:5173](http://localhost:5173)
- **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)
- **Uploads Ảnh tĩnh:** [http://localhost:5000/uploads](http://localhost:5000/uploads)
- **Health Check API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

*(Nếu muốn chạy riêng biệt từng phần)*:
- Chỉ chạy Backend: `npm run server`
- Chỉ chạy Frontend: `npm run client`

---

## 2. 🔐 Giao Diện Quản Trị Admin Portal (CRUD)

Có 2 cách cực kỳ tiện lợi để mở bảng điều khiển Admin:
1. **Phím tắt nhanh:** Nhấn tổ hợp phím `Ctrl + Shift + A` (hoặc `Cmd + Shift + A` trên Mac) ở bất kỳ đâu trên trang web.
2. **Nút bấm trực tiếp:** Bấm vào dòng chữ **`[QUẢN TRỊ ADMIN]`** ở góc dưới cùng chân trang (Footer).

### 🔑 Tài khoản đăng nhập mặc định:
- **Tên đăng nhập (Username):** `admin`
- **Mật khẩu (Password):** `adminpassword123`
*(Bạn có thể thay đổi thông tin này trong file `.env`)*.

---

## 3. 🎯 Các Chức Năng CRUD Trong Admin Portal

1. **Quản lý Dự án (Projects):**
   - Xem danh sách toàn bộ dự án.
   - Thêm dự án mới: Tiêu đề, loại hình, mô tả ngắn/chi tiết, danh sách công nghệ, link demo trực tiếp.
   - **Upload ảnh trực tiếp từ máy tính:** Tự động lưu vào thư mục `uploads/` trên server.
   - Chỉnh sửa hoặc xóa dự án.
2. **Quản lý Khoảnh khắc (Moments Gallery):**
   - Xem bộ sưu tập ảnh dưới dạng lưới trực quan.
   - Upload ảnh mới, chọn phân loại (`HOMETOWN`, `WORK`, `TRAVEL`, `LIFESTYLE`), chọn tỷ lệ ảnh (`landscape`, `portrait`, `square`, `wide`) và viết caption.
   - Sửa/Xóa khoảnh khắc.
3. **Quản lý Lộ trình (Journey Timeline):**
   - Thêm các cột mốc sự nghiệp mới (Stage, Period, Tiêu đề, Nội dung, Tags).
4. **Hòm thư Liên hệ (Inbox Messages):**
   - Khi có khách điền vào Form liên hệ trên website, tin nhắn sẽ được lưu ngay vào Database.
   - Admin có thể đọc tin nhắn, xem Email/Telegram của khách, thời gian gửi, đánh dấu đã đọc hoặc xóa.
5. **Giao diện Trực quan Prisma Studio (Web GUI xem trực tiếp DB):**
   - Chạy lệnh:
     ```bash
     npm run db:studio
     ```
   - Trình duyệt sẽ mở giao diện quản lý toàn bộ các bảng Database dạng bảng tính Excel cực kỳ trực quan tại [http://localhost:5555](http://localhost:5555).

---

## 4. 📡 Danh Sách REST API Endpoints của Backend

| Phương thức | Endpoint | Quyền | Mô tả |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Đăng nhập Admin và nhận JWT token |
| `GET` | `/api/auth/me` | Admin (JWT) | Lấy thông tin tài khoản hiện tại |
| `GET` | `/api/projects` | Public | Lấy danh sách toàn bộ dự án |
| `POST` | `/api/projects` | Admin (JWT) | Tạo mới 1 dự án |
| `PUT` | `/api/projects/:id` | Admin (JWT) | Cập nhật thông tin dự án |
| `DELETE`| `/api/projects/:id` | Admin (JWT) | Xóa dự án |
| `GET` | `/api/moments` | Public | Lấy danh sách khoảnh khắc/ảnh |
| `POST` | `/api/moments` | Admin (JWT) | Thêm khoảnh khắc mới |
| `PUT` | `/api/moments/:id` | Admin (JWT) | Sửa khoảnh khắc |
| `DELETE`| `/api/moments/:id` | Admin (JWT) | Xóa khoảnh khắc |
| `GET` | `/api/journey` | Public | Lấy danh sách lộ trình |
| `POST` | `/api/journey` | Admin (JWT) | Thêm cột mốc mới |
| `PUT` | `/api/journey/:id` | Admin (JWT) | Sửa cột mốc |
| `DELETE`| `/api/journey/:id` | Admin (JWT) | Xóa cột mốc |
| `POST` | `/api/contact` | Public | Khách gửi lời nhắn qua form |
| `GET` | `/api/contact/messages` | Admin (JWT) | Xem toàn bộ hòm thư liên hệ |
| `PATCH` | `/api/contact/messages/:id/read` | Admin (JWT) | Đánh dấu đã đọc tin nhắn |
| `DELETE`| `/api/contact/messages/:id` | Admin (JWT) | Xóa tin nhắn |
| `POST` | `/api/upload` | Admin (JWT) | Upload file ảnh lên server |

---

## 5. 🤖 Bật Tính Năng Bắn Tin Nhắn về Telegram Bot

Nếu bạn muốn mỗi khi có khách gửi tin nhắn trên web, Bot sẽ lập tức báo về điện thoại của bạn qua Telegram:
1. Mở file `.env` ở thư mục gốc.
2. Điền Token của Bot và Chat ID:
   ```env
   TELEGRAM_BOT_TOKEN="123456789:ABCdefGhIJKlmNoPQRstuVWXyz"
   TELEGRAM_CHAT_ID="987654321"
   ```
3. Lưu lại — Backend sẽ tự động gửi tin nhắn báo động qua Telegram mỗi khi có khách gửi form!

---

## 6. 🗄️ Chuyển Sang PostgreSQL hoặc MySQL khi Deploy Production

Hiện tại Database đang sử dụng **SQLite** (`server/prisma/dev.db`) để bạn code và chạy local ngay tức thì không cần cài đặt gì. Khi muốn deploy lên VPS / Cloud (Supabase, Railway, Render, Neon, Aiven...):
1. Mở file `server/prisma/schema.prisma`.
2. Đổi `provider = "sqlite"` thành `provider = "postgresql"` (hoặc `"mysql"`).
3. Đổi biến `DATABASE_URL` trong `.env` thành chuỗi kết nối của bạn:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   ```
4. Chạy `npm run db:push` là xong!
