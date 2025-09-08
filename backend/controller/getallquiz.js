const quizModel = require("../model/Quiz")
const { getUser } = require("../service/auth")

const getAllQuizHandler = async(req,res)=>{
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ msg: "Unauthorized! Please login first! " })

    const payload = await getUser(token)
    if (!payload || !payload.id) return res.status(401).json({ msg: "Unauthorized! Please login first! " })
    const allquizzes = await quizModel.find({})
// console.log(allquizzes)
res.status(200).json({quizzes:allquizzes})

}

const checkOptionHandler = async(req,res)=>{
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ msg: "Unauthorized! Please login first! " })
    const payload = await getUser(token)
    if (!payload || !payload.id) return res.status(401).json({ msg: "Unauthorized! Please login first! " })

    const option = req.params.option;
    const quiz = await quizModel.findOne({
        $or:[
            {optionfirst:option},
            {optionsecond:option},
            {optionthird:option},
            {optionfourth:option}
        ]
    })
    if(!quiz) return res.status(404).json({ msg: "Quiz Not Found! " })

    if(option != quiz.answer ) return res.status(200).json({ option,correctAnswer : quiz.answer,msg:"Wrong Answer! " });
    return res.status(200).json({ option,correctAnswer : quiz.answer,msg:"Correct Answer! "});
}

module.exports = {getAllQuizHandler,checkOptionHandler}