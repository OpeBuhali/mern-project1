import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-green-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Selamat Datang di <span className="underline">Jurnal Story</span></h1>
      <p className="text-gray-700 mb-6 max-w-md">
        Temukan cerita-cerita unik, ilmiah, dan penuh inspirasi dari dunia nyata maupun imajinasi. 
        Mulailah eksplorasi bersama!
      </p>
      <Link
        to="/login"
        className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
      >
        Masuk ke Aplikasi
      </Link>
    </div>
  );
};

export default Home;
