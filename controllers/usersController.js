import User from '../models/User.js'
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from '../errors/index.js'


const getAllUsers = async (req, res) => {
    const users = await User.find( {} ) //createdBy: req.user.userId
    res
      .status(StatusCodes.OK)
      .json({ users, totalUsers: users.length })
  }

const deleteUser = async (req, res) => {
    const { id:userId } = req.params

    const user = await User.findOne({ _id:userId })

    if ( !user ){
        throw new NotFoundError(`No user with id : ${userId}`)
    }
    await user.remove()

    res.status(StatusCodes.OK).json({ msg: 'Success! User removed' })
}
export { deleteUser, getAllUsers }