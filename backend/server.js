const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const User = require('./models/User');

// test route

app.get('/', (req, res) => {
  res.send('Welcome to the Music Streaming App backend!');
});

app.get('/api/user', async (req, res) => {
  const existingUser = await User.findOne({ email: 'test@example.com' });
  res.json({ message: 'User found', user: existingUser.username });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log('Backend running on port', process.env.PORT || 5000)
    );
  })
  .catch(err => console.error(err));
