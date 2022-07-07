var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

let schema = mongoose.Schema({

    email: { type: 'string', lowercase: true },
    password: 'string',
    role: { type: 'string', enum: ['user','admin'] }

});

schema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
schema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};
const User = mongoose.model('User', schema);


module.exports = User;