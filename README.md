# 🚀 Portfolio Mai Trung Luân (trungluanmmo)

Website cá nhân & danh mục dự án Fullstack chuẩn công nghệ với kiến trúc 3 lớp (Frontend + Backend + Database), hiệu ứng chuyển động tương tác cao cấp (Framer Motion, Canvas Shaders) và Bảng Quản trị Admin Portal CRUD toàn diện.

---

## 🏛️ Kiến Trúc Hệ Thống (3-Tier Fullstack)

- **Frontend (FE):** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend (BE):** Node.js, Express, TypeScript, JWT Authentication, Multer Upload, Telegram Bot Alert.
- **Database (DB):** Prisma ORM, SQLite / PostgreSQL.
- **Quản trị:** Admin Dashboard tích hợp trực tiếp trên web (`Ctrl + Shift + A` hoặc qua Footer) hỗ trợ CRUD đầy đủ cho Projects, Moments, Journey, Profile, About, Hometown và Hòm thư liên hệ.

---

## ⚡ Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Cài đặt thư viện dependencies:
```bash
npm install
```

### 2. Cấu hình môi trường (.env):
Tạo file `.env` từ file `.env.example`:
```bash
cp .env.example .env
```

### 3. Khởi tạo Database & Nạp dữ liệu ban đầu:
```bash
npm run db:push
npm run db:seed
```

### 4. Khởi chạy toàn bộ hệ thống (Frontend + Backend):
```bash
npm run dev
```

- **Frontend Website:** [http://localhost:5173](http://localhost:5173)
- **Backend REST API:** [http://localhost:5000/api](http://localhost:5000/api)
- **Database Studio (Trực quan):** `npm run db:studio` -> [http://localhost:5555](http://localhost:5555)

---

## 🔑 Thông Tin Đăng Nhập Quản Trị Mặc Định

- **Đường dẫn:** Nhấn `Ctrl + Shift + A` trên website hoặc bấm `[QUẢN TRỊ ADMIN]` ở Footer.
- **Tên đăng nhập:** `admin`
- **Mật khẩu:** `adminpassword123` *(có thể thay đổi trong `.env`)*

---

## 👨‍💻 Tác Giả

**Mai Trung Luân (trungluanmmo)**
- **Website:** [trungluanmmo.com](https://trungluanmmo.com)
- **Telegram:** [@trungluanmmo](https://t.me/trungluanmmo)
