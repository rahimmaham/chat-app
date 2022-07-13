import UserModel from '../../models/User'

export const me = async (request, response) => {
    /* get loggedin user details */
    const user = await UserModel.findOne({ _id: request.user.id })

    return response.json({
        data: user,
    })
}
