// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg">Halaman Tidak Ditemukan</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Kembali ke Beranda
      </Link>
    </div>
  );
};
export default NotFoundPage;