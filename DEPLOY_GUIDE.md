# 🚀 Hướng Dẫn Deploy: Supabase + Railway + Vercel

## Kiến Trúc Sau Deploy

```
[Vercel]          [Railway]          [Supabase]
Frontend    ────►  Backend API  ────►  PostgreSQL DB
(React/Vite)      (Express/Node)      + Storage (ảnh)
```

---

## BƯỚC 1: Cấu Hình Supabase

### 1.1 Tạo Storage Bucket

1. Vào [supabase.com](https://supabase.com) → Dashboard của project
2. Menu trái → **Storage** → **New Bucket**
3. Tên bucket: **`uploads`**
4. Tick chọn **Public bucket** ✅
5. Nhấn **Create bucket**

### 1.2 Lấy Credentials

**Database URL** (cho Prisma):
1. Vào **Settings → Database**
2. Chọn **Connection string → URI**
3. Đổi port pooler:
   - **Transaction (6543)** → dùng cho `DATABASE_URL` (runtime)
   - **Session (5432)** → dùng cho `DIRECT_URL` (migrations)

**API Keys** (cho Supabase Storage):
1. Vào **Settings → API**
2. Copy:
   - `Project URL` → `SUPABASE_URL`
   - `anon / public` key → `SUPABASE_ANON_KEY`
   - `service_role / secret` key → `SUPABASE_SERVICE_ROLE_KEY`

### 1.3 Cập Nhật `.env` Local

Mở file `.env` ở root project và điền vào:

```env
DATABASE_URL="postgresql://postgres.xxx:[PASSWORD]@aws-0-xxx.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.xxx:[PASSWORD]@aws-0-xxx.pooler.supabase.com:5432/postgres"

SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### 1.4 Push Database Schema

Chạy lệnh sau để tạo tất cả bảng trên Supabase PostgreSQL:

```bash
npm run db:push
```

> ✅ Nếu thành công sẽ thấy: `Your database is now in sync with your Prisma schema.`

### 1.5 (Tùy chọn) Seed dữ liệu

```bash
npm run db:seed
```

---

## BƯỚC 2: Deploy Backend lên Railway

### 2.1 Push Code lên GitHub

```bash
git add .
git commit -m "chore: migrate to Supabase + Railway + Vercel"
git push origin main
```

### 2.2 Tạo Project trên Railway

1. Vào [railway.app](https://railway.app) → **New Project**
2. Chọn **Deploy from GitHub repo**
3. Chọn repository `trungluanmmo`
4. Railway sẽ tự detect `railway.json` và bắt đầu build

### 2.3 Cấu Hình Environment Variables trên Railway

Vào Railway project → **Variables** → thêm từng biến:

```
PORT=5000
DATABASE_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-xxx.pooler.supabase.com:6543/postgres
DIRECT_URL=postgresql://postgres.xxx:[PASSWORD]@aws-0-xxx.pooler.supabase.com:5432/postgres
JWT_SECRET=your_random_secret_here_make_it_long
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
TELEGRAM_BOT_TOKEN=           (để trống nếu không dùng)
TELEGRAM_CHAT_ID=             (để trống nếu không dùng)
GEMINI_API_KEY=               (để trống nếu không dùng)
```

### 2.4 Lấy Railway Domain

Sau khi build xong:
1. Vào **Settings → Domains**
2. Railway cấp domain dạng: `https://trungluanmmo-production.up.railway.app`
3. **Copy URL này** — sẽ dùng ở Bước 3

### 2.5 Test API Backend

Mở trình duyệt, truy cập:
```
https://trungluanmmo-production.up.railway.app/api/health
```

Nếu thấy JSON `{ "status": "ok" }` → ✅ Backend hoạt động!

---

## BƯỚC 3: Deploy Frontend lên Vercel

### 3.1 Tạo Project trên Vercel

1. Vào [vercel.com](https://vercel.com) → **Add New Project**
2. Import repository `trungluanmmo` từ GitHub
3. **Framework Preset**: Vite (Vercel tự detect)
4. **Root Directory**: `./` (giữ nguyên)
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`

### 3.2 Cấu Hình Environment Variables trên Vercel

Trước khi nhấn Deploy, vào **Environment Variables** → thêm:

```
VITE_API_URL=https://trungluanmmo-production.up.railway.app
```

> ⚠️ Thay `trungluanmmo-production.up.railway.app` bằng domain Railway thực của bạn (lấy từ Bước 2.4)

### 3.3 Deploy

Nhấn **Deploy** → chờ 2-3 phút.

Vercel sẽ cấp domain: `https://trungluanmmo.vercel.app`

### 3.4 Test Frontend

Mở `https://trungluanmmo.vercel.app` và kiểm tra:
- [ ] Trang chủ load bình thường
- [ ] Danh sách Projects hiển thị từ DB
- [ ] Admin Portal (`Ctrl+Shift+A`) đăng nhập được
- [ ] Upload ảnh → URL trả về dạng `https://xxx.supabase.co/storage/v1/object/public/uploads/...`

---

## BƯỚC 4: Custom Domain (Tùy chọn)

### Vercel (Frontend)
1. Vercel Dashboard → **Settings → Domains**
2. Thêm domain: `trungluanmmo.com`
3. Thêm DNS record theo hướng dẫn

### Railway (Backend)
1. Railway → **Settings → Domains → Custom Domain**
2. Thêm `api.trungluanmmo.com`
3. Cập nhật `VITE_API_URL` trên Vercel thành `https://api.trungluanmmo.com`
4. Redeploy Vercel

---

## Troubleshooting

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| `Can't reach database server` | DATABASE_URL sai | Kiểm tra lại connection string Supabase |
| `SUPABASE_URL...chưa được cấu hình` | Thiếu env var | Thêm SUPABASE_URL + SERVICE_ROLE_KEY |
| Upload ảnh lỗi `row-level security` | Bucket chưa public | Supabase → Storage → bucket `uploads` → Make Public |
| CORS error | VITE_API_URL sai | Kiểm tra URL Railway, không có dấu `/` cuối |
| Trang trắng trên Vercel | Build lỗi | Xem Vercel build logs |

---

## Lưu Ý Bảo Mật

> [!CAUTION]
> - **Không commit file `.env`** vào Git (đã có trong `.gitignore`)
> - **Đổi password admin** trước khi deploy production
> - **JWT_SECRET** phải đủ dài và ngẫu nhiên (ít nhất 32 ký tự)
> - **SUPABASE_SERVICE_ROLE_KEY** chỉ dùng server-side, không expose ra frontend
