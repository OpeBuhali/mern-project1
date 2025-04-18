const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send({ message: 'Server error', error: err.message });
  });
  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('DB Connection Error:', err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
