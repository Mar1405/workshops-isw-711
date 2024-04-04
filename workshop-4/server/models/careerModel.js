const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const career = new Schema({
    name: { type: String },
    code: { type: String },
    description: { type: String },
    course: {
        type: mongoose.ObjectId,
        ref: "Course",
    },
});

module.exports = mongoose.model("Career", career);
