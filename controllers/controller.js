const {User, UserDetail, Company, Investment, Stock} = require(`../models/`)
const bcrypt = require(`bcryptjs`)
const url = require(`url`)

class Controller {
    static test (req,res) {
        let options = { 
            include:{
                all:true,
                include: {
                    all:true
                }
            }
        }

        Company.findAll(options)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static landingPage (req,res) {
        res.render(`homepage`)
    }

    static renderLogin (req,res) {
        const { error, message } = req.query
        res.render(`login`, { error, message })
    }

    static postLogin (req,res) {
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
                        req.session.UserId = userData.id
                        req.session.UserRole = userData.role
                        return res.redirect(`/users`)
                    } else {
                        error = `invalid password`
                        return  res.redirect(`login/?error=${error}`)
                    }
                } else {
                    error = `Username not found!`
                    return res.redirect(`login/?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static renderForgetPassword (req,res) {
        res.render(`loginForget`, {data:null})
    }

    static postForgetPassword (req,res) {
        let {username, email, answer} = req.body
        let errors = []

        // check answer
        if(answer) {
            let {sessionUsername, sessionAnswer} = req.session
            if(answer === sessionAnswer) {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(`default`, salt)
                User.update({
                    password : hash
                } , {
                    where:
                    {
                        username:sessionUsername
                }})
                    .then(() => {
                        res.redirect(url.format({
                            pathname: `./`,
                            query: {message:`Password has been reset to "default".`}
                        }))
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(err)
                    })
            } else {
                let error = `Reset password failed!`
                res.redirect(url.format({
                    pathname:`/login`,
                    query : { error }
                }))
            }
        } else {
        // check email & username 
            User.findOne({
                where:{ username, email },
                include: {
                    model: UserDetail,
                    attributes : [`validationQuestion`, `validationAnswer`]
                }
            })
            .then(data => {
                console.log(data)
                req.session.sessionUsername = data.username
                req.session.sessionAnswer = data.UserDetail.validationAnswer
                req.session.sessionQuestion = data.UserDetail.validationAnswer
                return res.render(`loginForget`, {data} )
            })
            .catch(err => {
                errors = `Invalid data!`
                res.redirect(url.format({
                    pathname: `./forget`, 
                    query: {errors}
                }))
            })
        }
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
            })
    }

    static renderUserHome(req,res) {
        const id = req.session.UserId
        User.findOne({
            where : {id},
            include : {
                model: Investment
            }
        })
        .then(data => {
            res.send(data)
        })
    }

    static renderCompanyList(req,res) {

        Company.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
}

module.exports = Controller