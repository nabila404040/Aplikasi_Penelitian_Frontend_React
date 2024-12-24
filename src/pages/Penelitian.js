import React, { useState } from 'react';
import useAPI from '../hooks/useAPI';
import endpoints from '../services/endpoints';
import usePostPenelitian from '../hooks/usepost';
import usePutPenelitian from '../hooks/useput';
import useDeletePenelitian from '../hooks/usedetelete';

function Penelitian() {
  const [kd_penelitian, setKdPenelitian] = useState('');
  const [id, setId] = useState('');
  const [judul, setJudul] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [thn_akademik, setThnAkademik] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { postPenelitian: post, loading: uploading, error: uploadError } = usePostPenelitian();
  const { putPenelitian: put, loading: updating, error: updateError } = usePutPenelitian();
  const { deletePenelitian: deleteFn, loading: deleting, error: deleteError } = useDeletePenelitian();
  const { data: penelitian, loading, error, refetch } = useAPI(endpoints.penelitian.getAll);

  // Handle submit for POST request (add new penelitian)
  const handleSubmitPost = async () => {
    if (!kd_penelitian.trim() || !judul.trim() || !lokasi.trim() || !thn_akademik.trim() || !tanggal.trim() || !status.trim()) {
      alert('Harap masukkan semua data.');
      return;
    }

    try {
      const result = await post(kd_penelitian, judul, lokasi, thn_akademik, tanggal, status);
      if (result) {
        alert('Penelitian berhasil ditambahkan!');
        refetch();
        setKdPenelitian('');
        setJudul('');
        setLokasi('');
        setThnAkademik('');
        setTanggal('');
        setStatus('');
      } else {
        alert('Gagal menambahkan penelitian!');
      }
    } catch (error) {
      alert('Terjadi kesalahan saat mengirim data.');
    }
  };

  // Handle submit for PUT request (update penelitian)
  const handleEditClick = (penelitian) => {
    setId(penelitian.id);
    setKdPenelitian(penelitian.kd_penelitian);
    setJudul(penelitian.judul);
    setLokasi(penelitian.lokasi);
    setThnAkademik(penelitian.thn_akademik);
    setTanggal(penelitian.tanggal);
    setStatus(penelitian.status);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setId(null);
    setKdPenelitian('');
    setJudul('');
    setLokasi('');
    setThnAkademik('');
    setTanggal('');
    setStatus('');
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    // Validasi tanpa menggunakan trim()
    if (!id) {
      alert('ID penelitian tidak ditemukan');
      return;
    }
     // Validasi data yang diperlukan
    if (!kd_penelitian || 
        !judul || 
        !lokasi || 
        !thn_akademik || 
        !tanggal || 
        !status) {
      alert('Harap masukkan semua data.');
      return;
    }
     // Lakukan trim hanya jika nilai ada
    const updatedData = {
      id,
      kd_penelitian: String(kd_penelitian).trim(),
      judul: String(judul).trim(),
      lokasi: String(lokasi).trim(),
      thn_akademik: String(thn_akademik).trim(),
      tanggal: String(tanggal).trim(),
      status: String(status).trim()
    };
     const result = await put(
      updatedData.id,
      updatedData.kd_penelitian,
      updatedData.judul,
      updatedData.lokasi,
      updatedData.thn_akademik,
      updatedData.tanggal,
      updatedData.status
    );
     if (result) {
      alert('Data Penelitian berhasil diperbarui!');
      handleCancelEdit();
      refetch();
    } else {
      alert('Terjadi kesalahan saat memperbarui data penelitian.');
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data penelitian ini?');
    if (!confirmDelete) return;

    const success = await deleteFn(id);
    if (success) {
      alert('Data Penelitian berhasil dihapus!');
      refetch();
    } else {
      alert(`Gagal menghapus data penelitian: ${deleteError}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Data Penelitian</h1>
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Data Penelitian</h1>
        <p className="text-center text-red-600">Error: {error}</p>
      </div>
    );
  }

  const penelitianList = Array.isArray(penelitian?.penelitian) ? penelitian.penelitian : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Data Penelitian</h1>

      {/* Form Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">{!isEditing ? 'Tambah Penelitian' : 'Edit Penelitian'}</h2>
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg mt-4">
          <input
            type="text"
            placeholder="Kode Penelitian"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={kd_penelitian}
            onChange={(e) => setKdPenelitian(e.target.value)}
          />
          <input
            type="text"
            placeholder="Judul"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
          <input
            type="text"
            placeholder="Lokasi"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tahun Akademik"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={thn_akademik}
            onChange={(e) => setThnAkademik(e.target.value)}
          />
          <input
            type="date"
            placeholder="Tanggal"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          <input
            type="text"
            placeholder="Status"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={isEditing ? handleUpdate : handleSubmitPost}
              disabled={uploading || updating}
              className="w-full p-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-300"
            >
              {uploading || updating ? (isEditing ? 'Updating...' : 'Uploading...') : (isEditing ? 'Update Penelitian' : 'Tambah Penelitian')}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Data Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-orange-200 text-hitam">
            <tr>
              <th className="py-3 px-6">Kode Penelitian</th>
              <th className="py-3 px-6">Judul Penelitian</th>
              <th className="py-3 px-6">Lokasi</th>
              <th className="py-3 px-6">Tahun Akademik</th>
              <th className="py-3 px-6">Tanggal</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penelitianList.length > 0 ? (
              penelitianList.map((penelitian) => (
                <tr key={penelitian.kd_penelitian} className="border-b hover:bg-blue-100">
                  <td className="py-4 px-6 text-center">{penelitian.kd_penelitian}</td>
                  <td className="py-4 px-6">{penelitian.judul}</td>
                  <td className="py-4 px-6 text-center">{penelitian.lokasi}</td>
                  <td className="py-4 px-6">{penelitian.thn_akademik}</td>
                  <td className="py-4 px-6 text-center">{penelitian.tanggal}</td>
                  <td className="py-4 px-6">{penelitian.status}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleEditClick(penelitian)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(penelitian.id)}
                      className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">Tidak ada data penelitian</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Penelitian;
