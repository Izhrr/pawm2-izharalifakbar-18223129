// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import TutorialPage from '@/pages/TutorialPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MainLayout from '@/components/layout/MainLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute yang menggunakan Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        {/* Tambahkan rute quiz di sini nanti */}
        {/* <Route path="/quiz" element={<QuizPage />} /> */}
      </Route>

      {/* Rute untuk halaman yang tidak ditemukan */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;