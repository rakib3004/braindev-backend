const mongoose = require('mongoose');

mongoose_connection_path = 'mongodb://localhost:27017/University'

mongoose.connect(mongoose_connection_path, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection'); }
});

require('../models/user.model');