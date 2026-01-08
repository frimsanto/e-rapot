# e-Rapot

Aplikasi e-rapot berbasis web untuk pengelolaan nilai, rapor, dan data akademik dengan beberapa peran pengguna (siswa, guru, kurikulum, wali kelas, kepala sekolah, dan admin).

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui (Radix-based components)
- Tailwind CSS
- @tanstack/react-query

## Menjalankan Project Secara Lokal

Pastikan Node.js dan npm sudah terpasang di mesin lokal.

```sh
# Clone repository
git clone <REPO_URL>

# Masuk ke folder project
cd e-rapot

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Secara default, Vite akan menjalankan aplikasi di `http://localhost:5173` (atau port lain jika 5173 sudah dipakai).

## Build untuk Production

```sh
npm run build
```

Hasil build akan berada di folder `dist` dan bisa dideploy ke layanan static hosting seperti Netlify, Vercel, Cloudflare Pages, atau server statis lain.

## Struktur Fungsional (Singkat)

- Autentikasi dan manajemen role melalui context global (`AppContext`).
- Routing terpisah per peran (siswa, guru, kurikulum, wali kelas, kepala sekolah, admin).
- Integrasi ke backend melalui wrapper `api` dengan base URL yang dikonfigurasi lewat environment variable (`VITE_API_BASE_URL`).

