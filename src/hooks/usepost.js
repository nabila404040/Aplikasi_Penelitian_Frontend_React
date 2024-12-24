import { useState } from 'react';
import api from '../services/api';
import endpoints from '../services/endpoints';

/**
 * usePostVideo adalah custom hook yang digunakan untuk mengirim data video ke backend.
 * @returns { Object } - Mengembalikan fungsi postVideo, serta status loading dan error.
 */
const usePostPenelitian = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk mengirim data video ke backend.
   * @param { integer } kd_penelitian - Judul video.
   * @param { string } judul 
   * @param { string } lokasi 
   * * @param { string } thn_akademik 
   * @param { string } tanggal 
   *  @param { string } status
   * @returns { Promise<Object> } - Mengembalikan data respons dari backend atau error.
   */
  const postPenelitian = async (kd_penelitian,judul,lokasi,thn_akademik,tanggal,status) => {
    setLoading(true);
    setError(null);

    try {
      // Membuat objek data untuk dikirim
      const data = {
        kd_penelitian,
        judul,
        lokasi,
        thn_akademik,
        tanggal,
        status
      };

      // Mengirim POST request ke endpoint yang sesuai
      const response = await api.post(endpoints.penelitian.create, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Mengembalikan data respons jika berhasil
      return response.data;
    } catch (err) {
      console.error('Error uploading Penelitian:', err);
      // Mengambil pesan error dari respons jika tersedia
      setError(err.response?.data?.error || 'Terjadi kesalahan saat mengupload penelitian.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postPenelitian, loading, error };
  };

export default usePostPenelitian;