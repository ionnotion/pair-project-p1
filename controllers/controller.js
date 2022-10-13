const {User, UserDetail, Company, Investment, Stock} = require(`../models/`)
const bcrypt = require(`bcryptjs`)
const url = require(`url`)

class Controller {
    static test (req,res) {
        let options = { 
            include:{
                model : Stock,
                include : {
                    model: Company
                }
            }
        }

        Company.findAll(options)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static landingPage (req,res) {
        res.send(`landing page`)
    }

    static renderLogin (req,res) {
        res.render(`login`)
    }

    static postLogin (req,res) {
        const { errors } = req.query
        const {username, password} = req.body
        console.log(username, password)
        let userData
        let error

        User.findOne({where: {username}})
            .then(data => {
                
                if(data) {
                    userData = data
                    const validatePassword = bcrypt.compareSync(password, userData.password)
                    console.log(userData)
                    if(validatePassword) {
                        return res.redirect(`/users/${userData.id}`)
                    } else {
                        error = `invalid password`
                        return  res.redirect(`login/?error=${error}`)
                    }
                } else {
                    error = `username not found`
                    return res.redirect(`login/?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
        // res.redirect(`./login`)
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