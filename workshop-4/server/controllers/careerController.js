const Career = require("../models/careerModel");

const careerGetAll = (req, res) => {
  return Career.find((error, careers) => {
    if (error) {
      console.log("there was an error", error);
      return error;
    }
    return careers;
  })
    .populate("course")
    .populate("teacher")
    .exec();
};

// Export the functions of this controller
module.exports = {
  careerGetAll,
};
