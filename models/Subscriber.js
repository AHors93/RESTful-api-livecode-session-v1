const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const subscriberSchema = new Schema({
    username: {
        type: String, 
        required: true,
        min: 1,
        max: 15, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
        select: false
    },
    subscriber: {
        type: Boolean, 
        default: true
    },
    plants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plants'}],
});
// the following code will automatically run when we try to save a new subscriber to the database
subscriberSchema.pre('save', function(next) {
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

// userSchema.methods.comparePassword = function(password, cb) {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         if (err) 
//             return cb(err);
//         else {
//             if(!isMatch)
//                 return cb(null, isMatch);
//             return cb(null, this);
//         }
//     });
// }

module.exports = mongoose.model('Subscriber', subscriberSchema);