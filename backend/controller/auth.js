const userModel = require("../model/User")
const bcrypt = require('bcrypt')
const { setUser, getUser } = require('../service/auth')

const initalpageHandler = async (req, res) => {
    const token = req.cookies?.token
    if (!token) return res.status(400).json({ msg: "you are anauthenticated user! " })
    const payload = await getUser(token)
    if (!payload) return res.status(400).json({ msg: "you are not authenticated user! " })
    const user = await userModel.findById(payload.id)
    if (!user) return res.status(400).json({ msg: "user not found! " })
    console.log(user)
    res.status(200).json({ user })

}

const signupHandler = async (req, res) => {
    const { name, password, email, username } = req.body

    if (!name || !password || !email || !username) return res.status(400).json({ msg: "Please fill all the fields!" })

    const isMatch = await userModel.findOne({ email })
    if (isMatch) return res.status(400).json({ msg: "User already exits! " })
    const user = await userModel.findOne({ username })
    if (user) return res.status(400).json({ msg: "Username already exits! " })

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            username: username
        })
        return res.status(200).json({ msg: "signup successfully! " })
    } catch (err) {
        res.status(500).json({ error: "error in creating user! " })
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) return res.status(400).json({ msg: "Invalid email! " })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid password! " })

    const token = await setUser(user)
    res.cookie('token', token)
    return res.status(200).json({ msg: "login successfully!", user });

}

const logoutHandler = async (req, res) => {
    let token = req.cookies?.token
    token = ''
    res.cookie('token', token)
    return res.status(200).json({ msg: 'Logout successfully! ' })
}

module.exports = { initalpageHandler, signupHandler, loginHandler, logoutHandler }