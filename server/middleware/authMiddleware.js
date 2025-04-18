const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Mengambil token dari header

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan, silakan login terlebih dahulu.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Menyimpan informasi user dalam request untuk digunakan pada endpoint lain
    next();  // Melanjutkan ke route yang dituju
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau telah kadaluarsa.' });
  }
};

module.exports = authMiddleware;