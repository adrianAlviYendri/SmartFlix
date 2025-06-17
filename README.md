# SmartFlix

SmartFlix adalah platform rekomendasi film berbasis kecerdasan buatan (AI) yang menyediakan fitur pencarian, rekomendasi, daftar favorit, dan pembayaran film. Project ini terdiri dari dua bagian utama: **Backend (server)** menggunakan Node.js, Express, dan Sequelize, serta **Frontend (client)** menggunakan React dan Redux Toolkit.

---

## Fitur Utama

### Backend (Server)

- **Autentikasi & Otorisasi**: Register, login (email/password & Google OAuth), JWT-based authentication.
- **Manajemen Film**: Mendapatkan daftar film publik dan privat, pencarian film, serta menambah film ke favorit.
- **Favorit**: Menambah, melihat, dan menghapus film favorit pengguna.
- **Profil Pengguna**: Melihat dan mengubah username.
- **Rekomendasi AI**: Mendapatkan rekomendasi film berbasis preferensi menggunakan Google Gemini AI.
- **Pembayaran**: Integrasi pembayaran dengan Midtrans (fitur checkout keranjang).
- **Error Handling**: Middleware penanganan error yang konsisten.
- **Testing**: Unit dan integration test menggunakan Jest & Supertest.

### Frontend (Client)

- **Autentikasi**: Register, login, Google Sign-In.
- **Daftar Film Publik**: Melihat dan mencari film tanpa login.
- **Dashboard Pengguna**: Setelah login, pengguna dapat melihat film, menambah ke favorit, mengelola profil, dan melakukan pembayaran.
- **Rekomendasi AI**: Form input preferensi untuk mendapatkan rekomendasi film dari AI.
- **Keranjang (Cart)**: Menambah film ke keranjang, memilih film untuk checkout, dan melakukan pembayaran via Midtrans.
- **UI Modern**: Menggunakan Bootstrap, SweetAlert2, dan desain responsif.

---

## Struktur Project

```
SmartFlix/
│
├── client/         # Frontend React (Vite)
│   ├── src/
│   │   ├── movie/  # Fitur film, favorit, rekomendasi, cart, dsb.
│   │   └── Users/  # Fitur autentikasi & profil
│   ├── public/
│   └── ...
│
├── server/         # Backend Express
│   ├── models/     # Model Sequelize (User, Movie, Favorite)
│   ├── migrations/ # Migrasi database
│   ├── seeders/    # Seeder data awal
│   ├── helpers/    # Helper (bcrypt, jwt)
│   ├── middleware/ # Middleware (auth, error handler)
│   ├── services/   # Integrasi AI (Gemini)
│   ├── __test__/   # Unit & integration test
│   └── ...
│
└── README.md       # Dokumentasi utama
```

---

## Cara Menjalankan Project

### 1. Clone Repository

```sh
git clone https://github.com/username/SmartFlix.git
cd SmartFlix
```

### 2. Setup Backend (Server)

```sh
cd server
cp .env.example .env
# Isi variabel pada .env sesuai kebutuhan (TMDB_API_KEY, JWT_SECRET, dsb)
npm install
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
```

Server berjalan di `http://localhost:3000`

### 3. Setup Frontend (Client)

```sh
cd client
cp .env.example .env
# Isi VITE_GOOGLE_CLIENT_ID sesuai kredensial Google OAuth Anda
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`

---

## Dokumentasi API

Dokumentasi lengkap endpoint backend tersedia di [server/readme.md](server/readme.md).

---

## Teknologi yang Digunakan

- **Backend**: Node.js, Express, Sequelize, PostgreSQL, JWT, Google OAuth, Midtrans, Google Gemini AI
- **Frontend**: React, Redux Toolkit, Bootstrap, SweetAlert2, Vite
- **Testing**: Jest, Supertest

---

> SmartFlix - Platform Rekomendasi Film AI untuk pengalaman menonton yang lebih cerdas dan personal.
