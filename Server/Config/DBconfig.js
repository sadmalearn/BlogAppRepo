const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`mongodb+srv://blogWebAdmin:BlogAdmin1867@blogweb.jitta8w.mongodb.net/?retryWrites=true&w=majority&appName=BlogWeb`);
    console.log(
      "Database connected succefully: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;