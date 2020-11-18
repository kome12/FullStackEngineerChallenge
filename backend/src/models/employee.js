const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT = 10;

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: 1 },
    password: { type: String, required: true, minLength: 6 },
    isAdmin: { type: Boolean },
});

employeeSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(SALT, (err, salt) => {
            if (err) {
                console.error('Error generating SALT:', err);
                return next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    return next(err);
                }
                this.password = hash;
                next();
            });
        })
    }
    else {
        next();
    }
});

employeeSchema.methods.comparePassword = function(incomingPassword, checkedPassword) {
    bcrypt.compare(incomingPassword, this.password, (err, isMatch) => {
        if (err) {
            return checkedPassword(err);
        }
        return checkedPassword(null, isMatch);
    });
}

module.exports = Employee = mongoose.model('Employee', employeeSchema);
