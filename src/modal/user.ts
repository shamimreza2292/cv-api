import {Schema} from 'mongoose';
import Mongoose  from 'mongoose';



const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    // confirmPassword: {type: String}
});

module.exports = Mongoose.model('user', userSchema); 




 



