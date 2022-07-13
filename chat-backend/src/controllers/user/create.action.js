import bcrypt from 'bcryptjs'
import UserModel from '../../models/User'

/* Create User
 * @description This method will add new user
 * @input user details
 * @return (Object)
 */
export const create = async (request, response) => {
    const { body } = request

    /* check if user already exist with same email */
    let data = await UserModel.findOne({
        email: body.email,
    })

    /* return error if user already exist with same email*/
    if (data) {
        return response.status(409).json({
            message: 'User already registered with this email.',
        })
    }

    /* hash password */
    body.password = bcrypt.hashSync(body.password, 10)

    data = await UserModel.create(body)

    /* send success response*/
    return response.status(200).json({
        message: 'User registered successfully.',
        data,
    })
}
