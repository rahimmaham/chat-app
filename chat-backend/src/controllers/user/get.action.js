import UserModel from '../../models/User'

export const get = async (request, response) => {
    const { keyword } = request.query

    /* get user other then logged in user*/
    const filterBy = {
        _id: {
            $ne: request.user.id,
        },
    }
    /* if keyword then search for user having name like keyword */
    if (keyword) {
        filterBy.fullName = {
            $regex: '.*' + keyword + '.*',
            $options: 'i',
        }
    }

    /* fetch users from database sort by newly created on top*/
    const users = await UserModel.find(filterBy).sort({
        createdAt: -1,
    })

    /* return users listing */
    return response.status(200).json({
        data: users,
    })
}
