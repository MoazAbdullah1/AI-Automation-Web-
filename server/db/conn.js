const mongoose = require("mongoose");

const DB = process.env.DATABASE;

// Connect DataBase
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true, // not running
    useUnifiedTopology: true,
    // useFindAndModify: false, // not running
  })
  .then(() => {
    console.log("connected with DataBase");
  })
  .catch((err) => console.log("DataBase NOT Connected"));
