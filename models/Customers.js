//Modules
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const customerSchema = new schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
  created_at: {type: Date, default: Date.now }
});

customerSchema.pre('save', function(next) {
  var customer = this;

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(customer.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          customer.password = hash;
          next();
      });
  });
});


// export du model
module.exports = mongoose.model('customers', customerSchema);