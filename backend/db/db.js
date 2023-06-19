const { default: mongoose } = require("mongoose");
const monogoose = require("mongoose");

const db = async () => {
  try {
    monogoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db };
