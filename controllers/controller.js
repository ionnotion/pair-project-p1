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
        res.redirect(`./login`)
    }

    static renderForgetPassword (req,res) {
        res.render(`loginForgetPassword`)
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
        let {username, email, password} = req.body
        console.log(username, email, password)
        res.redirect(`./register`)
    }
}

module.exports = Controller