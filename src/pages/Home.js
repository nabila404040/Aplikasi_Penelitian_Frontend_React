import React from 'react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-6 text-center">
            Selamat Datang di SIPENA
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">Tentang SIPENA</h2>
              <p className="text-gray-600">
                SIPENA adalah sistem informasi penilaian akademik yang memudahkan mahasiswa, dosen, dan pihak administrasi untuk mengelola dan memonitor nilai secara efisien. Melalui SIPENA, seluruh proses penilaian menjadi lebih transparan dan mudah diakses oleh semua pihak.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">Jelajahi Fitur</h2>
              <p className="text-gray-600">
                Temukan berbagai fitur menarik yang akan mempermudah Anda dalam mengelola penilaian akademik, mulai dari penginputan nilai hingga laporan hasil evaluasi yang lebih terstruktur.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
              Mulai Eksplorasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
