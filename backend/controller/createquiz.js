const quizModel = require('../model/Quiz')
const { getUser } = require('../service/auth')

const createQuizHandler = async (req, res) => {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ msg: "Unauthorized! Please login first! " })

    const payload = await getUser(token)
    if (!payload || !payload.id) return res.status(401).json({ msg: "Unauthorized! Please login first! " })

    const { question, optionfirst, optionsecond, optionthird, optionfourth, answer } = req.body
    if (!question || !optionfirst || !optionsecond || !optionthird || !optionfourth || !answer)
        return res.status(400).json({ msg: "Please fill all the fields!" })

    const isCreatedQuiz = await quizModel.findOne({ question })
    console.log(isCreatedQuiz)
    if (isCreatedQuiz) return res.status(400).json({ msg: "quiz already exists! " })

    if (answer == optionfirst || answer == optionsecond || answer == optionthird || answer == optionfourth) {
        console.log(answer, optionfirst, ",", optionsecond, ",", optionthird, ",", optionfourth);
        const newQuiz = await quizModel.create({
            question,
            optionfirst,
            optionsecond,
            optionthird,
            optionfourth,
            answer,
            created_By: payload.id
        })
        if (!newQuiz) return res.status(400).json({ msg: "Error in creating quiz! " })
        return res.status(200).json({ msg: "Quiz created successfully!" })
    } else {
        return res.status(400).json({ msg: "Answer must be one of the options! " })
    }

}
module.exports = { createQuizHandler }