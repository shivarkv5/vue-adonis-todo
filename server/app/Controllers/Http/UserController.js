'use strict'

const user = use('App/Models/User');

const User = use('App/Models/User')



class UserController {

    async login({ request, auth }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password)
        return token;
        
    }

    async register({ request }) {
        const { email, password } = request.all();
        console.log(email, password)

        // save and get instance back
        await User.create({ email, password, username: email })

        // return user; Instead of sending plain user details we now send auth token when user register. 
        //Calling login after user registers 
        return this.login(...arguments) // Passing login function arguments to register function to genrate a new jwt
    }
}

module.exports = UserController
