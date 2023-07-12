const mongoose = require('mongoose');
  
// Database Connection
mongoose.connect('mongodb+srv://rakib3004:Rakib1129@cluster0.x52uqti.mongodb.net/University',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
  
// User model
const User = mongoose.model('User',{
    name: { type: String },
    age: { type: Number }
});
  
var new_user = new User({
    name: 'Rakib',
    age:23
})
  
new_user.save((err,result)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log(result)
    }
})