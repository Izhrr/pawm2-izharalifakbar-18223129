
# SQLab — SQL Learning Platform

SQLab adalah aplikasi pembelajaran interaktif untuk SQL yang dibangun dengan React (Vite) di frontend dan Supabase (PostgreSQL + Auth) sebagai backend/BaaS. Aplikasi menyediakan fitur kuis, materi pembelajaran, latihan interaktif, dan penyimpanan skor pengguna.

---

## Ringkasan Arsitektur
- Frontend: React + Vite
  - Struktur: Router (client-side), Components (UI), Service (layer yang memanggil API)
  - Lokasi service utama: `frontend/src/services/quizService.js`
- Backend: Supabase (PostgREST, Auth, Edge Functions bila diperlukan)
  - DB: PostgreSQL dikelola Supabase
  - Tabel utama: `quiz_categories`, `quizzes`, `quiz_questions`, `learning_materials`, `learning_exercises`, `quiz_scores`
  - Users: `auth.users` (entitas external dari Supabase Auth)
- Komunikasi:
  - Frontend Service ↔ Supabase REST (PostgREST) atau Edge Functions (Router/Controller)
  - Supabase ↔ PostgreSQL (ORM-like access via supabase-js or custom ORM in Edge Functions)

---

## Fitur Utama
- Quiz selection (berdasarkan kategori/difficulty)
- Quiz runtime (multiple-choice & drag-drop)
- Menyimpan skor user (upsert ke `quiz_scores`)
- Materi pembelajaran & exercises (drag-drop, multiple-choice)
- Dokumentasi API (OpenAPI/Swagger di `docs/openapi.yaml`)

---

## Prasyarat
- Node.js (>= 18)
- npm atau pnpm
- Akun Supabase (project)
- Git

---


## Environment Variables

Untuk Vite project, gunakan prefix `VITE_` (direkomendasikan). Di hosting (Vercel/Netlify), set env vars sesuai nama di bawah:

- VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
- VITE_SUPABASE_ANON_KEY=<ANON_KEY>

Catatan: Jika repo atau code Anda saat ini memakai `REACT_APP_` prefix (create-react-app style), sesuaikan env var names di codebase atau ganti menjadi `VITE_` dan perbarui pemanggilan environment pada `src/lib/supabaseClient.js`.

---

## Menjalankan Aplikasi Secara Lokal

1. Clone repo:
   ```
   git clone https://github.com/Izhrr/pawm2-izharalifakbar-18223129.git
   cd pawm2-izharalifakbar-18223129/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Buat file `.env` di folder `frontend`:
   ```
   VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...your_anon_key...
   ```

   (Atau gunakan `REACT_APP_SUPABASE_URL` / `REACT_APP_SUPABASE_ANON_KEY` jika codebase masih memakai prefix tersebut.)

4. Jalankan dev server:
   ```
   npm run dev
   ```
   Buka `http://localhost:5173` (port default Vite) atau URL yang ditampilkan.

5. Build produksi:
   ```
   npm run build
   npm run preview
   ```

---

## API Documentation (Swagger/OpenAPI)

- OpenAPI spec: `docs/openapi.yaml`
- Menjalankan Swagger UI lokal:
  - Salin `docs/openapi.yaml` dan `docs/index.html` (Swagger UI) ke web server / gunakan `editor.swagger.io` untuk preview.
- Authorization:
  - Gunakan `Authorization: Bearer <JWT>` untuk endpoint yang memerlukan auth.
  - Sertakan header `apikey: <ANON_KEY>` untuk requests dari client.

---

## Catatan Penting & Troubleshooting

1. Materi tidak muncul ketika tidak login:
   - Periksa RLS policy pada `learning_materials` dan `learning_exercises`.
   - Jika ingin bahan tampil tanpa login, set SELECT policy ke `TO public` atau `USING (is_active = true)`.

2. Retry quiz berhasil lokal tapi gagal di deploy:
   - Periksa environment variables pada hosting (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).
   - Pastikan deployed domain masuk ke Supabase Auth Redirect URLs.
   - Periksa Network tab saat retry: apakah Authorization header (Bearer JWT) disertakan? Jika tidak, session/token hilang.

3. Konsistensi identifier quiz:
   - Pilih satu strategi: referensi menggunakan `quizzes.id` (UUID) atau `quizzes.quiz_id` (slug/text).
   - Jika frontend mengirim `quiz_id` (text), pastikan `quiz_scores.quiz_id` bertipe TEXT dan, jika diinginkan, tambahkan FK ke `quizzes.quiz_id`.
   - Jika migrasi ke UUID, lakukan penambahan kolom baru (quiz_uuid), migrasi data, dan ubah frontend.

4. RLS & Keamanan:
   - Jangan gunakan `service_role` key di frontend; simpan hanya di server/Edge Functions.
   - Buat policy WRITE selektif (authenticated only) untuk mencegah penyalahgunaan.

5. Debugging save/upsert
   - Tambahkan console logs sementara di `quizService.saveQuizScore` untuk memeriksa `session`, `user_id`, payload dan respon Supabase.
   - Periksa response error PostgREST (PGRSTxxx) untuk tahu apakah masalah policy, JWT, atau constraint.

---

## Struktur Folder (ringkasan)
- frontend/
  - src/
    - components/ (UI components)
    - pages/ (QuizPage, LearnPage, etc.)
    - services/quizService.js (semua panggilan ke Supabase)
    - lib/supabaseClient.js (inisialisasi supabase-js)
  - package.json
- docs/
  - openapi.yaml (OpenAPI spec)
  - index.html (Swagger UI)
- supabase_migration.sql (schema + seed data)
- README.md (file ini)

---

## Contributing
- Buka issue untuk bug atau fitur yang diinginkan.
- Gunakan branch feature/<deskripsi> untuk perubahan.
- Buat PR ke branch `main` (atau branch default repo).
- Sertakan testing steps dan environment yang diperlukan untuk reviewer.

---

## Deployment
- Rekomendasi hosting frontend: Vercel / Netlify (set env vars pada project settings).
- Backend: Supabase (tidak perlu deploy backend server tambahan kecuali menggunakan Edge Functions).
- Jangan lupa setting Supabase Auth Redirect URLs dan Site URL.

---

## Contoh cURL (upsert skor)
```
curl -X POST "https://<PROJECT_REF>.supabase.co/rest/v1/quiz_scores" \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Prefer: resolution=merge-duplicates" \
  -d '{
    "user_id":"86019053-9410-4416-8a89-49775f035418",
    "quiz_id":"basic-sql",
    "highest_score":5,
    "total_questions":5,
    "completed_at":"2025-11-07T06:00:00Z"
  }'
```

---

## License
MIT

---

## Kontak / Referensi
- Repo: https://github.com/Izhrr/pawm2-izharalifakbar-18223129
- Author: Izhar Alif Akbar
- Jika butuh bantuan setup Supabase atau memperbaiki RLS, buka issue di repo atau hubungi via email 18223129@std.stei.itb.ac.id
