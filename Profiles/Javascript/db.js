const mongoose = require('mongoose');
const MongoURI = 'mongodb://localhost:27017/CustomUser';
const connectToDB = async () => {
  try {
    await mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    console.log('Connected to Mongo');
    } catch (err){ console.log('Connection Failed', err);
    }
};

module.exports = connectToDB;