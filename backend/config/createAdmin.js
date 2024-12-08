const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

mongoose.connect('mongodb+srv://hadeed2k20:TPR8tLL8XPMO4Ibj@project0.qbhys.mongodb.net/AdminFeatures?retryWrites=true&w=majority&appName=Project0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin already exists');
      return;
    }

    const admin = new Admin({
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10), 
    });

    await admin.save();
    console.log('Admin created successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error creating admin:', err);
  });
