const {User, UserDetail, Company, Investment, Stock} = require(`../models/`)
const bcrypt = require(`bcryptjs`)


class Controller {
    static landingPage (req,res) {
        res.send(`landing page`)
    }

    static renderLogin (req,res) {
        res.render(`login`)
    }

    static postLogin (req,res) {
        let {username, password} = req.body
        console.log(username, password)
        let userData
        User.findOne({where: {username}})
            .then(data => {
                userData = data
                const validatePassword = bcrypt.compareSync(password, userData.password)
                console.log(userData)
                if(validatePassword) {
                    return res.redirect(`/users/${userData.id}`)
                } else {

                }
            })
            .catch(err => {
                res.send(err)
            })
        res.redirect(`./login`)
    }

    static renderForgetPassword (req,res) {
        res.render(`loginForget`)
    }

    static postForgetPassword (req,res) {
        let {username, email} = req.body
        console.log(username,email)
        res.redirect(`./login/forget`)

    }

    static renderRegister (req,res) {
        res.render(`register`)
    }

    static postRegister (req,res) {
        let {username, email, password, firstName, lastName, birthday, validationQuestion, validationAnswer} = req.body
        console.log(req.body)
        let userData = {username, email, password}
        let userDetails = {firstName, lastName, birthday, validationQuestion, validationAnswer}
        User.create(userData)
            .then (data => {
                userDetails.UserId = data.id
                return UserDetail.create(userDetails)
            })
            .then (() => {
                res.redirect(`/`)
            })
            .catch (err => {
                console.log(err)
                res.send(err)
                // res.redirect(`./register`)
            })
    }
}

module.exports = Controller