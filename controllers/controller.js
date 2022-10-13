const {User, UserDetail, Company, Investment, Stock, sequelize} = require(`../models/`)
const bcrypt = require(`bcryptjs`)
const url = require(`url`)
const {profit, toCurrencyRupiah, timeSince} = require('../helpers/helper')
const { group } = require('console')
const { Op } = require('sequelize')

class Controller {
    static test (req,res) {
        let options = { 
            include:{
                all:true
            }
        }

        Stock.findAll(options)
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
                        req.session.username = userData.username
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
                // if(err.name = `sequelizeValidationError`)
                // let errors = err.errors.map(el => {
                //     return el.messages
                // })
                console.log(err)
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
                        // reset password to default, buat hashed on database   
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
        let { errors } = req.query
        if(typeof errors === `string`) errors = [errors] 
        res.render(`register`, {errors})
    }

    static postRegister (req,res) {
        let {username, email, password, confirmation, firstName, lastName, birthday, validationQuestion, validationAnswer} = req.body

        if(password != confirmation) {
            res.redirect(url.format({
                pathname: `/register`,
                query: {errors: [`Password doesn't match!`]}
            }))
            return
        }

        console.log(req.body)
        let userData = {username, email, password}
        let userDetails = {firstName, lastName, birthday, validationQuestion, validationAnswer}
        if(validationQuestion && validationAnswer){
            User.create(userData)
                .then (data => {
                    userDetails.UserId = data.id
                    return UserDetail.create(userDetails)
                })
                .then (() => {
                    res.redirect(url.format({
                        pathname: `/login`,
                        query: {message:`Create user succesful.`}
                    }))
                })
                .catch (err => {
                    let errors
                    console.log(err)
                    if(err.name == `SequelizeValidationError` || err.name == `SequelizeUniqueConstraintError`) {
                        errors = err.errors.map(el => {
                            return el.message
                        })
                        res.redirect(url.format({
                            pathname: `/register`,
                            query: {errors}
                        }))
                    }
                    else res.send(err)
                })
        } else {
            res.redirect(url.format({
                pathname: `/register`,
                query: {errors: [`Validation answer and question is needed!`]}
            }))
        }
    }

    static renderUserHome(req,res) {
        const id = req.session.UserId
        const username = req.session.username
        let { search } = req.query

        let options =  {
            where : {id},
            include : [{
                model: Investment,
                include : {
                    model : Stock,
                    where: {}
                }
            },{
                model : UserDetail
            }
            ]
        }

        if(search) {
            options.include[0].include.where = {
                ...options.include[0].include.where,
                name : {[Op.iLike] : `%${search}%`}
            }
        }

        User.findOne(options)
        .then(data => {
            // res.send(data)
            res.render('userInvestments',{ data, profit, toCurrencyRupiah,username })
        })
        .catch (err => {
            res.send('err')
        })
    }

    static renderCompanyList(req,res) {
        const username = req.session.username
        let { search } = req.query
        console.log(search)

        let options = {
            include : {
                model : Stock
            },
            where : {}
        }

        if(search) {
            options.where = {
                ...options.where,
                name : {[Op.iLike]:`%${search}%`}
            }
        }

        Company.findAll(options)
        .then(data => {
            // res.send(data)
            res.render('userCompany',{ data,username })
        })
        .catch (err => {
            res.send(err)
        })
    }

    static renderStocks(req,res) {
        let { filter } = req.query
        console.log(filter)
        const username = req.session.username
        let bought = []
        let options = {
            include : {
                model : Investment
            },
            where : {}
        }
        
        if(filter) {
            options.where = {
                ...options.where,
                type : {[Op.iLike]:`%${filter}%`}
            }
        }
        
        Stock.findAll(options)
        .then(data => {
            // count bought stocks
            data.forEach(el=>{
                let temp = 0
                el.Investments.forEach(el2=>{
                    temp+=el2.lot
                })
                bought.push(temp)
            })
            res.render('userStock',{ data,bought,username })
        })
        .catch (err => {
            res.send(err)
        })
    }

    static renderCompanyDetails(req,res) {
        let { CompanyId } = req.params

        Company.findByPk(CompanyId)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log(err)
                res.redirect(`/companies`)
            })
    }

    static userSignout(req, res) {
        req.session.destroy(err=> {
            if(err) {
                res.send(err)
            } else {
                console.log(`User logged out.`)
                res.redirect(url.format({
                    pathname:`/login`,
                    query: {message: `You've been logged out.`}
                }))
            }
        })
    }
}

module.exports = Controller