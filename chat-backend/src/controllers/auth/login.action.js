import bcrypt from 'bcryptjs'

import UserModel from '../../models/User'

import generateToken from '../../helpers/generateToken'

/* Login User
 * @description This method will login user
 * @input user details
 * @return (Object)
 */
export const login = async (request, response) => {
    const { email, password, remember } = request.body

    const user = await UserModel.findOne({ email })

    /* if user exists and password matches */
    if (user && bcrypt.compareSync(password, user.password)) {
        /* generate token */
        const data = await generateToken(user, remember)

        /* send success response*/
        return response.status(200).json({
            message: 'Logged in successfully.',
            data,
        })
    } else {
        /* retrun error incase of user not found or invalid credentials */
        return response.status(401).json({
            message: 'Please enter valid credentials.',
        })
    }
}
