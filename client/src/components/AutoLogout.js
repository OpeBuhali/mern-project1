import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = () => {
  const navigate = useNavigate();

  //Untung Mengatur Waktu
  const logoutTimeout = 5 * 60 * 1000;
  const [timeLeft, setTimeLeft] = useState(logoutTimeout);
  const [isLoggedOut, setIsLoggedOut] = useState(false); 

  useEffect(() => {
    let timeout;
    let countdownInterval;

    const resetTimeout = () => {
      // Hentikan interval yang lama
      clearTimeout(timeout);
      clearInterval(countdownInterval);

      // Reset countdown
      setTimeLeft(logoutTimeout);

      // Set timeout untuk logout setelah waktu tertentu
      timeout = setTimeout(() => {
        localStorage.removeItem('token'); // Hapus token atau session
        setIsLoggedOut(true);
        navigate('/'); // Redirect ke halaman login
        window.location.reload();
      }, logoutTimeout);

      // Countdown timer untuk menampilkan waktu yang tersisa
      countdownInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1000) {
            clearInterval(countdownInterval); // Hentikan countdown jika sudah 0
            return 0;
          }
          return prevTime - 1000; // Kurangi waktu setiap detik
        });
      }, 1000);
    };

    // Menambahkan event listeners untuk mendeteksi aktivitas pengguna
    const events = ['click', 'mousemove', 'keydown'];

    events.forEach(event =>
      window.addEventListener(event, resetTimeout)
    );

    // Mengatur timeout awal
    resetTimeout();

    // Membersihkan event listeners dan interval ketika komponen dibersihkan
    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimeout)
      );
      clearTimeout(timeout);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  // Menghitung waktu yang tersisa dalam format menit:detik
  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Jika sudah logout
  if (isLoggedOut) return null;

  return (
    <div>
      {timeLeft > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}>
          Waktu logout: {formatTimeLeft(timeLeft)}
        </div>
      )}
    </div>
  );
};

export default AutoLogout;
