import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200">
      <Navbar />
      <div className="container mx-auto px-4">
        <main className="py-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Total Penelitian</h3>
                <p className="text-3xl font-bold text-orange-600">24</p>
              </div>
              <div className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Penelitian Aktif</h3>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Selesai</h3>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
