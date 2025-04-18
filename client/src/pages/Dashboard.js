import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../components/ui/pagination";

const categories = [
  'Semua', 'Ilmiah', 'Teknologi', 'AI', 'Luar Angkasa', 'Biologi',
  'Inovasi', 'Futuristik', 'Konspirasi', 'Neurotech', 'Fenomena', 'IT'
];

const articles = [
  { title: 'Eksperimen Neuralink Terbaru', desc: 'Sebuah penemuan baru tentang interaksi otak-komputer...' },
  { title: 'Efek Quantum pada Biologi Molekuler', desc: 'Penelitian ini mengungkap potensi pengaruh...' },
  { title: 'AI Menulis Puisi?', desc: 'Bisakah AI memahami emosi manusia dan menuliskannya dalam puisi?' },
  { title: 'Jejak Dark Matter di Galaksi Kita', desc: 'Observasi terbaru dari teleskop luar angkasa...' },
  { title: 'Biohacking: Evolusi Manusia Buatan?', desc: 'Gerakan biohacker makin berkembang...' },
  { title: 'Teknologi Antimateri untuk Energi Masa Depan', desc: 'Mungkinkah antimateri digunakan sebagai sumber energi?' },
  { title: 'Mimpi Lucid dan Mesin Penafsir Mimpi', desc: 'Sebuah alat baru membaca gelombang otak...' },
  { title: 'Mars: Langkah Nyata atau Fiksi?', desc: 'Proyek ambisius mulai menguji teknologi di Mars...' },
  { title: 'Menyimpan Data dalam Genetika', desc: 'Ilmuwan menyimpan film dalam untaian DNA...' },
  { title: 'Robot Emosional di Sekolah Anak', desc: 'Robot berbasis AI membantu perkembangan sosial anak...' },
  { title: 'Planet yang Berputar Terbalik', desc: 'Planet dengan rotasi kebalikan—fenomena langka.' },
  { title: 'Cermin Kuantum: Melihat Masa Lalu?', desc: 'Eksperimen kuantum terbaru membuka wacana baru...' },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');

  const itemsPerPage = 6;
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-green-200 overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`
        fixed z-40 top-0 left-0 h-full w-64 bg-green-50 shadow-md p-4 flex flex-col justify-between transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-40
      `}>
        <div>
          <h2 className="text-xl font-bold mb-6 text-green-800">📚 Jurnal</h2>
          <nav className="space-y-3 text-sm">
            <Link to="/" className="text-gray-700 hover:text-green-600 block">🏠 Beranda</Link>
            <Link to="/kategori" className="text-gray-700 hover:text-green-600 block">📂 Kategori</Link>
            <Link to="/tentang" className="text-gray-700 hover:text-green-600 block">ℹ️ Tentang</Link>
            <Link to="/kontak" className="text-gray-700 hover:text-green-600 block">📞 Kontak</Link>
          </nav>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="mt-10 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-md transition"
        >
          🔓 Logout
        </button>
      </aside>

      {/* Overlay Untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-h-screen bg-white text-gray-800 p-4 md:p-8 overflow-y-auto w-full">
        
        {/* Header & Hamburger */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-green-700 focus:outline-none text-3xl"
          >
            ☰
          </button>
        </div>

        <h1 className="text-3xl font-extrabold mb-6 text-center hidden md:block">Artikel Hari Ini</h1>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border-[2px] rounded-none font-bold text-xs md:text-sm uppercase ${
                activeCategory === cat
                  ? 'bg-green-600 text-white border-black'
                  : 'bg-white text-black border-black hover:bg-yellow-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentArticles.map((article, i) => (
            <div
              key={i}
              className="bg-green-100 rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <h3 className="text-lg md:text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.desc}</p>
              <button className="mt-4 text-indigo-600 hover:underline text-sm">
                Baca Selengkapnya
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default Dashboard;
