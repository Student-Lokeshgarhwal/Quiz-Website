const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true,unique:true },
    optionfirst: { type: String, required: true },
    optionsecond: { type: String, required: true },
    optionthird: { type: String, required: true },
    optionfourth: { type: String, required: true },
    answer: { type: String, required: true },
    created_By:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
}, { timestamps: true });

const quizModel = mongoose.model("Quiz", quizSchema);
module.exports = quizModel;