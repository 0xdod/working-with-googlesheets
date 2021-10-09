const mongoose = require('mongoose')


async function connect(url) {
  return await mongoose.connect(url);
}

exports.connect = connect
exports.mongoose = mongoose
